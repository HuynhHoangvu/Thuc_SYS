import { useState } from 'react';
import { DndContext, PointerSensor, type DragEndEvent, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Plus, Undo2 } from 'lucide-react';
import { studentApi } from '@/features/students/student.api';
import type { Student } from '@/features/students/student.types';
import { StudentDetailModal, type StudentDetailTabKey } from '@/features/students/detail/StudentDetailModal';
import { kanbanApi } from './kanban.api';
import { KanbanColumnView } from './KanbanColumnView';
import { AddColumnModal } from './AddColumnModal';
import type { KanbanColumn } from './kanban.types';

const STUDENTS_QUERY_KEY = ['students', { search: undefined }];
const COLUMNS_QUERY_KEY = ['kanban-columns'];

export function KanbanBoardPage() {
  const queryClient = useQueryClient();
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const [undoState, setUndoState] = useState<{ studentId: string; stage: string; stageOrder: number } | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<StudentDetailTabKey | undefined>(undefined);
  const [moveError, setMoveError] = useState<string | null>(null);

  // Require a small pointer movement before a drag starts, otherwise a plain click
  // (no movement) gets swallowed by dnd-kit and never reaches the card's onClick.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function openStudent(student: Student, tab?: StudentDetailTabKey) {
    setDetailInitialTab(tab);
    setSelectedStudentId(student._id);
  }

  const { data: columns } = useQuery({
    queryKey: COLUMNS_QUERY_KEY,
    queryFn: kanbanApi.listColumns,
  });

  const { data: studentsResult } = useQuery({
    queryKey: STUDENTS_QUERY_KEY,
    queryFn: () => studentApi.list({ page: 1, limit: 100 }),
  });

  const moveMutation = useMutation({
    mutationFn: ({ studentId, stage }: { studentId: string; stage: string }) =>
      kanbanApi.moveStudent(studentId, { stage }),
    onMutate: async ({ studentId, stage }) => {
      await queryClient.cancelQueries({ queryKey: STUDENTS_QUERY_KEY });
      const previous = queryClient.getQueryData<Awaited<ReturnType<typeof studentApi.list>>>(STUDENTS_QUERY_KEY);
      queryClient.setQueryData(STUDENTS_QUERY_KEY, (old: typeof previous) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((s) => (s._id === studentId ? { ...s, stage } : s)),
        };
      });
      return { previous };
    },
    onError: (err: unknown, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(STUDENTS_QUERY_KEY, context.previous);
      }
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Không thể di chuyển học sinh — thẻ đã được khôi phục, không mất dữ liệu.';
      setMoveError(message);
    },
    onSuccess: (result, { studentId }) => {
      setMoveError(null);
      setUndoState({ studentId, stage: result.previousStage, stageOrder: result.previousStageOrder });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });

  const reorderColumnsMutation = useMutation({
    mutationFn: (payload: Array<{ id: string; order: number }>) => kanbanApi.reorderColumns(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: COLUMNS_QUERY_KEY });
      const previous = queryClient.getQueryData<KanbanColumn[]>(COLUMNS_QUERY_KEY);
      queryClient.setQueryData<KanbanColumn[]>(COLUMNS_QUERY_KEY, (old) => {
        if (!old) return old;
        const orderMap = new Map(payload.map((p) => [p.id, p.order]));
        return old.map((c) => (orderMap.has(c._id) ? { ...c, order: orderMap.get(c._id)! } : c));
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(COLUMNS_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: COLUMNS_QUERY_KEY }),
  });

  const deleteColumnMutation = useMutation({
    mutationFn: (id: string) => kanbanApi.deleteColumn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLUMNS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Không thể xóa cột.';
      alert(message);
    },
  });

  const sortedColumns = (columns ?? []).slice().sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === 'column') {
      if (active.id === over.id) return;
      const oldIndex = sortedColumns.findIndex((c) => c._id === active.id);
      const newIndex = sortedColumns.findIndex((c) => c._id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const reordered = arrayMove(sortedColumns, oldIndex, newIndex);
      reorderColumnsMutation.mutate(reordered.map((c, index) => ({ id: c._id, order: index })));
      return;
    }

    const studentId = String(active.id);
    const overId = String(over.id);
    // `over.id` may resolve to a column's droppable key (card drop-zone) or its
    // sortable _id (the column's own draggable wrapper) — always resolve to the
    // column's key so we never write a raw ObjectId into student.stage.
    const targetColumn = sortedColumns.find((c) => c.key === overId || c._id === overId);
    const student = studentsResult?.data.find((s) => s._id === studentId);
    if (!targetColumn || !student || student.stage === targetColumn.key) return;
    moveMutation.mutate({ studentId, stage: targetColumn.key });
  }

  function handleUndo() {
    if (!undoState) return;
    moveMutation.mutate({ studentId: undoState.studentId, stage: undoState.stage });
    setUndoState(null);
  }

  function handleDeleteColumn(column: KanbanColumn) {
    if (sortedColumns.length <= 1) return;
    const hasStudents = (studentsByStage.get(column.key) ?? []).length > 0;
    const message = hasStudents
      ? `Xóa cột "${column.title}"? Học sinh trong cột này sẽ được chuyển sang cột kế bên.`
      : `Xóa cột "${column.title}"?`;
    if (confirm(message)) {
      deleteColumnMutation.mutate(column._id);
    }
  }

  const studentsByStage = new Map<string, Student[]>();
  for (const student of studentsResult?.data ?? []) {
    const list = studentsByStage.get(student.stage) ?? [];
    list.push(student);
    studentsByStage.set(student.stage, list);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Bảng Kanban</h1>
        <button
          onClick={() => setIsAddColumnOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75"
        >
          <Plus size={16} />
          Thêm cột
        </button>
      </div>

      {moveError && (
        <div className="mb-4 flex items-center justify-between rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          <span className="flex items-center gap-2">
            <AlertTriangle size={14} />
            {moveError}
          </span>
          <button onClick={() => setMoveError(null)} className="font-medium hover:underline">
            Đóng
          </button>
        </div>
      )}

      {undoState && (
        <div className="mb-4 flex items-center justify-between rounded-md border border-border bg-muted px-4 py-2 text-sm">
          <span className="text-muted-foreground">Đã di chuyển học sinh.</span>
          <button onClick={handleUndo} className="flex items-center gap-1 font-medium text-primary hover:underline">
            <Undo2 size={14} />
            Hoàn tác
          </button>
        </div>
      )}

      <AddColumnModal open={isAddColumnOpen} onOpenChange={setIsAddColumnOpen} />
      <StudentDetailModal
        studentId={selectedStudentId}
        initialTab={detailInitialTab}
        onOpenChange={(open) => !open && setSelectedStudentId(null)}
      />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedColumns.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {sortedColumns.map((column) => (
              <KanbanColumnView
                key={column._id}
                column={column}
                students={studentsByStage.get(column.key) ?? []}
                canDelete={sortedColumns.length > 1}
                onCardClick={(student) => openStudent(student)}
                onTodoBadgeClick={(student) => openStudent(student, 'notes')}
                onDeleteColumn={handleDeleteColumn}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
