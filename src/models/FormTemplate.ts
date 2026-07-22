import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const FormTemplateSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, enum: ['USA', 'Canada', 'NewZealand'] },
    description: { type: String },
    fields: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type FormTemplateDoc = InferSchemaType<typeof FormTemplateSchema> & { _id: mongoose.Types.ObjectId };

export const FormTemplate =
  (mongoose.models.FormTemplate as mongoose.Model<FormTemplateDoc>) ||
  mongoose.model<FormTemplateDoc>('FormTemplate', FormTemplateSchema);

export default FormTemplate;
