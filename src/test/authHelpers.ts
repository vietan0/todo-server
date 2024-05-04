import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '../server.js';
import { ReqBodyCreateUser } from '../types/schemas.js';

export const authPayload: ReqBodyCreateUser = {
  email: faker.internet.email(),
  password: 'postman',
};

export async function sendSignUp(
  payload: Partial<ReqBodyCreateUser> = authPayload,
) {
  return await request(app).post('/auth/signup').send(payload);
}
