import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const EmailTemplateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    html: { type: String, required: true },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export type EmailTemplateDoc = InferSchemaType<typeof EmailTemplateSchema> & { _id: mongoose.Types.ObjectId };

export const EmailTemplate =
  (mongoose.models.EmailTemplate as mongoose.Model<EmailTemplateDoc>) ||
  mongoose.model<EmailTemplateDoc>('EmailTemplate', EmailTemplateSchema);

export default EmailTemplate;
