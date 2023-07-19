import { Request, Response } from "express";
import { companyModel, Company } from "../models/company.model";

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await companyModel.find({});

  res.json(companies);
};

export const getCompanyByName = async (req: Request, res: Response) => {
  const name: string = req.body.name;

  const company = await companyModel.find({ name: name });

  res.json(company);
};

export const addCompany = async (req: Request, res: Response) => {

  try {
      const companyData = req.body as Company;
      
      const newCompany = await companyModel.create(companyData);
  
      res.status(201).json(newCompany);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const updateData = req.body;

    // Find the company by ID and update its properties
    const updatedCompany = await companyModel.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Send a success response
    res.json(updatedCompany);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  const companyId: string = req.params.companyId;

  const company = await companyModel.find({ id: companyId });

  res.json(company);
};


