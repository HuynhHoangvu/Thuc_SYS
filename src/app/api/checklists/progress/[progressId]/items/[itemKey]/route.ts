import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { ChecklistProgress } from '@/models/ChecklistProgress';
import { ChecklistTemplate } from '@/models/ChecklistTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toProgressDTO } from '@/lib/checklists/dto';

const bodySchema = z.object({ completed: z.boolean() });

interface ItemProgress {
  key: string;
  completed: boolean;
  completedAt?: string;
}

export const PATCH = withErrorHandling(
  async (req, { params }: { params: Promise<{ progressId: string; itemKey: string }> }) => {
    const { progressId, itemKey } = await params;
    const { completed } = bodySchema.parse(await req.json());
    await connectDB();

    const progress = await ChecklistProgress.findById(progressId);
    if (!progress) throw new NotFoundError('Checklist progress not found');

    const items = progress.items as unknown as ItemProgress[];
    const item = items.find((i) => i.key === itemKey);
    if (!item) throw new NotFoundError('Checklist item not found');

    item.completed = completed;
    item.completedAt = completed ? new Date().toISOString() : undefined;

    progress.items = items as never;
    progress.markModified('items');
    await progress.save();

    const template = await ChecklistTemplate.findById(progress.templateId);
    if (!template) throw new NotFoundError('Checklist template not found');

    return ok(toProgressDTO(progress.toObject(), template.toObject()));
  }
);
