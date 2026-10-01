'use client';

import * as Dialog from '@radix-ui/react-dialog';

interface UnsavedChangesDialogProps {
  open: boolean;
  saving?: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

// Asked when leaving a form with unsaved edits: save and continue, discard, or stay.
export function UnsavedChangesDialog({ open, saving, onSave, onDiscard, onCancel }: UnsavedChangesDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && !saving && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[70] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-5 shadow-lg">
          <Dialog.Title className="text-base font-semibold text-card-foreground">Có thay đổi chưa lưu</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Bạn vừa sửa thông tin nhưng chưa lưu. Muốn lưu lại trước khi rời đi không?
          </Dialog.Description>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              onClick={onCancel}
              disabled={saving}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              Ở lại
            </button>
            <button
              onClick={onDiscard}
              disabled={saving}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Bỏ thay đổi
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:brightness-90 disabled:opacity-50"
            >
              {saving ? 'Đang lưu…' : 'Lưu và tiếp tục'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
