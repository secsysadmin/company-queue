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
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const companyId = req.params.companyId;
        const updatedCompanyData = req.body;

        // Find the company by ID and update its properties
        const updatedCompany = await companyModel.findByIdAndUpdate(
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
        const company = await companyModel.findOne({ _id: companyId });
        if (!company) {
            res.status(404).send('no company found with id ' + companyId);
        }
        return res.send(company?.toJSON());
    }
    catch{
        return res.status(500).send('db query failed. data could be improperly formatted');
    }
};

export const recruiterLogin = async (req: Request, res: Response) => {
    const { pin } = req.query;

    const company = await companyModel.findOne({ pin: pin });

    if (company == undefined) {
        return res.status(400).send('invalid pin');
    }
    company.save();
    return res.status(200).send(company._id);
}
