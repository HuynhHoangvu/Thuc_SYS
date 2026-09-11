import { connectDB } from '@/lib/mongoose';
import { Student, type StudentDoc } from '@/models/Student';
import type { TodoDoc } from '@/models/Todo';
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
      // Join todos for just this page of students instead of a separate
      // round trip against the whole todos collection.
      {
        $lookup: {
          from: 'todos',
          let: { studentId: { $toString: '$_id' } },
          pipeline: [{ $match: { $expr: { $eq: ['$studentId', '$$studentId'] } } }],
          as: 'todos',
        },
      },
    ]),
    Student.countDocuments(where),
  ]);

  return ok(
    items.map((s) => toStudentDTO(s, (s.todos ?? []) as TodoDoc[])),
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
