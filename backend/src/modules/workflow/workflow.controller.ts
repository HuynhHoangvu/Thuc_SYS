import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { workflowService } from './workflow.service';

export const listTemplates = asyncHandler(async (_req: Request, res: Response) => {
  const templates = await workflowService.listTemplates();
  res.status(200).json({ success: true, data: templates });
});

export const createTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await workflowService.createTemplate(req.body);
  res.status(201).json({ success: true, data: template });
});

export const updateTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await workflowService.updateTemplate(req.params.id, req.body);
  res.status(200).json({ success: true, data: template });
});

export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
  await workflowService.deleteTemplate(req.params.id);
  res.status(204).send();
});

export const assignToStudent = asyncHandler(async (req: Request, res: Response) => {
  const progress = await workflowService.assignToStudent(req.params.id, req.params.studentId);
  res.status(201).json({ success: true, data: progress });
});

export const getStudentProgress = asyncHandler(async (req: Request, res: Response) => {
  const progress = await workflowService.getStudentProgress(req.params.studentId);
  res.status(200).json({ success: true, data: progress });
});

export const updateStepProgress = asyncHandler(async (req: Request, res: Response) => {
  const progress = await workflowService.updateStepProgress(req.params.progressId, req.params.stepKey, req.body.completed);
  res.status(200).json({ success: true, data: progress });
});
