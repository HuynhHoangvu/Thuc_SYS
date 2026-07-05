import { z } from 'zod';

const fieldSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['text', 'textarea', 'number', 'date', 'select', 'checkbox', 'file']),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  order: z.number(),
});

export const createFormTemplateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
    description: z.string().optional(),
    fields: z.array(fieldSchema).min(1),
  }),
});

export const updateFormTemplateSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
    description: z.string().optional(),
    fields: z.array(fieldSchema).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const submitFormSchema = z.object({
  body: z.object({
    values: z.record(z.string(), z.unknown()),
  }),
});

export type CreateFormTemplateInput = z.infer<typeof createFormTemplateSchema>['body'];
export type UpdateFormTemplateInput = z.infer<typeof updateFormTemplateSchema>['body'];
