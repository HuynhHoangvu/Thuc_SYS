'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studentApi } from './student.api';
import { stageApi } from '@/features/stages/stage.api';
import { StagePicker } from '@/features/stages/StagePicker';
import { presetAppliesTo } from '@/lib/notifications/templates';
import { ProgressEmailModal } from '@/features/notifications/ProgressEmailModal';

interface StageSelectProps {
  studentId: string;
  stage: string;
  country?: string;
  className?: string;
}

export function StageSelect({ studentId, stage, country, className }: StageSelectProps) {
  const queryClient = useQueryClient();
  const [emailStage, setEmailStage] = useState<string | null>(null);

  const { data: stages } = useQuery({ queryKey: ['stages', 'student'], queryFn: () => stageApi.list('student') });

  const moveMutation = useMutation({
    mutationFn: (newStage: string) => studentApi.update(studentId, { stage: newStage }),
    onSuccess: (_data, newStage) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
      // Only moving forward triggers a customer email; moving back is a correction.
      const from = stages?.find((s) => s.key === stage);
      const to = stages?.find((s) => s.key === newStage);
      const applies = presetAppliesTo(to?.emailTemplate?.presetKey, country);
      if (to?.emailTemplate?.enabled && applies && (!from || to.order > from.order)) setEmailStage(newStage);
    },
  });

  return (
    <>
      <StagePicker
        stages={stages ?? []}
        value={stage}
        onChange={(key) => moveMutation.mutate(key)}
        disabled={moveMutation.isPending}
        className={className}
      />
      {/* React events from the portal bubble to the clickable table row; stop them here. */}
      <span onClick={(e) => e.stopPropagation()} className="contents">
        <ProgressEmailModal
          studentId={emailStage ? studentId : null}
          stageKey={emailStage}
          onClose={() => setEmailStage(null)}
        />
      </span>
    </>
  );
}
