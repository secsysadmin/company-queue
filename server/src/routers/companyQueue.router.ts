import { Router } from 'express';

import { getCompanyQueues } from '../controllers/companyQueue.controller';

export const companyQueueRouter = Router();

companyQueueRouter.get('/', getCompanyQueues);
