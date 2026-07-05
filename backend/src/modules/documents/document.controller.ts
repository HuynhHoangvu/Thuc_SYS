import path from 'node:path';
import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { documentService } from './document.service';
import { BadRequestError } from '../../shared/errors/AppError';
import { UPLOAD_DIR } from './upload.middleware';

export const uploadDocument = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('No file uploaded');
  }

  const category = (req.body.category as string | undefined) ?? 'general';
  const doc = await documentService.upload({
    studentId: req.params.studentId,
    category,
    file: req.file,
  });
  res.status(201).json({ success: true, data: doc });
});

export const listStudentDocuments = asyncHandler(async (req: Request, res: Response) => {
  const docs = await documentService.listForStudent(req.params.studentId);
  res.status(200).json({ success: true, data: docs });
});

export const renameDocument = asyncHandler(async (req: Request, res: Response) => {
  const doc = await documentService.rename(req.params.id, req.body.originalName);
  res.status(200).json({ success: true, data: doc });
});

export const downloadDocument = asyncHandler(async (req: Request, res: Response) => {
  const doc = await documentService.getById(req.params.id);
  res.download(path.join(UPLOAD_DIR, doc.storedName), doc.originalName);
});

export const deleteDocument = asyncHandler(async (req: Request, res: Response) => {
  await documentService.remove(req.params.id);
  res.status(204).send();
});
