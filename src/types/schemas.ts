import { Prisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

import { ExtractPrimitive } from './helpers.js';

// the fact that I use UserUnchecked..., TaskUnchecked...
// doesn't have anything to do with prisma.task.create()
// This is only used to validate req.body, which should include only scalar fields

export type ReqBodyCreateUser = Pick<
  Prisma.UserUncheckedCreateInput,
  'email' | 'password'
>;
export const ReqBodyCreateUserSchema: toZod<ReqBodyCreateUser> = z.object({
  email: z.string().email().max(255),
  password: z.string().trim().min(4).max(255),
});
export type ReqBodyCreateProject = Pick<
  Prisma.ProjectUncheckedCreateInput,
  'name'
>;
export const ReqBodyCreateProjectSchema: toZod<ReqBodyCreateProject> = z.object(
  {
    name: z.string().trim().min(1).max(255),
  },
);
export type ReqBodyUpdateProject = ExtractPrimitive<
  Pick<Prisma.ProjectUncheckedUpdateInput, 'name'>
>;
export const ReqBodyUpdateProjectSchema: toZod<ReqBodyUpdateProject> = z.object(
  {
    name: z.string().trim().min(1).max(255).optional(),
  },
);
export type ReqBodyCreateTask = Pick<
  Prisma.TaskUncheckedCreateInput,
  'name' | 'parentTaskId'
>;
export const ReqBodyCreateTaskSchema: toZod<ReqBodyCreateTask> = z.object({
  name: z.string().trim().min(1).max(255),
  parentTaskId: z.string().uuid().optional(),
});
export type ReqBodyUpdateTask = ExtractPrimitive<
  Pick<
    Prisma.TaskUncheckedUpdateInput,
    'name' | 'completed' | 'lexorank' | 'projectId' | 'parentTaskId'
  >
>;
// @ts-expect-error nullable() works fine but toZod is complaining (https://github.com/colinhacks/tozod/issues/31)
export const ReqBodyUpdateTaskSchema: toZod<ReqBodyUpdateTask> = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  completed: z.boolean().optional(),
  lexorank: z.string().optional(),
  projectId: z.string().uuid().optional(),
  parentTaskId: z.string().uuid().nullable().optional(),
});
