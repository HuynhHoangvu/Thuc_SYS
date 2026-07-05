import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ListChecks, Plus, Search } from 'lucide-react';
import { studentApi } from './student.api';
import { CreateStudentModal } from './CreateStudentModal';
import { StudentDetailModal, type StudentDetailTabKey } from './detail/StudentDetailModal';
import { StageSelect } from './StageSelect';
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<StudentDetailTabKey | undefined>(undefined);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['students', { search }],
    queryFn: () => studentApi.list({ search: search || undefined, page: 1, limit: 20 }),
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

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Học sinh</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm học sinh…"
              className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-64"
            />
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75"
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
              <li key={student._id}>
                <button onClick={() => openStudent(student._id, 'profile')} className="underline-offset-2 hover:underline">
                  {student.personal.fullName}
                </button>
                {' — '}
                {(days as number) < 0 ? `hết hạn ${Math.abs(days as number)} ngày trước` : `còn ${days} ngày`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-205 text-left text-sm">
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
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Đang tải danh sách học sinh…
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-red-500">
                  Không thể tải danh sách học sinh.
                </td>
              </tr>
            )}
            {!isLoading && !isError && data?.data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Chưa có học sinh nào.
                </td>
              </tr>
            )}
            {data?.data.map((student) => {
              const hasOpenTodos = (student.todos ?? []).some((t) => !t.done);
              return (
                <tr
                  key={student._id}
                  onClick={() => openStudent(student._id)}
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
                    <StageSelect studentId={student._id} stage={student.stage} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStudent(student._id, 'notes');
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
    </div>
  );
}
