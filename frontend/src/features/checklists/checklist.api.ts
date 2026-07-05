import { api } from '@/lib/api';
import type { ChecklistProgress, ChecklistTemplate } from './checklist.types';

interface ListTemplatesResponse {
  success: boolean;
  data: ChecklistTemplate[];
}

interface ProgressListResponse {
  success: boolean;
  data: ChecklistProgress[];
}

interface ProgressResponse {
  success: boolean;
  data: ChecklistProgress;
}

interface CreateChecklistInput {
  name: string;
  country: 'USA' | 'Canada' | 'New Zealand';
  items: Array<{ key: string; label: string; required?: boolean; order: number }>;
}

export const checklistApi = {
  async listTemplates(country?: string): Promise<ChecklistTemplate[]> {
    const res = await api.get<ListTemplatesResponse>('/checklists', { params: country ? { country } : undefined });
    return res.data.data;
  },
  async createTemplate(input: CreateChecklistInput): Promise<ChecklistTemplate> {
    const res = await api.post<{ success: boolean; data: ChecklistTemplate }>('/checklists', input);
    return res.data.data;
  },
  async getStudentProgress(studentId: string): Promise<ChecklistProgress[]> {
    const res = await api.get<ProgressListResponse>(`/checklists/students/${studentId}/progress`);
    return res.data.data;
  },
  async assignToStudent(templateId: string, studentId: string): Promise<ChecklistProgress> {
    const res = await api.post<ProgressResponse>(`/checklists/${templateId}/assign/${studentId}`);
    return res.data.data;
  },
  async updateItemProgress(progressId: string, itemKey: string, completed: boolean): Promise<ChecklistProgress> {
    const res = await api.patch<ProgressResponse>(`/checklists/progress/${progressId}/items/${itemKey}`, { completed });
    return res.data.data;
  },
};
