import { randomUUID } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { BadRequestError } from '@/lib/errors';
import { toDocumentDTO } from '@/lib/documents/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  const docs = await prisma.studentDocument.findMany({
    where: { studentId },
    omit: { data: true },
    orderBy: [{ category: 'asc' }, { version: 'desc' }],
  });
  return ok(docs.map(toDocumentDTO));
});

export const POST = withErrorHandling(async (req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  const formData = await req.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) throw new BadRequestError('No file uploaded');

  const category = (formData.get('category') as string | null) ?? 'general';

  const latest = await prisma.studentDocument.findFirst({
    where: { studentId, category },
    orderBy: { version: 'desc' },
  });

  const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : '';
  const data = Buffer.from(await file.arrayBuffer());

  const doc = await prisma.studentDocument.create({
    data: {
      studentId,
      category,
      originalName: file.name,
      storedName: `${randomUUID()}${ext}`,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      data,
      version: latest ? latest.version + 1 : 1,
      previousVersionId: latest?.id,
      virusScanStatus: 'clean',
    },
    omit: { data: true },
  });
  return ok(toDocumentDTO(doc), 201);
});
