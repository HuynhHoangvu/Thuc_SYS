import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { createTemplateSchema, updateStepProgressSchema, updateTemplateSchema } from './workflow.validation';
import {
  assignToStudent,
  createTemplate,
  deleteTemplate,
  getStudentProgress,
  listTemplates,
  updateStepProgress,
  updateTemplate,
} from './workflow.controller';

const router = Router();

/**
 * @openapi
 * /api/workflows:
 *   get:
 *     tags: [Workflow]
 *     summary: List workflow templates
 *     responses:
 *       200: { description: List of templates }
 *   post:
 *     tags: [Workflow]
 *     summary: Create a workflow template with ordered steps
 *     responses:
 *       201: { description: Template created }
 */
router.get('/', listTemplates);
router.post('/', validate(createTemplateSchema), createTemplate);

/**
 * @openapi
 * /api/workflows/{id}:
 *   put:
 *     tags: [Workflow]
 *     summary: Update a workflow template
 *     responses:
 *       200: { description: Template updated }
 *   delete:
 *     tags: [Workflow]
 *     summary: Delete a workflow template
 *     responses:
 *       204: { description: Template deleted }
 */
router.put('/:id', validate(updateTemplateSchema), updateTemplate);
router.delete('/:id', deleteTemplate);

/**
 * @openapi
 * /api/workflows/{id}/assign/{studentId}:
 *   post:
 *     tags: [Workflow]
 *     summary: Assign a workflow template to a student (initializes step progress)
 *     responses:
 *       201: { description: Progress created or existing progress returned }
 */
router.post('/:id/assign/:studentId', assignToStudent);

/**
 * @openapi
 * /api/workflows/students/{studentId}/progress:
 *   get:
 *     tags: [Workflow]
 *     summary: Get all workflow progress records for a student
 *     responses:
 *       200: { description: Progress records }
 */
router.get('/students/:studentId/progress', getStudentProgress);

/**
 * @openapi
 * /api/workflows/progress/{progressId}/steps/{stepKey}:
 *   patch:
 *     tags: [Workflow]
 *     summary: Mark a workflow step complete/incomplete for a student
 *     responses:
 *       200: { description: Progress updated }
 */
router.patch('/progress/:progressId/steps/:stepKey', validate(updateStepProgressSchema), updateStepProgress);

export default router;
