import type { Prisma } from '@/generated/prisma/client';

type Doc = Prisma.StudentDocumentGetPayload<Record<string, never>>;

export function toDocumentDTO(doc: Doc) {
  return {
    id: doc.id,
    student: doc.studentId,
    category: doc.category,
    originalName: doc.originalName,
    storedName: doc.storedName,
    mimeType: doc.mimeType,
    size: doc.size,
    url: doc.url,
    version: doc.version,
    virusScanStatus: doc.virusScanStatus,
    createdAt: doc.createdAt,
  };
}
