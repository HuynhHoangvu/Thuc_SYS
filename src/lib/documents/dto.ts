import type { Prisma } from '@/generated/prisma/client';

// Never select `data` here — it's the file's binary content and would bloat list/detail responses.
type Doc = Prisma.StudentDocumentGetPayload<{ omit: { data: true } }>;

export function toDocumentDTO(doc: Doc) {
  return {
    id: doc.id,
    student: doc.studentId,
    category: doc.category,
    originalName: doc.originalName,
    storedName: doc.storedName,
    mimeType: doc.mimeType,
    size: doc.size,
    url: `/api/documents/${doc.id}/download`,
    version: doc.version,
    virusScanStatus: doc.virusScanStatus,
    createdAt: doc.createdAt,
  };
}
