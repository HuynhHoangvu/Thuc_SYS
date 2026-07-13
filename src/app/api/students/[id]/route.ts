import { prisma } from '@/lib/prisma';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toStudentDTO, toUpdateData, updateStudentSchema } from '@/lib/students/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const student = await prisma.student.findUnique({ where: { id }, include: { todos: true } });
  if (!student) throw new NotFoundError('Student not found');
  return ok(toStudentDTO(student));
});

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateStudentSchema.parse(await req.json());
  const exists = await prisma.student.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Student not found');
  const student = await prisma.student.update({ where: { id }, data: toUpdateData(body), include: { todos: true } });
  return ok(toStudentDTO(student));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const exists = await prisma.student.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Student not found');
  await prisma.student.delete({ where: { id } });
  return noContent();
});
