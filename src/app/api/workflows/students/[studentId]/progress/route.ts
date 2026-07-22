import { connectDB } from '@/lib/mongoose';
import { WorkflowProgress } from '@/models/WorkflowProgress';
import { WorkflowTemplate } from '@/models/WorkflowTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toProgressDTO } from '@/lib/workflow/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  await connectDB();
  const progressList = await WorkflowProgress.find({ studentId });
  const templateIds = progressList.map((p) => p.templateId);
  const templates = await WorkflowTemplate.find({ _id: { $in: templateIds } });
  const templateMap = new Map(templates.map((t) => [String(t._id), t.toObject()]));

  return ok(
    progressList
      .filter((p) => templateMap.has(p.templateId))
      .map((p) => toProgressDTO(p.toObject(), templateMap.get(p.templateId)!))
  );
});
