import { z } from 'zod';
import type { StageTemplateDoc } from '@/models/StageTemplate';
import { getPreset } from '@/lib/notifications/templates';

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

export const emailTemplateSchema = z.object({
  enabled: z.boolean(),
  presetKey: z.string().optional(),
  subject: z.string(),
  body: z.string(),
  nextUpdateDays: z.number().int().min(0).max(365).default(7),
});

export const updateStageSchema = z.object({
  title: z.string().min(1).optional(),
  color: z.string().optional(),
  order: z.number().optional(),
  emailTemplate: emailTemplateSchema.optional(),
});

export type CreateStageInput = z.infer<typeof createStageSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;

type StageLike = Pick<StageTemplateDoc, 'key' | 'title' | 'color' | 'order' | 'type'> & {
  _id: unknown;
  emailTemplate?: StageTemplateDoc['emailTemplate'] | null;
};

export function toStageDTO(stage: StageLike) {
  return {
    id: String(stage._id),
    key: stage.key,
    title: stage.title,
    color: stage.color ?? undefined,
    order: stage.order,
    type: stage.type,
    emailTemplate: stage.emailTemplate?.subject
      ? {
          enabled: Boolean(stage.emailTemplate.enabled),
          presetKey: stage.emailTemplate.presetKey ?? undefined,
          subject: stage.emailTemplate.subject,
          body: stage.emailTemplate.body ?? '',
          nextUpdateDays: stage.emailTemplate.nextUpdateDays ?? 7,
        }
      : undefined,
  };
}

type DefaultStage = {
  key: string;
  title: string;
  color: string;
  order: number;
  emailTemplate?: { enabled: boolean; presetKey: string; subject: string; body: string; nextUpdateDays: number };
};

// Student pipeline follows the 7 customer-facing phases; each phase carries its email preset.
// Phase 6 (interview reminder) is sent automatically by the cron job, so it isn't a stage.
const STUDENT_STAGE_DEFS: Array<[key: string, title: string, color: string, presetKey?: string, nextUpdateDays?: number]> = [
  ['lead', 'Tiềm năng', '#fbcfe8'],
  ['hop_dong', 'GĐ1 · Ký HĐ & thu thập giấy tờ', '#fde68a', 'gd1_hop_dong', 7],
  ['nop_ho_so', 'GĐ2 · Nộp hồ sơ xin I-20', '#bae6fd', 'gd2_nop_ho_so', 14],
  ['xin_visa', 'GĐ3 · Có I-20, làm visa', '#a5f3fc', 'gd3_i20_visa', 7],
  ['luyen_pv', 'GĐ4 · Luyện phỏng vấn', '#c4b5fd', 'gd4_luyen_pv', 7],
  ['lich_pv', 'GĐ5 · Có lịch phỏng vấn', '#ddd6fe', 'gd5_lich_pv', 7],
  ['dau_visa', 'GĐ7 · Đậu visa', '#86efac', 'gd7a_dau_visa', 0],
  ['rot_visa', 'GĐ7 · Rớt visa', '#fecaca', 'gd7b_rot_visa', 0],
  ['closed', 'Đóng', '#d4d4d8'],
];

export const DEFAULT_STAGES: DefaultStage[] = STUDENT_STAGE_DEFS.map(([key, title, color, presetKey, nextUpdateDays], order) => {
  const preset = getPreset(presetKey);
  return {
    key,
    title,
    color,
    order,
    emailTemplate: preset
      ? { enabled: true, presetKey: preset.key, subject: preset.subject, body: preset.body, nextUpdateDays: nextUpdateDays ?? 7 }
      : undefined,
  };
});

export const DEFAULT_TRAVEL_STAGES: Array<{ key: string; title: string; color: string; order: number }> = [
  { key: 'thu_thap_ho_so', title: 'Thu thập hồ sơ', color: '#fbcfe8', order: 0 },
  { key: 'chuan_bi_tai_chinh', title: 'Chuẩn bị tài chính', color: '#fde68a', order: 1 },
  { key: 'nop_don', title: 'Nộp đơn', color: '#bae6fd', order: 2 },
  { key: 'phong_van', title: 'Phỏng vấn', color: '#a5f3fc', order: 3 },
  { key: 'dau_visa', title: 'Đậu visa', color: '#a7f3d0', order: 4 },
  { key: 'roi_visa', title: 'Rớt visa', color: '#fecaca', order: 5 },
  { key: 'hoan_tat', title: 'Hoàn tất', color: '#d4d4d8', order: 6 },
];
