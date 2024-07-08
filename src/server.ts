import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Response } from 'express';
import { IncomingMessage } from 'http';
import morgan from 'morgan';

import apiRouter from './apiRouter.js';
import authRouter from './authRouter.js';
import fillRankRouter from './fillRankRouter.js';
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

morgan.token('cookies', (req: IncomingMessage & { cookies: object }) => {
  return JSON.stringify(req.cookies, null, 2);
});

process.env.NODE_ENV !== 'test' &&
  app.use([
    morgan('dev'),
    morgan('params: :params \nbody: :body \ncookies: :cookies'),
  ]); // don't log while testing

app.use(
  cors({
    origin: [
      'http://localhost:5173', // dev
      'http://localhost:4173', // preview
      'https://todo-fe-vietan0.netlify.app', // prod
    ],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res: Response<ResBody>) => {
  res.json({ status: 'success' });
});

app.use('/api', auth, apiRouter);
app.use('/auth', authRouter);
app.use('/dev/fill-rank', fillRankRouter);
app.use(errHandler);

export default app;
