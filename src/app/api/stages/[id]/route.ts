import { connectDB } from '@/lib/mongoose';
import { StageTemplate } from '@/models/StageTemplate';
import { Traveler } from '@/models/Traveler';
import { Student } from '@/models/Student';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import { toStageDTO, updateStageSchema } from '@/lib/stages/dto';

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateStageSchema.parse(await req.json());
  await connectDB();

  const exists = await StageTemplate.exists({ _id: id });
  if (!exists) throw new NotFoundError('Stage not found');

  const stage = await StageTemplate.findByIdAndUpdate(id, body, { new: true });
  if (!stage) throw new NotFoundError('Stage not found');
  return ok(toStageDTO(stage.toObject()));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();

  const target = await StageTemplate.findById(id);
  if (!target) throw new NotFoundError('Stage not found');

  const allStages = await StageTemplate.find({ type: target.type }).sort({ order: 1 });
  const index = allStages.findIndex((s) => String(s._id) === id);
  if (allStages.length <= 1) throw new BadRequestError('Cannot delete the last remaining stage');

  const stage = allStages[index];
  const adjacent = allStages[index - 1] ?? allStages[index + 1];

  if (stage.type === 'travel') {
    await Traveler.updateMany({ stage: stage.key }, { stage: adjacent.key, stageOrder: 0 });
  } else {
    await Student.updateMany({ stage: stage.key }, { stage: adjacent.key, stageOrder: 0 });
  }
  await StageTemplate.findByIdAndDelete(id);

  return ok({ movedStudentsTo: adjacent.key });
});
