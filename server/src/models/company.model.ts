import mongoose, { Schema, Document } from 'mongoose';

// Interface representing the Company document
export interface ICompany extends Document {
  name: string;
  booth: string;
  companyLines: {
    lineNumber: number;
    majors: string[];
  }[];
}

// Define the Company schema
const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  booth: { type: String, required: true },
  companyLines: [
    {
      lineNumber: { type: Number, required: true },
      majors: { type: [String], required: true },
    },
  ],
});

// Create and export the Company model
export default mongoose.model<ICompany>('Company', CompanySchema);
