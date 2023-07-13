import mongoose, { Schema, Document } from "mongoose";

// Interface representing the Company document
export interface CompanyQueue {
  companyName: string;
  companyBooth: string;
  companyLineNumber: number;
  studentsInLine: {
    phoneNumber: number;
    majors: string;
    checkOutId: number;
    index: number;
  }[];
}

// Define the Company schema
const CompanyQueueSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  companyBooth: { type: String, required: true },
  companyLineNumber: { type: Number, required: true },
  studentsInLine: [
    {
      phoneNumber: { type: Number, required: true },
      major: { type: String, required: true },
      checkOutId: { type: Number, required: true },
      index: { type: Number, required: true },
    },
  ],
});

// Create and export the Company model
export default mongoose.model<CompanyQueue>("CompanyQueue", CompanyQueueSchema);
