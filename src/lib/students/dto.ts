import { z } from 'zod';
import type { Prisma } from '@/generated/prisma/client';

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
  personal: personalSchema,
  academic: academicSchema.optional(),
  studyAbroad: studyAbroadSchema.optional(),
  stage: z.string().min(1).optional(),
  notes: z.string().optional(),
});

export const updateStudentSchema = z.object({
  personal: personalSchema.partial().optional(),
  academic: academicSchema.optional(),
  studyAbroad: studyAbroadSchema.optional(),
  stage: z.string().min(1).optional(),
  notes: z.string().optional(),
});

export const listStudentsQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  search: z.string().optional(),
  stage: z.string().optional(),
  destinationCountry: z.string().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

const countryDbToDto: Record<string, string> = { USA: 'USA', Canada: 'Canada', NewZealand: 'New Zealand' };
const countryDtoToDb: Record<string, string> = { USA: 'USA', Canada: 'Canada', 'New Zealand': 'NewZealand' };

export function toCreateData(input: CreateStudentInput): Prisma.StudentCreateInput {
  return {
    fullName: input.personal.fullName,
    dateOfBirth: input.personal.dateOfBirth,
    gender: input.personal.gender,
    nationality: input.personal.nationality,
    passportNumber: input.personal.passportNumber,
    passportExpiry: input.personal.passportExpiry,
    email: input.personal.email.toLowerCase().trim(),
    phone: input.personal.phone,
    address: input.personal.address,
    highestEducation: input.academic?.highestEducation,
    schoolName: input.academic?.schoolName,
    gpa: input.academic?.gpa,
    graduationYear: input.academic?.graduationYear,
    englishTest: input.academic?.englishTest,
    englishScore: input.academic?.englishScore,
    destinationCountry: input.studyAbroad?.destinationCountry
      ? (countryDtoToDb[input.studyAbroad.destinationCountry] as never)
      : undefined,
    intakeTerm: input.studyAbroad?.intakeTerm,
    intakeYear: input.studyAbroad?.intakeYear,
    preferredUniversities: input.studyAbroad?.preferredUniversities ?? [],
    preferredMajor: input.studyAbroad?.preferredMajor,
    visaType: input.studyAbroad?.visaType,
    visaExpiry: input.studyAbroad?.visaExpiry,
    sevisId: input.studyAbroad?.sevisId,
    i20Number: input.studyAbroad?.i20Number,
    studyPermitNumber: input.studyAbroad?.studyPermitNumber,
    dliNumber: input.studyAbroad?.dliNumber,
    nzQualificationCode: input.studyAbroad?.nzQualificationCode,
    stage: input.stage ?? 'lead',
    notes: input.notes,
  };
}

export function toUpdateData(input: UpdateStudentInput): Prisma.StudentUpdateInput {
  const data: Prisma.StudentUpdateInput = {};
  const p = input.personal;
  if (p) {
    if (p.fullName !== undefined) data.fullName = p.fullName;
    if (p.dateOfBirth !== undefined) data.dateOfBirth = p.dateOfBirth;
    if (p.gender !== undefined) data.gender = p.gender;
    if (p.nationality !== undefined) data.nationality = p.nationality;
    if (p.passportNumber !== undefined) data.passportNumber = p.passportNumber;
    if (p.passportExpiry !== undefined) data.passportExpiry = p.passportExpiry;
    if (p.email !== undefined) data.email = p.email.toLowerCase().trim();
    if (p.phone !== undefined) data.phone = p.phone;
    if (p.address !== undefined) data.address = p.address;
  }
  const a = input.academic;
  if (a) {
    if (a.highestEducation !== undefined) data.highestEducation = a.highestEducation;
    if (a.schoolName !== undefined) data.schoolName = a.schoolName;
    if (a.gpa !== undefined) data.gpa = a.gpa;
    if (a.graduationYear !== undefined) data.graduationYear = a.graduationYear;
    if (a.englishTest !== undefined) data.englishTest = a.englishTest;
    if (a.englishScore !== undefined) data.englishScore = a.englishScore;
  }
  const s = input.studyAbroad;
  if (s) {
    if (s.destinationCountry !== undefined) data.destinationCountry = countryDtoToDb[s.destinationCountry] as never;
    if (s.intakeTerm !== undefined) data.intakeTerm = s.intakeTerm;
    if (s.intakeYear !== undefined) data.intakeYear = s.intakeYear;
    if (s.preferredUniversities !== undefined) data.preferredUniversities = s.preferredUniversities;
    if (s.preferredMajor !== undefined) data.preferredMajor = s.preferredMajor;
    if (s.visaType !== undefined) data.visaType = s.visaType;
    if (s.visaExpiry !== undefined) data.visaExpiry = s.visaExpiry;
    if (s.sevisId !== undefined) data.sevisId = s.sevisId;
    if (s.i20Number !== undefined) data.i20Number = s.i20Number;
    if (s.studyPermitNumber !== undefined) data.studyPermitNumber = s.studyPermitNumber;
    if (s.dliNumber !== undefined) data.dliNumber = s.dliNumber;
    if (s.nzQualificationCode !== undefined) data.nzQualificationCode = s.nzQualificationCode;
  }
  if (input.stage !== undefined) data.stage = input.stage;
  if (input.notes !== undefined) data.notes = input.notes;
  return data;
}

type StudentWithTodos = Prisma.StudentGetPayload<{ include: { todos: true } }>;

export function toStudentDTO(student: StudentWithTodos) {
  return {
    id: student.id,
    personal: {
      fullName: student.fullName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      nationality: student.nationality,
      passportNumber: student.passportNumber,
      passportExpiry: student.passportExpiry,
      email: student.email,
      phone: student.phone,
      address: student.address,
    },
    academic: {
      highestEducation: student.highestEducation,
      schoolName: student.schoolName,
      gpa: student.gpa,
      graduationYear: student.graduationYear,
      englishTest: student.englishTest,
      englishScore: student.englishScore,
    },
    studyAbroad: {
      destinationCountry: student.destinationCountry ? countryDbToDto[student.destinationCountry] : undefined,
      intakeTerm: student.intakeTerm,
      intakeYear: student.intakeYear,
      preferredUniversities: student.preferredUniversities,
      preferredMajor: student.preferredMajor,
      visaType: student.visaType,
      visaExpiry: student.visaExpiry,
      sevisId: student.sevisId,
      i20Number: student.i20Number,
      studyPermitNumber: student.studyPermitNumber,
      dliNumber: student.dliNumber,
      nzQualificationCode: student.nzQualificationCode,
    },
    stage: student.stage,
    stageOrder: student.stageOrder,
    notes: student.notes,
    todos: student.todos
      .slice()
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map((t) => ({ id: t.id, text: t.text, done: t.done, createdAt: t.createdAt })),
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
}
