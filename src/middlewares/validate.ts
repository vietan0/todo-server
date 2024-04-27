import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { AuthPayload, authPayloadSchema } from '../types/AuthPayload.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate: RequestHandler<ParamsDictionary, any, AuthPayload> = (
  req,
  _res,
  next,
) => {
  try {
    authPayloadSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
