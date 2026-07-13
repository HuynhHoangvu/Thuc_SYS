'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { checklistApi } from '@/features/checklists/checklist.api';
import type { DestinationCountry } from '@/features/students/student.types';

interface ChecklistTabProps {
  studentId: string;
  destinationCountry?: DestinationCountry;
}

const countryLabels: Record<string, string> = { USA: 'Mỹ', Canada: 'Canada', 'New Zealand': 'New Zealand' };

export function ChecklistTab({ studentId, destinationCountry }: ChecklistTabProps) {
  const queryClient = useQueryClient();
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const autoAssignedRef = useRef(new Set<string>());

  const { data: templates } = useQuery({
    queryKey: ['checklist-templates', destinationCountry],
    queryFn: () => checklistApi.listTemplates(destinationCountry),
  });

  const { data: progressList, isLoading } = useQuery({
    queryKey: ['checklist-progress', studentId],
    queryFn: () => checklistApi.getStudentProgress(studentId),
  });

  const assignMutation = useMutation({
    mutationFn: (templateId: string) => checklistApi.assignToStudent(templateId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['checklist-progress', studentId] }),
  });

  const itemMutation = useMutation({
    mutationFn: ({ progressId, itemKey, completed }: { progressId: string; itemKey: string; completed: boolean }) =>
      checklistApi.updateItemProgress(progressId, itemKey, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['checklist-progress', studentId] }),
  });

  const assignedTemplateIds = new Set((progressList ?? []).map((p) => p.template.id));

  // Checklist templates are already fetched filtered by the student's destination country,
  // so every match is the right checklist for their track — assign it automatically.
  useEffect(() => {
    if (!destinationCountry || !templates || !progressList) return;
    const matches = templates.filter((t) => !assignedTemplateIds.has(t.id));
    for (const template of matches) {
      if (autoAssignedRef.current.has(template.id)) continue;
      autoAssignedRef.current.add(template.id);
      assignMutation.mutate(template.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationCountry, templates, progressList]);

  const availableTemplates = destinationCountry ? [] : (templates ?? []).filter((t) => !assignedTemplateIds.has(t.id));

  return (
    <div className="flex flex-col gap-6">
      {availableTemplates.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Gán một checklist…</option>
            {availableTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({countryLabels[t.country] ?? t.country})
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedTemplateId && assignMutation.mutate(selectedTemplateId)}
            disabled={!selectedTemplateId || assignMutation.isPending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
          >
            Gán
          </button>
        </div>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Đang tải checklist…</p>}

      {progressList?.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground">
          {destinationCountry
            ? `Chưa có checklist nào cho ${countryLabels[destinationCountry] ?? destinationCountry}. Tạo mới trong Mẫu quy trình.`
            : 'Chọn điểm đến du học trong tab Hồ sơ để tự động gán checklist phù hợp, hoặc chọn thủ công ở trên.'}
        </p>
      )}

      {progressList?.map((progress) => {
        const doneCount = progress.items.filter((i) => i.completed).length;
        return (
          <div key={progress.id} className="rounded-lg border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-card-foreground">{progress.template.name}</h3>
              <span className="text-xs text-muted-foreground">
                Đã xong {doneCount}/{progress.items.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {progress.template.items
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                  const itemProgress = progress.items.find((i) => i.key === item.key);
                  const completed = itemProgress?.completed ?? false;
                  return (
                    <button
                      key={item.key}
                      onClick={() =>
                        itemMutation.mutate({ progressId: progress.id, itemKey: item.key, completed: !completed })
                      }
                      className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      <span
                        className={
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ' +
                          (completed ? 'border-primary bg-primary text-primary-foreground' : 'border-border')
                        }
                      >
                        {completed && <Check size={12} />}
                      </span>
                      <span className={completed ? 'text-muted-foreground line-through' : 'text-foreground'}>
                        {item.label}
                        {item.required && <span className="ml-1 text-xs text-red-500">*</span>}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
