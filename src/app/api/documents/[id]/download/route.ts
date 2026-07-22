import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { StudentDocument } from '@/models/StudentDocument';
import { withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const doc = await StudentDocument.findById(id);
  if (!doc) throw new NotFoundError('Document not found');

  return new NextResponse(new Uint8Array(doc.data), {
    headers: {
      'Content-Type': doc.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(doc.originalName)}"`,
      'Content-Length': String(doc.size),
    },
  });
});
