import type { RequestHandler } from 'express';

import type { ResBody } from '../types/express/ResBody.js';
import type { ReqBodyCreateUser } from '../types/schemas.js';
import prisma from '../prisma/client.js';
import comparePasswords from '../utils/comparePasswords.js';
import createToken from '../utils/createToken.js';

const signIn: RequestHandler<never, ResBody, ReqBodyCreateUser> = async (
  req,
  res,
  next,
) => {
  try {
    const existingUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: req.body.email,
      },
    });

    await comparePasswords(req.body.password, existingUser.password);
    const token = createToken(existingUser.id);

    res
      .cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24, // expire after 24h
        httpOnly: true, // Cookie will not be exposed to client side code
        secure: true, // use with HTTPS only
        sameSite: 'none',
      })
      .json({ status: 'success', data: existingUser });
  }
  catch (error) {
    next(error);
  }
};

export default signIn;
