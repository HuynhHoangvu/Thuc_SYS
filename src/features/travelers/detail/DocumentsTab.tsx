'use client';

import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, Trash2, Upload } from 'lucide-react';
import { travelerApi } from '../traveler.api';

interface DocumentsTabProps {
  travelerId: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentsTab({ travelerId }: DocumentsTabProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState('general');

  const { data: documents, isLoading } = useQuery({
    queryKey: ['traveler-documents', travelerId],
    queryFn: () => travelerApi.listDocuments(travelerId),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => travelerApi.uploadDocument(travelerId, file, category),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['traveler-documents', travelerId] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (docId: string) => travelerApi.removeDocument(travelerId, docId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['traveler-documents', travelerId] }),
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
    e.target.value = '';
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Loại tài liệu (VD: hộ chiếu)"
          className="w-48 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMutation.isPending}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
        >
          <Upload size={16} />
          {uploadMutation.isPending ? 'Đang tải lên…' : 'Tải lên tài liệu'}
        </button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Đang tải danh sách tài liệu…</p>}
      {documents?.length === 0 && !isLoading && <p className="text-sm text-muted-foreground">Chưa có tài liệu nào.</p>}

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {documents?.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <div className="font-medium text-card-foreground">{doc.originalName}</div>
              <div className="text-xs text-muted-foreground">
                {doc.category} · v{doc.version} · {formatSize(doc.size)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={travelerApi.documentDownloadUrl(travelerId, doc.id)}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary"
                title="Tải xuống"
              >
                <Download size={16} />
              </a>
              <button
                onClick={() => deleteMutation.mutate(doc.id)}
                className="text-muted-foreground hover:text-red-500"
                title="Xóa"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
