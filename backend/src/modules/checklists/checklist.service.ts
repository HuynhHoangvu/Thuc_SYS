import { ChecklistTemplate, DEFAULT_CHECKLISTS } from './checklist-template.model';
import { ChecklistProgress } from './checklist-progress.model';
import { NotFoundError } from '../../shared/errors/AppError';
import { CreateChecklistInput } from './checklist.validation';

export const checklistService = {
  async listTemplates(country?: string) {
    const count = await ChecklistTemplate.countDocuments();
    if (count === 0) {
      await ChecklistTemplate.insertMany(DEFAULT_CHECKLISTS);
    }
    const filter = country ? { country } : {};
    return ChecklistTemplate.find(filter).sort({ createdAt: -1 });
  },

  createTemplate(input: CreateChecklistInput) {
    return ChecklistTemplate.create(input);
  },

  async deleteTemplate(id: string) {
    const template = await ChecklistTemplate.findByIdAndDelete(id);
    if (!template) {
      throw new NotFoundError('Checklist template not found');
    }
  },

  async assignToStudent(templateId: string, studentId: string) {
    const template = await ChecklistTemplate.findById(templateId);
    if (!template) {
      throw new NotFoundError('Checklist template not found');
    }

    const existing = await ChecklistProgress.findOne({ student: studentId, template: templateId });
    if (existing) {
      return existing;
    }

    return ChecklistProgress.create({
      student: studentId,
      template: templateId,
      items: template.items.map((i) => ({ key: i.key, completed: false })),
    });
  },

  getStudentProgress(studentId: string) {
    return ChecklistProgress.find({ student: studentId }).populate('template');
  },

  async updateItemProgress(progressId: string, itemKey: string, completed: boolean) {
    const progress = await ChecklistProgress.findById(progressId);
    if (!progress) {
      throw new NotFoundError('Checklist progress not found');
    }

    const item = progress.items.find((i) => i.key === itemKey);
    if (!item) {
      throw new NotFoundError('Checklist item not found');
    }

    item.completed = completed;
    item.completedAt = completed ? new Date() : undefined;
    await progress.save();
    return progress;
  },
};
