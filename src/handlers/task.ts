import { RequestHandler } from 'express';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import { ReqBodyCreateTask, ReqBodyUpdateTask } from '../types/schemas.js';

export const createTask: RequestHandler<
  { projectId: string },
  ResBody,
  ReqBodyCreateTask
> = async (req, res, next) => {
  try {
    const { name, parentTaskId } = req.body;

    const newTask = await prisma.task.create({
      data: {
        name: name,
        project: {
          connect: {
            id: req.params.projectId,
            user: {
              id: req.userId, // to verify ownership of projectId
            },
          },
        },
        parentTask: parentTaskId
          ? {
              connect: {
                id: parentTaskId,
              },
            }
          : undefined, // undefined means the whole parentTask key is not provided at all
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

export const updateTask: RequestHandler<
  { taskId: string },
  ResBody,
  ReqBodyUpdateTask
> = async (req, res, next) => {
  try {
    const { name, completed, projectId, parentTaskId } = req.body;

    const updatedTask = await prisma.task.update({
      where: {
        id: req.params.taskId,
        project: {
          user: {
            id: req.userId,
          },
        },
      },
      data: {
        name: name,
        completed: completed,
        project: projectId
          ? {
              connect: {
                id: projectId,
              },
            }
          : undefined,
        parentTask: parentTaskId
          ? {
              connect: {
                id: parentTaskId,
              },
            }
          : undefined,
      },
      include: {
        subTasks: true,
      },
    });

    res.json({ status: 'success', data: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler<{ taskId: string }, ResBody> = async (
  req,
  res,
  next,
) => {
  try {
    const deletedTask = await prisma.task.delete({
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

    res.json({ status: 'success', data: deletedTask });
  } catch (error) {
    next(error);
  }
};
