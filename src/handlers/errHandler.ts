import type { ErrorRequestHandler } from 'express';
import type { ResBody } from '../types/express/ResBody.js';
import { ZodError } from 'zod';

import { fromZodError } from 'zod-validation-error';

const errHandler: ErrorRequestHandler<never, ResBody> = (
  err,
  _req,
  res,
  _next,
) => {
  let message = 'Error caught by me';

  if (err instanceof ZodError) {
    const validationError = fromZodError(err);
    message = validationError.toString();
  }
  else {
    const error = err as Error;
    message = error.message;
  }

  res.status(400).json({ status: 'error', message, error: err });
};

export default errHandler;
