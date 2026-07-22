import type { StudentDocumentDoc } from '@/models/StudentDocument';

// Never select `data` here — it's the file's binary content and would bloat list/detail responses.
type Doc = Omit<StudentDocumentDoc, 'data'> & { _id: unknown };

export function toDocumentDTO(doc: Doc) {
  return {
    id: String(doc._id),
    student: doc.studentId,
    category: doc.category,
    originalName: doc.originalName,
    storedName: doc.storedName,
    mimeType: doc.mimeType,
    size: doc.size,
    url: `/api/documents/${String(doc._id)}/download`,
    version: doc.version,
    virusScanStatus: doc.virusScanStatus,
    createdAt: doc.createdAt,
  };
}
