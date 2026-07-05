import { studentRepository } from './student.repository';
import { CreateStudentInput, ListStudentsQuery, UpdateStudentInput } from './student.validation';
import { NotFoundError } from '../../shared/errors/AppError';
import { Student } from './student.model';

export const studentService = {
  create(data: CreateStudentInput) {
    return studentRepository.create(data);
  },

  list(query: ListStudentsQuery) {
    return studentRepository.list(query);
  },

  async getById(id: string) {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return student;
  },

  async update(id: string, data: UpdateStudentInput) {
    const student = await studentRepository.updateById(id, data);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return student;
  },

  async remove(id: string) {
    const student = await studentRepository.deleteById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
  },

  async addTodo(studentId: string, text: string) {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $push: { todos: { text, done: false } } },
      { new: true, runValidators: true }
    );
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return student;
  },

  async updateTodo(studentId: string, todoId: string, done: boolean) {
    const student = await Student.findOneAndUpdate(
      { _id: studentId, 'todos._id': todoId },
      { $set: { 'todos.$.done': done } },
      { new: true }
    );
    if (!student) {
      throw new NotFoundError('Student or todo not found');
    }
    return student;
  },

  async removeTodo(studentId: string, todoId: string) {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return student;
  },
};
