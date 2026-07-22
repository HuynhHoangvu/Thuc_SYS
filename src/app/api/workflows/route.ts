import { connectDB } from '@/lib/mongoose';
import { WorkflowTemplate, type WorkflowTemplateDoc } from '@/models/WorkflowTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createTemplateSchema, countryToDb, toTemplateDTO } from '@/lib/workflow/dto';

export const GET = withErrorHandling(async () => {
  await connectDB();
  const templates = await WorkflowTemplate.find().sort({ createdAt: -1 });
  return ok(templates.map((t) => toTemplateDTO(t.toObject())));
});

export const POST = withErrorHandling(async (req) => {
  const body = createTemplateSchema.parse(await req.json());
  await connectDB();
  const template = await WorkflowTemplate.create({
    name: body.name,
    country: countryToDb(body.country) as WorkflowTemplateDoc['country'],
    description: body.description,
    steps: body.steps,
  });
  return ok(toTemplateDTO(template.toObject()), 201);
});
