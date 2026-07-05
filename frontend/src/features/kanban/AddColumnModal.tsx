import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { kanbanApi } from './kanban.api';

const formSchema = z.object({
  key: z
    .string()
    .min(1, 'Vui lòng nhập mã cột')
    .regex(/^[a-z0-9_-]+$/, 'Chỉ dùng chữ thường, số, - hoặc _'),
  title: z.string().min(1, 'Vui lòng nhập tên cột'),
  color: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddColumnModal({ open, onOpenChange }: AddColumnModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { color: '#a78bfa' } });

  const createMutation = useMutation({
    mutationFn: (values: FormValues) => kanbanApi.createColumn(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban-columns'] });
      reset();
      onOpenChange(false);
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-card-foreground">Thêm cột</Dialog.Title>
            <Dialog.Close className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit((values) => createMutation.mutate(values))} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Mã cột</label>
              <input
                {...register('key')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="VD: xet-duyet-ho-so"
              />
              {errors.key && <p className="mt-1 text-xs text-red-500">{errors.key.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Tên cột</label>
              <input
                {...register('title')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Xét duyệt hồ sơ"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Màu sắc</label>
              <input type="color" {...register('color')} className="h-9 w-16 rounded-md border border-border" />
            </div>

            {createMutation.isError && <p className="text-sm text-red-500">Không thể tạo cột.</p>}

            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                Hủy
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting || createMutation.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
              >
                {createMutation.isPending ? 'Đang lưu…' : 'Thêm cột'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
