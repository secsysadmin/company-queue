import mongoose, { Schema } from "mongoose";

// Interface representing the Company document
export interface CompanyQueue {
  companyName: string;
  companyID: string;
  lineNumber: number;
  majors: string[];
  studentsInLine: {
    phoneNumber: number;
    major: string;
    ticketNumber: string;
    index: number;
    contacted: boolean;
  }[];
}

// Define the Company schema
const CompanyQueueSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  companyID: {type: String, required: true},
  lineNumber: { type: Number, required: true },
  majors: { type: [String], required: true },
  studentsInLine: [
    {
      phoneNumber: { type: Number, required: true },
      major: { type: String, required: true },
      ticketNumber: { type: String, required: true },
      index: { type: Number, required: true },
      contacted: { type: Boolean, required: true },
    },
  ],
});

// Create and export the Company model
export default mongoose.model<CompanyQueue>("CompanyQueue", CompanyQueueSchema);
