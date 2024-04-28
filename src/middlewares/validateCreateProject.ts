import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { ProjectCreatePayloadRequired } from '../types/payloads.js';
import { projectCreatePayloadRequiredSchema } from '../types/payloadSchemas.js';

const validateCreateProject: RequestHandler<
  ParamsDictionary,
  never,
  ProjectCreatePayloadRequired
> = (req, _res, next) => {
  try {
    projectCreatePayloadRequiredSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateCreateProject;
