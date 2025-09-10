import type { RequestHandler } from 'express';

import type {
  ReqBodyCreateUser,
} from '../types/schemas.js';
import {
  ReqBodyCreateUserSchema,
} from '../types/schemas.js';

const validateAuth: RequestHandler<never, never, ReqBodyCreateUser> = (
  req,
  _res,
  next,
) => {
  try {
    ReqBodyCreateUserSchema.parse(req.body);
    next();
  }
  catch (error) {
    next(error);
  }
};

export default validateAuth;
