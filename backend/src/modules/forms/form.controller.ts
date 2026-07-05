import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { formService } from './form.service';

export const listTemplates = asyncHandler(async (_req: Request, res: Response) => {
  const templates = await formService.listTemplates();
  res.status(200).json({ success: true, data: templates });
});

export const createTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await formService.createTemplate(req.body);
  res.status(201).json({ success: true, data: template });
});

export const updateTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await formService.updateTemplate(req.params.id, req.body);
  res.status(200).json({ success: true, data: template });
});

export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
  await formService.deleteTemplate(req.params.id);
  res.status(204).send();
});

export const submitForm = asyncHandler(async (req: Request, res: Response) => {
  const submission = await formService.upsertSubmission(req.params.id, req.params.studentId, req.body.values);
  res.status(200).json({ success: true, data: submission });
});

export const getStudentSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const submissions = await formService.getStudentSubmissions(req.params.studentId);
  res.status(200).json({ success: true, data: submissions });
});
