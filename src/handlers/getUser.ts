import type { RequestHandler } from 'express';

import type { ResBody } from '../types/express/ResBody.js';
import prisma from '../prisma/client.js';

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
  }
  catch (error) {
    next(error);
  }
};

export default getUser;
