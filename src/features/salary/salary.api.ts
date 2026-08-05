import { api } from '@/lib/api';
import type { BonusItem, SalaryConfig, SalaryEntry } from './salary.types';

interface ItemResponse<T> {
  success: boolean;
  data: T;
}

export const salaryApi = {
  async getConfig(): Promise<SalaryConfig> {
    const res = await api.get<ItemResponse<SalaryConfig>>('/salary/config');
    return res.data.data;
  },
  async updateConfig(baseSalary: number, bonusItems: BonusItem[]): Promise<SalaryConfig> {
    const res = await api.put<ItemResponse<SalaryConfig>>('/salary/config', { baseSalary, bonusItems });
    return res.data.data;
  },
  async listEntries(monthKey: string): Promise<SalaryEntry[]> {
    const res = await api.get<ItemResponse<SalaryEntry[]>>('/salary/entries', { params: { month: monthKey } });
    return res.data.data;
  },
  async addEntry(monthKey: string, label: string, amount: number, personName?: string): Promise<SalaryEntry> {
    const res = await api.post<ItemResponse<SalaryEntry>>('/salary/entries', {
      monthKey,
      label,
      amount,
      personName: personName?.trim() || undefined,
    });
    return res.data.data;
  },
  async removeEntry(id: string): Promise<void> {
    await api.delete(`/salary/entries/${id}`);
  },
};
