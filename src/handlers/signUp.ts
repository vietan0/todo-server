import type { RequestHandler } from 'express';

import type { ResBody } from '../types/express/ResBody.js';
import type { ReqBodyCreateUser } from '../types/schemas.js';
import prisma from '../prisma/client.js';
import createToken from '../utils/createToken.js';
import hashPassword from '../utils/hashPassword.js';

const signUp: RequestHandler<never, ResBody, ReqBodyCreateUser> = async (
  req,
  res,
  next,
) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });

    const token = createToken(newUser.id);

    res
      .cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24, // expire after 24h
        httpOnly: true, // Cookie will not be exposed to client side code
        secure: true, // use with HTTPS only
        sameSite: 'none',
      })
      .json({ status: 'success', data: newUser });
  }
  catch (error) {
    next(error);
  }
};

export default signUp;
