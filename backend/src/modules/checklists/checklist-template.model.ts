import { Schema, model, Document, Types } from 'mongoose';

export interface IChecklistItem {
  key: string;
  label: string;
  required: boolean;
  order: number;
}

export interface IChecklistTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  country: 'USA' | 'Canada' | 'New Zealand';
  items: IChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

const checklistItemSchema = new Schema<IChecklistItem>(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    required: { type: Boolean, default: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const checklistTemplateSchema = new Schema<IChecklistTemplate>(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, enum: ['USA', 'Canada', 'New Zealand'], required: true },
    items: [checklistItemSchema],
  },
  { timestamps: true }
);

export const ChecklistTemplate = model<IChecklistTemplate>('ChecklistTemplate', checklistTemplateSchema);

export const DEFAULT_CHECKLISTS: Array<{ name: string; country: 'USA' | 'Canada' | 'New Zealand'; items: IChecklistItem[] }> = [
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
