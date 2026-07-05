import { z } from 'zod';

const stepSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number(),
  stage: z.string().optional(),
});

export const createTemplateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
    description: z.string().optional(),
    steps: z.array(stepSchema).min(1),
  }),
});

export const updateTemplateSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
    description: z.string().optional(),
    steps: z.array(stepSchema).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateStepProgressSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>['body'];
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>['body'];
