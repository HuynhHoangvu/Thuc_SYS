import { connectDB } from '@/lib/mongoose';
import { ChecklistTemplate } from '@/models/ChecklistTemplate';
import { ChecklistProgress } from '@/models/ChecklistProgress';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { ChecklistItem, toProgressDTO } from '@/lib/checklists/dto';

export const POST = withErrorHandling(
  async (_req, { params }: { params: Promise<{ id: string; studentId: string }> }) => {
    const { id, studentId } = await params;
    await connectDB();

    const template = await ChecklistTemplate.findById(id);
    if (!template) throw new NotFoundError('Checklist template not found');

    const existing = await ChecklistProgress.findOne({ studentId, templateId: id });
    if (existing) return ok(toProgressDTO(existing.toObject(), template.toObject()), 201);

    const items = (template.items as unknown as ChecklistItem[]).map((i) => ({ key: i.key, completed: false }));
    const progress = await ChecklistProgress.create({ studentId, templateId: id, items });
    return ok(toProgressDTO(progress.toObject(), template.toObject()), 201);
  }
);
