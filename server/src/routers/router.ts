import { Router } from "express";

import { companyRouter } from "./company.router";
import { companyQueueRouter } from "./companyQueue.router";

const router = Router();

router.use("/company", companyRouter);
router.use("/company-queue", companyQueueRouter);

export default router;
