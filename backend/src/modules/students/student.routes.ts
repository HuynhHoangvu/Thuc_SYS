import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { addTodoSchema, createStudentSchema, listStudentsSchema, updateStudentSchema, updateTodoSchema } from './student.validation';
import {
  addTodo,
  createStudent,
  deleteStudent,
  getStudent,
  listStudents,
  removeTodo,
  updateStudent,
  updateTodo,
} from './student.controller';

const router = Router();

/**
 * @openapi
 * /api/students:
 *   get:
 *     tags: [Students]
 *     summary: List students (paginated, filterable, searchable)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: stage
 *         schema: { type: string }
 *       - in: query
 *         name: destinationCountry
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of students }
 *   post:
 *     tags: [Students]
 *     summary: Create a student
 *     responses:
 *       201: { description: Student created }
 */
router.get('/', validate(listStudentsSchema), listStudents);
router.post('/', validate(createStudentSchema), createStudent);

/**
 * @openapi
 * /api/students/{id}:
 *   get:
 *     tags: [Students]
 *     summary: Get a student by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Student found }
 *   put:
 *     tags: [Students]
 *     summary: Update a student
 *     responses:
 *       200: { description: Student updated }
 *   delete:
 *     tags: [Students]
 *     summary: Delete a student
 *     responses:
 *       204: { description: Student deleted }
 */
router.get('/:id', getStudent);
router.put('/:id', validate(updateStudentSchema), updateStudent);
router.delete('/:id', deleteStudent);

/**
 * @openapi
 * /api/students/{id}/todos:
 *   post:
 *     tags: [Students]
 *     summary: Add a to-do item for a student
 *     responses:
 *       201: { description: To-do added }
 */
router.post('/:id/todos', validate(addTodoSchema), addTodo);

/**
 * @openapi
 * /api/students/{id}/todos/{todoId}:
 *   patch:
 *     tags: [Students]
 *     summary: Mark a to-do item done/undone
 *     responses:
 *       200: { description: To-do updated }
 *   delete:
 *     tags: [Students]
 *     summary: Remove a to-do item
 *     responses:
 *       200: { description: To-do removed }
 */
router.patch('/:id/todos/:todoId', validate(updateTodoSchema), updateTodo);
router.delete('/:id/todos/:todoId', removeTodo);

export default router;
