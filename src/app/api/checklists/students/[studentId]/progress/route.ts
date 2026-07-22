import { connectDB } from '@/lib/mongoose';
import { ChecklistProgress } from '@/models/ChecklistProgress';
import { ChecklistTemplate } from '@/models/ChecklistTemplate';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { toProgressDTO } from '@/lib/checklists/dto';

export const GET = withErrorHandling(async (_req, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  await connectDB();
  const progressList = await ChecklistProgress.find({ studentId });
  const templateIds = progressList.map((p) => p.templateId);
  const templates = await ChecklistTemplate.find({ _id: { $in: templateIds } });
  const templateMap = new Map(templates.map((t) => [String(t._id), t.toObject()]));

  return ok(
    progressList
      .filter((p) => templateMap.has(p.templateId))
      .map((p) => toProgressDTO(p.toObject(), templateMap.get(p.templateId)!))
  );
});
