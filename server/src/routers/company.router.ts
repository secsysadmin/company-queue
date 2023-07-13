import { Router } from 'express';

import { getCompanies } from '../controllers/company.controller';

export const companyRouter = Router();

companyRouter.get('/', getCompanies);
