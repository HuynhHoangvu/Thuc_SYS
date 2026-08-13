'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2, X } from 'lucide-react';
import { studentApi } from '../student.api';
import { ProfileTab } from './ProfileTab';
import { NotesTab } from './NotesTab';
import { WorkflowTab } from './WorkflowTab';
import { ChecklistTab } from './ChecklistTab';
import { DocumentsTab } from './DocumentsTab';
import { FormsTab } from './FormsTab';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'workflow', label: 'Kế hoạch / Quy trình' },
  { key: 'notes', label: 'Việc cần làm' },
  { key: 'checklist', label: 'Checklist' },
  { key: 'profile', label: 'Hồ sơ' },
  { key: 'documents', label: 'Tài liệu' },
  { key: 'forms', label: 'Biểu mẫu' },
] as const;

export type StudentDetailTabKey = (typeof TABS)[number]['key'];

interface StudentDetailModalProps {
  studentId: string | null;
  initialTab?: StudentDetailTabKey;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailModal({ studentId, initialTab, onOpenChange }: StudentDetailModalProps) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<StudentDetailTabKey>(initialTab ?? 'profile');

  useEffect(() => {
    if (studentId) {
      setActiveTab(initialTab ?? 'profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, initialTab]);

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.getById(studentId as string),
    enabled: Boolean(studentId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => studentApi.remove(studentId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      onOpenChange(false);
    },
  });

  function handleDelete() {
    if (confirm(`Xóa học sinh "${student?.personal.fullName ?? ''}"? Hành động này không thể hoàn tác.`)) {
      deleteMutation.mutate();
    }
  }

  return (
    <Dialog.Root open={Boolean(studentId)} onOpenChange={(next) => !next && onOpenChange(false)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[90vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg sm:max-h-[85vh] sm:max-w-3xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6 sm:py-4">
            <Dialog.Title className="truncate text-base font-semibold text-card-foreground sm:text-lg">
              {student?.personal.fullName ?? 'Học sinh'}
            </Dialog.Title>
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={!student || deleteMutation.isPending}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 disabled:opacity-50"
                title="Xóa học sinh"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Xóa</span>
              </button>
              <Dialog.Close className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </Dialog.Close>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden sm:flex-row">
            <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-border p-2 sm:w-44 sm:flex-col sm:border-b-0 sm:border-r sm:p-3">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-medium transition',
                    activeTab === tab.key
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {isLoading && <p className="text-sm text-muted-foreground">Đang tải thông tin học sinh…</p>}
              {student && (
                <>
                  {activeTab === 'profile' && <ProfileTab student={student} />}
                  {activeTab === 'notes' && <NotesTab student={student} />}
                  {activeTab === 'workflow' && (
                    <WorkflowTab studentId={student.id} destinationCountry={student.studyAbroad?.destinationCountry} />
                  )}
                  {activeTab === 'checklist' && (
                    <ChecklistTab studentId={student.id} destinationCountry={student.studyAbroad?.destinationCountry} />
                  )}
                  {activeTab === 'documents' && <DocumentsTab studentId={student.id} />}
                  {activeTab === 'forms' && <FormsTab studentId={student.id} />}
                </>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
