import { Router } from 'express';

import { fillNullProjectRanks } from './utils/lexorank/projectRank.js';
import { fillNullTaskRanks } from './utils/lexorank/taskRank.js';

const fillRankRouter = Router();

fillRankRouter.get('/project', async (_req, res, next) => {
  try {
    await fillNullProjectRanks();
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

fillRankRouter.get('/task', async (_req, res, next) => {
  try {
    await fillNullTaskRanks();
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

export default fillRankRouter;
