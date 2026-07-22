import { z } from 'zod';
import type { StudentDoc } from '@/models/Student';
import type { TodoDoc } from '@/models/Todo';

const personalSchema = z.object({
  fullName: z.string().min(2),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  passportExpiry: z.coerce.date().optional(),
  email: z.string().email(),
  emailPassword: z.string().optional(),
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
  englishTestDate: z.coerce.date().optional(),
});

const studyAbroadSchema = z.object({
  destinationCountry: z.enum(['USA', 'Canada', 'New Zealand']).optional(),
  intakeTerm: z.string().optional(),
  intakeYear: z.number().optional(),
  preferredUniversities: z.array(z.string()).optional(),
  preferredMajor: z.string().optional(),
  visaType: z.string().optional(),
  visaIssuedDate: z.coerce.date().optional(),
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

export function toCreateData(input: CreateStudentInput) {
  return {
    fullName: input.personal.fullName,
    dateOfBirth: input.personal.dateOfBirth,
    gender: input.personal.gender,
    nationality: input.personal.nationality,
    passportNumber: input.personal.passportNumber,
    passportExpiry: input.personal.passportExpiry,
    email: input.personal.email.toLowerCase().trim(),
    emailPassword: input.personal.emailPassword,
    phone: input.personal.phone,
    address: input.personal.address,
    highestEducation: input.academic?.highestEducation,
    schoolName: input.academic?.schoolName,
    gpa: input.academic?.gpa,
    graduationYear: input.academic?.graduationYear,
    englishTest: input.academic?.englishTest,
    englishScore: input.academic?.englishScore,
    englishTestDate: input.academic?.englishTestDate,
    destinationCountry: input.studyAbroad?.destinationCountry
      ? countryDtoToDb[input.studyAbroad.destinationCountry]
      : undefined,
    intakeTerm: input.studyAbroad?.intakeTerm,
    intakeYear: input.studyAbroad?.intakeYear,
    preferredUniversities: input.studyAbroad?.preferredUniversities ?? [],
    preferredMajor: input.studyAbroad?.preferredMajor,
    visaType: input.studyAbroad?.visaType,
    visaIssuedDate: input.studyAbroad?.visaIssuedDate,
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

export function toUpdateData(input: UpdateStudentInput) {
  const data: Record<string, unknown> = {};
  const p = input.personal;
  if (p) {
    if (p.fullName !== undefined) data.fullName = p.fullName;
    if (p.dateOfBirth !== undefined) data.dateOfBirth = p.dateOfBirth;
    if (p.gender !== undefined) data.gender = p.gender;
    if (p.nationality !== undefined) data.nationality = p.nationality;
    if (p.passportNumber !== undefined) data.passportNumber = p.passportNumber;
    if (p.passportExpiry !== undefined) data.passportExpiry = p.passportExpiry;
    if (p.email !== undefined) data.email = p.email.toLowerCase().trim();
    if (p.emailPassword !== undefined) data.emailPassword = p.emailPassword;
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
    if (a.englishTestDate !== undefined) data.englishTestDate = a.englishTestDate;
  }
  const s = input.studyAbroad;
  if (s) {
    if (s.destinationCountry !== undefined) data.destinationCountry = countryDtoToDb[s.destinationCountry];
    if (s.intakeTerm !== undefined) data.intakeTerm = s.intakeTerm;
    if (s.intakeYear !== undefined) data.intakeYear = s.intakeYear;
    if (s.preferredUniversities !== undefined) data.preferredUniversities = s.preferredUniversities;
    if (s.preferredMajor !== undefined) data.preferredMajor = s.preferredMajor;
    if (s.visaType !== undefined) data.visaType = s.visaType;
    if (s.visaIssuedDate !== undefined) data.visaIssuedDate = s.visaIssuedDate;
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

type StudentLike = StudentDoc & { _id: unknown };

export function toStudentDTO(student: StudentLike, todos: TodoDoc[] = []) {
  const s = student;
  return {
    id: String(s._id),
    personal: {
      fullName: s.fullName,
      dateOfBirth: s.dateOfBirth,
      gender: s.gender,
      nationality: s.nationality,
      passportNumber: s.passportNumber,
      passportExpiry: s.passportExpiry,
      email: s.email,
      emailPassword: s.emailPassword,
      phone: s.phone,
      address: s.address,
    },
    academic: {
      highestEducation: s.highestEducation,
      schoolName: s.schoolName,
      gpa: s.gpa,
      graduationYear: s.graduationYear,
      englishTest: s.englishTest,
      englishScore: s.englishScore,
      englishTestDate: s.englishTestDate,
    },
    studyAbroad: {
      destinationCountry: s.destinationCountry ? countryDbToDto[s.destinationCountry] : undefined,
      intakeTerm: s.intakeTerm,
      intakeYear: s.intakeYear,
      preferredUniversities: s.preferredUniversities,
      preferredMajor: s.preferredMajor,
      visaType: s.visaType,
      visaIssuedDate: s.visaIssuedDate,
      visaExpiry: s.visaExpiry,
      sevisId: s.sevisId,
      i20Number: s.i20Number,
      studyPermitNumber: s.studyPermitNumber,
      dliNumber: s.dliNumber,
      nzQualificationCode: s.nzQualificationCode,
    },
    stage: s.stage,
    stageOrder: s.stageOrder,
    notes: s.notes,
    todos: (todos ?? [])
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((t) => ({ id: String((t as TodoDoc & { _id: unknown })._id), text: t.text, done: t.done, createdAt: t.createdAt })),
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  };
}
