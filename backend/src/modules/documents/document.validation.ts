import { z } from 'zod';

export const renameDocumentSchema = z.object({
  body: z.object({
    originalName: z.string().min(1),
  }),
});
