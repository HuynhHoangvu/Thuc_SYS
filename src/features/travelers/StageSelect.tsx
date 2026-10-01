'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { travelerApi } from './traveler.api';
import { stageApi } from '@/features/stages/stage.api';
import { StagePicker } from '@/features/stages/StagePicker';

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

  return (
    <StagePicker
      stages={stages ?? []}
      value={stage}
      onChange={(key) => moveMutation.mutate(key)}
      disabled={moveMutation.isPending}
    />
  );
}
