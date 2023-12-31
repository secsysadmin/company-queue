import express from "express";
import cors from "cors";

import router from "./routers/router";
import connectToDatabase from "./db/db";
import path from "path";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api", router);

const extraPath = process.env.PROD ? "../" : "";
const pathToClentBuild = path.join(__dirname, extraPath + "../../client/dist");

app.use(
  express.static(pathToClentBuild, {
    extensions: ["html", "js", "mjs"],
  })
);

app.get("*", (_, res) => {
  res.sendFile(path.join(pathToClentBuild, "index.html"));
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
