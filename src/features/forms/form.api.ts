import { api } from '@/lib/api';
import type { FormSubmission, FormTemplate } from './form.types';

interface ListTemplatesResponse {
  success: boolean;
  data: FormTemplate[];
}

interface SubmissionsResponse {
  success: boolean;
  data: FormSubmission[];
}

interface SubmissionResponse {
  success: boolean;
  data: FormSubmission;
}

interface CreateFormTemplateInput {
  name: string;
  country?: 'USA' | 'Canada' | 'New Zealand';
  fields: Array<{ key: string; label: string; type: FormTemplate['fields'][number]['type']; required?: boolean; order: number }>;
}

export const formApi = {
  async listTemplates(): Promise<FormTemplate[]> {
    const res = await api.get<ListTemplatesResponse>('/forms');
    return res.data.data;
  },
  async createTemplate(input: CreateFormTemplateInput): Promise<FormTemplate> {
    const res = await api.post<{ success: boolean; data: FormTemplate }>('/forms', input);
    return res.data.data;
  },
  async getStudentSubmissions(studentId: string): Promise<FormSubmission[]> {
    const res = await api.get<SubmissionsResponse>(`/forms/students/${studentId}/submissions`);
    return res.data.data;
  },
  async submit(templateId: string, studentId: string, values: Record<string, unknown>): Promise<FormSubmission> {
    const res = await api.put<SubmissionResponse>(`/forms/${templateId}/submissions/${studentId}`, { values });
    return res.data.data;
  },
};
