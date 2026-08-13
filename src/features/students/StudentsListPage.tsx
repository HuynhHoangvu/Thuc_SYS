'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ListChecks, Plus, Search } from 'lucide-react';
import { studentApi } from './student.api';
import { CreateStudentModal } from './CreateStudentModal';
import { StudentDetailModal, type StudentDetailTabKey } from './detail/StudentDetailModal';
import { StageSelect } from './StageSelect';
import { stageApi } from '@/features/stages/stage.api';
import { cn } from '@/lib/utils';

const countryLabels: Record<string, string> = { USA: 'Mỹ', Canada: 'Canada', 'New Zealand': 'New Zealand' };

const VISA_WARNING_DAYS = 30;

function daysUntil(dateStr?: string): number | null {
  if (!dateStr) return null;
  const msPerDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / msPerDay);
}

function VisaCountdown({ visaExpiry }: { visaExpiry?: string }) {
  const days = daysUntil(visaExpiry);
  if (days === null) return <span className="text-muted-foreground">—</span>;

  const isExpired = days < 0;
  const isUrgent = days <= VISA_WARNING_DAYS;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        isExpired ? 'text-red-600' : isUrgent ? 'text-orange-500' : 'text-muted-foreground'
      )}
    >
      {isUrgent && <AlertCircle size={14} className="shrink-0" />}
      {isExpired ? `Hết hạn ${Math.abs(days)} ngày trước` : `Còn ${days} ngày`}
    </span>
  );
}

