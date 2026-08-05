import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const SalaryEntrySchema = new Schema(
  {
    monthKey: { type: String, required: true }, // e.g. "2026-08"
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    personName: { type: String },
  },
  { timestamps: true }
);

SalaryEntrySchema.index({ monthKey: 1 });

export type SalaryEntryDoc = InferSchemaType<typeof SalaryEntrySchema> & { _id: mongoose.Types.ObjectId };

export const SalaryEntry =
  (mongoose.models.SalaryEntry as mongoose.Model<SalaryEntryDoc>) ||
  mongoose.model<SalaryEntryDoc>('SalaryEntry', SalaryEntrySchema);

export default SalaryEntry;
