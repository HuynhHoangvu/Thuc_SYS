import { z } from 'zod';

const itemSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  required: z.boolean().optional(),
  order: z.number(),
});

export const createChecklistSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    country: z.enum(['USA', 'Canada', 'New Zealand']),
    items: z.array(itemSchema).min(1),
  }),
});

export const updateItemProgressSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),
});

export type CreateChecklistInput = z.infer<typeof createChecklistSchema>['body'];
