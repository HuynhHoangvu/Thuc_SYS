'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { stageApi } from './stage.api';
import type { Stage } from './stage.types';
import { EMAIL_PRESETS, NOTIFY_FIELDS, getPreset } from '@/lib/notifications/templates';
import { renderEmailHtml } from '@/lib/notifications/render';

const inputClass =
  'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';

const PLACEHOLDERS = ['maHoSo', 'tenHocSinh', ...NOTIFY_FIELDS.map((f) => f.key)];

interface StageEmailTemplateModalProps {
  stage: Stage | null;
  onClose: () => void;
}

export function StageEmailTemplateModal({ stage, onClose }: StageEmailTemplateModalProps) {
  return (
    <Dialog.Root open={Boolean(stage)} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        {/* Keyed by stage so the form state re-initialises from props for each stage. */}
        {stage && <TemplateForm key={stage.id} stage={stage} onClose={onClose} />}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function TemplateForm({ stage, onClose }: { stage: Stage; onClose: () => void }) {
  const queryClient = useQueryClient();
  const t = stage.emailTemplate;
  const [enabled, setEnabled] = useState(t?.enabled ?? false);
  const [presetKey, setPresetKey] = useState(t?.presetKey ?? '');
  const [subject, setSubject] = useState(t?.subject ?? '');
  const [body, setBody] = useState(t?.body ?? '');
  const [nextUpdateDays, setNextUpdateDays] = useState(t?.nextUpdateDays ?? 7);
  const [showPreview, setShowPreview] = useState(false);

  function applyPreset(key: string) {
    setPresetKey(key);
    const preset = getPreset(key);
    if (!preset) return;
    if ((subject || body) && !confirm('Thay nội dung hiện tại bằng mẫu này?')) return;
    setSubject(preset.subject);
    setBody(preset.body);
    if (!stage.emailTemplate) setEnabled(true);
  }

  const saveMutation = useMutation({
    mutationFn: () =>
      stageApi.update(stage.id, {
        emailTemplate: { enabled, presetKey: presetKey || undefined, subject, body, nextUpdateDays },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stages', 'student'] });
      onClose();
    },
  });

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-[94vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg sm:max-w-3xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <Dialog.Title className="truncate text-base font-semibold">Mẫu mail – {stage.title}</Dialog.Title>
        <Dialog.Close className="text-muted-foreground hover:text-foreground">
          <X size={18} />
        </Dialog.Close>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="h-4 w-4" />
          Hiện popup gửi mail khi chuyển học sinh sang giai đoạn này
        </label>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Dùng mẫu có sẵn</span>
            <select value={presetKey} onChange={(e) => applyPreset(e.target.value)} className={inputClass}>
              <option value="">— Tự soạn —</option>
              {EMAIL_PRESETS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Cập nhật tiếp sau (ngày)</span>
            <input
              type="number"
              min={0}
              value={nextUpdateDays}
              onChange={(e) => setNextUpdateDays(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Tiêu đề</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Nội dung</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={16}
            className={`${inputClass} font-mono text-xs leading-relaxed`}
          />
        </label>

        <div className="text-xs text-muted-foreground">
          <p className="mb-1">Biến có thể dùng:</p>
          <div className="flex flex-wrap gap-1">
            {PLACEHOLDERS.map((k) => (
              <code key={k} className="rounded bg-muted px-1.5 py-0.5">{`{{${k}}}`}</code>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowPreview((v) => !v)}
          className="self-start text-sm font-medium text-primary hover:underline"
        >
          {showPreview ? 'Ẩn xem trước' : 'Xem trước'}
        </button>
        {showPreview && (
          <iframe
            title="Xem trước mẫu"
            srcDoc={renderEmailHtml({ subject, body, steps: [], currentIndex: -1 })}
            className="h-[50vh] w-full rounded-md border border-border bg-white"
          />
        )}
        {saveMutation.isError && <p className="text-sm text-red-500">Không lưu được mẫu.</p>}
      </div>

      <div className="flex justify-end gap-2 border-t border-border px-4 py-3 sm:px-6">
        <button
          onClick={onClose}
          className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Huỷ
        </button>
        <button
          onClick={() => saveMutation.mutate()}
          disabled={!subject.trim() || !body.trim() || saveMutation.isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-90 disabled:opacity-50"
        >
          Lưu mẫu
        </button>
      </div>
    </Dialog.Content>
  );
}
