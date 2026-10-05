import { connectDB } from '@/lib/mongoose';
import { DailyNote } from '@/models/DailyNote';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { listDailyNotesSchema, saveDailyNoteSchema, toDailyNoteDTO } from '@/lib/daily-notes/dto';

export const GET = withErrorHandling(async (req) => {
  const url = new URL(req.url);
  const query = listDailyNotesSchema.parse(Object.fromEntries(url.searchParams));
  await connectDB();
  const date: Record<string, string> = {};
  if (query.from) date.$gte = query.from;
  if (query.to) date.$lte = query.to;
  const notes = await DailyNote.find(Object.keys(date).length ? { date } : {}).sort({ date: 1 });
  return ok(notes.map((note) => toDailyNoteDTO(note.toObject())));
});

export const PUT = withErrorHandling(async (req) => {
  const body = saveDailyNoteSchema.parse(await req.json());
  await connectDB();
  const note = await DailyNote.findOneAndUpdate(
    { date: body.date },
    { $set: { content: body.content } },
    { returnDocument: 'after', upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  return ok(toDailyNoteDTO(note.toObject()));
});
