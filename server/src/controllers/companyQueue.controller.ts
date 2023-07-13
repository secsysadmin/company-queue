import { Request, Response } from "express";
import companyQueueModel, { CompanyQueue } from "../models/companyQueue.model";

export const getCompanyQueues = async (req: Request, res: Response) => {
  const companyQueues = await companyQueueModel.find({});

  res.json(companyQueues);
};
