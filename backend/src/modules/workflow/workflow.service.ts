import { WorkflowTemplate } from './workflow-template.model';
import { WorkflowProgress } from './workflow-progress.model';
import { NotFoundError } from '../../shared/errors/AppError';
import { CreateTemplateInput, UpdateTemplateInput } from './workflow.validation';

export const workflowService = {
  listTemplates() {
    return WorkflowTemplate.find().sort({ createdAt: -1 });
  },

  createTemplate(input: CreateTemplateInput) {
    return WorkflowTemplate.create(input);
  },

  async updateTemplate(id: string, input: UpdateTemplateInput) {
    const template = await WorkflowTemplate.findByIdAndUpdate(id, input, { new: true, runValidators: true });
    if (!template) {
      throw new NotFoundError('Workflow template not found');
    }
    return template;
  },

  async deleteTemplate(id: string) {
    const template = await WorkflowTemplate.findByIdAndDelete(id);
    if (!template) {
      throw new NotFoundError('Workflow template not found');
    }
  },

  async assignToStudent(templateId: string, studentId: string) {
    const template = await WorkflowTemplate.findById(templateId);
    if (!template) {
      throw new NotFoundError('Workflow template not found');
    }

    const existing = await WorkflowProgress.findOne({ student: studentId, template: templateId });
    if (existing) {
      return existing;
    }

    return WorkflowProgress.create({
      student: studentId,
      template: templateId,
      steps: template.steps.map((s) => ({ key: s.key, completed: false })),
    });
  },

  getStudentProgress(studentId: string) {
    return WorkflowProgress.find({ student: studentId }).populate('template');
  },

  async updateStepProgress(progressId: string, stepKey: string, completed: boolean) {
    const progress = await WorkflowProgress.findById(progressId);
    if (!progress) {
      throw new NotFoundError('Workflow progress not found');
    }

    const step = progress.steps.find((s) => s.key === stepKey);
    if (!step) {
      throw new NotFoundError('Workflow step not found');
    }

    step.completed = completed;
    step.completedAt = completed ? new Date() : undefined;
    await progress.save();
    return progress;
  },
};
