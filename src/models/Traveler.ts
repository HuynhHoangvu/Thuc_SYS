import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const TravelerSchema = new Schema(
  {
    studentId: { type: String },

    // personal
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    nationality: { type: String },
    relationToStudent: { type: String },
    passportNumber: { type: String },
    passportExpiry: { type: Date },
    email: { type: String },
    phone: { type: String },
    address: { type: String },

    // travel / visa
    destinationCountry: { type: String, enum: ['USA', 'Canada', 'NewZealand'] },
    visaType: { type: String },
    purposeOfTrip: { type: String },
    plannedDepartureDate: { type: Date },
    plannedReturnDate: { type: Date },
    applicationDate: { type: Date },
    interviewDate: { type: Date },
    visaIssuedDate: { type: Date },
    visaExpiry: { type: Date },

    // financial / proof
    sponsorName: { type: String },
    sponsorRelationship: { type: String },
    proofOfIncome: { type: String },
    bankStatementProvided: { type: Boolean, default: false },

    stage: { type: String, default: 'lead' },
    stageOrder: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

TravelerSchema.index({ stage: 1 });
TravelerSchema.index({ visaExpiry: 1 });
TravelerSchema.index({ studentId: 1 });
TravelerSchema.index({ destinationCountry: 1 });
TravelerSchema.index({ createdAt: -1 });

export type TravelerDoc = InferSchemaType<typeof TravelerSchema> & { _id: mongoose.Types.ObjectId };

export const Traveler =
  (mongoose.models.Traveler as mongoose.Model<TravelerDoc>) || mongoose.model<TravelerDoc>('Traveler', TravelerSchema);

export default Traveler;
