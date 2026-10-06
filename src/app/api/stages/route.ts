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

  // One query in the normal case; the count round trip is only needed to seed an empty collection.
  let stages = await StageTemplate.find({ type }).sort({ order: 1 }).lean();
  if (stages.length === 0) {
    const defaults = type === 'travel' ? DEFAULT_TRAVEL_STAGES : DEFAULT_STAGES;
    await StageTemplate.insertMany(defaults.map((s) => ({ ...s, type })));
    stages = await StageTemplate.find({ type }).sort({ order: 1 }).lean();
  }
  return ok(stages.map((s) => toStageDTO(s)));
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
