'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { notificationApi, type SendNotificationInput } from './notification.api';

const UNDO_SECONDS = 5;

interface QueuedMail {
  id: number;
  studentId: string;
  input: SendNotificationInput;
  label: string;
  state: 'pending' | 'sending' | 'sent' | 'failed' | 'cancelled';
  // Wall-clock time the mail goes out; background tabs throttle timers, so never count ticks.
  sendAt: number;
  error?: string;
}

type Enqueue = (studentId: string, input: SendNotificationInput, label: string) => void;

const SendQueueContext = createContext<Enqueue>(() => {});

export function useQueueEmail() {
  return useContext(SendQueueContext);
}

// Mails look sent immediately; the request actually goes out after UNDO_SECONDS so staff can undo
// (an email that has left the server can't be recalled). The queue lives above all pages, so closing
// the popup or switching pages doesn't cancel it — only closing the tab does, and that asks first.
export function SendQueueProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [items, setItems] = useState<QueuedMail[]>([]);
  const nextId = useRef(1);
  const sentIds = useRef(new Set<number>());

  const update = useCallback(
    (id: number, patch: Partial<QueuedMail>) =>
      setItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m))),
    []
  );
  const dismiss = useCallback((id: number) => setItems((prev) => prev.filter((m) => m.id !== id)), []);

  const send = useCallback(
    async (mail: QueuedMail) => {
      try {
        await notificationApi.send(mail.studentId, mail.input);
        update(mail.id, { state: 'sent' });
        setTimeout(() => dismiss(mail.id), 4000);
      } catch (err) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Gửi mail thất bại.';
        update(mail.id, { state: 'failed', error: message });
      }
      queryClient.invalidateQueries({ queryKey: ['notifications', mail.studentId] });
      queryClient.invalidateQueries({ queryKey: ['student', mail.studentId] });
    },
    [queryClient, update, dismiss]
  );

  const hasPending = items.some((m) => m.state === 'pending');

  // Re-render every second while something is waiting (drives the countdown and the send check).
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!hasPending) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [hasPending]);

  // Send every pending mail whose time has come. Runs after render, outside any state updater,
  // and `sentIds` guarantees each mail is sent once even if this effect runs twice.
  useEffect(() => {
    for (const m of items) {
      if (m.state !== 'pending' || m.sendAt > now || sentIds.current.has(m.id)) continue;
      sentIds.current.add(m.id);
      update(m.id, { state: 'sending' });
      void send(m);
    }
  }, [items, now, send, update]);

  const inFlight = items.some((m) => m.state === 'pending' || m.state === 'sending');
  useEffect(() => {
    if (!inFlight) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [inFlight]);

  const enqueue = useCallback<Enqueue>((studentId, input, label) => {
    const id = nextId.current++;
    setItems((prev) => [...prev, { id, studentId, input, label, state: 'pending', sendAt: Date.now() + UNDO_SECONDS * 1000 }]);
    setNow(Date.now());
  }, []);

  return (
    <SendQueueContext.Provider value={enqueue}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-[92vw] max-w-md -translate-x-1/2 flex-col gap-2">
        {items.map((m) => (
          <div
            key={m.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-[#2c1810] px-4 py-3 text-sm text-white shadow-[0_16px_40px_-12px_rgb(0_0_0/0.45)]"
          >
            {m.state === 'failed' ? (
              <AlertTriangle size={16} className="shrink-0 text-red-300" />
            ) : (
              <CheckCircle2 size={16} className="shrink-0 text-green-300" />
            )}
            <span className="min-w-0 flex-1 truncate">
              {(m.state === 'pending' || m.state === 'sending' || m.state === 'sent') && `Đã gửi mail cho ${m.label}`}
              {m.state === 'cancelled' && `Đã hoàn tác — mail cho ${m.label} không được gửi`}
              {m.state === 'failed' && m.error}
            </span>
            {m.state === 'pending' && (
              <button
                onClick={() => {
                  update(m.id, { state: 'cancelled' });
                  setTimeout(() => dismiss(m.id), 3000);
                }}
                className="shrink-0 rounded-full px-2 py-1 font-semibold text-[#f5b3ae] hover:bg-white/10"
              >
                Hoàn tác ({Math.max(1, Math.ceil((m.sendAt - now) / 1000))})
              </button>
            )}
            {m.state !== 'pending' && m.state !== 'sending' && (
              <button onClick={() => dismiss(m.id)} className="shrink-0 text-white/60 hover:text-white" title="Đóng">
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </SendQueueContext.Provider>
  );
}
