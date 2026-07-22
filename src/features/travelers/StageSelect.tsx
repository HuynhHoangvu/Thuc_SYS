'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { travelerApi } from './traveler.api';
import { stageApi } from '@/features/stages/stage.api';

interface StageSelectProps {
  travelerId: string;
  stage: string;
}

export function StageSelect({ travelerId, stage }: StageSelectProps) {
  const queryClient = useQueryClient();

  const { data: stages } = useQuery({ queryKey: ['stages', 'travel'], queryFn: () => stageApi.list('travel') });

  const moveMutation = useMutation({
    mutationFn: (newStage: string) => travelerApi.update(travelerId, { stage: newStage }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travelers'] });
    },
  });

  const sortedStages = (stages ?? []).slice().sort((a, b) => a.order - b.order);

  return (
    <select
      value={stage}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => moveMutation.mutate(e.target.value)}
      disabled={moveMutation.isPending}
      className="rounded-full border-0 bg-secondary px-2 py-1 text-xs font-medium capitalize text-secondary-foreground outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
    >
      {!sortedStages.some((s) => s.key === stage) && (
        <option value={stage} className="capitalize">
          {stage}
        </option>
      )}
      {sortedStages.map((s) => (
        <option key={s.key} value={s.key}>
          {s.title}
        </option>
      ))}
    </select>
  );
}
