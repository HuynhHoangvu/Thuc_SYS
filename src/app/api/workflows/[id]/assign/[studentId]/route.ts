import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { WorkflowStep, toProgressDTO } from '@/lib/workflow/dto';

export const POST = withErrorHandling(
  async (_req, { params }: { params: Promise<{ id: string; studentId: string }> }) => {
    const { id, studentId } = await params;

    const template = await prisma.workflowTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundError('Workflow template not found');

    const existing = await prisma.workflowProgress.findUnique({
      where: { studentId_templateId: { studentId, templateId: id } },
      include: { template: true },
    });
    if (existing) return ok(toProgressDTO(existing), 201);

    const steps = (template.steps as WorkflowStep[]).map((s) => ({ key: s.key, completed: false }));
    const progress = await prisma.workflowProgress.create({
      data: { studentId, templateId: id, steps },
      include: { template: true },
    });
    return ok(toProgressDTO(progress), 201);
  }
);
