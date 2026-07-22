import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { StageTemplate } from '@/models/StageTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toStageDTO } from '@/lib/stages/dto';

const reorderSchema = z.object({
  stages: z.array(z.object({ id: z.string(), order: z.number() })).min(1),
});

export const PUT = withErrorHandling(async (req) => {
  const { stages } = reorderSchema.parse(await req.json());
  await connectDB();

  await Promise.all(stages.map(({ id, order }) => StageTemplate.findByIdAndUpdate(id, { order })));

  const updated = await StageTemplate.find().sort({ order: 1 });
  return ok(updated.map((s) => toStageDTO(s.toObject())));
});
