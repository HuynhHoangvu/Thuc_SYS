import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { submitFormSchema, toSubmissionDTO } from '@/lib/forms/dto';
import type { Prisma } from '@/generated/prisma/client';

export const PUT = withErrorHandling(
  async (req, { params }: { params: Promise<{ id: string; studentId: string }> }) => {
    const { id, studentId } = await params;
    const { values } = submitFormSchema.parse(await req.json());

    const template = await prisma.formTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundError('Form template not found');

    const jsonValues = values as Prisma.InputJsonValue;
    const submission = await prisma.formSubmission.upsert({
      where: { templateId_studentId: { templateId: id, studentId } },
      create: { templateId: id, studentId, values: jsonValues, submittedAt: new Date() },
      update: { values: jsonValues, submittedAt: new Date() },
      include: { template: true },
    });
    return ok(toSubmissionDTO(submission));
  }
);
