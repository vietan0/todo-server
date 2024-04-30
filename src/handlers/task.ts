import { RequestHandler } from 'express';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import { ReqBodyCreateTask } from '../types/schemas.js';

export const createTask: RequestHandler<
  { projectId: string },
  ResBody,
  ReqBodyCreateTask
> = async (req, res, next) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        name: req.body.name,
        project: {
          connect: {
            id: req.params.projectId,
          },
        },
      },
      include: {
        subTasks: true,
      },
    });

    res.json({ status: 'success', data: newTask });
  } catch (error) {
    next(error);
  }
};

export const getTasks: RequestHandler<{ projectId: string }, ResBody> = async (
  req,
  res,
  next,
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        project: {
          id: req.params.projectId,
          user: {
            id: req.userId,
          },
        },
      },
      include: {
        subTasks: true,
      },
    });

    res.json({ status: 'success', data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById: RequestHandler<{ taskId: string }, ResBody> = async (
  req,
  res,
  next,
) => {
  try {
    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: req.params.taskId,
        project: {
          user: {
            id: req.userId,
          },
        },
      },
      include: {
        subTasks: true,
      },
    });

    res.json({ status: 'success', data: task });
  } catch (error) {
    next(error);
  }
};
