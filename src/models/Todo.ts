import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const TodoSchema = new Schema(
  {
    studentId: { type: String, required: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    // Stored as YYYY-MM-DD so due-day colors follow the staff's local calendar day.
    dueDate: { type: String, match: /^\d{4}-\d{2}-\d{2}$/ },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

TodoSchema.index({ studentId: 1 });
TodoSchema.index({ done: 1, dueDate: 1 });

export type TodoDoc = InferSchemaType<typeof TodoSchema> & { _id: mongoose.Types.ObjectId };

if (process.env.NODE_ENV !== 'production' && mongoose.models.Todo) mongoose.deleteModel('Todo');

export const Todo = (mongoose.models.Todo as mongoose.Model<TodoDoc>) || mongoose.model<TodoDoc>('Todo', TodoSchema);

export default Todo;
