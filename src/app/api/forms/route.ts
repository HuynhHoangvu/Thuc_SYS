import { connectDB } from '@/lib/mongoose';
import { FormTemplate, type FormTemplateDoc } from '@/models/FormTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createFormTemplateSchema, countryToDb, toTemplateDTO } from '@/lib/forms/dto';

export const GET = withErrorHandling(async () => {
  await connectDB();
  const templates = await FormTemplate.find().sort({ createdAt: -1 });
  return ok(templates.map((t) => toTemplateDTO(t.toObject())));
});

export const POST = withErrorHandling(async (req) => {
  const body = createFormTemplateSchema.parse(await req.json());
  await connectDB();
  const template = await FormTemplate.create({
    name: body.name,
    country: countryToDb(body.country) as FormTemplateDoc['country'],
    description: body.description,
    fields: body.fields,
  });
  return ok(toTemplateDTO(template.toObject()), 201);
});
