'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarDays, Check, Plus, Trash2 } from 'lucide-react';
import { studentApi } from '../student.api';
import type { Student } from '../student.types';
import { cn } from '@/lib/utils';

interface NotesTabProps {
  student: Student;
}

export function NotesTab({ student }: NotesTabProps) {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState(student.notes ?? '');
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');

  function syncStudent(updated: Student) {
    queryClient.invalidateQueries({ queryKey: ['students'] });
    queryClient.setQueryData(['student', student.id], updated);
  }

  const addTodoMutation = useMutation({
    mutationFn: ({ text, dueDate }: { text: string; dueDate?: string }) => studentApi.addTodo(student.id, text, dueDate),
    onSuccess: syncStudent,
  });

  const toggleTodoMutation = useMutation({
    mutationFn: ({ todoId, done }: { todoId: string; done: boolean }) =>
      studentApi.updateTodo(student.id, todoId, done),
    onSuccess: syncStudent,
  });

  const dueDateMutation = useMutation({
    mutationFn: ({ todoId, dueDate }: { todoId: string; dueDate?: string }) =>
      studentApi.updateTodoDueDate(student.id, todoId, dueDate),
    onSuccess: syncStudent,
  });

  const removeTodoMutation = useMutation({
    mutationFn: (todoId: string) => studentApi.removeTodo(student.id, todoId),
    onSuccess: syncStudent,
  });

  const saveNotesMutation = useMutation({
    mutationFn: () => studentApi.update(student.id, { notes }),
    onSuccess: syncStudent,
  });

  function handleAddTodo() {
    const text = newTodoText.trim();
    if (!text) return;
    addTodoMutation.mutate({ text, dueDate: newTodoDueDate || undefined });
    setNewTodoText('');
    setNewTodoDueDate('');
  }

  const todos = [...(student.todos ?? [])].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
    if (a.dueDate !== b.dueDate) return a.dueDate ? -1 : 1;
    return a.createdAt.localeCompare(b.createdAt);
  });

  function dueDays(dueDate?: string) {
    if (!dueDate) return null;
    const [year, month, day] = dueDate.split('-').map(Number);
    const target = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / 86_400_000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-card-foreground">Việc cần làm</label>
        <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_165px_auto]">
          <input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Thêm việc cần làm…"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <label className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
            <input
              type="date"
              aria-label="Ngày đến hạn"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            onClick={handleAddTodo}
            disabled={!newTodoText.trim() || addTodoMutation.isPending}
            className="flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
          >
            <Plus size={16} />
            Thêm
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-sm text-muted-foreground">Chưa có việc cần làm nào.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {todos.map((todo) => {
              const days = todo.done ? null : dueDays(todo.dueDate);
              const isDue = days !== null && days <= 0;
              const isTomorrow = days === 1;
              return (
              <div
                key={todo.id}
                className={cn(
                  'flex flex-wrap items-center gap-3 rounded-md border px-3 py-2 text-sm',
                  isDue ? 'border-red-300 bg-red-50' : isTomorrow ? 'border-amber-300 bg-amber-50' : 'border-border'
                )}
              >
                <button
                  onClick={() => toggleTodoMutation.mutate({ todoId: todo.id, done: !todo.done })}
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                    todo.done ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                  )}
                >
                  {todo.done && <Check size={12} />}
                </button>
                <span className={cn('flex-1', todo.done ? 'text-muted-foreground line-through' : 'text-foreground')}>
                  {todo.text}
                </span>
                <input
                  type="date"
                  aria-label={`Ngày đến hạn của ${todo.text}`}
                  value={todo.dueDate ?? ''}
                  onChange={(event) => dueDateMutation.mutate({ todoId: todo.id, dueDate: event.target.value || undefined })}
                  className={cn(
                    'rounded-md border bg-background px-2 py-1 text-xs outline-none',
                    isDue ? 'border-red-300 text-red-700' : isTomorrow ? 'border-amber-300 text-amber-700' : 'border-border text-muted-foreground'
                  )}
                />
                {!todo.done && isDue && <span className="text-xs font-semibold text-red-600">{days === 0 ? 'Đến hạn hôm nay' : `Quá hạn ${Math.abs(days)} ngày`}</span>}
                {!todo.done && isTomorrow && <span className="text-xs font-semibold text-amber-600">Còn 1 ngày</span>}
                <button
                  onClick={() => removeTodoMutation.mutate(todo.id)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-card-foreground">Ghi chú thêm</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
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
    </div>
  );
}
