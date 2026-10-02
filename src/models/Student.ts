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
    // Mailbox the company creates for the student (with emailPassword).
    email: { type: String },
    // Student's own address; progress-update emails go here.
    personalEmail: { type: String },
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
    destinationCountry: { type: String, enum: ['USA', 'Canada', 'NewZealand', 'Germany', 'France'] },
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

    // progress-update emails
    caseCode: { type: String },
    notifyInfo: { type: Map, of: String, default: {} },
    notifyOptOut: { type: Boolean, default: false },
    // Starred in the list: kept at the top (students needing attention).
    pinned: { type: Boolean, default: false },
    unsubscribeToken: { type: String },
    emailBounced: { type: Boolean, default: false },
  },
  { timestamps: true }
);

StudentSchema.index({ stage: 1 });
StudentSchema.index({ visaExpiry: 1 });
StudentSchema.index({ destinationCountry: 1 });
StudentSchema.index({ createdAt: -1 });
StudentSchema.index({ email: 1 });
StudentSchema.index({ personalEmail: 1 });
StudentSchema.index({ caseCode: 1 }, { unique: true, sparse: true });
StudentSchema.index({ unsubscribeToken: 1 }, { unique: true, sparse: true });

export type StudentDoc = InferSchemaType<typeof StudentSchema> & { _id: mongoose.Types.ObjectId };

// In dev, hot reload keeps the old compiled model (and silently drops newly added fields),
// so re-register it from the current schema. Production compiles once.
if (process.env.NODE_ENV !== 'production' && mongoose.models.Student) mongoose.deleteModel('Student');

export const Student =
  (mongoose.models.Student as mongoose.Model<StudentDoc>) || mongoose.model<StudentDoc>('Student', StudentSchema);

export default Student;
