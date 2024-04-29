import { Router } from 'express';

import {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
} from './handlers/project.js';
import validateCreateProject from './middlewares/validateCreateProject.js';

const apiRouter = Router();

apiRouter.get('/project', getProjects);
apiRouter.get('/project/:id', getProjectById);
apiRouter.post('/project', validateCreateProject, createProject);

export default apiRouter;
