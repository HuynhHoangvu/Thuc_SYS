'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Plus, Search } from 'lucide-react';
import { travelerApi } from './traveler.api';
import { CreateTravelerModal } from './CreateTravelerModal';
import { TravelerDetailModal, type TravelerDetailTabKey } from './detail/TravelerDetailModal';
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

export function TravelersListPage() {
  const [search, setSearch] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTravelerId, setSelectedTravelerId] = useState<string | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<TravelerDetailTabKey | undefined>(undefined);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['travelers', { search, destinationCountry }],
    queryFn: () =>
      travelerApi.list({
        search: search || undefined,
        destinationCountry: destinationCountry || undefined,
        page: 1,
        limit: 20,
      }),
  });

  function openTraveler(travelerId: string, tab?: TravelerDetailTabKey) {
    setDetailInitialTab(tab);
    setSelectedTravelerId(travelerId);
  }

  const visaAlerts = useMemo(() => {
    return (data?.data ?? [])
      .map((traveler) => ({ traveler, days: daysUntil(traveler.travel?.visaExpiry) }))
      .filter((entry) => entry.days !== null && entry.days <= VISA_WARNING_DAYS)
      .sort((a, b) => (a.days as number) - (b.days as number));
  }, [data]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Du lịch / Visa phụ huynh</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên…"
              className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-56"
            />
          </div>
          <select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Tất cả điểm đến</option>
            <option value="USA">Mỹ</option>
            <option value="Canada">Canada</option>
            <option value="New Zealand">New Zealand</option>
          </select>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75"
          >
            <Plus size={16} />
            Thêm hồ sơ
          </button>
        </div>
      </div>

      <CreateTravelerModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      <TravelerDetailModal
        travelerId={selectedTravelerId}
        initialTab={detailInitialTab}
        onOpenChange={(open) => !open && setSelectedTravelerId(null)}
      />

      {visaAlerts.length > 0 && (
        <div className="mb-4 rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-800">
          <div className="mb-1 flex items-center gap-2 font-medium">
            <AlertCircle size={16} className="shrink-0" />
            {visaAlerts.length} hồ sơ sắp/đã hết hạn visa — cần theo dõi:
          </div>
          <ul className="flex flex-col gap-0.5 pl-6">
            {visaAlerts.map(({ traveler, days }) => (
              <li key={traveler.id}>
                <button onClick={() => openTraveler(traveler.id, 'profile')} className="underline-offset-2 hover:underline">
                  {traveler.personal.fullName}
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
              <th className="px-4 py-3 font-medium">Quan hệ</th>
              <th className="px-4 py-3 font-medium">Điểm đến</th>
              <th className="px-4 py-3 font-medium">Thời hạn visa</th>
              <th className="px-4 py-3 font-medium">Giai đoạn</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Đang tải danh sách…
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-red-500">
                  Không thể tải danh sách.
                </td>
              </tr>
            )}
            {!isLoading && !isError && data?.data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Chưa có hồ sơ nào.
                </td>
              </tr>
            )}
            {data?.data.map((traveler) => (
              <tr
                key={traveler.id}
                onClick={() => openTraveler(traveler.id)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/40"
              >
                <td className="px-4 py-3 font-medium text-card-foreground">{traveler.personal.fullName}</td>
                <td className="px-4 py-3 text-muted-foreground">{traveler.personal.relationToStudent ?? '—'}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {traveler.travel?.destinationCountry
                    ? countryLabels[traveler.travel.destinationCountry] ?? traveler.travel.destinationCountry
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <VisaCountdown visaExpiry={traveler.travel?.visaExpiry} />
                </td>
                <td className="px-4 py-3">
                  <StageSelect travelerId={traveler.id} stage={traveler.stage} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
