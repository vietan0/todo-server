import { z } from 'zod';

export const authPayloadSchema = z.object({
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
});
export type AuthPayload = z.infer<typeof authPayloadSchema>;
