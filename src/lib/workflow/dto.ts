import { z } from 'zod';
import type { Prisma } from '@/generated/prisma/client';

const stepSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number(),
  stage: z.string().optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(1),
  country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  description: z.string().optional(),
  steps: z.array(stepSchema).min(1),
});

export const updateTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  country: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  description: z.string().optional(),
  steps: z.array(stepSchema).optional(),
  isActive: z.boolean().optional(),
});

export type WorkflowStep = z.infer<typeof stepSchema>;

const countryDbToDto: Record<string, string> = { USA: 'USA', Canada: 'Canada', NewZealand: 'New Zealand' };
const countryDtoToDb: Record<string, string> = { USA: 'USA', Canada: 'Canada', 'New Zealand': 'NewZealand' };

export function countryToDb(country?: string) {
  return country ? (countryDtoToDb[country] as never) : undefined;
}

type Template = Prisma.WorkflowTemplateGetPayload<Record<string, never>>;

export function toTemplateDTO(template: Template) {
  return {
    id: template.id,
    name: template.name,
    country: template.country ? countryDbToDto[template.country] : undefined,
    description: template.description ?? undefined,
    steps: template.steps as WorkflowStep[],
    isActive: template.isActive,
  };
}

type ProgressWithTemplate = Prisma.WorkflowProgressGetPayload<{ include: { template: true } }>;

export function toProgressDTO(progress: ProgressWithTemplate) {
  return {
    id: progress.id,
    student: progress.studentId,
    template: toTemplateDTO(progress.template),
    steps: progress.steps as Array<{ key: string; completed: boolean; completedAt?: string }>,
  };
}
