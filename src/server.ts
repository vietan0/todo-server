import express, { Response } from 'express';
import { IncomingMessage } from 'http';
import morgan from 'morgan';

import apiRouter from './apiRouter.js';
import authRouter from './authRouter.js';
import errHandler from './handlers/errHandler.js';
import auth from './middlewares/auth.js';
import { ResBody } from './types/express/ResBody.js';

const app = express();
// useful logger

morgan.token('params', (req: IncomingMessage & { params: object }) => {
  return JSON.stringify(req.params, null, 2);
});

morgan.token('body', (req: IncomingMessage & { body: object }) => {
  return JSON.stringify(req.body, null, 2);
});

process.env.NODE_ENV !== 'test' &&
  app.use([morgan('dev'), morgan(':params \n:body ')]); // don't log while testing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res: Response<ResBody>) => {
  res.json({ status: 'success' });
});

app.use('/api', auth, apiRouter);
app.use('/auth', authRouter);
app.use(errHandler);

export default app;
