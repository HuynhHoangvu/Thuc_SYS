import { z } from 'zod';
import type { ChecklistTemplateDoc } from '@/models/ChecklistTemplate';
import type { ChecklistProgressDoc } from '@/models/ChecklistProgress';

const itemSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  required: z.boolean().optional(),
  order: z.number(),
});

export const createChecklistSchema = z.object({
  name: z.string().min(1),
  country: z.enum(['USA', 'Canada', 'New Zealand']),
  items: z.array(itemSchema).min(1),
});

export type ChecklistItem = z.infer<typeof itemSchema>;

const countryDbToDto: Record<string, string> = { USA: 'USA', Canada: 'Canada', NewZealand: 'New Zealand' };
const countryDtoToDb: Record<string, string> = { USA: 'USA', Canada: 'Canada', 'New Zealand': 'NewZealand' };

export function countryToDb(country: string) {
  return countryDtoToDb[country];
}

type Template = Pick<ChecklistTemplateDoc, 'name' | 'country' | 'items'> & { _id: unknown };

export function toTemplateDTO(template: Template) {
  return {
    id: String(template._id),
    name: template.name,
    country: countryDbToDto[template.country],
    items: template.items as unknown as ChecklistItem[],
  };
}

type Progress = Pick<ChecklistProgressDoc, 'studentId' | 'items'> & { _id: unknown };

export function toProgressDTO(progress: Progress, template: Template) {
  return {
    id: String(progress._id),
    student: progress.studentId,
    template: toTemplateDTO(template),
    items: progress.items as unknown as Array<{ key: string; completed: boolean; completedAt?: string }>,
  };
}

export const DEFAULT_CHECKLISTS: Array<{ name: string; country: string; items: ChecklistItem[] }> = [
  {
    name: 'Checklist visa F-1 Mỹ',
    country: 'USA',
    items: [
      { key: 'passport', label: 'Hộ chiếu còn hiệu lực', required: true, order: 0 },
      { key: 'i20', label: 'Mẫu I-20', required: true, order: 1 },
      { key: 'sevis-fee', label: 'Biên lai phí SEVIS I-901', required: true, order: 2 },
      { key: 'ds160', label: 'Xác nhận DS-160', required: true, order: 3 },
      { key: 'financial-proof', label: 'Giấy tờ chứng minh tài chính', required: true, order: 4 },
    ],
  },
  {
    name: 'Checklist Study Permit Canada',
    country: 'Canada',
    items: [
      { key: 'passport', label: 'Hộ chiếu còn hiệu lực', required: true, order: 0 },
      { key: 'loa', label: 'Thư mời nhập học (LOA)', required: true, order: 1 },
      { key: 'gic-or-financial', label: 'GIC hoặc chứng minh tài chính', required: true, order: 2 },
      { key: 'medical-exam', label: 'Khám sức khỏe (nếu yêu cầu)', required: false, order: 3 },
    ],
  },
  {
    name: 'Checklist visa du học New Zealand',
    country: 'New Zealand',
    items: [
      { key: 'passport', label: 'Hộ chiếu còn hiệu lực', required: true, order: 0 },
      { key: 'offer-letter', label: 'Thư mời nhập học (Offer of Place)', required: true, order: 1 },
      { key: 'funds-evidence', label: 'Chứng minh tài chính', required: true, order: 2 },
      { key: 'medical-chest-xray', label: 'Giấy khám sức khỏe & chụp X-quang phổi', required: false, order: 3 },
    ],
  },
];
