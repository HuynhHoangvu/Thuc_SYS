import { connectDB } from '@/lib/mongoose';
import { StageTemplate } from '@/models/StageTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { ConflictError } from '@/lib/errors';
import { DEFAULT_STAGES, DEFAULT_TRAVEL_STAGES, createStageSchema, toStageDTO } from '@/lib/stages/dto';

type StageType = 'student' | 'travel';

function parseType(value: string | null): StageType {
  return value === 'travel' ? 'travel' : 'student';
}

export const GET = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url);
  const type = parseType(searchParams.get('type'));
  await connectDB();

  const count = await StageTemplate.countDocuments({ type });
  if (count === 0) {
    const defaults = type === 'travel' ? DEFAULT_TRAVEL_STAGES : DEFAULT_STAGES;
    await StageTemplate.insertMany(defaults.map((s) => ({ ...s, type })));
  }
  const stages = await StageTemplate.find({ type }).sort({ order: 1 });
  return ok(stages.map((s) => toStageDTO(s.toObject())));
});

export const POST = withErrorHandling(async (req) => {
  const body = createStageSchema.parse(await req.json());
  const type = body.type as StageType;
  await connectDB();

  const existing = await StageTemplate.findOne({ type, key: body.key });
  if (existing) throw new ConflictError(`Stage with key "${body.key}" already exists`);

  const maxOrderStage = await StageTemplate.findOne({ type }).sort({ order: -1 });
  const stage = await StageTemplate.create({
    key: body.key,
    title: body.title,
    color: body.color,
    order: body.order ?? (maxOrderStage ? maxOrderStage.order + 1 : 0),
    type,
  });
  return ok(toStageDTO(stage.toObject()), 201);
});
