import { Schema, model, Document, Types } from 'mongoose';

export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'file';

export interface IFormField {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}

export interface IFormTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  country?: 'USA' | 'Canada' | 'New Zealand';
  description?: string;
  fields: IFormField[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const formFieldSchema = new Schema<IFormField>(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, enum: ['text', 'textarea', 'number', 'date', 'select', 'checkbox', 'file'], required: true },
    required: { type: Boolean, default: false },
    options: [String],
    order: { type: Number, required: true },
  },
  { _id: false }
);

const formTemplateSchema = new Schema<IFormTemplate>(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, enum: ['USA', 'Canada', 'New Zealand'] },
    description: String,
    fields: [formFieldSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FormTemplate = model<IFormTemplate>('FormTemplate', formTemplateSchema);
