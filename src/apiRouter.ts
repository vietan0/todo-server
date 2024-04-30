import { Router } from 'express';

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from './handlers/project.js';
import { createTask } from './handlers/task.js';
import validateCreateProject from './middlewares/validateCreateProject.js';
import validateCreateTask from './middlewares/validateCreateTask.js';
import validateUpdateProject from './middlewares/validateUpdateProject.js';

const apiRouter = Router();

apiRouter.get('/project', getProjects);
apiRouter.get('/project/:id', getProjectById);
apiRouter.post('/project', validateCreateProject, createProject);
apiRouter.patch('/project/:id', validateUpdateProject, updateProject);
apiRouter.delete('/project/:id', deleteProject);

apiRouter.post('/task', validateCreateTask, createTask);

export default apiRouter;
