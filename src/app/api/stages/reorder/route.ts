import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toStageDTO } from '@/lib/stages/dto';

const reorderSchema = z.object({
  stages: z.array(z.object({ id: z.string(), order: z.number() })).min(1),
});

export const PUT = withErrorHandling(async (req) => {
  const { stages } = reorderSchema.parse(await req.json());

  await Promise.all(stages.map(({ id, order }) => prisma.stageTemplate.update({ where: { id }, data: { order } })));

  const updated = await prisma.stageTemplate.findMany({ orderBy: { order: 'asc' } });
  return ok(updated.map(toStageDTO));
});
