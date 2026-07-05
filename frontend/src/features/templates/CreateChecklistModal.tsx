import * as Dialog from '@radix-ui/react-dialog';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X } from 'lucide-react';
import { checklistApi } from '@/features/checklists/checklist.api';
import { uniqueSlugs } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên'),
  country: z.enum(['USA', 'Canada', 'New Zealand']),
  items: z
    .array(
      z.object({
        label: z.string().min(1, 'Vui lòng nhập nội dung mục'),
        required: z.boolean().optional(),
      })
    )
    .min(1, 'Cần ít nhất một mục'),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateChecklistModal({ open, onOpenChange }: CreateChecklistModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', country: 'USA', items: [{ label: '', required: true }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const createMutation = useMutation({
    mutationFn: (values: FormValues) => {
      const keys = uniqueSlugs(values.items.map((item) => item.label));
      return checklistApi.createTemplate({
        name: values.name,
        country: values.country,
        items: values.items.map((item, i) => ({ key: keys[i], label: item.label, required: item.required, order: i })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist-templates'] });
      reset({ name: '', country: 'USA', items: [{ label: '', required: true }] });
      onOpenChange(false);
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-card-foreground">Mẫu checklist mới</Dialog.Title>
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
              <label className="mb-1 block text-sm font-medium text-card-foreground">Quốc gia</label>
              <select
                {...register('country')}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="USA">Mỹ</option>
                <option value="Canada">Canada</option>
                <option value="New Zealand">New Zealand</option>
              </select>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-card-foreground">Các mục</label>
                <button
                  type="button"
                  onClick={() => append({ label: '', required: true })}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus size={14} /> Thêm mục
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      {...register(`items.${index}.label`)}
                      placeholder="Nội dung mục"
                      className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
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
              {errors.items && <p className="mt-1 text-xs text-red-500">{errors.items.message}</p>}
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
