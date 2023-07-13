import { Request, Response } from 'express';
import companyModel from '../models/company.model';

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await companyModel.find({});

  res.status(200).json(companies);
};
