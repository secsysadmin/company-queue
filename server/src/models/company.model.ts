import mongoose, { Schema } from "mongoose";

export interface Company {
  name: string;
  pin: string;
  booth: string;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  pin: { type: String, required: true },
  booth: { type: String, required: true },
});

export const CompanyModel = mongoose.model<Company>("Company", CompanySchema);
