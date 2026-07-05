import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkflowStep {
  key: string;
  title: string;
  description?: string;
  order: number;
  stage?: string;
}

export interface IWorkflowTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  country?: 'USA' | 'Canada' | 'New Zealand';
  description?: string;
  steps: IWorkflowStep[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workflowStepSchema = new Schema<IWorkflowStep>(
  {
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    order: { type: Number, required: true },
    stage: String,
  },
  { _id: false }
);

const workflowTemplateSchema = new Schema<IWorkflowTemplate>(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, enum: ['USA', 'Canada', 'New Zealand'] },
    description: String,
    steps: [workflowStepSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const WorkflowTemplate = model<IWorkflowTemplate>('WorkflowTemplate', workflowTemplateSchema);
