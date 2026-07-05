import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { createFormTemplateSchema, submitFormSchema, updateFormTemplateSchema } from './form.validation';
import {
  createTemplate,
  deleteTemplate,
  getStudentSubmissions,
  listTemplates,
  submitForm,
  updateTemplate,
} from './form.controller';

const router = Router();

/**
 * @openapi
 * /api/forms:
 *   get:
 *     tags: [FormBuilder]
 *     summary: List dynamic form templates
 *     responses:
 *       200: { description: List of templates }
 *   post:
 *     tags: [FormBuilder]
 *     summary: Create a dynamic form template with ordered fields
 *     responses:
 *       201: { description: Template created }
 */
router.get('/', listTemplates);
router.post('/', validate(createFormTemplateSchema), createTemplate);

/**
 * @openapi
 * /api/forms/{id}:
 *   put:
 *     tags: [FormBuilder]
 *     summary: Update a form template
 *     responses:
 *       200: { description: Template updated }
 *   delete:
 *     tags: [FormBuilder]
 *     summary: Delete a form template
 *     responses:
 *       204: { description: Template deleted }
 */
router.put('/:id', validate(updateFormTemplateSchema), updateTemplate);
router.delete('/:id', deleteTemplate);

/**
 * @openapi
 * /api/forms/{id}/submissions/{studentId}:
 *   put:
 *     tags: [FormBuilder]
 *     summary: Submit (or update) a student's answers for a form template
 *     responses:
 *       200: { description: Submission saved }
 */
router.put('/:id/submissions/:studentId', validate(submitFormSchema), submitForm);

/**
 * @openapi
 * /api/forms/students/{studentId}/submissions:
 *   get:
 *     tags: [FormBuilder]
 *     summary: List a student's form submissions
 *     responses:
 *       200: { description: Submissions }
 */
router.get('/students/:studentId/submissions', getStudentSubmissions);

export default router;
