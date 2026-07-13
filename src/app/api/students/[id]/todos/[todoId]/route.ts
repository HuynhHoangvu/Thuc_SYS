import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toStudentDTO } from '@/lib/students/dto';

const updateTodoSchema = z.object({ done: z.boolean() });

export const PATCH = withErrorHandling(
  async (req, { params }: { params: Promise<{ id: string; todoId: string }> }) => {
    const { id, todoId } = await params;
    const { done } = updateTodoSchema.parse(await req.json());

    const todo = await prisma.todo.findUnique({ where: { id: todoId } });
    if (!todo || todo.studentId !== id) throw new NotFoundError('Student or todo not found');

    await prisma.todo.update({ where: { id: todoId }, data: { done } });
    const student = await prisma.student.findUniqueOrThrow({ where: { id }, include: { todos: true } });
    return ok(toStudentDTO(student));
  }
);

export const DELETE = withErrorHandling(
  async (_req, { params }: { params: Promise<{ id: string; todoId: string }> }) => {
    const { id, todoId } = await params;

    const todo = await prisma.todo.findUnique({ where: { id: todoId } });
    if (!todo || todo.studentId !== id) throw new NotFoundError('Student or todo not found');

    await prisma.todo.delete({ where: { id: todoId } });
    const student = await prisma.student.findUniqueOrThrow({ where: { id }, include: { todos: true } });
    return ok(toStudentDTO(student));
  }
);
