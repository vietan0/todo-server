import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { ExtractPrimitives, PickRequired } from './helpers.js';
import { authPayloadSchema } from './payloadSchemas.js';

export type AuthPayload = z.infer<typeof authPayloadSchema>;
export type ProjectCreatePayload = ExtractPrimitives<Prisma.ProjectCreateInput>;
export type ProjectCreatePayloadRequired = PickRequired<ProjectCreatePayload>;
