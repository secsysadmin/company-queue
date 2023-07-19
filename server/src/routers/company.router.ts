import { Router } from "express";

import {
  addCompany,
  getCompanies,
  getCompanyById,
  getCompanyByName,
  updateCompany,
} from "../controllers/company.controller";

export const companyRouter = Router();

companyRouter.get("/", getCompanies);

companyRouter.get("/name", getCompanyByName);

companyRouter.post("/", addCompany);

companyRouter.put("/:companyId", updateCompany);

companyRouter.get("/id/:companyId", getCompanyById)