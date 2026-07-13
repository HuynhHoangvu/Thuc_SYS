import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toDocumentDTO } from '@/lib/documents/dto';

const renameSchema = z.object({ originalName: z.string().min(1) });

export const PATCH = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { originalName } = renameSchema.parse(await req.json());

  const exists = await prisma.studentDocument.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Document not found');

  const doc = await prisma.studentDocument.update({ where: { id }, data: { originalName }, omit: { data: true } });
  return ok(toDocumentDTO(doc));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const exists = await prisma.studentDocument.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw new NotFoundError('Document not found');

  await prisma.studentDocument.delete({ where: { id } });
  return noContent();
});
