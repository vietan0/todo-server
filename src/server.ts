import express, { Response } from 'express';
import morgan from 'morgan';

import apiRouter from './apiRouter.js';
import authRouter from './authRouter.js';
import errHandler from './handlers/errHandler.js';
import auth from './middlewares/auth.js';
import { ResBody } from './types/ResBody.js';

const app = express();
// useful logger
app.use(morgan('dev'));
// help server read incoming JSON data in req.body
app.use(express.json());
// help server read incoming form data in req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res: Response<ResBody>) => {
  res.json({ status: 'success' });
});

app.use('/api', auth, apiRouter);
app.use('/auth', authRouter);
app.use(errHandler);

export default app;
