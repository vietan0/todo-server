import { Router } from 'express';

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from './handlers/project.js';
import validateCreateProject from './middlewares/validateCreateProject.js';
import validateUpdateProject from './middlewares/validateUpdateProject.js';

const apiRouter = Router();

apiRouter.get('/project', getProjects);
apiRouter.get('/project/:id', getProjectById);
apiRouter.post('/project', validateCreateProject, createProject);
apiRouter.patch('/project/:id', validateUpdateProject, updateProject);
apiRouter.delete('/project/:id', deleteProject);

export default apiRouter;
