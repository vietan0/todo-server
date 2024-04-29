import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import {
  ReqBodyCreateProject,
  ReqBodyCreateProjectSchema,
} from '../types/schemas.js';

const validateCreateProject: RequestHandler<
  ParamsDictionary,
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
