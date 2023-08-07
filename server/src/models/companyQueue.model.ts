import mongoose, { Schema } from "mongoose";

// Interface representing the Company document
export interface CompanyQueue {
  companyName: string;
  companyBooth: string;
  lineNumber: number;
  majors: string[];
  studentsInLine: {
    phoneNumber: number;
    major: string;
    ticketNumber: string;
    index: number;
  }[];
}

// Define the Company schema
const CompanyQueueSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  companyBooth: { type: String, required: true },
  lineNumber: { type: Number, required: true },
  majors: { type: [String], required: true },
  studentsInLine: [
    {
      phoneNumber: { type: Number, required: true },
      major: { type: String, required: true },
      ticketNumber: { type: String, required: true },
      index: { type: Number, required: true },
    },
  ],
});

// Create and export the Company model
export default mongoose.model<CompanyQueue>("CompanyQueue", CompanyQueueSchema);