export function StudentsListPage() {
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<'all' | 'visa' | 'todo'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<StudentDetailTabKey | undefined>(undefined);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['students', { search }],
    queryFn: () => studentApi.list({ search: search || undefined, page: 1, limit: 20 }),
  });

  const { data: stagesData } = useQuery({
    queryKey: ['stages', 'student'],
    queryFn: () => stageApi.list('student'),
  });

  function openStudent(studentId: string, tab?: StudentDetailTabKey) {
    setDetailInitialTab(tab);
    setSelectedStudentId(studentId);
  }

  const visaAlerts = useMemo(() => {
    return (data?.data ?? [])
      .map((student) => ({ student, days: daysUntil(student.studyAbroad?.visaExpiry) }))
      .filter((entry) => entry.days !== null && entry.days <= VISA_WARNING_DAYS)
      .sort((a, b) => (a.days as number) - (b.days as number));
  }, [data]);

  const sortedStudents = useMemo(() => {
    const stageOrder = new Map((stagesData ?? []).map((stage, index) => [stage.key, index]));

    return [...(data?.data ?? [])].sort((a, b) => {
      const aOrder = stageOrder.get(a.stage ?? '') ?? Number.MAX_SAFE_INTEGER;
      const bOrder = stageOrder.get(b.stage ?? '') ?? Number.MAX_SAFE_INTEGER;

      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.personal.fullName.localeCompare(b.personal.fullName, 'vi');
    });
  }, [data, stagesData]);

  const stageTitleMap = useMemo(() => {
    return new Map((stagesData ?? []).map((stage) => [stage.key, stage.title]));
  }, [stagesData]);

  const visibleStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return sortedStudents.filter((student) => {
      const matchesStage = !selectedStage || student.stage === selectedStage;
      const matchesQuickFilter =
        selectedQuickFilter === 'all' ||
        (selectedQuickFilter === 'visa' && daysUntil(student.studyAbroad?.visaExpiry) !== null && daysUntil(student.studyAbroad?.visaExpiry)! <= VISA_WARNING_DAYS) ||
        (selectedQuickFilter === 'todo' && (student.todos ?? []).some((todo: { done: boolean }) => !todo.done));

      const matchesSearch =
        !normalizedSearch ||
        student.personal.fullName.toLowerCase().includes(normalizedSearch) ||
        (student.stage && (student.stage.toLowerCase().includes(normalizedSearch) || stageTitleMap.get(student.stage)?.toLowerCase().includes(normalizedSearch)));

      return matchesStage && matchesQuickFilter && matchesSearch;
    });
  }, [search, selectedQuickFilter, selectedStage, sortedStudents, stageTitleMap]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Học sinh</h1>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên / giai đoạn…"
              className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 sm:w-auto"
          >
            <Plus size={16} />
            Thêm học sinh
          </button>
        </div>
      </div>

      <CreateStudentModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      <StudentDetailModal
        studentId={selectedStudentId}
        initialTab={detailInitialTab}
        onOpenChange={(open) => !open && setSelectedStudentId(null)}
      />

      {visaAlerts.length > 0 && (
        <div className="mb-4 rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-800">
          <div className="mb-1 flex items-center gap-2 font-medium">
            <AlertCircle size={16} className="shrink-0" />
            {visaAlerts.length} học sinh sắp/đã hết hạn visa — cần gia hạn:
          </div>
          <ul className="flex flex-col gap-0.5 pl-6">
            {visaAlerts.map(({ student, days }) => (
              <li key={student.id}>
                <button onClick={() => openStudent(student.id, 'profile')} className="underline-offset-2 hover:underline">
                  {student.personal.fullName}
                </button>
                {' — '}
                {(days as number) < 0 ? `hết hạn ${Math.abs(days as number)} ngày trước` : `còn ${days} ngày`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setSelectedStage(null);
            setSelectedQuickFilter('all');
          }}
          className={cn(
            'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
            !selectedStage && selectedQuickFilter === 'all'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          )}
        >
          Tất cả
        </button>

        <button
          onClick={() => {
            setSelectedStage(null);
            setSelectedQuickFilter('visa');
          }}
          className={cn(
            'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
            selectedQuickFilter === 'visa' && !selectedStage
              ? 'border-amber-500 bg-amber-500 text-white'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          )}
        >
          Visa gần hết hạn
        </button>

        <button
          onClick={() => {
            setSelectedStage(null);
            setSelectedQuickFilter('todo');
          }}
          className={cn(
            'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
            selectedQuickFilter === 'todo' && !selectedStage
              ? 'border-red-500 bg-red-500 text-white'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          )}
        >
          Cần làm
        </button>

        {(stagesData ?? []).map((stage) => (
          <button
            key={stage.id}
            onClick={() => {
              setSelectedStage(stage.key);
              setSelectedQuickFilter('all');
            }}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              selectedStage === stage.key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:text-foreground'
            )}
          >
            {stage.title}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-muted-foreground">
          Đang tải danh sách học sinh…
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-8 text-center text-red-500">
          Không thể tải danh sách học sinh.
        </div>
      )}

      {!isLoading && !isError && data?.data.length === 0 && (
        <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-muted-foreground">
          Chưa có học sinh nào.
        </div>
      )}

      {!isLoading && !isError && visibleStudents.length > 0 && (
        <>
          <div className="hidden overflow-x-auto rounded-lg border border-border bg-card md:block">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Họ tên</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Điểm đến</th>
                  <th className="px-4 py-3 font-medium">Thời hạn visa</th>
                  <th className="px-4 py-3 font-medium">Giai đoạn</th>
                  <th className="px-4 py-3 font-medium">Việc cần làm</th>
                </tr>
              </thead>
              <tbody>
                {visibleStudents.map((student) => {
                  const hasOpenTodos = (student.todos ?? []).some((t: { done: boolean }) => !t.done);

                  return (
                    <tr
                      key={student.id}
                      onClick={() => openStudent(student.id)}
                      className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 font-medium text-card-foreground">{student.personal.fullName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{student.personal.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {student.studyAbroad?.destinationCountry
                          ? countryLabels[student.studyAbroad.destinationCountry] ?? student.studyAbroad.destinationCountry
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <VisaCountdown visaExpiry={student.studyAbroad?.visaExpiry} />
                      </td>
                      <td className="px-4 py-3">
                        <StageSelect studentId={student.id} stage={student.stage} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openStudent(student.id, 'notes');
                          }}
                          title="Xem việc cần làm"
                          className={cn(
                            'inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 hover:bg-muted',
                            hasOpenTodos ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          <ListChecks size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {visibleStudents.map((student) => {
              const hasOpenTodos = (student.todos ?? []).some((t: { done: boolean }) => !t.done);

              return (
                <div
                  key={student.id}
                  onClick={() => openStudent(student.id)}
                  className="cursor-pointer rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-card-foreground">{student.personal.fullName}</div>
                      <div className="text-xs text-muted-foreground">{student.personal.email}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStudent(student.id, 'notes');
                      }}
                      className={cn(
                        'rounded-md border px-2 py-1 text-xs',
                        hasOpenTodos ? 'border-red-200 bg-red-50 text-red-600' : 'border-border bg-background text-muted-foreground'
                      )}
                    >
                      {hasOpenTodos ? 'Cần làm' : 'Ổn'}
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Điểm đến</span>
                      <span>{student.studyAbroad?.destinationCountry ? countryLabels[student.studyAbroad.destinationCountry] ?? student.studyAbroad.destinationCountry : '—'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Visa</span>
                      <VisaCountdown visaExpiry={student.studyAbroad?.visaExpiry} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-muted-foreground">Giai đoạn</span>
                      <StageSelect studentId={student.id} stage={student.stage} className="w-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
