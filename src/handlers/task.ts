import { RequestHandler } from 'express';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import { ReqBodyCreateTask } from '../types/schemas.js';

export const createTask: RequestHandler<
  never,
  ResBody,
  ReqBodyCreateTask
> = async (req, res, next) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        name: req.body.name,
        project: {
          connect: {
            id: req.body.projectId,
          },
        },
      },
    });

    res.json({ status: 'success', data: newTask });
  } catch (error) {
    next(error);
  }
};
