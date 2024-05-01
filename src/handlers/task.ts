import { Task } from '@prisma/client';
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

    if (parentTaskId) {
      const parentTask = await prisma.task.findUniqueOrThrow({
        where: {
          id: parentTaskId,
          project: {
            user: {
              id: req.userId,
            },
          },
        },
      });

      if (parentTask.parentTaskId) {
        throw new Error(
          `Parent task can't be a child task, must be root-level`,
        );
      }

      if (parentTask.projectId !== req.params.projectId) {
        throw new Error(
          `Parent task's projectId must be the same as req.params.projectId`,
        );
      }
    }

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
    let parentTask: Task | undefined = undefined;

    if (parentTaskId) {
      parentTask = await prisma.task.findUniqueOrThrow({
        where: {
          id: parentTaskId,
          project: {
            user: {
              id: req.userId,
            },
          },
        },
      });

      if (parentTask.parentTaskId) {
        throw new Error(
          `Parent task can't be a child task, must be root-level`,
        );
      }

      if (projectId && parentTask.projectId !== projectId) {
        throw new Error(
          `Parent task's projectId must be the same as req.body.projectId`,
        );
      }
    }

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
        subTasks: {
          updateMany: {
            where: {},
            data: {
              completed,
              projectId,
            },
          },
        },
        project: projectId
          ? { connect: { id: projectId } }
          : parentTask
            ? { connect: { id: parentTask.projectId } }
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
