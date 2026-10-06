// Structured "composer" for library templates whose data is a list (e.g. several practice sessions).
// The HTML template keeps the design; this file turns form data into the values and repeated rows it needs.
// Pure string logic (no DOM) so it runs on client, server and in scripts.

import { dateOf, timeOfDay } from './stage-library';

export const PRACTICE_SEED_KEY = 'practice-schedule';

export interface PracticeSession {
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
}

export interface PracticeForm {
  name: string;
  sessions: PracticeSession[];
  from: string; // yyyy-mm-dd, used when rangeManual
  to: string;
  rangeManual: boolean;
  format: string;
  mentor: string;
  meet: string;
  content: string;
  subject: string;
  subjectManual: boolean;
}

export const DEFAULT_PRACTICE_CONTENT =
  'Thực hành các câu hỏi phỏng vấn thường gặp, trao đổi các tình huống thực tế và hướng dẫn cách trả lời phù hợp, tự tin.';

export function defaultPracticeForm(): PracticeForm {
  return {
    name: '',
    sessions: [{ date: '', time: '09:00' }],
    from: '',
    to: '',
    rangeManual: false,
    format: 'Google Meet',
    mentor: '',
    meet: '',
    content: DEFAULT_PRACTICE_CONTENT,
    subject: '',
    subjectManual: false,
  };
}

// The composer only applies to a template that still carries the repeat markers; a hand-edited copy
// without them falls back to the flat field form instead of breaking.
export function composerFor(template: { seedKey?: string; html: string }): 'practice' | null {
  return template.seedKey === PRACTICE_SEED_KEY && template.html.includes('<!--ROWS-->') ? 'practice' : null;
}

const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const pad = (n: number) => String(n).padStart(2, '0');

// Local-time parse: new Date('2026-10-06') is UTC and shifts the weekday in some time zones.
export function parseDay(value: string): Date | null {
  const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 ? d : null; // rejects 2026-02-31
}

