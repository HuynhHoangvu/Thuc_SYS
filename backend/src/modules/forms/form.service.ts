import { FormTemplate } from './form-template.model';
import { FormSubmission } from './form-submission.model';
import { NotFoundError } from '../../shared/errors/AppError';
import { CreateFormTemplateInput, UpdateFormTemplateInput } from './form.validation';

export const formService = {
  listTemplates() {
    return FormTemplate.find().sort({ createdAt: -1 });
  },

  createTemplate(input: CreateFormTemplateInput) {
    return FormTemplate.create(input);
  },

  async updateTemplate(id: string, input: UpdateFormTemplateInput) {
    const template = await FormTemplate.findByIdAndUpdate(id, input, { new: true, runValidators: true });
    if (!template) {
      throw new NotFoundError('Form template not found');
    }
    return template;
  },

  async deleteTemplate(id: string) {
    const template = await FormTemplate.findByIdAndDelete(id);
    if (!template) {
      throw new NotFoundError('Form template not found');
    }
  },

  async upsertSubmission(templateId: string, studentId: string, values: Record<string, unknown>) {
    const template = await FormTemplate.findById(templateId);
    if (!template) {
      throw new NotFoundError('Form template not found');
    }

    return FormSubmission.findOneAndUpdate(
      { template: templateId, student: studentId },
      { values, submittedAt: new Date() },
      { new: true, upsert: true, runValidators: true }
    );
  },

  getStudentSubmissions(studentId: string) {
    return FormSubmission.find({ student: studentId }).populate('template');
  },
};
