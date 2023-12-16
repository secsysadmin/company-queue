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

companyRouter.get("/name/:companyName", getCompanyByName);

companyRouter.get("/id/:companyId", getCompanyById);

companyRouter.post("/", addCompany);

companyRouter.put("/id/:companyId", updateCompany);

companyRouter.get("/recruiter-login", recruiterLogin);
