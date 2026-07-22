import { connectDB } from '@/lib/mongoose';
import { WorkflowTemplate } from '@/models/WorkflowTemplate';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { countryToDb, toTemplateDTO, updateTemplateSchema } from '@/lib/workflow/dto';

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateTemplateSchema.parse(await req.json());
  await connectDB();

  const exists = await WorkflowTemplate.exists({ _id: id });
  if (!exists) throw new NotFoundError('Workflow template not found');

  const data: Record<string, unknown> = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.country !== undefined) data.country = countryToDb(body.country);
  if (body.description !== undefined) data.description = body.description;
  if (body.steps !== undefined) data.steps = body.steps;
  if (body.isActive !== undefined) data.isActive = body.isActive;

  const template = await WorkflowTemplate.findByIdAndUpdate(id, data, { new: true });
  if (!template) throw new NotFoundError('Workflow template not found');
  return ok(toTemplateDTO(template.toObject()));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const exists = await WorkflowTemplate.exists({ _id: id });
  if (!exists) throw new NotFoundError('Workflow template not found');
  await WorkflowTemplate.findByIdAndDelete(id);
  return noContent();
});
