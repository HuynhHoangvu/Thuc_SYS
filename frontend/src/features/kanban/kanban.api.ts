import { api } from '@/lib/api';
import type { KanbanColumn, MoveStudentInput, MoveStudentResult } from './kanban.types';

interface ListResponse {
  success: boolean;
  data: KanbanColumn[];
}

interface MoveResponse {
  success: boolean;
  data: MoveStudentResult;
}

interface ColumnResponse {
  success: boolean;
  data: KanbanColumn;
}

export const kanbanApi = {
  async listColumns(): Promise<KanbanColumn[]> {
    const res = await api.get<ListResponse>('/kanban/columns');
    return res.data.data;
  },
  async createColumn(input: { key: string; title: string; color?: string }): Promise<KanbanColumn> {
    const res = await api.post<ColumnResponse>('/kanban/columns', input);
    return res.data.data;
  },
  async reorderColumns(columns: Array<{ id: string; order: number }>): Promise<KanbanColumn[]> {
    const res = await api.put<ListResponse>('/kanban/columns/reorder', { columns });
    return res.data.data;
  },
  async deleteColumn(id: string): Promise<{ movedStudentsTo: string }> {
    const res = await api.delete<{ success: boolean; data: { movedStudentsTo: string } }>(`/kanban/columns/${id}`);
    return res.data.data;
  },
  async moveStudent(studentId: string, input: MoveStudentInput): Promise<MoveStudentResult> {
    const res = await api.patch<MoveResponse>(`/kanban/students/${studentId}/move`, input);
    return res.data.data;
  },
};
