import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const BonusItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const SalaryConfigSchema = new Schema(
  {
    baseSalary: { type: Number, required: true, default: 10_000_000 },
    bonusItems: { type: [BonusItemSchema], default: [] },
  },
  { timestamps: true }
);

export type SalaryConfigDoc = InferSchemaType<typeof SalaryConfigSchema> & { _id: mongoose.Types.ObjectId };

export const SalaryConfig =
  (mongoose.models.SalaryConfig as mongoose.Model<SalaryConfigDoc>) ||
  mongoose.model<SalaryConfigDoc>('SalaryConfig', SalaryConfigSchema);

export default SalaryConfig;
