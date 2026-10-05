import { connectDB } from '@/lib/mongoose';
import { DailyNote } from '@/models/DailyNote';
import { noContent, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ date: string }> }) => {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new NotFoundError('Daily note not found');
  await connectDB();
  const note = await DailyNote.findOneAndDelete({ date });
  if (!note) throw new NotFoundError('Daily note not found');
  return noContent();
});
