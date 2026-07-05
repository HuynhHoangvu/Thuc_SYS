import { Schema, model, Document, Types } from 'mongoose';

export interface IFormSubmission extends Document {
  _id: Types.ObjectId;
  template: Types.ObjectId;
  student: Types.ObjectId;
  values: Record<string, unknown>;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const formSubmissionSchema = new Schema<IFormSubmission>(
  {
    template: { type: Schema.Types.ObjectId, ref: 'FormTemplate', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    values: { type: Schema.Types.Mixed, default: {} },
    submittedAt: Date,
  },
  { timestamps: true }
);

formSubmissionSchema.index({ template: 1, student: 1 }, { unique: true });

export const FormSubmission = model<IFormSubmission>('FormSubmission', formSubmissionSchema);
