'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { travelerApi } from './traveler.api';
import { studentApi } from '@/features/students/student.api';

const formSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  phone: z.string().optional(),
  relationToStudent: z.string().optional(),
  destinationCountry: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  purposeOfTrip: z.string().optional(),
  studentId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTravelerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTravelerModal({ open, onOpenChange }: CreateTravelerModalProps) {
  const queryClient = useQueryClient();
  const [studentSearch, setStudentSearch] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const { data: studentResults } = useQuery({
    queryKey: ['students', 'picker', studentSearch],
    queryFn: () => studentApi.list({ search: studentSearch || undefined, page: 1, limit: 10 }),
    enabled: studentSearch.length > 0,
  });

  const createMutation = useMutation({
    mutationFn: (values: FormValues) =>
      travelerApi.create({
        studentId: values.studentId || undefined,
        personal: {
          fullName: values.fullName,
          email: values.email || undefined,
          phone: values.phone || undefined,
          relationToStudent: values.relationToStudent || undefined,
        },
        travel: {
          destinationCountry: values.destinationCountry || undefined,
          purposeOfTrip: values.purposeOfTrip || undefined,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travelers'] });
      reset();
      setStudentSearch('');
      onOpenChange(false);
    },
  });

  function onSubmit(values: FormValues) {
    createMutation.mutate(values);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          reset();
          setStudentSearch('');
        }
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-lg sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-card-foreground">Thêm hồ sơ du lịch</Dialog.Title>
            <Dialog.Close className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Họ tên</label>
              <input
                {...register('fullName')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Quan hệ với học sinh</label>
              <input
                {...register('relationToStudent')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Cha / Mẹ / Người giám hộ…"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Liên kết học sinh (tùy chọn)</label>
              <input
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Tìm học sinh theo tên…"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {studentSearch && (
                <select
                  {...register('studentId')}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">— Không liên kết —</option>
                  {(studentResults?.data ?? []).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.personal.fullName} ({s.personal.email})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="phuhuynh@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Số điện thoại</label>
              <input
                {...register('phone')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="+84 900 000 000"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Điểm đến</label>
              <select
                {...register('destinationCountry')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Chọn…</option>
                <option value="USA">Mỹ</option>
                <option value="Canada">Canada</option>
                <option value="New Zealand">New Zealand</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Mục đích chuyến đi</label>
              <input
                {...register('purposeOfTrip')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Thăm con, du lịch, dự lễ tốt nghiệp…"
              />
            </div>

            {createMutation.isError && (
              <p className="text-sm text-red-500">Không thể tạo hồ sơ. Vui lòng thử lại.</p>
            )}

            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                Hủy
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting || createMutation.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
              >
                {createMutation.isPending ? 'Đang lưu…' : 'Lưu hồ sơ'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
