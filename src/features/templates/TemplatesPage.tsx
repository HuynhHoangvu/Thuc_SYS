'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { workflowApi } from '@/features/workflow/workflow.api';
import { checklistApi } from '@/features/checklists/checklist.api';
import { formApi } from '@/features/forms/form.api';
import { CreateWorkflowModal } from './CreateWorkflowModal';
import { CreateChecklistModal } from './CreateChecklistModal';
import { CreateFormTemplateModal } from './CreateFormTemplateModal';
import { StagesSection } from '@/features/stages/StagesSection';

const countryLabels: Record<string, string> = { USA: 'Mỹ', Canada: 'Canada', 'New Zealand': 'New Zealand' };

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-card-foreground">{title}</h2>
      <button onClick={onAdd} className="flex items-center gap-1 text-sm text-primary hover:underline">
        <Plus size={14} /> Thêm mới
      </button>
    </div>
  );
}

export function TemplatesPage() {
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: workflows } = useQuery({ queryKey: ['workflow-templates'], queryFn: workflowApi.listTemplates });
  const { data: checklists } = useQuery({ queryKey: ['checklist-templates'], queryFn: () => checklistApi.listTemplates() });
  const { data: forms } = useQuery({ queryKey: ['form-templates'], queryFn: formApi.listTemplates });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Mẫu quy trình</h1>

      <div className="flex flex-col gap-6">
        <StagesSection type="student" title="Giai đoạn học sinh" />
        <StagesSection type="travel" title="Giai đoạn du lịch / visa" />

        <div className="rounded-lg border border-border bg-card p-5">
          <SectionHeader title="Mẫu quy trình (Workflow)" onAdd={() => setIsWorkflowOpen(true)} />
          <div className="flex flex-col divide-y divide-border">
            {(workflows ?? []).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 text-sm">
                <span className="font-medium text-card-foreground">{t.name}</span>
                <span className="text-muted-foreground">{t.steps.length} bước</span>
              </div>
            ))}
            {workflows?.length === 0 && <p className="py-2 text-sm text-muted-foreground">Chưa có mẫu nào.</p>}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <SectionHeader title="Mẫu checklist" onAdd={() => setIsChecklistOpen(true)} />
          <div className="flex flex-col divide-y divide-border">
            {(checklists ?? []).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 text-sm">
                <span className="font-medium text-card-foreground">
                  {t.name} <span className="text-muted-foreground">({countryLabels[t.country] ?? t.country})</span>
                </span>
                <span className="text-muted-foreground">{t.items.length} mục</span>
              </div>
            ))}
            {checklists?.length === 0 && <p className="py-2 text-sm text-muted-foreground">Chưa có mẫu nào.</p>}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <SectionHeader title="Mẫu biểu mẫu (Form)" onAdd={() => setIsFormOpen(true)} />
          <div className="flex flex-col divide-y divide-border">
            {(forms ?? []).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 text-sm">
                <span className="font-medium text-card-foreground">{t.name}</span>
                <span className="text-muted-foreground">{t.fields.length} trường</span>
              </div>
            ))}
            {forms?.length === 0 && <p className="py-2 text-sm text-muted-foreground">Chưa có mẫu nào.</p>}
          </div>
        </div>
      </div>

      <CreateWorkflowModal open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen} />
      <CreateChecklistModal open={isChecklistOpen} onOpenChange={setIsChecklistOpen} />
      <CreateFormTemplateModal open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
