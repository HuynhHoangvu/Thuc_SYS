import { Router } from 'express';
import { validate } from '../../middleware/validate';
import {
  createColumnSchema,
  moveStudentSchema,
  reorderColumnsSchema,
  updateColumnSchema,
} from './kanban.validation';
import {
  createColumn,
  deleteColumn,
  listColumns,
  moveStudent,
  reorderColumns,
  updateColumn,
} from './kanban.controller';

const router = Router();

/**
 * @openapi
 * /api/kanban/columns:
 *   get:
 *     tags: [Kanban]
 *     summary: List kanban columns (seeds defaults on first use)
 *     responses:
 *       200: { description: List of columns }
 *   post:
 *     tags: [Kanban]
 *     summary: Create a kanban column
 *     responses:
 *       201: { description: Column created }
 */
router.get('/columns', listColumns);
router.post('/columns', validate(createColumnSchema), createColumn);

/**
 * @openapi
 * /api/kanban/columns/reorder:
 *   put:
 *     tags: [Kanban]
 *     summary: Reorder kanban columns
 *     responses:
 *       200: { description: Columns reordered }
 */
router.put('/columns/reorder', validate(reorderColumnsSchema), reorderColumns);

/**
 * @openapi
 * /api/kanban/columns/{id}:
 *   put:
 *     tags: [Kanban]
 *     summary: Update (rename/recolor) a kanban column
 *     responses:
 *       200: { description: Column updated }
 *   delete:
 *     tags: [Kanban]
 *     summary: Delete a kanban column. Students on it are reassigned to the adjacent column. Fails if this is the last column.
 *     responses:
 *       200: { description: Column deleted; response includes movedStudentsTo }
 *       400: { description: Cannot delete the last remaining column }
 */
router.put('/columns/:id', validate(updateColumnSchema), updateColumn);
router.delete('/columns/:id', deleteColumn);

/**
 * @openapi
 * /api/kanban/students/{id}/move:
 *   patch:
 *     tags: [Kanban]
 *     summary: Move a student to a different kanban stage (drag & drop)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [stage]
 *             properties:
 *               stage: { type: string }
 *               stageOrder: { type: number }
 *     responses:
 *       200: { description: Student moved; response includes previousStage for undo }
 */
router.patch('/students/:id/move', validate(moveStudentSchema), moveStudent);

export default router;
