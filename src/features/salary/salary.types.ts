export interface BonusItem {
  id: string;
  label: string;
  amount: number;
}

export interface SalaryConfig {
  _id?: string;
  baseSalary: number;
  bonusItems: BonusItem[];
}

export interface SalaryEntry {
  _id: string;
  monthKey: string;
  label: string;
  amount: number;
  personName?: string;
  createdAt: string;
}
