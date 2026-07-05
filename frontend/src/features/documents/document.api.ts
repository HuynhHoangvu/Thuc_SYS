import { api } from '@/lib/api';
import type { StudentDocument } from './document.types';

interface ListResponse {
  success: boolean;
  data: StudentDocument[];
}

interface ItemResponse {
  success: boolean;
  data: StudentDocument;
}

export const documentApi = {
  async listForStudent(studentId: string): Promise<StudentDocument[]> {
    const res = await api.get<ListResponse>(`/documents/students/${studentId}`);
    return res.data.data;
  },
  async upload(studentId: string, file: File, category: string): Promise<StudentDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    const res = await api.post<ItemResponse>(`/documents/students/${studentId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  },
  async rename(id: string, originalName: string): Promise<StudentDocument> {
    const res = await api.patch<ItemResponse>(`/documents/${id}`, { originalName });
    return res.data.data;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/documents/${id}`);
  },
  downloadUrl(id: string): string {
    return `/api/documents/${id}/download`;
  },
};
