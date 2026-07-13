import { prisma } from '@/lib/prisma';
import { noContent, ok, withErrorHandling } from '@/lib/api-handler';
import { NotFoundError } from '@/lib/errors';
import { countryToDb, toTemplateDTO, updateFormTemplateSchema } from '@/lib/forms/dto';
import type { Prisma } from '@/generated/prisma/client';

export const PUT = withErrorHandling(async (req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = updateFormTemplateSchema.parse(await req.json());

  const exists = await prisma.formTemplate.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Form template not found');

  const data: Prisma.FormTemplateUpdateInput = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.country !== undefined) data.country = countryToDb(body.country);
  if (body.description !== undefined) data.description = body.description;
  if (body.fields !== undefined) data.fields = body.fields;
  if (body.isActive !== undefined) data.isActive = body.isActive;

  const template = await prisma.formTemplate.update({ where: { id }, data });
  return ok(toTemplateDTO(template));
});

export const DELETE = withErrorHandling(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const exists = await prisma.formTemplate.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Form template not found');
  await prisma.formTemplate.delete({ where: { id } });
  return noContent();
});
