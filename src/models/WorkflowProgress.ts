import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const WorkflowProgressSchema = new Schema(
  {
    studentId: { type: String, required: true },
    templateId: { type: String, required: true },
    steps: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

WorkflowProgressSchema.index({ studentId: 1, templateId: 1 }, { unique: true });

export type WorkflowProgressDoc = InferSchemaType<typeof WorkflowProgressSchema> & { _id: mongoose.Types.ObjectId };

export const WorkflowProgress =
  (mongoose.models.WorkflowProgress as mongoose.Model<WorkflowProgressDoc>) ||
  mongoose.model<WorkflowProgressDoc>('WorkflowProgress', WorkflowProgressSchema);

export default WorkflowProgress;
