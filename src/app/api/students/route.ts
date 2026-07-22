import { connectDB } from '@/lib/mongoose';
import { Student, type StudentDoc } from '@/models/Student';
import { Todo } from '@/models/Todo';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createStudentSchema, listStudentsQuerySchema, toCreateData, toStudentDTO } from '@/lib/students/dto';

export const GET = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url);
  const query = listStudentsQuerySchema.parse(Object.fromEntries(searchParams));
  await connectDB();

  const page = query.page ?? 1;
  const limit = query.limit ?? 20;

  const where: Record<string, unknown> = {};
  if (query.stage) where.stage = query.stage;
  if (query.destinationCountry) {
    where.destinationCountry = query.destinationCountry === 'New Zealand' ? 'NewZealand' : query.destinationCountry;
  }
  if (query.search) {
    const regex = new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    where.$or = [{ fullName: regex }, { email: regex }];
  }

  const [items, total] = await Promise.all([
    Student.aggregate([
      { $match: where },
      { $addFields: { _visaExpirySort: { $ifNull: ['$visaExpiry', new Date(8640000000000000)] } } },
      { $sort: { _visaExpirySort: 1, createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]),
    Student.countDocuments(where),
  ]);

  const studentIds = items.map((s) => String(s._id));
  const todos = await Todo.find({ studentId: { $in: studentIds } });
  const todosByStudent = new Map<string, (typeof todos)[number][]>();
  for (const t of todos) {
    const list = todosByStudent.get(t.studentId) ?? [];
    list.push(t);
    todosByStudent.set(t.studentId, list);
  }

  return ok(
    items.map((s) => toStudentDTO(s, (todosByStudent.get(String(s._id)) ?? []).map((t) => t.toObject()))),
    200,
    { total, page, limit, pages: Math.ceil(total / limit) || 1 }
  );
});

export const POST = withErrorHandling(async (req) => {
  const body = createStudentSchema.parse(await req.json());
  await connectDB();
  const student = await Student.create(toCreateData(body) as Partial<StudentDoc>);
  return ok(toStudentDTO(student.toObject(), []), 201);
});
