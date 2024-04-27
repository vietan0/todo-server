import { ErrorRequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { ResBody } from '../types/ResBody.js';

const errHandler: ErrorRequestHandler<ParamsDictionary, ResBody> = (
  err,
  _req,
  res,
  _next,
) => {
  let message = 'Error caught by me';

  if (err instanceof ZodError) {
    const validationError = fromZodError(err);
    message = validationError.toString();
  } else {
    const error = err as Error;
    message = error.message;
  }

  res.status(400).json({ status: 'error', message, error: err });
};

export default errHandler;
