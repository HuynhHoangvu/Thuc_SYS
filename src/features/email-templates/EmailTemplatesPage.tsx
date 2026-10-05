'use client';

import { useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Copy, Mail, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { emailTemplateApi } from './email-template.api';
import type { EmailTemplate, EmailTemplateInput } from './email-template.types';
import { fillLibraryText } from '@/lib/email-templates/stage-library';
import { copyEmailHtml } from '@/features/notifications/copyEmail';

const inputClass =
  'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring';

const previewFields = [
  { key: 'tenHocSinh', label: 'Tên học sinh', placeholder: 'Nguyễn Văn An' },
  { key: 'tenPhuHuynh', label: 'Tên phụ huynh', placeholder: 'Nguyễn Văn Bình' },
  { key: 'maHoSo', label: 'Mã hồ sơ', placeholder: 'MTA-2026-0001' },
  { key: 'tenTruong', label: 'Tên trường', placeholder: 'Tên trường' },
  { key: 'quocGia', label: 'Quốc gia', placeholder: 'Mỹ, Canada, Úc...' },
  { key: 'ngayTiepNhan', label: 'Ngày tiếp nhận', placeholder: '04/10/2026' },
  { key: 'ngayCapThu', label: 'Ngày cấp thư', placeholder: '04/10/2026' },
  { key: 'ngayPhongVan', label: 'Ngày phỏng vấn', placeholder: '19/10/2026' },
  { key: 'gioPhongVan', label: 'Giờ phỏng vấn', placeholder: '10:30 sáng' },
] as const;

const blankTemplate: EmailTemplateInput = {
  name: '',
  subject: '[Catholic MTA] ',
  html: '<!doctype html>\n<html lang="vi">\n<head><meta charset="utf-8"><title>{{tenHocSinh}}</title></head>\n<body>\n  <p>Kính gửi em <strong>{{tenHocSinh}}</strong>,</p>\n  <p>Nội dung email...</p>\n</body>\n</html>',
};

// Same filler as the send popup and the server sender (stage-library), so every path renders identically.
const fillVariables = (text: string, values: Record<string, string>) => fillLibraryText(text, values, true);
const fillTextVariables = (text: string, values: Record<string, string>) => fillLibraryText(text, values);

export function EmailTemplatesPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<EmailTemplate | 'new' | null>(null);
  const [previewing, setPreviewing] = useState<EmailTemplate | null>(null);
  const [notice, setNotice] = useState('');
  const { data: templates, isLoading, isError } = useQuery({
    queryKey: ['email-templates'],
    queryFn: emailTemplateApi.list,
  });

  const deleteMutation = useMutation({
    mutationFn: emailTemplateApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['email-templates'] }),
  });

  async function remove(template: EmailTemplate) {
    if (!confirm(`Xóa mẫu “${template.name}”? Thao tác này không thể hoàn tác.`)) return;
    await deleteMutation.mutateAsync(template.id);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Mẫu email</h1>
          <p className="mt-1 text-sm text-muted-foreground">Lưu, chỉnh sửa và điền thông tin trước khi sao chép email để gửi.</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:brightness-95"
        >
          <Plus size={16} /> Thêm mẫu email
        </button>
      </div>

      {notice && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm">
          <span>{notice}</span><button onClick={() => setNotice('')} aria-label="Đóng"><X size={15} /></button>
        </div>
      )}
      {isLoading && <p className="text-sm text-muted-foreground">Đang tải mẫu email...</p>}
      {isError && <p className="text-sm text-red-600">Không tải được mẫu email.</p>}

      <div className="grid gap-4 xl:grid-cols-2">
        {(templates ?? []).map((template) => (
          <article key={template.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><Mail size={19} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate font-semibold text-card-foreground">{template.name}</h2>
                  {template.isBuiltIn && <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">Mẫu ban đầu</span>}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{template.subject}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => setPreviewing(template)} className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                Điền tên &amp; sao chép
              </button>
              <button onClick={() => setEditing(template)} className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm hover:bg-muted">
                <Pencil size={14} /> Chỉnh sửa
              </button>
              {!template.isBuiltIn && (
                <button onClick={() => remove(template)} className="ml-auto flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  <Trash2 size={14} /> Xóa
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {templates?.length === 0 && <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Chưa có mẫu email nào.</p>}

      <EditorDialog template={editing} onClose={() => setEditing(null)} />
      <PreviewDialog template={previewing} onClose={() => setPreviewing(null)} onNotice={setNotice} />
    </div>
  );
}

function EditorDialog({ template, onClose }: { template: EmailTemplate | 'new' | null; onClose: () => void }) {
  return (
    <Dialog.Root open={template !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45" />
        {template && <EditorForm key={template === 'new' ? 'new' : template.id} template={template} onClose={onClose} />}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function EditorForm({ template, onClose }: { template: EmailTemplate | 'new'; onClose: () => void }) {
  const queryClient = useQueryClient();
  const initial = template === 'new' ? blankTemplate : template;
  const [form, setForm] = useState<EmailTemplateInput>({ name: initial.name, subject: initial.subject, html: initial.html });
  const [showPreview, setShowPreview] = useState(false);
  // The preview iframe is edited in place (click text, type). Its document is the live editor, so it is only
  // reloaded when the HTML textarea changes, never from its own edits (that would reset the caret).
  const [seed, setSeed] = useState({ html: initial.html, rev: 0 });
  const frameRef = useRef<HTMLIFrameElement>(null);
  function enableInlineEdit() {
    const doc = frameRef.current?.contentDocument;
    if (!doc?.body) return;
    doc.body.contentEditable = 'true';
    doc.body.style.outline = 'none';
    doc.body.addEventListener('input', () => {
      const clone = doc.documentElement.cloneNode(true) as HTMLElement;
      clone.querySelector('body')?.removeAttribute('contenteditable');
      clone.querySelector('body')?.removeAttribute('style');
      const html = `<!DOCTYPE html>
${clone.outerHTML}`;
      setForm((f) => ({ ...f, html }));
    });
  }
  const mutation = useMutation({
    mutationFn: () => template === 'new' ? emailTemplateApi.create(form) : emailTemplateApi.update(template.id, form),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      onClose();
    },
  });

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[94vh] w-[96vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <Dialog.Title className="font-semibold">{template === 'new' ? 'Thêm mẫu email' : 'Chỉnh sửa mẫu email'}</Dialog.Title>
        <Dialog.Close aria-label="Đóng"><X size={19} /></Dialog.Close>
      </div>
      <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-5 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col gap-4">
          <label className="text-sm font-medium">Tên mẫu
            <input className={`${inputClass} mt-1`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="text-sm font-medium">Tiêu đề email
            <input className={`${inputClass} mt-1`} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </label>
          <label className="flex min-h-[360px] flex-1 flex-col text-sm font-medium">Mã HTML
            <textarea className={`${inputClass} mt-1 min-h-[360px] flex-1 resize-y font-mono text-xs leading-relaxed`} value={form.html} onChange={(e) => { setForm({ ...form, html: e.target.value }); setSeed((v) => ({ html: e.target.value, rev: v.rev + 1 })); }} />
          </label>
          <p className="text-xs text-muted-foreground">Mẹo: bấm thẳng vào chữ trong khung xem trước bên phải để sửa nội dung.</p>
          <p className="text-xs text-muted-foreground">Có thể dùng biến: {previewFields.map((field) => `{{${field.key}}}`).join(', ')}</p>
          <button onClick={() => setShowPreview((value) => !value)} className="self-start text-sm font-medium text-primary hover:underline lg:hidden">
            {showPreview ? 'Ẩn xem trước' : 'Xem trước'}
          </button>
        </div>
        <div className={`${showPreview ? 'block' : 'hidden'} min-h-[520px] overflow-hidden rounded-xl border border-border bg-white lg:block`}>
          <iframe key={seed.rev} ref={frameRef} onLoad={enableInlineEdit} title="Xem trước mẫu email" sandbox="allow-popups allow-same-origin" srcDoc={seed.html} className="h-full min-h-[520px] w-full" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
        {mutation.isError && <span className="mr-auto text-sm text-red-600">Không lưu được mẫu.</span>}
        <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm">Hủy</button>
        <button
          onClick={() => mutation.mutate()}
          disabled={!form.name.trim() || !form.subject.trim() || !form.html.trim() || mutation.isPending}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        ><Save size={15} /> {mutation.isPending ? 'Đang lưu...' : 'Lưu mẫu'}</button>
      </div>
    </Dialog.Content>
  );
}

function PreviewDialog({ template, onClose, onNotice }: { template: EmailTemplate | null; onClose: () => void; onNotice: (message: string) => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copying, setCopying] = useState(false);
  const renderedHtml = useMemo(() => template ? fillVariables(template.html, values) : '', [template, values]);
  const renderedSubject = useMemo(() => template ? fillTextVariables(template.subject, values) : '', [template, values]);

  // Fields this template actually uses, and those still empty (copying with {{...}} left in is a mistake).
  const usedFields = useMemo(() => {
    const text = template ? `${template.subject} ${template.html}` : '';
    return previewFields.filter((f) => text.includes(`{{${f.key}}}`));
  }, [template]);
  const emptyFields = usedFields.filter((f) => f.key !== 'tenPhuHuynh' && !values[f.key]?.trim());

  async function copyEmail() {
    if (emptyFields.length) {
      onNotice(`Chưa điền: ${emptyFields.map((f) => f.label).join(', ')}.`);
      return;
    }
    setCopying(true);
    try {
      // Copy only the rendered body fragment. Supplying a complete HTML document
      // can make Chromium-based mail editors paste both the document and fragment.
      await copyEmailHtml(renderedHtml);
      onNotice('Đã sao chép nội dung email. Bạn có thể dán trực tiếp vào Gmail hoặc Outlook.');
      onClose();
    } catch {
      onNotice('Trình duyệt không cho phép sao chép định dạng. Hãy thử lại trên HTTPS hoặc localhost.');
    } finally {
      setCopying(false);
    }
  }

  async function copySubject() {
    await navigator.clipboard.writeText(renderedSubject);
    onNotice('Đã sao chép tiêu đề email.');
  }

  return (
    <Dialog.Root open={Boolean(template)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45" />
        {template && (
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[94vh] w-[96vw] max-w-7xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div><Dialog.Title className="font-semibold">{template.name}</Dialog.Title><Dialog.Description className="text-xs text-muted-foreground">Điền thông tin, kiểm tra bản xem trước rồi sao chép để gửi.</Dialog.Description></div>
              <Dialog.Close aria-label="Đóng"><X size={19} /></Dialog.Close>
            </div>
            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[310px_1fr]">
              <div className="space-y-3 border-b border-border p-5 lg:border-b-0 lg:border-r">
                {usedFields.map((field) => (
                  <label key={field.key} className="block text-sm font-medium">{field.label}
                    <input className={`${inputClass} mt-1`} placeholder={field.placeholder} value={values[field.key] ?? ''} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} />
                  </label>
                ))}
                <div className="pt-2 text-xs text-muted-foreground">Biến chưa điền sẽ vẫn hiện dạng <code>{'{{tenHocSinh}}'}</code> để dễ nhận biết.</div>
              </div>
              <div className="min-h-[580px] bg-white">
                <iframe title="Email đã điền" sandbox="allow-popups" srcDoc={renderedHtml} className="h-full min-h-[580px] w-full" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
              <div className="min-w-0 flex-1 truncate text-sm"><span className="text-muted-foreground">Tiêu đề: </span>{renderedSubject}</div>
              <button onClick={copySubject} className="rounded-xl border border-border px-3 py-2 text-sm">Copy tiêu đề</button>
              <button onClick={copyEmail} disabled={copying} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
                <Copy size={15} /> {copying ? 'Đang sao chép...' : 'Sao chép để gửi'}
              </button>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
