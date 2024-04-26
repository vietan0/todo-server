import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.json({ message: 'api routes' });
});

export default apiRouter;
