import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { ok, withErrorHandling } from '@/lib/api-handler';

const countryDbToDto: Record<string, string> = { USA: 'USA', Canada: 'Canada', NewZealand: 'New Zealand' };

export const GET = withErrorHandling(async () => {
  await connectDB();

  const [totalStudents, byStageRaw, byCountryRaw, recentStudents] = await Promise.all([
    Student.countDocuments(),
    Student.aggregate([{ $group: { _id: '$stage', count: { $sum: 1 } } }]),
    Student.aggregate([
      { $match: { destinationCountry: { $ne: null } } },
      { $group: { _id: '$destinationCountry', count: { $sum: 1 } } },
    ]),
    Student.find({}, { fullName: 1, stage: 1, destinationCountry: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(5),
  ]);

  return ok({
    totalStudents,
    byStage: Object.fromEntries(byStageRaw.map((row) => [row._id, row.count])),
    byCountry: Object.fromEntries(
      byCountryRaw.filter((row) => row._id).map((row) => [countryDbToDto[row._id as string], row.count])
    ),
    recentStudents: recentStudents.map((s) => ({
      _id: String(s._id),
      personal: { fullName: s.fullName },
      stage: s.stage,
      studyAbroad: { destinationCountry: s.destinationCountry ? countryDbToDto[s.destinationCountry] : undefined },
      createdAt: s.createdAt,
    })),
  });
});
