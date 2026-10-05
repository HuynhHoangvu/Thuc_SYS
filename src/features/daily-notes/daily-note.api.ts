import { api } from '@/lib/api';
import type { DailyNote } from './daily-note.types';

interface Response<T> { success: boolean; data: T }

export const dailyNoteApi = {
  async list(from?: string, to?: string): Promise<DailyNote[]> {
    const res = await api.get<Response<DailyNote[]>>('/daily-notes', { params: { from: from || undefined, to: to || undefined } });
    return res.data.data;
  },
  async save(date: string, content: string): Promise<DailyNote> {
    const res = await api.put<Response<DailyNote>>('/daily-notes', { date, content });
    return res.data.data;
  },
  async remove(date: string): Promise<void> {
    await api.delete(`/daily-notes/${date}`);
  },
};
