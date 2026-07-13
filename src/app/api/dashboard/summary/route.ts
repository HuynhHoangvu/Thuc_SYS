import { prisma } from '@/lib/prisma';
import { ok, withErrorHandling } from '@/lib/api-handler';

const countryDbToDto: Record<string, string> = { USA: 'USA', Canada: 'Canada', NewZealand: 'New Zealand' };

export const GET = withErrorHandling(async () => {
  const [totalStudents, byStageRaw, byCountryRaw, recentStudents] = await Promise.all([
    prisma.student.count(),
    prisma.student.groupBy({ by: ['stage'], _count: { _all: true } }),
    prisma.student.groupBy({
      by: ['destinationCountry'],
      _count: { _all: true },
      where: { destinationCountry: { not: null } },
    }),
    prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, fullName: true, stage: true, destinationCountry: true, createdAt: true },
    }),
  ]);

  return ok({
    totalStudents,
    byStage: Object.fromEntries(byStageRaw.map((row) => [row.stage, row._count._all])),
    byCountry: Object.fromEntries(
      byCountryRaw
        .filter((row) => row.destinationCountry)
        .map((row) => [countryDbToDto[row.destinationCountry as string], row._count._all])
    ),
    recentStudents: recentStudents.map((s) => ({
      _id: s.id,
      personal: { fullName: s.fullName },
      stage: s.stage,
      studyAbroad: { destinationCountry: s.destinationCountry ? countryDbToDto[s.destinationCountry] : undefined },
      createdAt: s.createdAt,
    })),
  });
});
