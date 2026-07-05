import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Plus, Trash2 } from 'lucide-react';
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

  function syncStudent(updated: Student) {
    queryClient.invalidateQueries({ queryKey: ['students'] });
    queryClient.setQueryData(['student', student._id], updated);
  }

  const addTodoMutation = useMutation({
    mutationFn: (text: string) => studentApi.addTodo(student._id, text),
    onSuccess: syncStudent,
  });

  const toggleTodoMutation = useMutation({
    mutationFn: ({ todoId, done }: { todoId: string; done: boolean }) =>
      studentApi.updateTodo(student._id, todoId, done),
    onSuccess: syncStudent,
  });

  const removeTodoMutation = useMutation({
    mutationFn: (todoId: string) => studentApi.removeTodo(student._id, todoId),
    onSuccess: syncStudent,
  });

  const saveNotesMutation = useMutation({
    mutationFn: () => studentApi.update(student._id, { notes }),
    onSuccess: syncStudent,
  });

  function handleAddTodo() {
    const text = newTodoText.trim();
    if (!text) return;
    addTodoMutation.mutate(text);
    setNewTodoText('');
  }

  const todos = student.todos ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-card-foreground">Việc cần làm</label>
        <div className="mb-3 flex items-center gap-2">
          <input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Thêm việc cần làm…"
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
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
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm"
              >
                <button
                  onClick={() => toggleTodoMutation.mutate({ todoId: todo._id, done: !todo.done })}
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
                <button
                  onClick={() => removeTodoMutation.mutate(todo._id)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
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
