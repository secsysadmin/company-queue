import { Router } from "express";

import {
  addCompany,
  getCompanies,
  getCompanyById,
  getCompanyByName,
  recruiterLogin,
  updateCompany,
} from "../controllers/company.controller";

export const companyRouter = Router();

companyRouter.get("/", getCompanies);

companyRouter.get("/name", getCompanyByName);

companyRouter.post("/", addCompany);

companyRouter.put("/:companyId", updateCompany);

companyRouter.get("/id/:companyId", getCompanyById);

companyRouter.get("recruiter-login", recruiterLogin)
