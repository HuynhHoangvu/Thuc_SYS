import { api } from '@/lib/api';
import type { WorkflowProgress, WorkflowTemplate } from './workflow.types';

interface ListTemplatesResponse {
  success: boolean;
  data: WorkflowTemplate[];
}

interface ProgressListResponse {
  success: boolean;
  data: WorkflowProgress[];
}

interface ProgressResponse {
  success: boolean;
  data: WorkflowProgress;
}

interface CreateTemplateInput {
  name: string;
  country?: 'USA' | 'Canada' | 'New Zealand';
  description?: string;
  steps: Array<{ key: string; title: string; description?: string; order: number; stage?: string }>;
}

export const workflowApi = {
  async listTemplates(): Promise<WorkflowTemplate[]> {
    const res = await api.get<ListTemplatesResponse>('/workflows');
    return res.data.data;
  },
  async createTemplate(input: CreateTemplateInput): Promise<WorkflowTemplate> {
    const res = await api.post<{ success: boolean; data: WorkflowTemplate }>('/workflows', input);
    return res.data.data;
  },
  async getStudentProgress(studentId: string): Promise<WorkflowProgress[]> {
    const res = await api.get<ProgressListResponse>(`/workflows/students/${studentId}/progress`);
    return res.data.data;
  },
  async assignToStudent(templateId: string, studentId: string): Promise<WorkflowProgress> {
    const res = await api.post<ProgressResponse>(`/workflows/${templateId}/assign/${studentId}`);
    return res.data.data;
  },
  async updateStepProgress(progressId: string, stepKey: string, completed: boolean): Promise<WorkflowProgress> {
    const res = await api.patch<ProgressResponse>(`/workflows/progress/${progressId}/steps/${stepKey}`, { completed });
    return res.data.data;
  },
};
