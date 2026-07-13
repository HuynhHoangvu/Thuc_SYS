import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createTemplateSchema, countryToDb, toTemplateDTO } from '@/lib/workflow/dto';

export const GET = withErrorHandling(async () => {
  const templates = await prisma.workflowTemplate.findMany({ orderBy: { createdAt: 'desc' } });
  return ok(templates.map(toTemplateDTO));
});

export const POST = withErrorHandling(async (req) => {
  const body = createTemplateSchema.parse(await req.json());
  const template = await prisma.workflowTemplate.create({
    data: { name: body.name, country: countryToDb(body.country), description: body.description, steps: body.steps },
  });
  return ok(toTemplateDTO(template), 201);
});
