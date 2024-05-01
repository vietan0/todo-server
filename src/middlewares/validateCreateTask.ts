import { RequestHandler } from 'express';

import {
  ReqBodyCreateTask,
  ReqBodyCreateTaskSchema,
} from '../types/schemas.js';

const validateCreateTask: RequestHandler<
  { projectId: string },
  never,
  ReqBodyCreateTask
> = (req, _res, next) => {
  try {
    ReqBodyCreateTaskSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateCreateTask;
