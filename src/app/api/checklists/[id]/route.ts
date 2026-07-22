import { connectDB } from '@/lib/mongoose';
import { ChecklistTemplate } from '@/models/ChecklistTemplate';
import { noContent, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const exists = await ChecklistTemplate.findById(id);
  if (!exists) throw new NotFoundError('Checklist template not found');
  await ChecklistTemplate.findByIdAndDelete(id);
  return noContent();
});
