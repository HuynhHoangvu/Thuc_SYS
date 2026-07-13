import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toProgressDTO } from '@/lib/workflow/dto';
import type { Prisma } from '@/generated/prisma/client';

const bodySchema = z.object({ completed: z.boolean() });

interface StepProgress {
  key: string;
  completed: boolean;
  completedAt?: string;
}

export const PATCH = withErrorHandling(
  async (req, { params }: { params: Promise<{ progressId: string; stepKey: string }> }) => {
    const { progressId, stepKey } = await params;
    const { completed } = bodySchema.parse(await req.json());

    const progress = await prisma.workflowProgress.findUnique({ where: { id: progressId } });
    if (!progress) throw new NotFoundError('Workflow progress not found');

    const steps = progress.steps as unknown as StepProgress[];
    const step = steps.find((s) => s.key === stepKey);
    if (!step) throw new NotFoundError('Workflow step not found');

    step.completed = completed;
    step.completedAt = completed ? new Date().toISOString() : undefined;

    const updated = await prisma.workflowProgress.update({
      where: { id: progressId },
      data: { steps: steps as unknown as Prisma.InputJsonValue },
      include: { template: true },
    });
    return ok(toProgressDTO(updated));
  }
);
