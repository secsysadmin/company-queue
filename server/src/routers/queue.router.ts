import { Router } from "express";

import {
  getQueueForStudent,
  createQueue,
  getQueuesForCompany,
  joinQueue,
  leaveQueue,
  notifyNext,
  spokenTo,
  getQueueById,
} from "../controllers/queue.controller";

export const queueRouter = Router();

queueRouter.post("/", createQueue);

queueRouter.get("/id/:queueId", getQueueById);

queueRouter.get("/company/:companyId", getQueuesForCompany);

queueRouter.post("/join", joinQueue);

queueRouter.delete("/leave/:ticketNumber", leaveQueue);

queueRouter.delete("/mark-as-spoken-to/:ticketNumber", spokenTo);

queueRouter.post("/notify-next", notifyNext);

queueRouter.get("/student", getQueueForStudent);