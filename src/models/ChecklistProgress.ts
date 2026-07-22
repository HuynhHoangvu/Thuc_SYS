import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const ChecklistProgressSchema = new Schema(
  {
    studentId: { type: String, required: true },
    templateId: { type: String, required: true },
    items: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

ChecklistProgressSchema.index({ studentId: 1, templateId: 1 }, { unique: true });

export type ChecklistProgressDoc = InferSchemaType<typeof ChecklistProgressSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ChecklistProgress =
  (mongoose.models.ChecklistProgress as mongoose.Model<ChecklistProgressDoc>) ||
  mongoose.model<ChecklistProgressDoc>('ChecklistProgress', ChecklistProgressSchema);

export default ChecklistProgress;
