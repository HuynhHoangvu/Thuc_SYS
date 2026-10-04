import { api } from '@/lib/api';
import type { EmailTemplate, EmailTemplateInput } from './email-template.types';

interface Response<T> {
  success: boolean;
  data: T;
}

export const emailTemplateApi = {
  async list(): Promise<EmailTemplate[]> {
    const res = await api.get<Response<EmailTemplate[]>>('/email-templates');
    return res.data.data;
  },
  async create(input: EmailTemplateInput): Promise<EmailTemplate> {
    const res = await api.post<Response<EmailTemplate>>('/email-templates', input);
    return res.data.data;
  },
  async update(id: string, input: EmailTemplateInput): Promise<EmailTemplate> {
    const res = await api.put<Response<EmailTemplate>>(`/email-templates/${id}`, input);
    return res.data.data;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/email-templates/${id}`);
  },
};
