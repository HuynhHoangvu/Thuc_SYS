import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Student } from '@/features/students/student.types';
import type { KanbanColumn } from './kanban.types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnViewProps {
  column: KanbanColumn;
  students: Student[];
  canDelete: boolean;
  onCardClick: (student: Student) => void;
  onTodoBadgeClick: (student: Student) => void;
  onDeleteColumn: (column: KanbanColumn) => void;
}

export function KanbanColumnView({
  column,
  students,
  canDelete,
  onCardClick,
  onTodoBadgeClick,
  onDeleteColumn,
}: KanbanColumnViewProps) {
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: column.key });
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { type: 'column' } });

  return (
    <div
      ref={setSortableRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-card p-3"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
            title="Kéo để sắp xếp lại"
          >
            <GripVertical size={14} />
          </button>
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: column.color }} />
          <span className="text-sm font-semibold text-card-foreground">{column.title}</span>
          <span className="text-xs text-muted-foreground">{students.length}</span>
        </div>
        <button
          onClick={() => canDelete && onDeleteColumn(column)}
          disabled={!canDelete}
          className="text-muted-foreground transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-muted-foreground"
          title={canDelete ? 'Xóa cột' : 'Không thể xóa cột cuối cùng'}
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div
        ref={setDropRef}
        className="flex min-h-16 flex-col gap-2"
        style={{ outline: isOver ? '2px solid var(--ring)' : undefined }}
      >
        {students.map((student) => (
          <KanbanCard
            key={student._id}
            student={student}
            onClick={() => onCardClick(student)}
            onTodoBadgeClick={() => onTodoBadgeClick(student)}
          />
        ))}
      </div>
    </div>
  );
}
