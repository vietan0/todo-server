import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import prisma from '../prisma/client.js';
import { AuthPayload } from '../types/AuthPayload.js';
import { ResBody } from '../types/ResBody.js';
import createToken from '../utils/createToken.js';
import hashPassword from '../utils/hashPassword.js';

const signUp: RequestHandler<
  ParamsDictionary,
  ResBody<{ token: string }>,
  AuthPayload
> = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });

    const token = createToken(newUser.id);
    res.json({ status: 'success', data: { token } });
  } catch (error) {
    next(error);
  }
};

export default signUp;
