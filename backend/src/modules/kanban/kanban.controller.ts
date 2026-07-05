import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { kanbanService } from './kanban.service';

export const listColumns = asyncHandler(async (_req: Request, res: Response) => {
  const columns = await kanbanService.listColumns();
  res.status(200).json({ success: true, data: columns });
});

export const createColumn = asyncHandler(async (req: Request, res: Response) => {
  const column = await kanbanService.createColumn(req.body);
  res.status(201).json({ success: true, data: column });
});

export const updateColumn = asyncHandler(async (req: Request, res: Response) => {
  const column = await kanbanService.updateColumn(req.params.id, req.body);
  res.status(200).json({ success: true, data: column });
});

export const deleteColumn = asyncHandler(async (req: Request, res: Response) => {
  const result = await kanbanService.deleteColumn(req.params.id);
  res.status(200).json({ success: true, data: result });
});

export const reorderColumns = asyncHandler(async (req: Request, res: Response) => {
  const columns = await kanbanService.reorderColumns(req.body);
  res.status(200).json({ success: true, data: columns });
});

export const moveStudent = asyncHandler(async (req: Request, res: Response) => {
  const result = await kanbanService.moveStudent(req.params.id, req.body);
  res.status(200).json({ success: true, data: result });
});
