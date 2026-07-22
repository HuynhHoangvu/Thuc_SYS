import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const FormSubmissionSchema = new Schema(
  {
    templateId: { type: String, required: true },
    studentId: { type: String, required: true },
    values: { type: Schema.Types.Mixed, required: true },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

FormSubmissionSchema.index({ templateId: 1, studentId: 1 }, { unique: true });

export type FormSubmissionDoc = InferSchemaType<typeof FormSubmissionSchema> & { _id: mongoose.Types.ObjectId };

export const FormSubmission =
  (mongoose.models.FormSubmission as mongoose.Model<FormSubmissionDoc>) ||
  mongoose.model<FormSubmissionDoc>('FormSubmission', FormSubmissionSchema);

export default FormSubmission;
