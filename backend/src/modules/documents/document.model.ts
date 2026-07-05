import { Schema, model, Document as MongooseDocument, Types } from 'mongoose';

export interface IStudentDocument extends MongooseDocument {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  category: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  url: string;
  version: number;
  previousVersion?: Types.ObjectId;
  ocrStatus: 'not_applicable' | 'pending' | 'done' | 'failed';
  virusScanStatus: 'pending' | 'clean' | 'infected';
  createdAt: Date;
  updatedAt: Date;
}

const studentDocumentSchema = new Schema<IStudentDocument>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    category: { type: String, required: true, trim: true },
    originalName: { type: String, required: true },
    storedName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    version: { type: Number, default: 1 },
    previousVersion: { type: Schema.Types.ObjectId, ref: 'StudentDocument' },
    ocrStatus: { type: String, enum: ['not_applicable', 'pending', 'done', 'failed'], default: 'not_applicable' },
    virusScanStatus: { type: String, enum: ['pending', 'clean', 'infected'], default: 'pending' },
  },
  { timestamps: true }
);

export const StudentDocument = model<IStudentDocument>('StudentDocument', studentDocumentSchema);
