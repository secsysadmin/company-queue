import { Request, Response } from "express";
import companyModel, { Company } from "../models/company.model";

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await companyModel.find({});

  res.json(companies);
};

export const getCompanyByName = async (req: Request, res: Response) => {
  const name = req.body.name;

  const company = await companyModel.find({ name: name });

  res.json(company);
};
