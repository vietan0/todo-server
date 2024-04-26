import { ErrorRequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { ResBody } from '../types/ResBody.js';

const errHandler: ErrorRequestHandler<ParamsDictionary, ResBody> = (
  err,
  _req,
  res,
  _next,
) => {
  console.error(err);

  res
    .status(400)
    .json({ status: 'error', message: 'Error caught by me', error: err });
};

export default errHandler;
