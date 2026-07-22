import { randomUUID } from 'node:crypto';
import { connectDB } from '@/lib/mongoose';
import { StudentDocument } from '@/models/StudentDocument';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { BadRequestError } from '@/lib/errors';
import { toDocumentDTO } from '@/lib/documents/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  await connectDB();
  const docs = await StudentDocument.find({ studentId })
    .select('-data')
    .sort({ category: 1, version: -1 });
  return ok(docs.map((d) => toDocumentDTO(d.toObject())));
});

export const POST = withErrorHandling(async (req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  await connectDB();
  const formData = await req.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) throw new BadRequestError('No file uploaded');

  const category = (formData.get('category') as string | null) ?? 'general';

  const latest = await StudentDocument.findOne({ studentId, category }).sort({ version: -1 });

  const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : '';
  const data = Buffer.from(await file.arrayBuffer());

  const doc = await StudentDocument.create({
    studentId,
    category,
    originalName: file.name,
    storedName: `${randomUUID()}${ext}`,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    data,
    version: latest ? latest.version + 1 : 1,
    previousVersionId: latest?.id ? String(latest._id) : undefined,
    virusScanStatus: 'clean',
  });
  const obj = doc.toObject();
  delete (obj as { data?: unknown }).data;
  return ok(toDocumentDTO(obj), 201);
});
