import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { ConflictError } from '@/lib/errors';
import { DEFAULT_STAGES, createStageSchema, toStageDTO } from '@/lib/stages/dto';

export const GET = withErrorHandling(async () => {
  const count = await prisma.stageTemplate.count();
  if (count === 0) {
    await prisma.stageTemplate.createMany({ data: DEFAULT_STAGES });
  }
  const stages = await prisma.stageTemplate.findMany({ orderBy: { order: 'asc' } });
  return ok(stages.map(toStageDTO));
});

export const POST = withErrorHandling(async (req) => {
  const body = createStageSchema.parse(await req.json());

  const existing = await prisma.stageTemplate.findUnique({ where: { key: body.key } });
  if (existing) throw new ConflictError(`Stage with key "${body.key}" already exists`);

  const maxOrderStage = await prisma.stageTemplate.findFirst({ orderBy: { order: 'desc' } });
  const stage = await prisma.stageTemplate.create({
    data: {
      key: body.key,
      title: body.title,
      color: body.color,
      order: body.order ?? (maxOrderStage ? maxOrderStage.order + 1 : 0),
    },
  });
  return ok(toStageDTO(stage), 201);
});
