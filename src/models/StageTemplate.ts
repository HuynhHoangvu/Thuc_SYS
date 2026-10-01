import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const StageTemplateSchema = new Schema(
  {
    type: { type: String, enum: ['student', 'travel'], default: 'student' },
    key: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String },
    order: { type: Number, default: 0 },
    emailTemplate: {
      enabled: { type: Boolean, default: false },
      presetKey: { type: String },
      subject: { type: String },
      body: { type: String },
      nextUpdateDays: { type: Number, default: 7 },
    },
  },
  { timestamps: true }
);

StageTemplateSchema.index({ type: 1, key: 1 }, { unique: true });

export type StageTemplateDoc = InferSchemaType<typeof StageTemplateSchema> & { _id: mongoose.Types.ObjectId };

export const StageTemplate =
  (mongoose.models.StageTemplate as mongoose.Model<StageTemplateDoc>) ||
  mongoose.model<StageTemplateDoc>('StageTemplate', StageTemplateSchema);

export default StageTemplate;
