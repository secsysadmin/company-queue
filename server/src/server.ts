import express from "express";
import cors from "cors";

import router from "./routers/router";
import connectToDatabase from "./db/db";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
