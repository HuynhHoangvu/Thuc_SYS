'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { DestinationCountry } from '@/features/students/student.types';
import { AlertTriangle, Check, Copy, Send, X } from 'lucide-react';
import { studentApi } from '@/features/students/student.api';
import { stageApi } from '@/features/stages/stage.api';
import { notificationApi } from './notification.api';
import { useQueueEmail } from './SendQueue';
import { copyEmailHtml, copyText } from './copyEmail';
import { COUNTRY_LABELS, countryLabel } from '@/lib/countries';
import {
  NOTIFY_FIELDS,
  STAFF_FIELD_KEYS,
  countryKey,
  resolveTemplate,
} from '@/lib/notifications/templates';
import {
  buildInfoRows,
  eyebrowFor,
  letterLabels,
  buildProgressSteps,
  headingFromStageTitle,
  fillPlaceholders,
  findMissingVars,
  renderEmailHtml,
  renderEmailText,
  toDateInputValue,
} from '@/lib/notifications/render';
import { cn } from '@/lib/utils';

const STAFF_STORAGE_KEY = 'progress-email-staff';
const inputClass =
  'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';

function loadStaff(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STAFF_STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function saveStaff(info: Record<string, string>) {
  try {
    const staff = Object.fromEntries(STAFF_FIELD_KEYS.map((k) => [k, info[k] ?? '']));
    localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staff));
  } catch {
    // storage unavailable — staff just retypes next time
  }
}

const AUTO_VARS = new Set(['maHoSo', 'tenHocSinh', 'tenGoi', 'tenHocSinhHoa', 'ngayGui']);

// Values that come from the profile, not from a popup text field.
const MISSING_LABELS: Record<string, string> = { quocGia: 'Quốc gia du học', truong: 'Trường (hồ sơ)' };

const COUNTRY_OPTIONS: Array<{ value: DestinationCountry; label: string }> = [
  { value: 'USA', label: COUNTRY_LABELS.USA },
  { value: 'Canada', label: COUNTRY_LABELS.Canada },
  { value: 'New Zealand', label: COUNTRY_LABELS['New Zealand'] },
  { value: 'Germany', label: COUNTRY_LABELS.Germany },
  { value: 'France', label: COUNTRY_LABELS.France },
];

const STAGE_EVENT_DATE: Record<string, string> = {
  gd1_hop_dong: 'ngayKyHopDong',
  gd2_nop_ho_so: 'ngayNopHoSo',
  gd3_i20_visa: 'ngayCapI20',
};

interface ProgressEmailModalProps {
  studentId: string | null;
  stageKey: string | null;
  onClose: () => void;
}

