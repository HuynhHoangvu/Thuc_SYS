import { api } from '@/lib/api';
import type { CreateStudentInput, Student, StudentListMeta, StudentListParams, UpdateStudentInput } from './student.types';

interface ListResponse {
  success: boolean;
  data: Student[];
  meta: StudentListMeta;
}

interface ItemResponse {
  success: boolean;
  data: Student;
}

export const studentApi = {
  async list(params: StudentListParams): Promise<ListResponse> {
    const res = await api.get<ListResponse>('/students', { params });
    return res.data;
  },
  async getById(id: string): Promise<Student> {
    const res = await api.get<ItemResponse>(`/students/${id}`);
    return res.data.data;
  },
  async create(input: CreateStudentInput): Promise<Student> {
    const res = await api.post<ItemResponse>('/students', input);
    return res.data.data;
  },
  async update(id: string, input: UpdateStudentInput): Promise<Student> {
    const res = await api.put<ItemResponse>(`/students/${id}`, input);
    return res.data.data;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/students/${id}`);
  },
  async addTodo(studentId: string, text: string): Promise<Student> {
    const res = await api.post<ItemResponse>(`/students/${studentId}/todos`, { text });
    return res.data.data;
  },
  async updateTodo(studentId: string, todoId: string, done: boolean): Promise<Student> {
    const res = await api.patch<ItemResponse>(`/students/${studentId}/todos/${todoId}`, { done });
    return res.data.data;
  },
  async removeTodo(studentId: string, todoId: string): Promise<Student> {
    const res = await api.delete<ItemResponse>(`/students/${studentId}/todos/${todoId}`);
    return res.data.data;
  },
};
