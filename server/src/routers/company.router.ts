import { Router } from "express";

import {
  getCompanies,
  getCompanyByName,
} from "../controllers/company.controller";

export const companyRouter = Router();

companyRouter.get("/", getCompanies);

companyRouter.get("/name", getCompanyByName);
