import { Router } from 'express';

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from './handlers/project.js';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from './handlers/task.js';
import validateCreateProject from './middlewares/validateCreateProject.js';
import validateCreateTask from './middlewares/validateCreateTask.js';
import validateUpdateProject from './middlewares/validateUpdateProject.js';
import validateUpdateTask from './middlewares/validateUpdateTask.js';

const apiRouter = Router();

// project CRUD
apiRouter.get('/project', getProjects);
apiRouter.get('/project/:projectId', getProjectById);
apiRouter.post('/project', validateCreateProject, createProject);
apiRouter.patch('/project/:projectId', validateUpdateProject, updateProject);
apiRouter.delete('/project/:projectId', deleteProject);

// task CRUD
apiRouter.get('/project/:projectId/task', getTasks);
apiRouter.get('/task/:taskId', getTaskById);
apiRouter.post('/project/:projectId/task', validateCreateTask, createTask);
apiRouter.patch('/task/:taskId', validateUpdateTask, updateTask);
apiRouter.delete('/task/:taskId', deleteTask);

export default apiRouter;
