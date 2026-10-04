import { z } from 'zod';
import type { EmailTemplateDoc } from '@/models/EmailTemplate';

export const createEmailTemplateSchema = z.object({
  name: z.string().trim().min(1).max(160),
  subject: z.string().trim().min(1).max(300),
  html: z.string().min(1).max(5_000_000),
});

export const updateEmailTemplateSchema = createEmailTemplateSchema.partial();

type Template = Pick<EmailTemplateDoc, 'name' | 'subject' | 'html' | 'seedKey'> & {
  _id: unknown;
  createdAt?: Date;
  updatedAt?: Date;
};

export function toEmailTemplateDTO(template: Template) {
  return {
    id: String(template._id),
    name: template.name,
    subject: template.subject,
    html: template.html,
    isBuiltIn: Boolean(template.seedKey),
    createdAt: template.createdAt?.toISOString(),
    updatedAt: template.updatedAt?.toISOString(),
  };
}
