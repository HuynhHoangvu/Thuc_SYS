'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { travelerApi } from '../traveler.api';
import type { Traveler } from '../traveler.types';

interface NotesTabProps {
  traveler: Traveler;
}

export function NotesTab({ traveler }: NotesTabProps) {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState(traveler.notes ?? '');

  const saveNotesMutation = useMutation({
    mutationFn: () => travelerApi.update(traveler.id, { notes }),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['travelers'] });
      queryClient.setQueryData(['traveler', traveler.id], updated);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-card-foreground">Ghi chú</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Ghi chú, bối cảnh, thông tin khác…"
        className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {saveNotesMutation.isError && <p className="text-sm text-red-500">Không thể lưu ghi chú.</p>}
      <div className="flex justify-end">
        <button
          onClick={() => saveNotesMutation.mutate()}
          disabled={saveNotesMutation.isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
        >
          {saveNotesMutation.isPending ? 'Đang lưu…' : 'Lưu ghi chú'}
        </button>
      </div>
    </div>
  );
}
