import { Schema, model, Document, Types } from 'mongoose';

export type DestinationCountry = 'USA' | 'Canada' | 'New Zealand';
/** Stage is a free-form key referencing a KanbanColumn.key — the board defines valid stages dynamically. */
export type StudentStage = string;

interface IPersonalInfo {
  fullName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: Date;
  email: string;
  phone?: string;
  address?: string;
}

interface IAcademicInfo {
  highestEducation?: string;
  schoolName?: string;
  gpa?: number;
  graduationYear?: number;
  englishTest?: 'IELTS' | 'TOEFL' | 'PTE' | 'Duolingo' | 'None';
  englishScore?: string;
}

interface IStudyAbroadInfo {
  destinationCountry?: DestinationCountry;
  intakeTerm?: string;
  intakeYear?: number;
  preferredUniversities?: string[];
  preferredMajor?: string;
  visaType?: string;
  visaExpiry?: Date;
  // USA
  sevisId?: string;
  i20Number?: string;
  // Canada
  studyPermitNumber?: string;
  dliNumber?: string;
  // New Zealand
  nzQualificationCode?: string;
}

export interface ITodo {
  _id: Types.ObjectId;
  text: string;
  done: boolean;
  createdAt: Date;
}

export interface IStudent extends Document {
  _id: Types.ObjectId;
  personal: IPersonalInfo;
  academic: IAcademicInfo;
  studyAbroad: IStudyAbroadInfo;
  stage: StudentStage;
  stageOrder: number;
  notes?: string;
  todos: ITodo[];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const studentSchema = new Schema<IStudent>(
  {
    personal: {
      fullName: { type: String, required: true, trim: true },
      dateOfBirth: Date,
      gender: { type: String, enum: ['male', 'female', 'other'] },
      nationality: String,
      passportNumber: String,
      passportExpiry: Date,
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: String,
      address: String,
    },
    academic: {
      highestEducation: String,
      schoolName: String,
      gpa: Number,
      graduationYear: Number,
      englishTest: { type: String, enum: ['IELTS', 'TOEFL', 'PTE', 'Duolingo', 'None'] },
      englishScore: String,
    },
    studyAbroad: {
      destinationCountry: { type: String, enum: ['USA', 'Canada', 'New Zealand'] },
      intakeTerm: String,
      intakeYear: Number,
      preferredUniversities: [String],
      preferredMajor: String,
      visaType: String,
      visaExpiry: Date,
      sevisId: String,
      i20Number: String,
      studyPermitNumber: String,
      dliNumber: String,
      nzQualificationCode: String,
    },
    stage: {
      type: String,
      default: 'lead',
    },
    stageOrder: { type: Number, default: 0 },
    notes: String,
    todos: [todoSchema],
  },
  { timestamps: true }
);

studentSchema.index({ 'personal.fullName': 'text', 'personal.email': 'text' });

export const Student = model<IStudent>('Student', studentSchema);
