import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import prisma from '../prisma/client.js';
import { ResBody } from '../types/express/ResBody.js';
import { ProjectCreatePayloadRequired } from '../types/payloads.js';

export const createProject: RequestHandler<
  ParamsDictionary,
  ResBody,
  ProjectCreatePayloadRequired
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
    });

    res.json({
      status: 'success',
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};
