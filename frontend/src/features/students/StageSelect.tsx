import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '@/features/kanban/kanban.api';

interface StageSelectProps {
  studentId: string;
  stage: string;
}

export function StageSelect({ studentId, stage }: StageSelectProps) {
  const queryClient = useQueryClient();

  const { data: columns } = useQuery({
    queryKey: ['kanban-columns'],
    queryFn: kanbanApi.listColumns,
  });

  const moveMutation = useMutation({
    mutationFn: (newStage: string) => kanbanApi.moveStudent(studentId, { stage: newStage }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });

  const sortedColumns = (columns ?? []).slice().sort((a, b) => a.order - b.order);

  return (
    <select
      value={stage}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => moveMutation.mutate(e.target.value)}
      disabled={moveMutation.isPending}
      className="rounded-full border-0 bg-secondary px-2 py-1 text-xs font-medium capitalize text-secondary-foreground outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
    >
      {!sortedColumns.some((c) => c.key === stage) && (
        <option value={stage} className="capitalize">
          {stage}
        </option>
      )}
      {sortedColumns.map((column) => (
        <option key={column._id} value={column.key}>
          {column.title}
        </option>
      ))}
    </select>
  );
}
