import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { Todo } from '@/models/Todo';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toStudentDTO } from '@/lib/students/dto';

const addTodoSchema = z.object({
  text: z.string().trim().min(1),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const POST = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { text, dueDate } = addTodoSchema.parse(await req.json());
  await connectDB();

  const exists = await Student.exists({ _id: id });
  if (!exists) throw new NotFoundError('Student not found');

  await Todo.create({ studentId: id, text, dueDate, done: false });
  const student = await Student.findById(id);
  if (!student) throw new NotFoundError('Student not found');
  const todos = await Todo.find({ studentId: id });
  return ok(toStudentDTO(student.toObject(), todos.map((t) => t.toObject())), 201);
});
