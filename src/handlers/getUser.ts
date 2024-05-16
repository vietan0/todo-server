import { RequestHandler } from 'express';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';

const getUser: RequestHandler<never, ResBody> = async (req, res, next) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.userId,
      },
    });

    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUser;
