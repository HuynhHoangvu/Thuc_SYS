import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { dashboardService } from './dashboard.service';

export const getSummary = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await dashboardService.getSummary();
  res.status(200).json({ success: true, data: summary });
});
