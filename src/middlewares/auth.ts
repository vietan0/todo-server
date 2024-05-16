import { RequestHandler } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { ResBody } from '../types/express/ResBody.js';

const auth: RequestHandler<never, ResBody> = (req, res, next) => {
  if (!req.cookies)
    return res
      .status(401)
      .json({ status: 'error', message: `Cookie doesn't exist` });

  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ status: 'error', message: `Token doesn't exist` });

  const userId = jwt.verify(token, process.env.JWT_SECRET as Secret);
  req.userId = userId as string;
  next();
};

export default auth;
