import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { TravelerDocument } from '@/models/TravelerDocument';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { toTravelerDocumentDTO } from '@/lib/documents/traveler-dto';

const renameSchema = z.object({ originalName: z.string().min(1) });

export const PATCH = withErrorHandling(async (req, { params }: { params: Promise<{ id: string; docId: string }> }) => {
  const { docId } = await params;
  const { originalName } = renameSchema.parse(await req.json());
  await connectDB();

  const exists = await TravelerDocument.exists({ _id: docId });
  if (!exists) throw new NotFoundError('Document not found');

  const doc = await TravelerDocument.findByIdAndUpdate(docId, { originalName }, { new: true }).select('-data');
  if (!doc) throw new NotFoundError('Document not found');
  return ok(toTravelerDocumentDTO(doc.toObject()));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string; docId: string }> }) => {
  const { docId } = await params;
  await connectDB();
  const exists = await TravelerDocument.exists({ _id: docId });
  if (!exists) throw new NotFoundError('Document not found');

  await TravelerDocument.findByIdAndDelete(docId);
  return noContent();
});
