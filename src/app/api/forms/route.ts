import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createFormTemplateSchema, countryToDb, toTemplateDTO } from '@/lib/forms/dto';

export const GET = withErrorHandling(async () => {
  const templates = await prisma.formTemplate.findMany({ orderBy: { createdAt: 'desc' } });
  return ok(templates.map(toTemplateDTO));
});

export const POST = withErrorHandling(async (req) => {
  const body = createFormTemplateSchema.parse(await req.json());
  const template = await prisma.formTemplate.create({
    data: { name: body.name, country: countryToDb(body.country), description: body.description, fields: body.fields },
  });
  return ok(toTemplateDTO(template), 201);
});
