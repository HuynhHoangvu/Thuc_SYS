import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toProgressDTO } from '@/lib/workflow/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  const progress = await prisma.workflowProgress.findMany({ where: { studentId }, include: { template: true } });
  return ok(progress.map(toProgressDTO));
});
