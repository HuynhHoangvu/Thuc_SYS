import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { checklistService } from './checklist.service';

export const listTemplates = asyncHandler(async (req: Request, res: Response) => {
  const templates = await checklistService.listTemplates(req.query.country as string | undefined);
  res.status(200).json({ success: true, data: templates });
});

export const createTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await checklistService.createTemplate(req.body);
  res.status(201).json({ success: true, data: template });
});

export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
  await checklistService.deleteTemplate(req.params.id);
  res.status(204).send();
});

export const assignToStudent = asyncHandler(async (req: Request, res: Response) => {
  const progress = await checklistService.assignToStudent(req.params.id, req.params.studentId);
  res.status(201).json({ success: true, data: progress });
});

export const getStudentProgress = asyncHandler(async (req: Request, res: Response) => {
  const progress = await checklistService.getStudentProgress(req.params.studentId);
  res.status(200).json({ success: true, data: progress });
});

export const updateItemProgress = asyncHandler(async (req: Request, res: Response) => {
  const progress = await checklistService.updateItemProgress(req.params.progressId, req.params.itemKey, req.body.completed);
  res.status(200).json({ success: true, data: progress });
});
