import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt, { Secret } from 'jsonwebtoken';

import { ResBody } from '../types/express/ResBody.js';

const auth: RequestHandler<ParamsDictionary, ResBody> = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .json({ status: 'error', message: `Authroization header doesn't exist` });

  const token = req.headers.authorization.split(' ')[1];

  if (!token)
    return res
      .status(401)
      .json({ status: 'error', message: `Bearer token doesn't exist` });

  const userId = jwt.verify(token, process.env.JWT_SECRET as Secret);
  req.userId = userId as string;
  next();
};

export default auth;
