import mongoose, { Schema } from "mongoose";

// Interface representing the Company document
export interface Company {
  name: string;
  pin: string;
  booth: string;
}

// Define the Company schema
const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  pin: {type: String, required: true},
  booth: { type: String, required: true },
});

// Create and export the Company model
export const companyModel = mongoose.model<Company>("Company", CompanySchema);
