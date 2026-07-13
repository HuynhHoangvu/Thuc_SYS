import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { DEFAULT_CHECKLISTS, createChecklistSchema, countryToDb, toTemplateDTO } from '@/lib/checklists/dto';

export const GET = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country') ?? undefined;

  const count = await prisma.checklistTemplate.count();
  if (count === 0) {
    await prisma.checklistTemplate.createMany({
      data: DEFAULT_CHECKLISTS.map((c) => ({ name: c.name, country: countryToDb(c.country), items: c.items })),
    });
  }

  const templates = await prisma.checklistTemplate.findMany({
    where: country ? { country: countryToDb(country) } : undefined,
    orderBy: { createdAt: 'desc' },
  });
  return ok(templates.map(toTemplateDTO));
});

export const POST = withErrorHandling(async (req) => {
  const body = createChecklistSchema.parse(await req.json());
  const template = await prisma.checklistTemplate.create({
    data: { name: body.name, country: countryToDb(body.country), items: body.items },
  });
  return ok(toTemplateDTO(template), 201);
});
