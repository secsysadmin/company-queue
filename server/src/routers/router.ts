import { Router } from "express";

import { companyRouter } from "./company.router";
import { queueRouter } from "./queue.router";

const router = Router();

router.use("/company", companyRouter);
router.use("/queue", queueRouter);

export default router;
