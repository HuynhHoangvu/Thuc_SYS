import type { TravelerDocumentDoc } from '@/models/TravelerDocument';

// Never select `data` here — it's the file's binary content and would bloat list/detail responses.
type Doc = Omit<TravelerDocumentDoc, 'data'> & { _id: unknown };

export function toTravelerDocumentDTO(doc: Doc) {
  return {
    id: String(doc._id),
    traveler: doc.travelerId,
    category: doc.category,
    originalName: doc.originalName,
    storedName: doc.storedName,
    mimeType: doc.mimeType,
    size: doc.size,
    url: `/api/travelers/${doc.travelerId}/documents/${String(doc._id)}/download`,
    version: doc.version,
    virusScanStatus: doc.virusScanStatus,
    createdAt: doc.createdAt,
  };
}
