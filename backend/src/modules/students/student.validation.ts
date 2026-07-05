import { z } from 'zod';

const personalSchema = z.object({
  fullName: z.string().min(2),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  passportExpiry: z.coerce.date().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const academicSchema = z.object({
  highestEducation: z.string().optional(),
  schoolName: z.string().optional(),
  gpa: z.number().optional(),
  graduationYear: z.number().optional(),
  englishTest: z.enum(['IELTS', 'TOEFL', 'PTE', 'Duolingo', 'None']).optional(),
  englishScore: z.string().optional(),
});

const studyAbroadSchema = z.object({
  destinationCountry: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  intakeTerm: z.string().optional(),
  intakeYear: z.number().optional(),
  preferredUniversities: z.array(z.string()).optional(),
  preferredMajor: z.string().optional(),
  visaType: z.string().optional(),
  visaExpiry: z.coerce.date().optional(),
  sevisId: z.string().optional(),
  i20Number: z.string().optional(),
  studyPermitNumber: z.string().optional(),
  dliNumber: z.string().optional(),
  nzQualificationCode: z.string().optional(),
});

export const createStudentSchema = z.object({
  body: z.object({
    personal: personalSchema,
    academic: academicSchema.optional(),
    studyAbroad: studyAbroadSchema.optional(),
    stage: z.string().min(1).optional(),
    notes: z.string().optional(),
  }),
});

export const updateStudentSchema = z.object({
  body: z.object({
    personal: personalSchema.partial().optional(),
    academic: academicSchema.optional(),
    studyAbroad: studyAbroadSchema.optional(),
    stage: z.string().min(1).optional(),
    notes: z.string().optional(),
  }),
});

export const listStudentsSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    stage: z.string().optional(),
    destinationCountry: z.string().optional(),
  }),
});

export const addTodoSchema = z.object({
  body: z.object({
    text: z.string().min(1),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    done: z.boolean(),
  }),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>['body'];
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>['body'];
export type ListStudentsQuery = z.infer<typeof listStudentsSchema>['query'];
