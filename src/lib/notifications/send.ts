import { randomBytes } from 'node:crypto';
import type { HydratedDocument } from 'mongoose';
import type { StudentDoc } from '@/models/Student';
import { StageTemplate } from '@/models/StageTemplate';
import { NotificationLog } from '@/models/NotificationLog';
import { nextSequence } from '@/models/Counter';
import { BadRequestError } from '@/lib/errors';
import { sendMail } from '@/lib/email/mailer';
import { countryLabel } from '@/lib/countries';
import { EmailTemplate } from '@/models/EmailTemplate';
import { STAGE_LIBRARY_KEY, fillLibraryText, libraryHtmlToText, libraryValues, missingLibraryValues } from '@/lib/email-templates/stage-library';
import { toDateInputValue, buildInfoRows, eyebrowFor, letterLabels, buildProgressSteps, headingFromStageTitle, fillPlaceholders, findMissingVars, renderEmailHtml, renderEmailText } from './render';

type StudentDocument = HydratedDocument<StudentDoc>;

export class SendFailedError extends Error {}

export interface StudentNotificationInput {
  stageKey: string;
  to: string;
  cc: string[];
  subject: string;
  body: string;
  kind?: 'stage' | 'interview_reminder';
  refValue?: string;
}

// Gives the student a case code and unsubscribe token the first time they are emailed.
export async function ensureNotificationIds(student: StudentDocument) {
  let changed = false;
  if (!student.caseCode) {
    const year = new Date().getFullYear();
    const seq = await nextSequence(`case-${year}`);
    student.caseCode = `MTA-${year}-${String(seq).padStart(4, '0')}`;
    changed = true;
  }
  if (!student.unsubscribeToken) {
    student.unsubscribeToken = randomBytes(24).toString('base64url');
    changed = true;
  }
  if (changed) await student.save();
}

export function studentVars(student: StudentDocument): Record<string, string> {
  const vars: Record<string, string> = {
    ...Object.fromEntries(student.notifyInfo ?? []),
    maHoSo: student.caseCode ?? '',
    tenHocSinh: student.fullName,
    tenHocSinhHoa: student.fullName.toLocaleUpperCase('vi-VN'),
    ngayGui: toDateInputValue(new Date()),
    // Vietnamese given name is the last word: "Phan Minh Long" → "Long".
    tenGoi: student.fullName.trim().split(/\s+/).pop() ?? '',
  };
  // School is always the first preferred university in the profile (one source of truth).
  vars.truong = student.preferredUniversities?.[0] ?? '';
  // Country comes from the profile only (one source of truth), never from free text.
  vars.quocGia = countryLabel(student.destinationCountry);
  return vars;
}

export async function sendStudentNotification(student: StudentDocument, input: StudentNotificationInput) {
  if (student.notifyOptOut) throw new BadRequestError('Học sinh đã ngừng nhận thông báo');
  await ensureNotificationIds(student);

  const vars = studentVars(student);
  const stages = await StageTemplate.find({ type: 'student' }).sort({ order: 1 });
  // No unsubscribe link in these service emails (decided 01/10/2026): families must keep getting updates.
  const stageTitle = stages.find((s) => s.key === input.stageKey)?.title;
  const presetKey =
    input.kind === 'interview_reminder'
      ? 'gd6_nhac_pv'
      : stages.find((s) => s.key === input.stageKey)?.emailTemplate?.presetKey;
  const appUrl = process.env.APP_URL?.replace(/\/$/, '');

  // A stage linked to a library template sends that template, filled with the student's values.
  const libraryKey = input.kind === 'interview_reminder' ? undefined : STAGE_LIBRARY_KEY[presetKey ?? ''];
  const library = libraryKey ? await EmailTemplate.findOne({ seedKey: libraryKey }) : null;

  if (!library && input.kind !== 'interview_reminder') {
    throw new BadRequestError('Giai đoạn này chưa có mẫu email trong thư viện');
  }

  let subject: string;
  let body: string;
  let html: string;
  let text: string;
  if (library) {
    const values = libraryValues(vars);
    const missing = missingLibraryValues([library.subject, library.html], values);
    if (missing.length) throw new BadRequestError(`Còn thiếu thông tin: ${missing.join(', ')}`);
    subject = fillLibraryText(library.subject, values);
    html = fillLibraryText(library.html, values, true);
    body = text = libraryHtmlToText(html);
  } else {
    const missing = findMissingVars([input.subject, input.body], vars);
    if (missing.length) throw new BadRequestError(`Còn thiếu thông tin: ${missing.join(', ')}`);
    subject = fillPlaceholders(input.subject, vars);
    body = fillPlaceholders(input.body, vars);
    const labels = letterLabels(presetKey);
    html = renderEmailHtml({
      subject,
      body,
      ...buildProgressSteps(
        stages.map((s) => s.toObject()),
        input.stageKey,
        student.destinationCountry
      ),
      eyebrow: eyebrowFor(student.destinationCountry ?? undefined),
      ...labels,
      heading: labels.heading ?? headingFromStageTitle(stageTitle, student.destinationCountry),
      caseCode: student.caseCode ?? undefined,
      info: buildInfoRows(vars, student.destinationCountry ?? undefined),
      // Images need a public URL or Gmail shows them as attachment chips:
      // EMAIL_ASSET_URL (a folder holding public/email/*.png) wins, then the deployed site's /email,
      // and on localhost (unreachable for mail clients) they are embedded inline instead.
      assetBase:
        process.env.EMAIL_ASSET_URL?.trim() ||
        (appUrl?.startsWith('https://') ? `${appUrl}/email` : 'cid:'),
    });
    text = renderEmailText(body);
  }

  const base = {
    studentId: String(student._id),
    stageKey: input.stageKey,
    kind: input.kind ?? 'stage',
    refValue: input.refValue,
    to: input.to,
    cc: input.cc,
    subject,
    body,
  };
  try {
    const result = await sendMail({
      to: input.to,
      cc: input.cc,
      subject,
      html,
      text,
      threadId: `student-${student._id}`,
    });
    return await NotificationLog.create({ ...base, status: 'sent', providerId: result.providerId, testMode: result.testMode });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await NotificationLog.create({ ...base, status: 'failed', error: message });
    throw new SendFailedError(message);
  }
}
