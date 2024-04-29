import { RequestHandler } from 'express';

import {
  ReqBodyUpdateProject,
  ReqBodyUpdateProjectSchema,
} from '../types/schemas.js';

const validateUpdateProject: RequestHandler<
  { id: string },
  never,
  ReqBodyUpdateProject
> = (req, _res, next) => {
  try {
    ReqBodyUpdateProjectSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUpdateProject;
