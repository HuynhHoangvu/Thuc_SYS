import { z } from 'zod';
import type { FormTemplateDoc } from '@/models/FormTemplate';
import type { FormSubmissionDoc } from '@/models/FormSubmission';

const fieldSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['text', 'textarea', 'number', 'date', 'select', 'checkbox', 'file']),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  order: z.number(),
});

export const createFormTemplateSchema = z.object({
  name: z.string().min(1),
  country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  description: z.string().optional(),
  fields: z.array(fieldSchema).min(1),
});

export const updateFormTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  description: z.string().optional(),
  fields: z.array(fieldSchema).optional(),
  isActive: z.boolean().optional(),
});

export const submitFormSchema = z.object({ values: z.record(z.string(), z.unknown()) });

const countryDbToDto: Record<string, string> = { USA: 'USA', Canada: 'Canada', NewZealand: 'New Zealand' };
const countryDtoToDb: Record<string, string> = { USA: 'USA', Canada: 'Canada', 'New Zealand': 'NewZealand' };

export function countryToDb(country?: string) {
  return country ? countryDtoToDb[country] : undefined;
}

type Template = Pick<FormTemplateDoc, 'name' | 'country' | 'description' | 'fields' | 'isActive'> & {
  _id: unknown;
};

export function toTemplateDTO(template: Template) {
  return {
    id: String(template._id),
    name: template.name,
    country: template.country ? countryDbToDto[template.country] : undefined,
    description: template.description ?? undefined,
    fields: template.fields,
    isActive: template.isActive,
  };
}

type Submission = Pick<FormSubmissionDoc, 'studentId' | 'values'> & { _id: unknown };

export function toSubmissionDTO(submission: Submission, template: Template) {
  return {
    id: String(submission._id),
    template: toTemplateDTO(template),
    student: submission.studentId,
    values: submission.values,
  };
}
