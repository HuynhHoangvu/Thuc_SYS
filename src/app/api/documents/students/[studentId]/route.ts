import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { BadRequestError } from '@/lib/errors';
import { toDocumentDTO } from '@/lib/documents/dto';
import { uploadToBlob } from '@/lib/blob';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  const docs = await prisma.studentDocument.findMany({
    where: { studentId },
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

  const { storedName, url } = await uploadToBlob(file);

  const doc = await prisma.studentDocument.create({
    data: {
      studentId,
      category,
      originalName: file.name,
      storedName,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      url,
      version: latest ? latest.version + 1 : 1,
      previousVersionId: latest?.id,
      virusScanStatus: 'clean',
    },
  });
  return ok(toDocumentDTO(doc), 201);
});
