import { Router } from 'express';
import { adminLogin } from '../controllers/admin.controller';

export const adminRouter = Router();

adminRouter.get('/admin-login', adminLogin);