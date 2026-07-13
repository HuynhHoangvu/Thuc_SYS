import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toSubmissionDTO } from '@/lib/forms/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  const submissions = await prisma.formSubmission.findMany({ where: { studentId }, include: { template: true } });
  return ok(submissions.map(toSubmissionDTO));
});
