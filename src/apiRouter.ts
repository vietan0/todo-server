import { Router } from 'express';

import { createProject } from './handlers/project.js';
import validateCreateProject from './middlewares/validateCreateProject.js';

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.json({ message: 'api routes' });
});

apiRouter.post('/project', validateCreateProject, createProject);

export default apiRouter;
