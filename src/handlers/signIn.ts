import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import { ReqBodyCreateUser } from '../types/schemas.js';
import comparePasswords from '../utils/comparePasswords.js';
import createToken from '../utils/createToken.js';

const signIn: RequestHandler<
  ParamsDictionary,
  ResBody<{ token: string }>,
  ReqBodyCreateUser
> = async (req, res, next) => {
  try {
    const existingUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: req.body.email,
      },
    });

    await comparePasswords(req.body.password, existingUser.password);
    const token = createToken(existingUser.id);
    res.json({ status: 'success', data: { token } });
  } catch (error) {
    next(error);
  }
};

export default signIn;
