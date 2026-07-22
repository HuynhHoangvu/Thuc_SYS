import { connectDB } from '@/lib/mongoose';
import { WorkflowTemplate } from '@/models/WorkflowTemplate';
import { WorkflowProgress } from '@/models/WorkflowProgress';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { WorkflowStep, toProgressDTO } from '@/lib/workflow/dto';

export const POST = withErrorHandling(
  async (_req, { params }: { params: Promise<{ id: string; studentId: string }> }) => {
    const { id, studentId } = await params;
    await connectDB();

    const template = await WorkflowTemplate.findById(id);
    if (!template) throw new NotFoundError('Workflow template not found');

    const existing = await WorkflowProgress.findOne({ studentId, templateId: id });
    if (existing) return ok(toProgressDTO(existing.toObject(), template.toObject()), 201);

    const steps = (template.steps as unknown as WorkflowStep[]).map((s) => ({ key: s.key, completed: false }));
    const progress = await WorkflowProgress.create({ studentId, templateId: id, steps });
    return ok(toProgressDTO(progress.toObject(), template.toObject()), 201);
  }
);
