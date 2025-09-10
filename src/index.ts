import process from 'node:process';
import * as dotenv from 'dotenv';

import app from './server.js';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
