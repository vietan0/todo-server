import { z } from 'zod';

export const authPayloadSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .max(255, {
        message: 'Email is longer than 255 characters',
      }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, {
        message: 'Password must be at least 4 characters',
      }),
  })
  .strict();
export const projectCreatePayloadSchema = z
  .object({
    id: z.union([z.string(), z.undefined()]).optional(),
    name: z.string().max(255),
    createdAt: z.union([z.string(), z.date(), z.undefined()]).optional(),
    updatedAt: z.union([z.string(), z.date(), z.undefined()]).optional(),
  })
  .strict();
export const projectCreatePayloadRequiredSchema =
  projectCreatePayloadSchema.pick({
    name: true,
  });
