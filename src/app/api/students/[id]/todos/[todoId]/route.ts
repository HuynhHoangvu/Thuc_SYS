import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { Todo } from '@/models/Todo';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toStudentDTO } from '@/lib/students/dto';

const updateTodoSchema = z.object({ done: z.boolean() });

export const PATCH = withErrorHandling(
  async (req, { params }: { params: Promise<{ id: string; todoId: string }> }) => {
    const { id, todoId } = await params;
    const { done } = updateTodoSchema.parse(await req.json());
    await connectDB();

    const todo = await Todo.findById(todoId);
    if (!todo || todo.studentId !== id) throw new NotFoundError('Student or todo not found');

    await Todo.findByIdAndUpdate(todoId, { done });
    const student = await Student.findById(id);
    if (!student) throw new NotFoundError('Student not found');
    const todos = await Todo.find({ studentId: id });
    return ok(toStudentDTO(student.toObject(), todos.map((t) => t.toObject())));
  }
);

export const DELETE = withErrorHandling(
  async (_req, { params }: { params: Promise<{ id: string; todoId: string }> }) => {
    const { id, todoId } = await params;
    await connectDB();

    const todo = await Todo.findById(todoId);
    if (!todo || todo.studentId !== id) throw new NotFoundError('Student or todo not found');

    await Todo.findByIdAndDelete(todoId);
    const student = await Student.findById(id);
    if (!student) throw new NotFoundError('Student not found');
    const todos = await Todo.find({ studentId: id });
    return ok(toStudentDTO(student.toObject(), todos.map((t) => t.toObject())));
  }
);