export function isoDay(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function weekdayOf(value: string) {
  const d = parseDay(value);
  return d ? WEEKDAYS[d.getDay()] : '';
}

export function shortDate(value: string) {
  const d = parseDay(value);
  return d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}` : '';
}

export const longDate = (value: string) => (parseDay(value) ? dateOf(value) : '');
export const timeLabel = (time: string) => (time ? timeOfDay(`T${time}`) : '');

const sessionKey = (s: PracticeSession) => `${s.date} ${s.time || '99:99'}`;

export function sortedSessions(sessions: PracticeSession[]) {
  return sessions
    .filter((s) => parseDay(s.date))
    .slice()
    .sort((a, b) => (sessionKey(a) < sessionKey(b) ? -1 : sessionKey(a) > sessionKey(b) ? 1 : 0));
}

// Monday of the first session's week → Saturday of the last session's week.
export function autoRange(sessions: PracticeSession[]) {
  const list = sortedSessions(sessions);
  if (!list.length) return null;
  const first = parseDay(list[0].date)!;
  const last = parseDay(list[list.length - 1].date)!;
  const from = new Date(first);
  from.setDate(first.getDate() - ((first.getDay() + 6) % 7));
  const to = new Date(last);
  if (last.getDay() !== 0) to.setDate(last.getDate() + (6 - last.getDay()));
  return { from: isoDay(from), to: isoDay(to) };
}

export function currentRange(form: PracticeForm) {
  if (form.rangeManual) return { from: form.from, to: form.to };
  return autoRange(form.sessions) ?? { from: '', to: '' };
}

const displayName = (form: PracticeForm) => form.name.trim() || '[Tên học viên]';
const formatOf = (form: PracticeForm) => form.format.trim() || 'Google Meet';
const validMeet = (url: string) => /^https?:\/\/\S+$/i.test(url.trim());

export function autoSubject(form: PracticeForm) {
  const r = currentRange(form);
  const when = r.from && r.to ? ` tuần ${shortDate(r.from)}–${longDate(r.to)}` : '';
  return `[Catholic MTA] Lịch thực hành phỏng vấn${when} – em ${displayName(form)}`;
}

export const practiceSubject = (form: PracticeForm) => (form.subjectManual ? form.subject : autoSubject(form));

function preheader(form: PracticeForm) {
  const list = sortedSessions(form.sessions);
  const dates = list.map((s, i) => (i === list.length - 1 ? longDate(s.date) : shortDate(s.date)));
  const when = dates.length > 1 ? `${dates.slice(0, -1).join(', ')} và ${dates[dates.length - 1]}` : (dates[0] ?? '');
  const times = list.map((s) => s.time);
  const sameTime = times.length > 0 && times.every((t) => t && t === times[0]);
  return `Lịch thực hành phỏng vấn của em ${displayName(form)}${when ? `: ${when}` : ''}${sameTime ? `, ${timeLabel(times[0])}` : ''} qua ${formatOf(form)}.`;
}

// Warnings shown before copying. They never block: staff may knowingly send an incomplete schedule.
export function practiceChecks(form: PracticeForm, today: string): string[] {
  const out: string[] = [];
  const r = currentRange(form);
  const seen = new Map<string, string>();
  if (!form.name.trim()) out.push('Chưa nhập tên học viên.');
  if (!form.sessions.some((s) => parseDay(s.date))) out.push('Chưa có buổi luyện tập nào có ngày.');
  form.sessions.forEach((s, i) => {
    const label = `Buổi ${i + 1}`;
    const d = parseDay(s.date);
    if (!d) out.push(`${label} chưa có ngày.`);
    else {
      if (s.date < today) out.push(`${label} (${longDate(s.date)}) là ngày đã qua.`);
      if (r.from && r.to && (s.date < r.from || s.date > r.to)) out.push(`${label} nằm ngoài khoảng ngày ghi trong thư.`);
      if (d.getDay() === 0) out.push(`${label} rơi vào Chủ Nhật.`);
    }
    if (!s.time) out.push(`${label} chưa có giờ.`);
    if (d && s.time) {
      const k = sessionKey(s);
      const prev = seen.get(k);
      if (prev) out.push(`${label} trùng ngày giờ với ${prev}.`);
      else seen.set(k, label);
    }
  });
  if (r.from && r.to && r.from > r.to) out.push('Ngày bắt đầu đang sau ngày kết thúc.');
  if (!form.mentor.trim()) out.push('Chưa nhập tên mentor.');
  if (form.meet.trim() && !validMeet(form.meet)) out.push('Link phòng học phải bắt đầu bằng https://');
  return out;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{\{\s*(\w+)\s*\}\}/g, (raw, key: string) => (key in values ? values[key] : raw));

// Replaces <!--NAME-->…<!--/NAME--> by render(inner); render returning '' removes the block.
function mapBlock(html: string, name: string, render: (inner: string) => string) {
  const re = new RegExp(`<!--${name}-->([\\s\\S]*?)<!--/${name}-->`);
  return html.replace(re, (_m, inner: string) => render(inner));
}

export interface BuildOptions {
  // The hidden inbox-preview line only matters for whole-document use (HTML code / .html file).
  // It is dropped from a rich paste into Gmail compose, where it would be meaningless.
  preheader: boolean;
}

export function buildPracticeHtml(templateHtml: string, form: PracticeForm, options: BuildOptions): string {
  const list = sortedSessions(form.sessions);
  const range = currentRange(form);
  let html = templateHtml;

  html = mapBlock(html, 'ROWS', (row) =>
    list
      .map((s, i) =>
        fill(row, {
          label: `Buổi ${i + 1}`,
          ngay: longDate(s.date),
          thu: weekdayOf(s.date),
          gio: esc(timeLabel(s.time)),
          bd: i === list.length - 1 ? '' : 'border-bottom:1px solid #e4e7eb;',
        })
      )
      .join('\n')
  );

  const meet = form.meet.trim();
  html = mapBlock(html, 'MEET', (block) =>
    validMeet(meet) ? fill(block, { meetUrl: esc(meet), meetLabel: esc(`Vào phòng ${formatOf(form)}`) }) : ''
  );

  html = mapBlock(html, 'PREHEADER', (block) => (options.preheader ? fill(block, { preheader: esc(preheader(form)) }) : ''));

  return fill(html, {
    tenHocSinh: esc(displayName(form)),
    tuNgay: longDate(range.from) || '…',
    denNgay: longDate(range.to) || '…',
    hinhThuc: esc(formatOf(form)),
    mentor: esc(form.mentor.trim()),
    noiDungLuyenTap: esc(form.content.trim()).replace(/\n/g, '<br>'),
  });
}
