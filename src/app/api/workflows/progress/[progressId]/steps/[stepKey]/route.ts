import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { WorkflowProgress } from '@/models/WorkflowProgress';
import { WorkflowTemplate } from '@/models/WorkflowTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toProgressDTO } from '@/lib/workflow/dto';

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
    await connectDB();

    const progress = await WorkflowProgress.findById(progressId);
    if (!progress) throw new NotFoundError('Workflow progress not found');

    const steps = progress.steps as unknown as StepProgress[];
    const step = steps.find((s) => s.key === stepKey);
    if (!step) throw new NotFoundError('Workflow step not found');

    step.completed = completed;
    step.completedAt = completed ? new Date().toISOString() : undefined;

    progress.steps = steps as never;
    progress.markModified('steps');
    await progress.save();

    const template = await WorkflowTemplate.findById(progress.templateId);
    if (!template) throw new NotFoundError('Workflow template not found');

    return ok(toProgressDTO(progress.toObject(), template.toObject()));
  }
);
