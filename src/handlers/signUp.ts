import { RequestHandler } from 'express';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import { ReqBodyCreateUser } from '../types/schemas.js';
import createToken from '../utils/createToken.js';
import hashPassword from '../utils/hashPassword.js';

const signUp: RequestHandler<
  never,
  ResBody<{ token: string }>,
  ReqBodyCreateUser
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

    const options = {
      maxAge: 1000 * 60 * 60 * 24, // expire after 24h
      httpOnly: true, // Cookie will not be exposed to client side code
      secure: true, // use with HTTPS only
    };

    res.cookie('token', token, options).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

export default signUp;
