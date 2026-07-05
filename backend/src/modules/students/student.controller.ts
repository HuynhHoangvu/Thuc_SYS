import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { studentService } from './student.service';

export const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.create(req.body);
  res.status(201).json({ success: true, data: student });
});

export const listStudents = asyncHandler(async (req: Request, res: Response) => {
  const result = await studentService.list(req.query as never);
  res.status(200).json({ success: true, data: result.items, meta: { total: result.total, page: result.page, limit: result.limit, pages: result.pages } });
});

export const getStudent = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.getById(req.params.id);
  res.status(200).json({ success: true, data: student });
});

export const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: student });
});

export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  await studentService.remove(req.params.id);
  res.status(204).send();
});

export const addTodo = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.addTodo(req.params.id, req.body.text);
  res.status(201).json({ success: true, data: student });
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.updateTodo(req.params.id, req.params.todoId, req.body.done);
  res.status(200).json({ success: true, data: student });
});

export const removeTodo = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.removeTodo(req.params.id, req.params.todoId);
  res.status(200).json({ success: true, data: student });
});
