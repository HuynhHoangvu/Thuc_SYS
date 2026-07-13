'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formApi } from '@/features/forms/form.api';
import type { FormField, FormTemplate } from '@/features/forms/form.types';

interface FormsTabProps {
  studentId: string;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';

  if (field.type === 'textarea') {
    return (
      <textarea
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className={inputClass}
      />
    );
  }
  if (field.type === 'select') {
    return (
      <select value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        <option value="">—</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === 'checkbox') {
    return (
      <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
    );
  }
  return (
    <input
      type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

function TemplateForm({ template, studentId }: { template: FormTemplate; studentId: string }) {
  const queryClient = useQueryClient();
  const { data: submissions } = useQuery({
    queryKey: ['form-submissions', studentId],
    queryFn: () => formApi.getStudentSubmissions(studentId),
  });

  const existing = submissions?.find((s) => s.template.id === template.id);
  const [values, setValues] = useState<Record<string, unknown>>(existing?.values ?? {});

  useEffect(() => {
    if (existing) setValues(existing.values);
  }, [existing]);

  const submitMutation = useMutation({
    mutationFn: () => formApi.submit(template.id, studentId, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['form-submissions', studentId] }),
  });

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <h3 className="mb-3 text-sm font-semibold text-card-foreground">{template.name}</h3>
      <div className="flex flex-col gap-3">
        {template.fields
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((field) => (
            <div key={field.key}>
              <label className="mb-1 block text-sm font-medium text-card-foreground">
                {field.label}
                {field.required && <span className="ml-1 text-xs text-red-500">*</span>}
              </label>
              <FieldInput
                field={field}
                value={values[field.key]}
                onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
              />
            </div>
          ))}
      </div>
      {submitMutation.isError && <p className="mt-2 text-sm text-red-500">Không thể lưu.</p>}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => submitMutation.mutate()}
          disabled={submitMutation.isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
        >
          {submitMutation.isPending ? 'Đang lưu…' : 'Lưu biểu mẫu'}
        </button>
      </div>
    </div>
  );
}

export function FormsTab({ studentId }: FormsTabProps) {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['form-templates'],
    queryFn: formApi.listTemplates,
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Đang tải biểu mẫu…</p>;
  if (!templates || templates.length === 0) {
    return <p className="text-sm text-muted-foreground">Chưa có mẫu biểu mẫu nào.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {templates.map((template) => (
        <TemplateForm key={template.id} template={template} studentId={studentId} />
      ))}
    </div>
  );
}
