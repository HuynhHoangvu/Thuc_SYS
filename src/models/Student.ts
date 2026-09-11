import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const StudentSchema = new Schema(
  {
    // personal
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    nationality: { type: String },
    passportNumber: { type: String },
    passportExpiry: { type: Date },
    email: { type: String, required: true },
    emailPassword: { type: String },
    phone: { type: String },
    address: { type: String },

    // academic
    highestEducation: { type: String },
    schoolName: { type: String },
    gpa: { type: Number },
    graduationYear: { type: Number },
    englishTest: { type: String, enum: ['IELTS', 'TOEFL', 'PTE', 'Duolingo', 'None'] },
    englishScore: { type: String },
    englishTestDate: { type: Date },

    // study abroad
    destinationCountry: { type: String, enum: ['USA', 'Canada', 'NewZealand'] },
    intakeTerm: { type: String },
    intakeYear: { type: Number },
    preferredUniversities: { type: [String], default: [] },
    preferredMajor: { type: String },
    visaType: { type: String },
    visaIssuedDate: { type: Date },
    visaExpiry: { type: Date },
    sevisId: { type: String },
    i20Number: { type: String },
    studyPermitNumber: { type: String },
    dliNumber: { type: String },
    nzQualificationCode: { type: String },

    stage: { type: String, default: 'lead' },
    stageOrder: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

StudentSchema.index({ stage: 1 });
StudentSchema.index({ visaExpiry: 1 });
StudentSchema.index({ destinationCountry: 1 });
StudentSchema.index({ createdAt: -1 });
StudentSchema.index({ email: 1 });

export type StudentDoc = InferSchemaType<typeof StudentSchema> & { _id: mongoose.Types.ObjectId };

export const Student =
  (mongoose.models.Student as mongoose.Model<StudentDoc>) || mongoose.model<StudentDoc>('Student', StudentSchema);

export default Student;
