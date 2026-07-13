import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toStudentDTO } from '@/lib/students/dto';

const addTodoSchema = z.object({ text: z.string().min(1) });

export const POST = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { text } = addTodoSchema.parse(await req.json());

  const exists = await prisma.student.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Student not found');

  await prisma.todo.create({ data: { studentId: id, text, done: false } });
  const student = await prisma.student.findUniqueOrThrow({ where: { id }, include: { todos: true } });
  return ok(toStudentDTO(student), 201);
});
