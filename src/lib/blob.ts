import { del, put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export async function uploadToBlob(file: File) {
  const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : '';
  const storedName = `${randomUUID()}${ext}`;
  const blob = await put(`documents/${storedName}`, file, { access: 'public' });
  return { storedName, url: blob.url };
}

export async function deleteFromBlob(url: string) {
  await del(url).catch(() => undefined);
}
