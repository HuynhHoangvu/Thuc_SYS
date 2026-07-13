export interface StudentDocument {
  id: string;
  student: string;
  category: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  url: string;
  version: number;
  virusScanStatus: 'pending' | 'clean' | 'infected';
  createdAt: string;
}
