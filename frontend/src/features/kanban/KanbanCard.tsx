import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { AlertCircle } from 'lucide-react';
import type { Student } from '@/features/students/student.types';

interface KanbanCardProps {
  student: Student;
  onClick: () => void;
  onTodoBadgeClick: () => void;
}

const countryLabels: Record<string, string> = { USA: 'Mỹ', Canada: 'Canada', 'New Zealand': 'New Zealand' };

export function KanbanCard({ student, onClick, onTodoBadgeClick }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: student._id,
    data: { type: 'student' },
  });

  const hasOpenTodos = (student.todos ?? []).some((t) => !t.done);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      style={{ transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : 1 }}
      className="cursor-grab rounded-md border border-border bg-background p-3 text-sm shadow-sm active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-medium text-foreground">{student.personal.fullName}</div>
        {hasOpenTodos && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTodoBadgeClick();
            }}
            title="Có việc cần làm chưa hoàn thành"
            className="shrink-0 text-red-500 hover:text-red-600"
          >
            <AlertCircle size={16} />
          </button>
        )}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{student.personal.email}</div>
      {student.studyAbroad?.destinationCountry && (
        <div className="mt-2 inline-block rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
          {countryLabels[student.studyAbroad.destinationCountry] ?? student.studyAbroad.destinationCountry}
        </div>
      )}
    </div>
  );
}
