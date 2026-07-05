import fs from 'node:fs';
import path from 'node:path';
import { StudentDocument } from './document.model';
import { NotFoundError } from '../../shared/errors/AppError';
import { scanFile } from './virus-scan.util';
import { UPLOAD_DIR } from './upload.middleware';

interface UploadInput {
  studentId: string;
  category: string;
  file: Express.Multer.File;
}

export const documentService = {
  async upload(input: UploadInput) {
    const latest = await StudentDocument.findOne({ student: input.studentId, category: input.category }).sort({
      version: -1,
    });

    const virusScanStatus = await scanFile(input.file.path);

    return StudentDocument.create({
      student: input.studentId,
      category: input.category,
      originalName: input.file.originalname,
      storedName: input.file.filename,
      mimeType: input.file.mimetype,
      size: input.file.size,
      url: `/uploads/${input.file.filename}`,
      version: latest ? latest.version + 1 : 1,
      previousVersion: latest?._id,
      virusScanStatus,
    });
  },

  listForStudent(studentId: string) {
    return StudentDocument.find({ student: studentId }).sort({ category: 1, version: -1 });
  },

  async rename(id: string, originalName: string) {
    const doc = await StudentDocument.findByIdAndUpdate(id, { originalName }, { new: true });
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    return doc;
  },

  async getById(id: string) {
    const doc = await StudentDocument.findById(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    return doc;
  },

  async remove(id: string) {
    const doc = await StudentDocument.findByIdAndDelete(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    const filePath = path.join(UPLOAD_DIR, doc.storedName);
    fs.promises.unlink(filePath).catch(() => undefined);
  },
};
