import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { AuthPayload } from '../types/payloads.js';
import { authPayloadSchema } from '../types/payloadSchemas.js';

const validateAuth: RequestHandler<ParamsDictionary, never, AuthPayload> = (
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

export default validateAuth;
