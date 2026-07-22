import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { Todo } from '@/models/Todo';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toStudentDTO, toUpdateData, updateStudentSchema } from '@/lib/students/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const student = await Student.findById(id);
  if (!student) throw new NotFoundError('Student not found');
  const todos = await Todo.find({ studentId: id });
  return ok(toStudentDTO(student.toObject(), todos.map((t) => t.toObject())));
});

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateStudentSchema.parse(await req.json());
  await connectDB();
  const exists = await Student.exists({ _id: id });
  if (!exists) throw new NotFoundError('Student not found');
  const student = await Student.findByIdAndUpdate(id, toUpdateData(body), { new: true });
  if (!student) throw new NotFoundError('Student not found');
  const todos = await Todo.find({ studentId: id });
  return ok(toStudentDTO(student.toObject(), todos.map((t) => t.toObject())));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const exists = await Student.exists({ _id: id });
  if (!exists) throw new NotFoundError('Student not found');
  await Student.findByIdAndDelete(id);
  await Todo.deleteMany({ studentId: id });
  return noContent();
});
