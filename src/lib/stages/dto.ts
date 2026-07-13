import { z } from 'zod';
import type { Prisma } from '@/generated/prisma/client';

export const createStageSchema = z.object({
  key: z
    .string()
    .min(1)
    .regex(/^[a-z0-9_-]+$/, 'key must be lowercase alphanumeric with - or _'),
  title: z.string().min(1),
  color: z.string().optional(),
  order: z.number().optional(),
});

export const updateStageSchema = z.object({
  title: z.string().min(1).optional(),
  color: z.string().optional(),
  order: z.number().optional(),
});

export type CreateStageInput = z.infer<typeof createStageSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;

type Stage = Prisma.StageTemplateGetPayload<Record<string, never>>;

export function toStageDTO(stage: Stage) {
  return { id: stage.id, key: stage.key, title: stage.title, color: stage.color ?? undefined, order: stage.order };
}

export const DEFAULT_STAGES: Array<{ key: string; title: string; color: string; order: number }> = [
  { key: 'lead', title: 'Tiềm năng', color: '#fbcfe8', order: 0 },
  { key: 'consultation', title: 'Tư vấn', color: '#fde68a', order: 1 },
  { key: 'application', title: 'Hồ sơ', color: '#bae6fd', order: 2 },
  { key: 'offer', title: 'Thư mời nhập học', color: '#a7f3d0', order: 3 },
  { key: 'visa', title: 'Visa', color: '#c4b5fd', order: 4 },
  { key: 'enrolled', title: 'Đã nhập học', color: '#86efac', order: 5 },
  { key: 'closed', title: 'Đóng', color: '#d4d4d8', order: 6 },
];
