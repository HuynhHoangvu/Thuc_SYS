import { connectDB } from '@/lib/mongoose';
import { FormTemplate } from '@/models/FormTemplate';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { countryToDb, toTemplateDTO, updateFormTemplateSchema } from '@/lib/forms/dto';

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateFormTemplateSchema.parse(await req.json());
  await connectDB();

  const exists = await FormTemplate.exists({ _id: id });
  if (!exists) throw new NotFoundError('Form template not found');

  const data: Record<string, unknown> = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.country !== undefined) data.country = countryToDb(body.country);
  if (body.description !== undefined) data.description = body.description;
  if (body.fields !== undefined) data.fields = body.fields;
  if (body.isActive !== undefined) data.isActive = body.isActive;

  const template = await FormTemplate.findByIdAndUpdate(id, data, { new: true });
  if (!template) throw new NotFoundError('Form template not found');
  return ok(toTemplateDTO(template.toObject()));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const exists = await FormTemplate.exists({ _id: id });
  if (!exists) throw new NotFoundError('Form template not found');
  await FormTemplate.findByIdAndDelete(id);
  return noContent();
});
