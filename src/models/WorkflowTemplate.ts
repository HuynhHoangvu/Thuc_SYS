import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const WorkflowTemplateSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, enum: ['USA', 'Canada', 'NewZealand'] },
    description: { type: String },
    steps: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type WorkflowTemplateDoc = InferSchemaType<typeof WorkflowTemplateSchema> & { _id: mongoose.Types.ObjectId };

export const WorkflowTemplate =
  (mongoose.models.WorkflowTemplate as mongoose.Model<WorkflowTemplateDoc>) ||
  mongoose.model<WorkflowTemplateDoc>('WorkflowTemplate', WorkflowTemplateSchema);

export default WorkflowTemplate;
