import { Schema, model, Document, Types } from 'mongoose';

export interface IKanbanColumn extends Document {
  _id: Types.ObjectId;
  key: string;
  title: string;
  color?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const kanbanColumnSchema = new Schema<IKanbanColumn>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    color: { type: String, default: '#a78bfa' },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const KanbanColumn = model<IKanbanColumn>('KanbanColumn', kanbanColumnSchema);

export const DEFAULT_KANBAN_COLUMNS: Array<Pick<IKanbanColumn, 'key' | 'title' | 'color' | 'order'>> = [
  { key: 'lead', title: 'Tiềm năng', color: '#fbcfe8', order: 0 },
  { key: 'consultation', title: 'Tư vấn', color: '#fde68a', order: 1 },
  { key: 'application', title: 'Hồ sơ', color: '#bae6fd', order: 2 },
  { key: 'offer', title: 'Thư mời nhập học', color: '#a7f3d0', order: 3 },
  { key: 'visa', title: 'Visa', color: '#c4b5fd', order: 4 },
  { key: 'enrolled', title: 'Đã nhập học', color: '#86efac', order: 5 },
  { key: 'closed', title: 'Đóng', color: '#d4d4d8', order: 6 },
];
