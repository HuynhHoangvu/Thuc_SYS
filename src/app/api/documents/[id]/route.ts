import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { StudentDocument } from '@/models/StudentDocument';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toDocumentDTO } from '@/lib/documents/dto';

const renameSchema = z.object({ originalName: z.string().min(1) });

export const PATCH = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { originalName } = renameSchema.parse(await req.json());
  await connectDB();

  const exists = await StudentDocument.exists({ _id: id });
  if (!exists) throw new NotFoundError('Document not found');

  const doc = await StudentDocument.findByIdAndUpdate(id, { originalName }, { new: true }).select('-data');
  if (!doc) throw new NotFoundError('Document not found');
  return ok(toDocumentDTO(doc.toObject()));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const exists = await StudentDocument.exists({ _id: id });
  if (!exists) throw new NotFoundError('Document not found');

  await StudentDocument.findByIdAndDelete(id);
  return noContent();
});
