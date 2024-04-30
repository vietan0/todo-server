import { RequestHandler } from 'express';

import {
  ReqBodyCreateProject,
  ReqBodyCreateProjectSchema,
} from '../types/schemas.js';

const validateCreateProject: RequestHandler<
  never,
  never,
  ReqBodyCreateProject
> = (req, _res, next) => {
  try {
    ReqBodyCreateProjectSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateCreateProject;