export function ProgressEmailModal({ studentId, stageKey, onClose }: ProgressEmailModalProps) {
  const open = Boolean(studentId && stageKey);

  const { data: student } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.getById(studentId as string),
    enabled: open,
  });
  const { data: stages } = useQuery({ queryKey: ['stages', 'student'], queryFn: () => stageApi.list('student') });
  const { data: history } = useQuery({
    queryKey: ['notifications', studentId],
    queryFn: () => notificationApi.list(studentId as string),
    enabled: open,
  });

  const stage = stages?.find((s) => s.key === stageKey);
  const template = stage?.emailTemplate;

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [info, setInfo] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const initializedFor = useRef<string | null>(null);

  // Prefill once per (student, stage) when data arrives.
  useEffect(() => {
    if (!open || !student || !template) return;
    const marker = `${student.id}:${stageKey}`;
    if (initializedFor.current === marker) return;
    initializedFor.current = marker;

    const next = new Date();
    next.setDate(next.getDate() + (template.nextUpdateDays ?? 7));
    const staff = loadStaff();
    setTo(student.personal.personalEmail ?? '');
    // Canada / NZ students get their country's version of the text (LOA / Offer of Place instead of I-20).
    const text = resolveTemplate(template.presetKey, student.studyAbroad.destinationCountry, template);
    setSubject(text.subject);
    setBody(text.body);
    const today = toDateInputValue(new Date());
    // The event that defines this stage (contract signed, file submitted, I-20 issued) usually happened today.
    const isUs = (countryKey(student.studyAbroad.destinationCountry) ?? 'USA') === 'USA';
    const eventDate =
      template.presetKey === 'gd3_i20_visa' && !isUs ? 'ngayCapThuMoi' : STAGE_EVENT_DATE[template.presetKey ?? ''];
    setInfo({
      ...(eventDate ? { [eventDate]: today } : {}),
      ...Object.fromEntries(Object.entries(staff).filter(([, v]) => v)),
      ...student.notifyInfo,
      ngayCapNhatTiepTheo: toDateInputValue(next),
    });
    setEditing(false);
  }, [open, student, template, stageKey]);

  useEffect(() => {
    if (!open) initializedFor.current = null;
    return () => {
    };
  }, [open]);

  const vars = useMemo(
    () => {
      const country = student?.studyAbroad.destinationCountry;
      return {
        ...info,
        quocGia: countryLabel(country),
        truong: student?.studyAbroad.preferredUniversities?.[0] ?? '',
        maHoSo: student?.caseCode ?? '',
        tenHocSinh: student?.personal.fullName ?? '',
        tenHocSinhHoa: (student?.personal.fullName ?? '').toLocaleUpperCase('vi-VN'),
        ngayGui: toDateInputValue(new Date()),
        tenGoi: student?.personal.fullName.trim().split(/\s+/).pop() ?? '',
      };
    },
    [info, student],
  );

  // Only ask for the fields this template actually uses (+ parent CC).
  const usedFields = useMemo(() => {
    const used = new Set(findMissingVars([subject, body], {}));
    return NOTIFY_FIELDS.filter((f) => used.has(f.key));
  }, [subject, body]);

  // maHoSo is generated by the server on first send, so it's not "missing".
  const missing = findMissingVars([subject, body], vars).filter((k) => !AUTO_VARS.has(k));

  const previewHtml = useMemo(
    () =>
      renderEmailHtml({
        subject: fillPlaceholders(subject, vars),
        body: fillPlaceholders(body, vars),
        ...buildProgressSteps(stages ?? [], stageKey ?? '', student?.studyAbroad.destinationCountry),
        eyebrow: eyebrowFor(student?.studyAbroad.destinationCountry),
        ...letterLabels(template?.presetKey),
        heading:
          letterLabels(template?.presetKey).heading ??
          headingFromStageTitle(stage?.title, student?.studyAbroad.destinationCountry),
        caseCode: student?.caseCode,
        info: buildInfoRows(vars, student?.studyAbroad.destinationCountry),
      }),
     
    [subject, body, vars, stages, stageKey, stage, student, template],
  );

  const queryClient = useQueryClient();
  const queueEmail = useQueueEmail();

  // Saves the country to the student profile and switches the text to that country's version.
  const countryMutation = useMutation({
    mutationFn: (country: DestinationCountry) => studentApi.update(studentId as string, { studyAbroad: { destinationCountry: country } }),
    onSuccess: (_s, country) => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      if (template) {
        const text = resolveTemplate(template.presetKey, country, template);
        setSubject(text.subject);
        setBody(text.body);
      }
    },
  });

  const schools = student?.studyAbroad.preferredUniversities ?? [];
  const usesSchool = /\{\{\s*truong\s*\}\}/.test(subject + body);

  // Picking a school moves it to the front of the profile's preferred list, which is what emails use.
  const schoolMutation = useMutation({
    mutationFn: (school: string) =>
      studentApi.update(studentId as string, {
        studyAbroad: { preferredUniversities: [school, ...schools.filter((u) => u !== school)] },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  function changeSchool(school: string) {
    if (school && school !== schools[0]) schoolMutation.mutate(school);
  }

  function changeCountry(country: DestinationCountry) {
    if (country) countryMutation.mutate(country);
  }

  // Manual fallback: copy subject / formatted body to paste into Gmail or Outlook.
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  async function handleCopy(kind: 'subject' | 'body') {
    setCopyError(null);
    try {
      if (kind === 'subject') await copyText(fillPlaceholders(subject, vars));
      else await copyEmailHtml(previewHtml, renderEmailText(fillPlaceholders(body, vars)));
      setCopied(kind);
      setTimeout(() => setCopied((c) => (c === kind ? null : c)), 2000);
    } catch (err) {
      setCopyError(err instanceof Error ? err.message : 'Không copy được, thử lại.');
    }
  }

  function handleSend() {
    saveStaff(info);
    queueEmail(
      studentId as string,
      {
        stageKey: stageKey as string,
        to,
        cc: [],
        subject,
        body,
        notifyInfo: info,
      },
      student?.personal.fullName ?? to,
    );
    onClose();
  }

  // Captured once at mount; good enough for a 24h window.
  const [mountedAt] = useState(() => Date.now());
  const recentDuplicate = history?.find(
    (h) =>
      h.stageKey === stageKey && h.status === 'sent' && mountedAt - new Date(h.createdAt).getTime() < 24 * 3600_000,
  );


  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-[94vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg sm:max-w-3xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <Dialog.Title className="truncate text-base font-semibold text-card-foreground">
                Gửi mail cập nhật hồ sơ
              </Dialog.Title>
              <Dialog.Description className="truncate text-xs text-muted-foreground">
                {student?.personal.fullName} · {stage?.title}
                {student?.caseCode ? ` · ${student.caseCode}` : ''}
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {!template && <p className="text-sm text-muted-foreground">Đang tải…</p>}

            {template && (
              <div className="mb-4 flex flex-col gap-2">
                {recentDuplicate && (
                  <p className="flex items-center gap-2 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900">
                    <AlertTriangle size={16} />
                    Đã gửi mail cho giai đoạn này lúc {new Date(recentDuplicate.createdAt).toLocaleString('vi-VN')}. Gửi
                    lại?
                  </p>
                )}
                {student?.emailBounced && to === student.personal.personalEmail && (
                  <p className="flex items-center gap-2 rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">
                    <AlertTriangle size={16} />
                    Email này từng bị trả về — kiểm tra lại địa chỉ trước khi gửi.
                  </p>
                )}
                {missing.length > 0 && (
                  <p className="flex items-center gap-2 rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">
                    <AlertTriangle size={16} />
                    Còn thiếu: {missing.map((k) => MISSING_LABELS[k] ?? NOTIFY_FIELDS.find((f) => f.key === k)?.label ?? k).join(', ')}
                  </p>
                )}
              </div>
            )}

            {template && (
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm">
                  <span className="font-medium">Gửi tới</span>
                  <input type="email" value={to} onChange={(e) => setTo(e.target.value)} className={inputClass} />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="font-medium">Quốc gia du học</span>
                    <select
                      value={student?.studyAbroad.destinationCountry ?? ''}
                      onChange={(e) => changeCountry(e.target.value as DestinationCountry)}
                      disabled={countryMutation.isPending}
                      className={cn(inputClass, !student?.studyAbroad.destinationCountry && 'ring-2 ring-red-300')}
                    >
                      <option value="" disabled>
                        — Chọn quốc gia —
                      </option>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-muted-foreground">Đồng bộ với hồ sơ học sinh; đổi ở đây là đổi luôn trong hồ sơ.</span>
                  </label>
                  {usesSchool && (
                    <label className="flex flex-col gap-1 text-sm">
                      <span className="font-medium">Trường</span>
                      <select
                        value={student?.studyAbroad.preferredUniversities?.[0] ?? ''}
                        onChange={(e) => changeSchool(e.target.value)}
                        disabled={schoolMutation.isPending || !schools.length}
                        className={cn(inputClass, !schools.length && 'ring-2 ring-red-300')}
                      >
                        {!schools.length && <option value="">— Chưa có trường nguyện vọng —</option>}
                        {schools.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs text-muted-foreground">
                        {schools.length
                          ? 'Lấy từ trường nguyện vọng trong hồ sơ; chọn trường khác sẽ đưa trường đó lên đầu danh sách.'
                          : 'Thêm trường nguyện vọng trong tab Hồ sơ của học sinh.'}
                      </span>
                    </label>
                  )}
                  {usedFields.map((f) => (
                    <label key={f.key} className="flex flex-col gap-1 text-sm">
                      <span className="font-medium">{f.label}</span>
                      <input
                        type={f.type}
                        value={info[f.key] ?? ''}
                        onChange={(e) => setInfo((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        className={cn(inputClass, missing.includes(f.key) && 'ring-2 ring-red-300')}
                      />
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-medium">{editing ? 'Sửa nội dung mẫu' : 'Mail sẽ gửi'}</span>
                  <button
                    onClick={() => setEditing((v) => !v)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {editing ? 'Xem trước' : 'Sửa nội dung'}
                  </button>
                </div>
              </div>
            )}

            {template && editing && (
              <div className="mt-3 flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm">
                  <span className="font-medium">Tiêu đề</span>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="font-medium">Nội dung</span>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={14}
                    className={cn(inputClass, 'font-mono text-xs leading-relaxed')}
                  />
                  <span className="text-xs text-muted-foreground">
                    Các chữ dạng {'{{tenHocSinh}}'} sẽ tự được thay bằng thông tin ở trên khi gửi. **chữ đậm**, dòng bắt
                    đầu bằng “- ” là gạch đầu dòng. Câu “mail tự động” được thêm tự động ở cuối.
                  </span>
                </label>
              </div>
            )}

            {template && !editing && (
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Tiêu đề: </span>
                  <span className="font-medium">{fillPlaceholders(subject, vars)}</span>
                </p>
                <iframe
                  title="Xem trước mail"
                  srcDoc={previewHtml}
                  className="h-[60vh] w-full rounded-md border border-border bg-white"
                />
              </div>
            )}

          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-4 py-3 sm:px-6">
            <div className="mr-auto flex flex-wrap items-center gap-2">
              {(['subject', 'body'] as const).map((kind) => (
                <button
                  key={kind}
                  onClick={() => handleCopy(kind)}
                  disabled={!template || missing.length > 0}
                  title="Dùng khi hệ thống gửi mail bị lỗi: copy rồi dán vào Gmail/Outlook"
                  className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {copied === kind ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  {copied === kind ? 'Đã copy' : kind === 'subject' ? 'Copy tiêu đề' : 'Copy nội dung'}
                </button>
              ))}
              {copyError && <span className="text-xs text-red-500">{copyError}</span>}
            </div>
            <button
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Bỏ qua
            </button>
            <button
              onClick={handleSend}
              disabled={!template || !to || missing.length > 0}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-90 disabled:opacity-50"
            >
              <Send size={14} />
              Gửi
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
