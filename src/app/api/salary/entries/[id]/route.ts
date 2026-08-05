import { connectDB } from '@/lib/mongoose';
import { SalaryEntry } from '@/models/SalaryEntry';
import { noContent, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const entry = await SalaryEntry.findByIdAndDelete(id);
  if (!entry) throw new NotFoundError('Salary entry not found');
  return noContent();
});
