import { z } from 'zod';
import type { DailyNoteDoc } from '@/models/DailyNote';

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const listDailyNotesSchema = z.object({
  from: dateSchema.optional(),
  to: dateSchema.optional(),
});

export const saveDailyNoteSchema = z.object({
  date: dateSchema,
  content: z.string().trim().min(1).max(5000),
});

type Note = Pick<DailyNoteDoc, 'date' | 'content'> & { _id: unknown; createdAt?: Date; updatedAt?: Date };

export function toDailyNoteDTO(note: Note) {
  return {
    id: String(note._id),
    date: note.date,
    content: note.content,
    createdAt: note.createdAt?.toISOString(),
    updatedAt: note.updatedAt?.toISOString(),
  };
}
