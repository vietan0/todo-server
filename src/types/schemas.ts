import { Prisma } from '@prisma/client';
import { toZod } from 'tozod';
import { z } from 'zod';

// the fact that I use UserUnchecked..., TaskUnchecked...
// doesn't have anything to do with prisma.task.create()
// This is only used to validate req.body, which should include only scalar fields

export type ReqBodyCreateUser = Pick<
  Prisma.UserUncheckedCreateInput,
  'email' | 'password'
>;
export type ReqBodyCreateProject = Pick<
  Prisma.ProjectUncheckedCreateInput,
  'name'
>;
export type ReqBodyUpdateProject = Pick<
  Prisma.ProjectUncheckedUpdateInput,
  'name'
>;
export type ReqBodyCreateTask = Pick<
  Prisma.TaskUncheckedCreateInput,
  'name' | 'projectId' | 'parentTaskId'
>;
export const ReqBodyCreateUserSchema: toZod<ReqBodyCreateUser> = z.object({
  email: z.string().email().max(255),
  password: z.string().min(4),
});
export const ReqBodyCreateProjectSchema: toZod<ReqBodyCreateProject> = z.object(
  {
    name: z.string().max(255),
  },
);
export const ReqBodyUpdateProjectSchema: toZod<ReqBodyUpdateProject> = z.object(
  {
    name: z.string().max(255).optional(),
  },
);
