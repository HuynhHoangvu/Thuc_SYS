import { connectDB } from '@/lib/mongoose';
import { EmailTemplate } from '@/models/EmailTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createEmailTemplateSchema, toEmailTemplateDTO } from '@/lib/email-templates/dto';
import { ensureDefaultEmailTemplates } from '@/lib/email-templates/defaults';

export const runtime = 'nodejs';

export const GET = withErrorHandling(async () => {
  await connectDB();
  await ensureDefaultEmailTemplates();
  const templates = await EmailTemplate.find().sort({ updatedAt: -1 });
  return ok(templates.map((template) => toEmailTemplateDTO(template.toObject())));
});

export const POST = withErrorHandling(async (req) => {
  const body = createEmailTemplateSchema.parse(await req.json());
  await connectDB();
  const template = await EmailTemplate.create(body);
  return ok(toEmailTemplateDTO(template.toObject()), 201);
});
