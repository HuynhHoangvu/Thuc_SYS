'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X } from 'lucide-react';
import { formApi } from '@/features/forms/form.api';
import { uniqueSlugs } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên'),
  fields: z
    .array(
      z.object({
        label: z.string().min(1, 'Vui lòng nhập nhãn trường'),
        type: z.enum(['text', 'textarea', 'number', 'date', 'select', 'checkbox', 'file']),
      })
    )
    .min(1, 'Cần ít nhất một trường'),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateFormTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFormTemplateModal({ open, onOpenChange }: CreateFormTemplateModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', fields: [{ label: '', type: 'text' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'fields' });

  const createMutation = useMutation({
    mutationFn: (values: FormValues) => {
      const keys = uniqueSlugs(values.fields.map((f) => f.label));
      return formApi.createTemplate({
        name: values.name,
        fields: values.fields.map((f, i) => ({ key: keys[i], label: f.label, type: f.type, order: i })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form-templates'] });
      reset({ name: '', fields: [{ label: '', type: 'text' }] });
      onOpenChange(false);
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-card-foreground">Mẫu biểu mẫu mới</Dialog.Title>
            <Dialog.Close className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit((values) => createMutation.mutate(values))} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">Tên</label>
              <input
                {...register('name')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-card-foreground">Các trường</label>
                <button
                  type="button"
                  onClick={() => append({ label: '', type: 'text' })}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus size={14} /> Thêm trường
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      {...register(`fields.${index}.label`)}
                      placeholder="Nhãn trường"
                      className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                    <select
                      {...register(`fields.${index}.type`)}
                      className="rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="text">Văn bản</option>
                      <option value="textarea">Đoạn văn</option>
                      <option value="number">Số</option>
                      <option value="date">Ngày tháng</option>
                      <option value="select">Danh sách chọn</option>
                      <option value="checkbox">Hộp kiểm</option>
                      <option value="file">Tệp tin</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              {errors.fields && <p className="mt-1 text-xs text-red-500">{errors.fields.message}</p>}
            </div>

            {createMutation.isError && <p className="text-sm text-red-500">Không thể tạo mẫu.</p>}

            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                Hủy
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting || createMutation.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
              >
                {createMutation.isPending ? 'Đang lưu…' : 'Tạo mẫu'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
