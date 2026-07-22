import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const TravelerDocumentSchema = new Schema(
  {
    travelerId: { type: String, required: true },
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

TravelerDocumentSchema.index({ travelerId: 1, category: 1 });

export type TravelerDocumentDoc = InferSchemaType<typeof TravelerDocumentSchema> & { _id: mongoose.Types.ObjectId };

export const TravelerDocument =
  (mongoose.models.TravelerDocument as mongoose.Model<TravelerDocumentDoc>) ||
  mongoose.model<TravelerDocumentDoc>('TravelerDocument', TravelerDocumentSchema);

export default TravelerDocument;
