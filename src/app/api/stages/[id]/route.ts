import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import { toStageDTO, updateStageSchema } from '@/lib/stages/dto';

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateStageSchema.parse(await req.json());

  const exists = await prisma.stageTemplate.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Stage not found');

  const stage = await prisma.stageTemplate.update({ where: { id }, data: body });
  return ok(toStageDTO(stage));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const allStages = await prisma.stageTemplate.findMany({ orderBy: { order: 'asc' } });
  const index = allStages.findIndex((s) => s.id === id);
  if (index === -1) throw new NotFoundError('Stage not found');
  if (allStages.length <= 1) throw new BadRequestError('Cannot delete the last remaining stage');

  const stage = allStages[index];
  const adjacent = allStages[index - 1] ?? allStages[index + 1];

  await prisma.student.updateMany({ where: { stage: stage.key }, data: { stage: adjacent.key, stageOrder: 0 } });
  await prisma.stageTemplate.delete({ where: { id } });

  return ok({ movedStudentsTo: adjacent.key });
});
