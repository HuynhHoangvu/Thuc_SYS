import { z } from 'zod';

export const createColumnSchema = z.object({
  body: z.object({
    key: z
      .string()
      .min(1)
      .regex(/^[a-z0-9_-]+$/, 'key must be lowercase alphanumeric with - or _'),
    title: z.string().min(1),
    color: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const updateColumnSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    color: z.string().optional(),
  }),
});

export const reorderColumnsSchema = z.object({
  body: z.object({
    columns: z.array(z.object({ id: z.string(), order: z.number() })).min(1),
  }),
});

export const moveStudentSchema = z.object({
  body: z.object({
    stage: z.string().min(1),
    stageOrder: z.number().optional(),
  }),
});

export type CreateColumnInput = z.infer<typeof createColumnSchema>['body'];
export type UpdateColumnInput = z.infer<typeof updateColumnSchema>['body'];
export type ReorderColumnsInput = z.infer<typeof reorderColumnsSchema>['body'];
export type MoveStudentInput = z.infer<typeof moveStudentSchema>['body'];
