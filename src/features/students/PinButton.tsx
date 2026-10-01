'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { studentApi } from './student.api';
import { cn } from '@/lib/utils';

// Star toggle: pinned students stay at the top of the list (students needing attention).
export function PinButton({ studentId, pinned }: { studentId: string; pinned: boolean }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (next: boolean) => studentApi.update(studentId, { pinned: next }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
    },
  });
  // Show the target state immediately while the request runs.
  const shown = mutation.isPending ? Boolean(mutation.variables) : pinned;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        mutation.mutate(!pinned);
      }}
      disabled={mutation.isPending}
      title={shown ? 'Bỏ ghim' : 'Ghim lên đầu danh sách'}
      aria-pressed={shown}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md p-1 transition-colors hover:bg-muted',
        shown ? 'text-amber-500' : 'text-muted-foreground/50 hover:text-amber-500'
      )}
    >
      <Star size={17} fill={shown ? 'currentColor' : 'none'} />
    </button>
  );
}
