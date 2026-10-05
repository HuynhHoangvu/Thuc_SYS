import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const DailyNoteSchema = new Schema(
  {
    date: { type: String, required: true, unique: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

export type DailyNoteDoc = InferSchemaType<typeof DailyNoteSchema> & { _id: mongoose.Types.ObjectId };

export const DailyNote =
  (mongoose.models.DailyNote as mongoose.Model<DailyNoteDoc>) || mongoose.model<DailyNoteDoc>('DailyNote', DailyNoteSchema);

export default DailyNote;
