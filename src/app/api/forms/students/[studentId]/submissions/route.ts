import { connectDB } from '@/lib/mongoose';
import { FormSubmission } from '@/models/FormSubmission';
import { FormTemplate } from '@/models/FormTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toSubmissionDTO } from '@/lib/forms/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  await connectDB();
  const submissions = await FormSubmission.find({ studentId });
  const templateIds = submissions.map((s) => s.templateId);
  const templates = await FormTemplate.find({ _id: { $in: templateIds } });
  const templateMap = new Map(templates.map((t) => [String(t._id), t.toObject()]));

  return ok(
    submissions
      .filter((s) => templateMap.has(s.templateId))
      .map((s) => toSubmissionDTO(s.toObject(), templateMap.get(s.templateId)!))
  );
});
