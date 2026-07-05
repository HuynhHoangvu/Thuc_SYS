import { Student } from '../students/student.model';

export const dashboardService = {
  async getSummary() {
    const [totalStudents, byStage, byCountry, recentStudents] = await Promise.all([
      Student.countDocuments(),
      Student.aggregate([{ $group: { _id: '$stage', count: { $sum: 1 } } }]),
      Student.aggregate([
        { $group: { _id: '$studyAbroad.destinationCountry', count: { $sum: 1 } } },
        { $match: { _id: { $ne: null } } },
      ]),
      Student.find().sort({ createdAt: -1 }).limit(5).select('personal.fullName stage studyAbroad.destinationCountry createdAt'),
    ]);

    return {
      totalStudents,
      byStage: Object.fromEntries(byStage.map((row) => [row._id, row.count])),
      byCountry: Object.fromEntries(byCountry.map((row) => [row._id, row.count])),
      recentStudents,
    };
  },
};
