import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const StudentDocumentSchema = new Schema(
  {
    studentId: { type: String, required: true },
    category: { type: String, required: true },
    originalName: { type: String, required: true },
    storedName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
    version: { type: Number, default: 1 },
    previousVersionId: { type: String },
    ocrStatus: { type: String, enum: ['not_applicable', 'pending', 'done', 'failed'], default: 'not_applicable' },
    virusScanStatus: { type: String, enum: ['pending', 'clean', 'infected'], default: 'pending' },
  },
  { timestamps: true }
);

StudentDocumentSchema.index({ studentId: 1, category: 1 });

export type StudentDocumentDoc = InferSchemaType<typeof StudentDocumentSchema> & { _id: mongoose.Types.ObjectId };

export const StudentDocument =
  (mongoose.models.StudentDocument as mongoose.Model<StudentDocumentDoc>) ||
  mongoose.model<StudentDocumentDoc>('StudentDocument', StudentDocumentSchema);

export default StudentDocument;
