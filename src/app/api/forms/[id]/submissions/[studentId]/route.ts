import { connectDB } from '@/lib/mongoose';
import { FormTemplate } from '@/models/FormTemplate';
import { FormSubmission } from '@/models/FormSubmission';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { submitFormSchema, toSubmissionDTO } from '@/lib/forms/dto';

export const PUT = withErrorHandling(
  async (req, { params }: { params: Promise<{ id: string; studentId: string }> }) => {
    const { id, studentId } = await params;
    const { values } = submitFormSchema.parse(await req.json());
    await connectDB();

    const template = await FormTemplate.findById(id);
    if (!template) throw new NotFoundError('Form template not found');

    const submission = await FormSubmission.findOneAndUpdate(
      { templateId: id, studentId },
      { templateId: id, studentId, values, submittedAt: new Date() },
      { new: true, upsert: true }
    );

    return ok(toSubmissionDTO(submission.toObject(), template.toObject()));
  }
);
