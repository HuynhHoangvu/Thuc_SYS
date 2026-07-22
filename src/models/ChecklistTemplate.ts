import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const ChecklistTemplateSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, enum: ['USA', 'Canada', 'NewZealand'], required: true },
    items: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export type ChecklistTemplateDoc = InferSchemaType<typeof ChecklistTemplateSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ChecklistTemplate =
  (mongoose.models.ChecklistTemplate as mongoose.Model<ChecklistTemplateDoc>) ||
  mongoose.model<ChecklistTemplateDoc>('ChecklistTemplate', ChecklistTemplateSchema);

export default ChecklistTemplate;
