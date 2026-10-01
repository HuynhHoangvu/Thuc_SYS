'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { stageApi } from '@/features/stages/stage.api';
import { ProgressEmailModal } from './ProgressEmailModal';
import { cn } from '@/lib/utils';
import { presetAppliesTo } from '@/lib/notifications/templates';

// Opens the progress-email popup for the student's current stage, e.g. after closing it by mistake.
export function SendEmailButton({
  studentId,
  stage,
  country,
  className,
}: {
  studentId: string;
  stage: string;
  country?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { data: stages } = useQuery({ queryKey: ['stages', 'student'], queryFn: () => stageApi.list('student') });
  const template = stages?.find((s) => s.key === stage)?.emailTemplate;
  // Interview phases have no email for Canada / NZ students.
  const hasTemplate = Boolean(template) && presetAppliesTo(template?.presetKey, country);

  return (
    // React events from the modal portal bubble to the clickable table row; stop them here.
    <span onClick={(e) => e.stopPropagation()} className="contents">
      <button
        onClick={() => setOpen(true)}
        disabled={!hasTemplate}
        title={hasTemplate ? 'Soạn mail cập nhật' : 'Giai đoạn này chưa có mẫu mail'}
        className={cn(
          'inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground',
          className
        )}
      >
        <Mail size={16} />
      </button>
      <ProgressEmailModal studentId={open ? studentId : null} stageKey={open ? stage : null} onClose={() => setOpen(false)} />
    </span>
  );
}
