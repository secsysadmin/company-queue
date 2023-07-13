import express from 'express';

import router from './routers/router';
import connectToDatabase from './db/db';

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api', router);

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
