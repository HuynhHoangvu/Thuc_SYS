import { FilterQuery } from 'mongoose';
import { IStudent, Student } from './student.model';
import { CreateStudentInput, ListStudentsQuery, UpdateStudentInput } from './student.validation';

export const studentRepository = {
  create(data: CreateStudentInput) {
    return Student.create(data);
  },

  findById(id: string) {
    return Student.findById(id);
  },

  updateById(id: string, data: UpdateStudentInput) {
    return Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  deleteById(id: string) {
    return Student.findByIdAndDelete(id);
  },

  async list(query: ListStudentsQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const filter: FilterQuery<IStudent> = {};

    if (query.stage) filter.stage = query.stage;
    if (query.destinationCountry) filter['studyAbroad.destinationCountry'] = query.destinationCountry;
    if (query.search) {
      filter.$or = [
        { 'personal.fullName': { $regex: query.search, $options: 'i' } },
        { 'personal.email': { $regex: query.search, $options: 'i' } },
      ];
    }

    // Students with the soonest visa expiry surface first so renewals aren't missed;
    // students without a visa expiry date sort to the end.
    const NO_VISA_EXPIRY_SORT_VALUE = new Date('9999-12-31');

    const [items, total] = await Promise.all([
      Student.aggregate([
        { $match: filter },
        { $addFields: { _visaExpirySort: { $ifNull: ['$studyAbroad.visaExpiry', NO_VISA_EXPIRY_SORT_VALUE] } } },
        { $sort: { _visaExpirySort: 1, createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        { $project: { _visaExpirySort: 0 } },
      ]),
      Student.countDocuments(filter),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) || 1 };
  },
};
