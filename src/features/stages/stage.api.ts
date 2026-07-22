import { api } from '@/lib/api';
import type { Stage, StageTemplateType } from './stage.types';

interface ListResponse {
  success: boolean;
  data: Stage[];
}

interface ItemResponse {
  success: boolean;
  data: Stage;
}

export const stageApi = {
  async list(type: StageTemplateType = 'student'): Promise<Stage[]> {
    const res = await api.get<ListResponse>('/stages', { params: { type } });
    return res.data.data;
  },
  async create(input: { key: string; title: string; color?: string; type?: StageTemplateType }): Promise<Stage> {
    const res = await api.post<ItemResponse>('/stages', input);
    return res.data.data;
  },
  async update(id: string, input: { title?: string; color?: string }): Promise<Stage> {
    const res = await api.put<ItemResponse>(`/stages/${id}`, input);
    return res.data.data;
  },
  async remove(id: string): Promise<{ movedStudentsTo: string }> {
    const res = await api.delete<{ success: boolean; data: { movedStudentsTo: string } }>(`/stages/${id}`);
    return res.data.data;
  },
  async reorder(stages: Array<{ id: string; order: number }>): Promise<Stage[]> {
    const res = await api.put<ListResponse>('/stages/reorder', { stages });
    return res.data.data;
  },
};
