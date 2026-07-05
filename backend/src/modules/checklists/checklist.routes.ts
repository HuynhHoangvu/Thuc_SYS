import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { createChecklistSchema, updateItemProgressSchema } from './checklist.validation';
import {
  assignToStudent,
  createTemplate,
  deleteTemplate,
  getStudentProgress,
  listTemplates,
  updateItemProgress,
} from './checklist.controller';

const router = Router();

/**
 * @openapi
 * /api/checklists:
 *   get:
 *     tags: [Checklists]
 *     summary: List checklist templates (seeds USA/Canada/NZ defaults on first use)
 *     parameters:
 *       - in: query
 *         name: country
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of templates }
 *   post:
 *     tags: [Checklists]
 *     summary: Create a checklist template
 *     responses:
 *       201: { description: Template created }
 */
router.get('/', listTemplates);
router.post('/', validate(createChecklistSchema), createTemplate);

/**
 * @openapi
 * /api/checklists/{id}:
 *   delete:
 *     tags: [Checklists]
 *     summary: Delete a checklist template
 *     responses:
 *       204: { description: Template deleted }
 */
router.delete('/:id', deleteTemplate);

/**
 * @openapi
 * /api/checklists/{id}/assign/{studentId}:
 *   post:
 *     tags: [Checklists]
 *     summary: Assign a checklist template to a student
 *     responses:
 *       201: { description: Progress created or existing progress returned }
 */
router.post('/:id/assign/:studentId', assignToStudent);

/**
 * @openapi
 * /api/checklists/students/{studentId}/progress:
 *   get:
 *     tags: [Checklists]
 *     summary: Get checklist progress for a student
 *     responses:
 *       200: { description: Progress records }
 */
router.get('/students/:studentId/progress', getStudentProgress);

/**
 * @openapi
 * /api/checklists/progress/{progressId}/items/{itemKey}:
 *   patch:
 *     tags: [Checklists]
 *     summary: Mark a checklist item complete/incomplete
 *     responses:
 *       200: { description: Progress updated }
 */
router.patch('/progress/:progressId/items/:itemKey', validate(updateItemProgressSchema), updateItemProgress);

export default router;
