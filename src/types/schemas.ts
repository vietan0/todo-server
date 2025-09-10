import type { Prisma } from '@prisma/client';
import type { toZod } from 'tozod';
import type { ExtractPrimitive } from './helpers.js';

import { z } from 'zod';

// the fact that I use UserUnchecked..., TaskUnchecked...
// doesn't have anything to do with prisma.task.create()
// This is only used to validate req.body, which should include only scalar fields

export type ReqBodyCreateUser = Pick<
  Prisma.UserUncheckedCreateInput,
  'email' | 'password'
>;
export const ReqBodyCreateUserSchema: toZod<ReqBodyCreateUser> = z.object({
  email: z.email().max(255),
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
    lexorank: z.string().optional(),
  },
);
export type ReqBodyCreateTask = Pick<
  Prisma.TaskUncheckedCreateInput,
  'name' | 'body' | 'parentTaskId'
>;
export const ReqBodyCreateTaskSchema: toZod<ReqBodyCreateTask> = z.object({
  name: z.string().trim().min(1).max(255),
  body: z.string(),
  parentTaskId: z.uuid().optional(),
});
export type ReqBodyUpdateTask = ExtractPrimitive<
  Pick<
    Prisma.TaskUncheckedUpdateInput,
    'name' | 'body' | 'completed' | 'lexorank' | 'projectId' | 'parentTaskId'
  >
>;
export const ReqBodyUpdateTaskSchema: toZod<ReqBodyUpdateTask> = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  body: z.string().optional(),
  completed: z.boolean().optional(),
  lexorank: z.string().optional(),
  projectId: z.uuid().optional(),
  parentTaskId: z.uuid().nullable().optional(),
});
