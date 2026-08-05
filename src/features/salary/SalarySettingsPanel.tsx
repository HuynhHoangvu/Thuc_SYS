'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { BonusItem, SalaryConfig } from './salary.types';

interface SalarySettingsPanelProps {
  config: SalaryConfig;
  onSave: (baseSalary: number, bonusItems: BonusItem[]) => void;
  onClose: () => void;
  isSaving: boolean;
}

export function SalarySettingsPanel({ config, onSave, onClose, isSaving }: SalarySettingsPanelProps) {
  const [baseSalary, setBaseSalary] = useState(config.baseSalary);
  const [bonusItems, setBonusItems] = useState<BonusItem[]>(config.bonusItems);
  const [newLabel, setNewLabel] = useState('');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    setBaseSalary(config.baseSalary);
    setBonusItems(config.bonusItems);
  }, [config]);

  function updateBonusItem(id: string, patch: Partial<BonusItem>) {
    setBonusItems((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeBonusItem(id: string) {
    setBonusItems((items) => items.filter((item) => item.id !== id));
  }

  function addBonusItem() {
    if (!newLabel.trim() || !newAmount) return;
    setBonusItems((items) => [...items, { id: crypto.randomUUID(), label: newLabel.trim(), amount: Number(newAmount) || 0 }]);
    setNewLabel('');
    setNewAmount('');
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">Cài đặt lương</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
      </div>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-card-foreground">Lương cơ bản (VNĐ)</label>
        <input
          type="number"
          value={baseSalary}
          onChange={(e) => setBaseSalary(Number(e.target.value) || 0)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring sm:max-w-xs"
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-card-foreground">Các mục cộng thưởng</h3>
        <div className="flex flex-col gap-2">
          {bonusItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={item.label}
                onChange={(e) => updateBonusItem(item.id, { label: e.target.value })}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="number"
                value={item.amount}
                onChange={(e) => updateBonusItem(item.id, { amount: Number(e.target.value) || 0 })}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-36"
              />
              <button
                onClick={() => removeBonusItem(item.id)}
                className="self-end rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-red-500 sm:self-auto"
                title="Xóa mục"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {bonusItems.length === 0 && <p className="text-sm text-muted-foreground">Chưa có mục cộng thưởng nào.</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center">
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Tên mục mới (VD: Đậu hồ sơ định cư)"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          placeholder="Số tiền"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-36"
        />
        <button
          onClick={addBonusItem}
          className="flex items-center justify-center gap-1 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          <Plus size={16} />
          Thêm
        </button>
      </div>

      <div className="mt-4 flex justify-end border-t border-border pt-4">
        <button
          onClick={() => onSave(baseSalary, bonusItems)}
          disabled={isSaving}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 active:brightness-75 disabled:opacity-50"
        >
          {isSaving ? 'Đang lưu…' : 'Lưu cài đặt'}
        </button>
      </div>
    </div>
  );
}
