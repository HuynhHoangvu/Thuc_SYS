'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { stageApi } from './stage.api';
import { slugify } from '@/lib/utils';

export function StagesSection() {
  const queryClient = useQueryClient();
  const { data: stages, isLoading } = useQuery({ queryKey: ['stages'], queryFn: stageApi.list });

  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('#a78bfa');
  const [renameDrafts, setRenameDrafts] = useState<Record<string, string>>({});

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ['stages'] });
  }

  const createMutation = useMutation({
    mutationFn: () => stageApi.create({ key: slugify(newTitle), title: newTitle, color: newColor }),
    onSuccess: () => {
      invalidate();
      setNewTitle('');
    },
  });

  const renameMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => stageApi.update(id, { title }),
    onSuccess: invalidate,
  });

  const recolorMutation = useMutation({
    mutationFn: ({ id, color }: { id: string; color: string }) => stageApi.update(id, { color }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => stageApi.remove(id),
    onSuccess: invalidate,
  });

  const sortedStages = (stages ?? []).slice().sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-card-foreground">Giai đoạn học sinh</h2>
      </div>

      {isLoading && <p className="py-2 text-sm text-muted-foreground">Đang tải…</p>}

      <div className="flex flex-col divide-y divide-border">
        {sortedStages.map((stage) => (
          <div key={stage.id} className="flex items-center gap-3 py-2">
            <input
              type="color"
              value={stage.color ?? '#a78bfa'}
              onChange={(e) => recolorMutation.mutate({ id: stage.id, color: e.target.value })}
              className="h-7 w-7 shrink-0 cursor-pointer rounded border border-border bg-transparent p-0"
              title="Đổi màu"
            />
            <input
              value={renameDrafts[stage.id] ?? stage.title}
              onChange={(e) => setRenameDrafts((prev) => ({ ...prev, [stage.id]: e.target.value }))}
              onBlur={(e) => {
                const title = e.target.value.trim();
                if (title && title !== stage.title) renameMutation.mutate({ id: stage.id, title });
              }}
              className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="shrink-0 text-xs text-muted-foreground">{stage.key}</span>
            <button
              onClick={() => {
                if (confirm(`Xóa giai đoạn "${stage.title}"? Học sinh ở giai đoạn này sẽ được chuyển sang giai đoạn liền kề.`)) {
                  deleteMutation.mutate(stage.id);
                }
              }}
              disabled={deleteMutation.isPending}
              className="shrink-0 text-muted-foreground hover:text-red-500 disabled:opacity-50"
              title="Xóa"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="h-8 w-8 shrink-0 cursor-pointer rounded border border-border bg-transparent p-0"
        />
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && newTitle.trim() && createMutation.mutate()}
          placeholder="Tên giai đoạn mới…"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={() => createMutation.mutate()}
          disabled={!newTitle.trim() || createMutation.isPending}
          className="flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
        >
          <Plus size={16} />
          Thêm
        </button>
      </div>
      {createMutation.isError && <p className="mt-2 text-sm text-red-500">Không thể tạo giai đoạn (trùng tên?).</p>}
    </div>
  );
}
