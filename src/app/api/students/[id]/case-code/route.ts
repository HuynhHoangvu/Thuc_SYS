import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { ensureNotificationIds } from '@/lib/notifications/send';

// Gives the student their case code now (normally it is created on the first sent mail),
// so a mail can be copied by hand with the code already in place.
export const POST = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const student = await Student.findById(id);
  if (!student) throw new NotFoundError('Student not found');
  await ensureNotificationIds(student);
  return ok({ caseCode: student.caseCode ?? '' });
});
