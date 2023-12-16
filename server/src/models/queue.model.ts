import mongoose, { Schema } from "mongoose";
import { Major } from "./major.model";

export interface StudentInLine {
  name: string;
  phoneNumber: string;
  major: Major;
  ticketNumber: string;
  joinedAt: Date;
  notifiedAt: Date;
}

export interface Queue {
  companyName: string;
  companyID: Schema.Types.ObjectId;
  lineNumber: number;
  majors: Major[];
  studentsInLine: StudentInLine[];
}

const QueueSchema = new Schema<Queue>({
  companyName: { type: String, required: true },
  companyID: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
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

const QueueModel = mongoose.model<Queue>("Queue", QueueSchema);

export default QueueModel;
