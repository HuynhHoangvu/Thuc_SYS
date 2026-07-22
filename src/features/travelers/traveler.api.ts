import { api } from '@/lib/api';
import type {
  CreateTravelerInput,
  Traveler,
  TravelerDocument,
  TravelerListMeta,
  TravelerListParams,
  UpdateTravelerInput,
} from './traveler.types';

interface ListResponse {
  success: boolean;
  data: Traveler[];
  meta: TravelerListMeta;
}

interface ItemResponse {
  success: boolean;
  data: Traveler;
}

interface DocListResponse {
  success: boolean;
  data: TravelerDocument[];
}

interface DocItemResponse {
  success: boolean;
  data: TravelerDocument;
}

export const travelerApi = {
  async list(params: TravelerListParams): Promise<ListResponse> {
    const res = await api.get<ListResponse>('/travelers', { params });
    return res.data;
  },
  async getById(id: string): Promise<Traveler> {
    const res = await api.get<ItemResponse>(`/travelers/${id}`);
    return res.data.data;
  },
  async create(input: CreateTravelerInput): Promise<Traveler> {
    const res = await api.post<ItemResponse>('/travelers', input);
    return res.data.data;
  },
  async update(id: string, input: UpdateTravelerInput): Promise<Traveler> {
    const res = await api.put<ItemResponse>(`/travelers/${id}`, input);
    return res.data.data;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/travelers/${id}`);
  },
  async listDocuments(travelerId: string): Promise<TravelerDocument[]> {
    const res = await api.get<DocListResponse>(`/travelers/${travelerId}/documents`);
    return res.data.data;
  },
  async uploadDocument(travelerId: string, file: File, category: string): Promise<TravelerDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    const res = await api.post<DocItemResponse>(`/travelers/${travelerId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  },
  async removeDocument(travelerId: string, docId: string): Promise<void> {
    await api.delete(`/travelers/${travelerId}/documents/${docId}`);
  },
  documentDownloadUrl(travelerId: string, docId: string): string {
    return `/api/travelers/${travelerId}/documents/${docId}/download`;
  },
};
