import { Request, Response } from "express";
import { CompanyModel, Company } from "../models/company.model";

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await CompanyModel.find({});

  res.json(companies);
};

export const getCompanyByName = async (req: Request, res: Response) => {
  const companyName: string = req.params.companyName;

  const company = await CompanyModel.find({ name: companyName });

  res.json(company);
};

export const addCompany = async (req: Request, res: Response) => {
  const { adminPin } = req.query;

  if (adminPin != process.env.ADMIN_PIN) {
    return res.status(400).json("invalid admin request").send();
  }

  try {
    const companyData = req.body as Company;

    const newCompany = await CompanyModel.create(companyData);

    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const updatedCompanyData = req.body;

    // Find the company by ID and update its properties
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      companyId,
      updatedCompanyData,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(updatedCompany);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  const companyId: string = req.params.companyId;
  try {
    const company = await CompanyModel.findOne({ _id: companyId });

    if (!company) {
      res.status(404).send("no company found with id " + companyId);
    }

    return res.json(company);
  } catch {
    return res
      .status(500)
      .send("db query failed. data could be improperly formatted");
  }
};

export const recruiterLogin = async (req: Request, res: Response) => {
  const { pin } = req.query;

  const company = await CompanyModel.findOne({ pin: pin });

  if (company == undefined) {
    return res.status(400).send("invalid pin");
  }

  return res.status(200).json(company);
};
