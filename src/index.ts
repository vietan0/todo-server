import * as dotenv from 'dotenv';
dotenv.config();

import app from './server.js';

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});
