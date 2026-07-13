import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { createStudentSchema, listStudentsQuerySchema, toCreateData, toStudentDTO } from '@/lib/students/dto';
import type { Prisma } from '@/generated/prisma/client';

export const GET = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url);
  const query = listStudentsQuerySchema.parse(Object.fromEntries(searchParams));

  const page = query.page ?? 1;
  const limit = query.limit ?? 20;

  const where: Prisma.StudentWhereInput = {};
  if (query.stage) where.stage = query.stage;
  if (query.destinationCountry) {
    where.destinationCountry = query.destinationCountry === 'New Zealand' ? 'NewZealand' : (query.destinationCountry as never);
  }
  if (query.search) {
    where.OR = [
      { fullName: { contains: query.search, mode: 'insensitive' } },
      { email: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.student.findMany({
      where,
      include: { todos: true },
      orderBy: [{ visaExpiry: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.student.count({ where }),
  ]);

  return ok(
    items.map(toStudentDTO),
    200,
    { total, page, limit, pages: Math.ceil(total / limit) || 1 }
  );
});

export const POST = withErrorHandling(async (req) => {
  const body = createStudentSchema.parse(await req.json());
  const student = await prisma.student.create({ data: toCreateData(body), include: { todos: true } });
  return ok(toStudentDTO(student), 201);
});
