import { connectDB } from '@/lib/mongoose';
import { ChecklistTemplate, type ChecklistTemplateDoc } from '@/models/ChecklistTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { DEFAULT_CHECKLISTS, createChecklistSchema, countryToDb, toTemplateDTO } from '@/lib/checklists/dto';

export const GET = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country') ?? undefined;
  await connectDB();

  const count = await ChecklistTemplate.countDocuments();
  if (count === 0) {
    await ChecklistTemplate.insertMany(
      DEFAULT_CHECKLISTS.map((c) => ({ name: c.name, country: countryToDb(c.country), items: c.items }))
    );
  }

  const filter: Partial<Pick<ChecklistTemplateDoc, 'country'>> = country
    ? { country: countryToDb(country) as ChecklistTemplateDoc['country'] }
    : {};
  const templates = await ChecklistTemplate.find(filter).sort({
    createdAt: -1,
  });
  return ok(templates.map((t) => toTemplateDTO(t.toObject())));
});

export const POST = withErrorHandling(async (req) => {
  const body = createChecklistSchema.parse(await req.json());
  await connectDB();
  const template = await ChecklistTemplate.create({
    name: body.name,
    country: countryToDb(body.country) as ChecklistTemplateDoc['country'],
    items: body.items,
  });
  return ok(toTemplateDTO(template.toObject()), 201);
});
