import { connectDB } from '@/lib/mongoose';
import { EmailTemplate } from '@/models/EmailTemplate';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toEmailTemplateDTO, updateEmailTemplateSchema } from '@/lib/email-templates/dto';

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateEmailTemplateSchema.parse(await req.json());
  await connectDB();
  const template = await EmailTemplate.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!template) throw new NotFoundError('Email template not found');
  return ok(toEmailTemplateDTO(template.toObject()));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const template = await EmailTemplate.findByIdAndDelete(id);
  if (!template) throw new NotFoundError('Email template not found');
  return noContent();
});
