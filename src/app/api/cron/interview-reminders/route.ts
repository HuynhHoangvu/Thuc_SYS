import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { NotificationLog } from '@/models/NotificationLog';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { assertCronAuthorized } from '@/lib/cron-auth';
import { getPreset } from '@/lib/notifications/templates';
import { sendStudentNotification } from '@/lib/notifications/send';

const REMINDER_PRESET = 'gd6_nhac_pv';
const WINDOW_HOURS = 48;
const VN_OFFSET_MS = 7 * 3600_000;

// Interview times are stored as Vietnam local "YYYY-MM-DDTHH:mm" strings, so compare in that form.
function vnLocal(ms: number) {
  return new Date(ms + VN_OFFSET_MS).toISOString().slice(0, 16);
}

// Sends phase-6 reminders for interviews in the next 48h. Each interview time gets at most one reminder.
export const GET = withErrorHandling(async (req) => {
  assertCronAuthorized(req);
  await connectDB();

  const preset = getPreset(REMINDER_PRESET)!;
  const now = Date.now();
  const students = await Student.find({
    'notifyInfo.lichPhongVan': { $gte: vnLocal(now), $lte: vnLocal(now + WINDOW_HOURS * 3600_000) },
    notifyOptOut: { $ne: true },
    destinationCountry: { $nin: ['Canada', 'NewZealand', 'Germany', 'France'] },
    emailBounced: { $ne: true },
    personalEmail: { $nin: [null, ''] },
  });

  const result = { sent: [] as string[], skipped: [] as string[], failed: [] as Array<{ student: string; error: string }> };
  for (const student of students) {
    const interviewAt = student.notifyInfo.get('lichPhongVan')!;
    const already = await NotificationLog.exists({
      studentId: String(student._id),
      kind: 'interview_reminder',
      refValue: interviewAt,
      status: { $ne: 'failed' },
    });
    if (already) {
      result.skipped.push(student.fullName);
      continue;
    }
    try {
      await sendStudentNotification(student, {
        stageKey: student.stage ?? '',
        to: student.personalEmail!,
        cc: [],
        subject: preset.subject,
        body: preset.body,
        kind: 'interview_reminder',
        refValue: interviewAt,
      });
      result.sent.push(student.fullName);
    } catch (err) {
      result.failed.push({ student: student.fullName, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return ok(result);
});
