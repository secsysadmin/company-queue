import { Router } from "express";

import {
  checkStudent,
  createQueue,
  getQueues,
  joinQueue,
  leaveQueue,
  notifyNext,
  spokenTo,
} from "../controllers/companyQueue.controller";

export const companyQueueRouter = Router();

companyQueueRouter.post("/join", joinQueue);

companyQueueRouter.delete("/leave", leaveQueue);

companyQueueRouter.delete("/mark-as-spoken-to", spokenTo);

companyQueueRouter.post("/notify-next", notifyNext);

companyQueueRouter.post("/create-queue", createQueue);

companyQueueRouter.get("/check-student", checkStudent);

companyQueueRouter.get("/get-queues", getQueues)


