'use client';

import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AlertCircle, ListChecks, Plus, Search } from 'lucide-react';
import { studentApi } from './student.api';
import { CreateStudentModal } from './CreateStudentModal';
import { StudentDetailModal, type StudentDetailTabKey } from './detail/StudentDetailModal';
import { StageSelect } from './StageSelect';
import { PinButton } from './PinButton';
import { SendEmailButton } from '@/features/notifications/SendEmailButton';
import { stageApi } from '@/features/stages/stage.api';
import { cn } from '@/lib/utils';
import { COUNTRY_LABELS } from '@/lib/countries';


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

// Country chips in this order; values match student.studyAbroad.destinationCountry.
const COUNTRY_ORDER = ['USA', 'Canada', 'New Zealand'];

const QUICK_FILTERS = [
  { key: 'pinned', label: '★ Đã ghim', active: 'border-amber-500 bg-amber-500 text-white' },
  { key: 'visa', label: 'Visa gần hết hạn', active: 'border-amber-500 bg-amber-500 text-white' },
  { key: 'todo', label: 'Cần làm', active: 'border-red-500 bg-red-500 text-white' },
  { key: 'due', label: 'Đến hạn cập nhật', active: 'border-sky-600 bg-sky-600 text-white' },
] as const;

const PAGE_SIZE = 30;

export function StudentsListPage() {
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<'all' | 'visa' | 'todo' | 'due' | 'pinned'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<StudentDetailTabKey | undefined>(undefined);

  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Filtering, paging and chip counts happen on the server (see /api/students).
  const filters = {
    search: debouncedSearch || undefined,
    destinationCountry: selectedCountry ?? undefined,
    stage: selectedStage ?? undefined,
    quick: selectedQuickFilter === 'all' ? undefined : selectedQuickFilter,
  };
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['students', { ...filters, page }],
    queryFn: () => studentApi.list({ ...filters, page, limit: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });
  const facets = data?.meta.facets;
  const pages = data?.meta.pages ?? 1;

  // Any filter change goes back to page 1.
  const [filterKey, setFilterKey] = useState('');
  const currentKey = JSON.stringify(filters);
  if (currentKey !== filterKey) {
    setFilterKey(currentKey);
    if (page !== 1) setPage(1);
  }

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

  const visibleStudents = data?.data ?? [];
  const dueCount = facets?.due ?? 0;
  const countryCounts = new Map(Object.entries(facets?.countries ?? {}));
  const stageCounts = new Map(Object.entries(facets?.stages ?? {}));

  const hasFilter = Boolean(selectedCountry || selectedStage || selectedQuickFilter !== 'all');

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
              placeholder="Tìm theo tên / email…"
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

      <div className="mb-4 flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quốc gia</span>
          {[null, ...COUNTRY_ORDER].map((c) => {
            const count = c ? countryCounts.get(c) ?? 0 : facets?.all ?? 0;
            if (c && !count) return null;
            const active = selectedCountry === c;
            return (
              <button
                key={c ?? 'all'}
                onClick={() => {
                  setSelectedCountry(c);
                  setSelectedStage(null);
                }}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground')}
              >
                {c ? COUNTRY_LABELS[c] ?? c : 'Tất cả'}
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {QUICK_FILTERS.map((q) => (
              <button
                key={q.key}
                onClick={() => setSelectedQuickFilter(selectedQuickFilter === q.key ? 'all' : q.key)}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors', selectedQuickFilter === q.key ? q.active : 'border-border bg-background text-muted-foreground hover:text-foreground')}
              >
                {q.label}
                {q.key === 'due' && dueCount ? <span className="text-xs opacity-70">{dueCount}</span> : null}
              </button>
            ))}
            {hasFilter && (
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  setSelectedStage(null);
                  setSelectedQuickFilter('all');
                }}
                className="text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Xoá lọc
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Giai đoạn</span>
          <button
            onClick={() => setSelectedStage(null)}
            className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors', !selectedStage ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground')}
          >
            Tất cả
          </button>
          {(stagesData ?? []).map((stage) => {
            const count = stageCounts.get(stage.key) ?? 0;
            const active = selectedStage === stage.key;
            if (!count && !active) return null;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(active ? null : stage.key)}
                style={active ? { backgroundColor: stage.color ?? '#d4d4d8' } : undefined}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors', active ? 'border-transparent text-[#2c1810]' : 'border-border bg-background text-muted-foreground hover:text-foreground')}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: stage.color ?? '#d4d4d8' }} />
                {stage.title}
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!isLoading && !isError && hasFilter && visibleStudents.length === 0 && (
        <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-muted-foreground">
          Không có học sinh nào khớp bộ lọc.
        </div>
      )}

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
                  <th className="w-10 py-3 pl-3 pr-0 font-medium" aria-label="Ghim" />
                  <th className="px-4 py-3 font-medium">Họ tên</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Điểm đến</th>
                  <th className="px-4 py-3 font-medium">Thời hạn visa</th>
                  <th className="px-4 py-3 font-medium">Giai đoạn</th>
                  <th className="px-4 py-3 font-medium">Việc cần làm</th>
                  <th className="px-4 py-3 font-medium">Mail</th>
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
                      <td className="py-3 pl-3 pr-0">
                        <PinButton studentId={student.id} pinned={student.pinned} />
                      </td>
                      <td className="px-4 py-3 font-medium text-card-foreground">{student.personal.fullName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{student.personal.personalEmail ?? student.personal.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {student.studyAbroad?.destinationCountry
                          ? COUNTRY_LABELS[student.studyAbroad.destinationCountry] ?? student.studyAbroad.destinationCountry
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <VisaCountdown visaExpiry={student.studyAbroad?.visaExpiry} />
                      </td>
                      <td className="px-4 py-3">
                        <StageSelect
                          studentId={student.id}
                          stage={student.stage}
                          country={student.studyAbroad?.destinationCountry} />
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
                      <td className="px-4 py-3">
                        <SendEmailButton studentId={student.id} stage={student.stage} country={student.studyAbroad?.destinationCountry} />
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
                      <div className="flex items-center gap-1 font-semibold text-card-foreground">
                        <PinButton studentId={student.id} pinned={student.pinned} />
                        {student.personal.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground">{student.personal.personalEmail ?? student.personal.email}</div>
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
                      <span>{student.studyAbroad?.destinationCountry ? COUNTRY_LABELS[student.studyAbroad.destinationCountry] ?? student.studyAbroad.destinationCountry : '—'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Visa</span>
                      <VisaCountdown visaExpiry={student.studyAbroad?.visaExpiry} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-muted-foreground">Giai đoạn</span>
                      <div className="flex items-center gap-2">
                        <StageSelect
                          studentId={student.id}
                          stage={student.stage}
                          country={student.studyAbroad?.destinationCountry} className="flex-1" />
                        <SendEmailButton studentId={student.id} stage={student.stage} country={student.studyAbroad?.destinationCountry} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {data?.meta.total ?? 0} học sinh · trang {page}/{pages}
            {isFetching ? ' · đang tải…' : ''}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-md border border-border px-3 py-1.5 font-medium hover:text-foreground disabled:opacity-40"
            >
              Trang trước
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className="rounded-md border border-border px-3 py-1.5 font-medium hover:text-foreground disabled:opacity-40"
            >
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
