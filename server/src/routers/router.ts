import { Router } from "express";

import { companyRouter } from "./company.router";
import { queueRouter } from "./queue.router";
import { adminRouter } from "./admin.router";

const router = Router();

router.use("/company", companyRouter);
router.use("/queue", queueRouter);
router.use("/admin", adminRouter);

export default router;
