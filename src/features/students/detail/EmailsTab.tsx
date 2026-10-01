'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { notificationApi, type NotificationLog } from '@/features/notifications/notification.api';
import { ProgressEmailModal } from '@/features/notifications/ProgressEmailModal';
import { stageApi } from '@/features/stages/stage.api';
import type { Student } from '../student.types';
import { presetAppliesTo } from '@/lib/notifications/templates';

const STATUS_BADGE: Record<NotificationLog['status'], { label: string; className: string }> = {
  sent: { label: 'Đã gửi', className: 'bg-sky-100 text-sky-800' },
  delivered: { label: 'Đã nhận', className: 'bg-green-100 text-green-800' },
  opened: { label: 'Đã mở', className: 'bg-emerald-200 text-emerald-900' },
  bounced: { label: 'Bị trả về', className: 'bg-red-100 text-red-800' },
  complained: { label: 'Báo spam', className: 'bg-red-100 text-red-800' },
  failed: { label: 'Lỗi', className: 'bg-red-100 text-red-800' },
};

export function EmailsTab({ student }: { student: Student }) {
  const [open, setOpen] = useState(false);
  const { data: logs, isLoading } = useQuery({
    queryKey: ['notifications', student.id],
    queryFn: () => notificationApi.list(student.id),
  });
  const { data: stages } = useQuery({ queryKey: ['stages', 'student'], queryFn: () => stageApi.list('student') });

  const stageTitle = new Map((stages ?? []).map((s) => [s.key, s.title]));
  const template = stages?.find((s) => s.key === student.stage)?.emailTemplate;
  // Same rule as the list's mail button: interview phases have no email for Canada / NZ.
  const canSend = Boolean(template) && presetAppliesTo(template?.presetKey, student.studyAbroad.destinationCountry);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          Mã hồ sơ:{' '}
          <span className="font-medium text-foreground">
            {student.caseCode ?? 'chưa có (tạo khi gửi mail đầu tiên)'}
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          disabled={!canSend || student.notifyOptOut}
          title={canSend ? undefined : 'Giai đoạn hiện tại chưa có mẫu mail'}
          className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:brightness-90 disabled:opacity-50"
        >
          <Send size={14} />
          Gửi cập nhật
        </button>
      </div>
      {student.notifyOptOut && <p className="text-sm text-red-500">Học sinh đã ngừng nhận thông báo.</p>}
      {student.emailBounced && (
        <p className="text-sm text-red-500">
          Email {student.personal.personalEmail} không nhận được thư (bị trả về). Hãy kiểm tra và sửa email trong tab Hồ sơ.
        </p>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Đang tải…</p>}
      {logs?.length === 0 && <p className="text-sm text-muted-foreground">Chưa gửi mail nào.</p>}
      <ul className="flex flex-col divide-y divide-border">
        {logs?.map((log) => (
          <li key={log.id} className="flex flex-col gap-1 py-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[log.status].className}`}>
                {STATUS_BADGE[log.status].label}
              </span>
              {log.kind === 'interview_reminder' && (
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800">
                  Tự động nhắc lịch
                </span>
              )}
              {log.testMode && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">TEST</span>
              )}
              <span className="text-xs text-muted-foreground">
                {new Date(log.createdAt).toLocaleString('vi-VN')} · {stageTitle.get(log.stageKey ?? '') ?? log.stageKey}
              </span>
            </div>
            <div className="font-medium">{log.subject}</div>
            <div className="text-xs text-muted-foreground">
              Tới {log.to}
              {log.cc.length ? ` · CC ${log.cc.join(', ')}` : ''}
            </div>
            {log.error && <div className="text-xs text-red-500">{log.error}</div>}
          </li>
        ))}
      </ul>

      <ProgressEmailModal
        studentId={open ? student.id : null}
        stageKey={open ? student.stage : null}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
