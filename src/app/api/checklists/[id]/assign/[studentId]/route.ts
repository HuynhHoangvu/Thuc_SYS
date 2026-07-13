import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { ChecklistItem, toProgressDTO } from '@/lib/checklists/dto';

export const POST = withErrorHandling(
  async (_req, { params }: { params: Promise<{ id: string; studentId: string }> }) => {
    const { id, studentId } = await params;

    const template = await prisma.checklistTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundError('Checklist template not found');

    const existing = await prisma.checklistProgress.findUnique({
      where: { studentId_templateId: { studentId, templateId: id } },
      include: { template: true },
    });
    if (existing) return ok(toProgressDTO(existing), 201);

    const items = (template.items as ChecklistItem[]).map((i) => ({ key: i.key, completed: false }));
    const progress = await prisma.checklistProgress.create({
      data: { studentId, templateId: id, items },
      include: { template: true },
    });
    return ok(toProgressDTO(progress), 201);
  }
);
