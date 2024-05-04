import request from 'supertest';
import { afterAll, beforeAll, expect, test, vi } from 'vitest';

import app from '../server.js';
import { authPayload, sendSignUp } from '../test/authHelpers.js';

beforeAll(async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  await sendSignUp();
});

afterAll(async () => {
  vi.restoreAllMocks();
});

test('success', async () => {
  const res = await request(app).post('/auth/signin').send(authPayload);
  expect(res.status).toEqual(200);

  expect(res.body).toEqual({
    status: 'success',
    data: {
      token: expect.any(String),
    },
  });
});

test(`email doesn't exist`, async () => {
  const res = await request(app)
    .post('/auth/signin')
    .send({ ...authPayload, email: 'dontexist@hotgmail.com' });

  expect(res.status).toEqual(400);

  expect(res.body).toEqual({
    status: 'error',
    message: 'No User found',
    error: {
      name: 'NotFoundError',
      code: 'P2025',
      clientVersion: expect.any(String),
    },
  });
});

test('incorrect password', async () => {
  const res = await request(app)
    .post('/auth/signin')
    .send({ ...authPayload, password: 'incorrect_password' });

  expect(res.status).toEqual(400);

  expect(res.body).toEqual({
    status: 'error',
    message: 'Password is incorrect',
    error: {},
  });
});
