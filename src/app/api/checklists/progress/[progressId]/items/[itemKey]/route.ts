import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toProgressDTO } from '@/lib/checklists/dto';
import type { Prisma } from '@/generated/prisma/client';

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

    const progress = await prisma.checklistProgress.findUnique({ where: { id: progressId } });
    if (!progress) throw new NotFoundError('Checklist progress not found');

    const items = progress.items as unknown as ItemProgress[];
    const item = items.find((i) => i.key === itemKey);
    if (!item) throw new NotFoundError('Checklist item not found');

    item.completed = completed;
    item.completedAt = completed ? new Date().toISOString() : undefined;

    const updated = await prisma.checklistProgress.update({
      where: { id: progressId },
      data: { items: items as unknown as Prisma.InputJsonValue },
      include: { template: true },
    });
    return ok(toProgressDTO(updated));
  }
);
