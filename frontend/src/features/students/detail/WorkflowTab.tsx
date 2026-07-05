import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { workflowApi } from '@/features/workflow/workflow.api';
import type { DestinationCountry } from '@/features/students/student.types';

interface WorkflowTabProps {
  studentId: string;
  destinationCountry?: DestinationCountry;
}

const countryLabels: Record<string, string> = { USA: 'Mỹ', Canada: 'Canada', 'New Zealand': 'New Zealand' };

export function WorkflowTab({ studentId, destinationCountry }: WorkflowTabProps) {
  const queryClient = useQueryClient();
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const autoAssignedRef = useRef(new Set<string>());

  const { data: templates } = useQuery({
    queryKey: ['workflow-templates'],
    queryFn: workflowApi.listTemplates,
  });

  const { data: progressList, isLoading } = useQuery({
    queryKey: ['workflow-progress', studentId],
    queryFn: () => workflowApi.getStudentProgress(studentId),
  });

  const assignMutation = useMutation({
    mutationFn: (templateId: string) => workflowApi.assignToStudent(templateId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflow-progress', studentId] }),
  });

  const stepMutation = useMutation({
    mutationFn: ({ progressId, stepKey, completed }: { progressId: string; stepKey: string; completed: boolean }) =>
      workflowApi.updateStepProgress(progressId, stepKey, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflow-progress', studentId] }),
  });

  const assignedTemplateIds = new Set((progressList ?? []).map((p) => p.template._id));

  // Auto-assign any workflow template matching the student's destination country — the
  // corresponding plan should exist as soon as the country is known, no manual step needed.
  useEffect(() => {
    if (!destinationCountry || !templates || !progressList) return;
    const matches = templates.filter((t) => t.country === destinationCountry && !assignedTemplateIds.has(t._id));
    for (const template of matches) {
      if (autoAssignedRef.current.has(template._id)) continue;
      autoAssignedRef.current.add(template._id);
      assignMutation.mutate(template._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationCountry, templates, progressList]);

  const availableTemplates = (templates ?? []).filter(
    (t) => !assignedTemplateIds.has(t._id) && t.country !== destinationCountry
  );

  return (
    <div className="flex flex-col gap-6">
      {availableTemplates.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Gán thêm một quy trình…</option>
            {availableTemplates.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
                {t.country ? ` (${countryLabels[t.country] ?? t.country})` : ''}
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

      {isLoading && <p className="text-sm text-muted-foreground">Đang tải quy trình…</p>}

      {progressList?.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground">
          {destinationCountry
            ? `Chưa có mẫu quy trình nào cho ${countryLabels[destinationCountry] ?? destinationCountry}. Tạo mới trong Mẫu quy trình.`
            : 'Chọn điểm đến du học trong tab Hồ sơ để tự động gán quy trình phù hợp, hoặc chọn thủ công ở trên.'}
        </p>
      )}

      {progressList?.map((progress) => {
        const doneCount = progress.steps.filter((s) => s.completed).length;
        return (
          <div key={progress._id} className="rounded-lg border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-card-foreground">{progress.template.name}</h3>
              <span className="text-xs text-muted-foreground">
                Đã xong {doneCount}/{progress.steps.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {progress.template.steps
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((step) => {
                  const stepProgress = progress.steps.find((s) => s.key === step.key);
                  const completed = stepProgress?.completed ?? false;
                  return (
                    <button
                      key={step.key}
                      onClick={() =>
                        stepMutation.mutate({ progressId: progress._id, stepKey: step.key, completed: !completed })
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
                        {step.title}
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
