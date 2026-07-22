import { z } from 'zod';
import type { StageTemplateDoc } from '@/models/StageTemplate';

export const createStageSchema = z.object({
  key: z
    .string()
    .min(1)
    .regex(/^[a-z0-9_-]+$/, 'key must be lowercase alphanumeric with - or _'),
  title: z.string().min(1),
  color: z.string().optional(),
  order: z.number().optional(),
  type: z.enum(['student', 'travel']).default('student'),
});

export const updateStageSchema = z.object({
  title: z.string().min(1).optional(),
  color: z.string().optional(),
  order: z.number().optional(),
});

export type CreateStageInput = z.infer<typeof createStageSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;

type StageLike = Pick<StageTemplateDoc, 'key' | 'title' | 'color' | 'order' | 'type'> & { _id: unknown };

export function toStageDTO(stage: StageLike) {
  return {
    id: String(stage._id),
    key: stage.key,
    title: stage.title,
    color: stage.color ?? undefined,
    order: stage.order,
    type: stage.type,
  };
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

export const DEFAULT_TRAVEL_STAGES: Array<{ key: string; title: string; color: string; order: number }> = [
  { key: 'thu_thap_ho_so', title: 'Thu thập hồ sơ', color: '#fbcfe8', order: 0 },
  { key: 'chuan_bi_tai_chinh', title: 'Chuẩn bị tài chính', color: '#fde68a', order: 1 },
  { key: 'nop_don', title: 'Nộp đơn', color: '#bae6fd', order: 2 },
  { key: 'phong_van', title: 'Phỏng vấn', color: '#a5f3fc', order: 3 },
  { key: 'dau_visa', title: 'Đậu visa', color: '#a7f3d0', order: 4 },
  { key: 'roi_visa', title: 'Rớt visa', color: '#fecaca', order: 5 },
  { key: 'hoan_tat', title: 'Hoàn tất', color: '#d4d4d8', order: 6 },
];
