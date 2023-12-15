import mongoose, { Schema } from "mongoose";
import { Major } from "./major.model";

export interface StudentInLine {
  name: string;
  phoneNumber: number;
  major: Major;
  ticketNumber: string;
  joinedAt: Date;
  notifiedAt: Date;
}

export interface ICompanyQueue extends Document {
  companyName: string;
  companyID: Schema.Types.ObjectId;
  lineNumber: number;
  majors: Major[];
  studentsInLine: StudentInLine[];
}

const companyQueueSchema = new Schema<ICompanyQueue>({
  companyName: { type: String, required: true },
  companyID: { type: Schema.Types.ObjectId, required: true },
  lineNumber: { type: Number, required: true },
  majors: [{ type: String, enum: Object.values(Major) }],
  studentsInLine: [
    {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      major: { type: String, enum: Object.values(Major), required: true },
      ticketNumber: { type: String, required: true },
      joinedAt: { type: Date, default: Date.now },
      notifiedAt: { type: Date, default: null },
    },
  ],
});

const CompanyQueue = mongoose.model<ICompanyQueue>(
  "CompanyQueue",
  companyQueueSchema
);

export default CompanyQueue;
