import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import {
  ReqBodyCreateUser,
  ReqBodyCreateUserSchema,
} from '../types/schemas.js';

const validateAuth: RequestHandler<
  ParamsDictionary,
  never,
  ReqBodyCreateUser
> = (req, _res, next) => {
  try {
    ReqBodyCreateUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateAuth;
