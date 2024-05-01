import { RequestHandler } from 'express';

import {
  ReqBodyUpdateTask,
  ReqBodyUpdateTaskSchema,
} from '../types/schemas.js';

const validateUpdateTask: RequestHandler<
  { taskId: string },
  never,
  ReqBodyUpdateTask
> = (req, _res, next) => {
  try {
    ReqBodyUpdateTaskSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUpdateTask;
