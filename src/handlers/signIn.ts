import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import prisma from '../prisma/client.js';
import { AuthPayload } from '../types/AuthPayload.js';
import { ResBody } from '../types/ResBody.js';
import comparePasswords from '../utils/comparePasswords.js';
import createToken from '../utils/createToken.js';

const signIn: RequestHandler<
  ParamsDictionary,
  ResBody<{ token: string }>,
  AuthPayload
> = async (req, res, next) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!existingUser) {
      return res.status(400).json({
        status: 'fail',
        data: {
          email: `Email doesn't exist in database`,
        },
      });
    }

    const isPasswordCorrect = await comparePasswords(
      req.body.password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'fail',
        data: {
          password: 'Password is incorrect',
        },
      });
    }

    const token = createToken(existingUser.id);
    res.json({ status: 'success', data: { token } });
  } catch (error) {
    next(error);
  }
};

export default signIn;
