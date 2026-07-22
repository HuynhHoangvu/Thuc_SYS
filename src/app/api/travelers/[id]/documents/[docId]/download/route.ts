import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { TravelerDocument } from '@/models/TravelerDocument';
import { withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string; docId: string }> }) => {
  const { docId } = await params;
  await connectDB();
  const doc = await TravelerDocument.findById(docId);
  if (!doc) throw new NotFoundError('Document not found');

  return new NextResponse(new Uint8Array(doc.data), {
    headers: {
      'Content-Type': doc.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(doc.originalName)}"`,
      'Content-Length': String(doc.size),
    },
  });
});
