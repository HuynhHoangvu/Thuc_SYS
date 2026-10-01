import mongoose, { Schema } from 'mongoose';

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const Counter =
  (mongoose.models.Counter as mongoose.Model<{ _id: string; seq: number }>) ||
  mongoose.model<{ _id: string; seq: number }>('Counter', CounterSchema);

// Atomically returns the next number in a named sequence (e.g. "case-2026").
export async function nextSequence(name: string) {
  const doc = await Counter.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { new: true, upsert: true });
  return doc.seq;
}

export default Counter;
