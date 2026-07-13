import { prisma } from '@/lib/prisma';
import { noContent, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const exists = await prisma.checklistTemplate.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Checklist template not found');
  await prisma.checklistTemplate.delete({ where: { id } });
  return noContent();
});
