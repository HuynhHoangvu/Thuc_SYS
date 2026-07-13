import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const doc = await prisma.studentDocument.findUnique({ where: { id } });
  if (!doc) throw new NotFoundError('Document not found');
  return NextResponse.redirect(doc.url, 302);
});
