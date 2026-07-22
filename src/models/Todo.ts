import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const TodoSchema = new Schema(
  {
    studentId: { type: String, required: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

TodoSchema.index({ studentId: 1 });

export type TodoDoc = InferSchemaType<typeof TodoSchema> & { _id: mongoose.Types.ObjectId };

export const Todo = (mongoose.models.Todo as mongoose.Model<TodoDoc>) || mongoose.model<TodoDoc>('Todo', TodoSchema);

export default Todo;
