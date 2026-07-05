import { Schema, model, Document, Types } from 'mongoose';

interface IChecklistItemProgress {
  key: string;
  completed: boolean;
  completedAt?: Date;
}

export interface IChecklistProgress extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  template: Types.ObjectId;
  items: IChecklistItemProgress[];
  createdAt: Date;
  updatedAt: Date;
}

const itemProgressSchema = new Schema<IChecklistItemProgress>(
  {
    key: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: Date,
  },
  { _id: false }
);

const checklistProgressSchema = new Schema<IChecklistProgress>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    template: { type: Schema.Types.ObjectId, ref: 'ChecklistTemplate', required: true },
    items: [itemProgressSchema],
  },
  { timestamps: true }
);

checklistProgressSchema.index({ student: 1, template: 1 }, { unique: true });

export const ChecklistProgress = model<IChecklistProgress>('ChecklistProgress', checklistProgressSchema);
