export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  seedKey?: string;
  isBuiltIn: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type EmailTemplateInput = Pick<EmailTemplate, 'name' | 'subject' | 'html'>;
