import { Request, Response } from "express";
import companyModel, { Company } from "../models/company.model";
import { request } from "http";

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await companyModel.find({});

  const newCompany: Company = {
    name: "Apple",
    booth: "A2",
    companyLines: [],
  };

  res.json(companies);
};

export const getCompanyByName = async (req: Request, res: Response) => {
  const name = req.body.name;

  const company = await companyModel.find({ name: name });

  res.json(company);
};
