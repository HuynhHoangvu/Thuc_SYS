import { Schema, model, Document, Types } from 'mongoose';

interface IStepProgress {
  key: string;
  completed: boolean;
  completedAt?: Date;
}

export interface IWorkflowProgress extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  template: Types.ObjectId;
  steps: IStepProgress[];
  createdAt: Date;
  updatedAt: Date;
}

const stepProgressSchema = new Schema<IStepProgress>(
  {
    key: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: Date,
  },
  { _id: false }
);

const workflowProgressSchema = new Schema<IWorkflowProgress>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    template: { type: Schema.Types.ObjectId, ref: 'WorkflowTemplate', required: true },
    steps: [stepProgressSchema],
  },
  { timestamps: true }
);

workflowProgressSchema.index({ student: 1, template: 1 }, { unique: true });

export const WorkflowProgress = model<IWorkflowProgress>('WorkflowProgress', workflowProgressSchema);
