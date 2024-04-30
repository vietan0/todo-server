import { RequestHandler } from 'express';

import {
  ReqBodyCreateUser,
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
  } catch (error) {
    next(error);
  }
};

export default validateAuth;
