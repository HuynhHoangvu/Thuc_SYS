import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { upload } from './upload.middleware';
import { renameDocumentSchema } from './document.validation';
import {
  deleteDocument,
  downloadDocument,
  listStudentDocuments,
  renameDocument,
  uploadDocument,
} from './document.controller';

const router = Router();

/**
 * @openapi
 * /api/documents/students/{studentId}:
 *   get:
 *     tags: [Documents]
 *     summary: List a student's documents (latest + prior versions)
 *     responses:
 *       200: { description: List of documents }
 *   post:
 *     tags: [Documents]
 *     summary: Upload a document for a student (multipart/form-data, field "file", optional "category")
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file: { type: string, format: binary }
 *               category: { type: string }
 *     responses:
 *       201: { description: Document uploaded }
 */
router.get('/students/:studentId', listStudentDocuments);
router.post('/students/:studentId', upload.single('file'), uploadDocument);

/**
 * @openapi
 * /api/documents/{id}:
 *   patch:
 *     tags: [Documents]
 *     summary: Rename a document
 *     responses:
 *       200: { description: Document renamed }
 *   delete:
 *     tags: [Documents]
 *     summary: Delete a document
 *     responses:
 *       204: { description: Document deleted }
 */
router.patch('/:id', validate(renameDocumentSchema), renameDocument);
router.delete('/:id', deleteDocument);

/**
 * @openapi
 * /api/documents/{id}/download:
 *   get:
 *     tags: [Documents]
 *     summary: Download a document's file
 *     responses:
 *       200: { description: File stream }
 */
router.get('/:id/download', downloadDocument);

export default router;
