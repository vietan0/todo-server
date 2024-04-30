import { RequestHandler } from 'express';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import {
  ReqBodyCreateProject,
  ReqBodyUpdateProject,
} from '../types/schemas.js';

export const createProject: RequestHandler<
  never,
  ResBody,
  ReqBodyCreateProject
> = async (req, res, next) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        name: req.body.name,
        user: {
          connect: {
            id: req.userId,
          },
        },
      },
      include: {
        tasks: true,
      },
    });

    res.json({ status: 'success', data: newProject });
  } catch (error) {
    next(error);
  }
};

export const getProjects: RequestHandler<never, ResBody> = async (
  req,
  res,
  next,
) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        user: {
          id: req.userId,
        },
      },
      include: {
        tasks: true,
      },
    });

    res.json({ status: 'success', data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById: RequestHandler<
  { projectId: string },
  ResBody
> = async (req, res, next) => {
  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id: req.params.projectId,
        user: {
          id: req.userId,
        },
      },
      include: {
        tasks: true,
      },
    });

    res.json({ status: 'success', data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject: RequestHandler<
  { projectId: string },
  ResBody,
  ReqBodyUpdateProject
> = async (req, res, next) => {
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: req.params.projectId,
        user: {
          id: req.userId,
        },
      },
      data: req.body,
      include: {
        tasks: true,
      },
    });

    res.json({ status: 'success', data: updatedProject });
  } catch (error) {
    next(error);
  }
};

export const deleteProject: RequestHandler<
  { projectId: string },
  ResBody
> = async (req, res, next) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: req.params.projectId,
        user: {
          id: req.userId,
        },
      },
      include: {
        tasks: true,
      },
    });

    res.json({ status: 'success', data: deletedProject });
  } catch (error) {
    next(error);
  }
};
