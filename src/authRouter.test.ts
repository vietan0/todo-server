import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import app from './server.js';
import { ReqBodyCreateUser } from './types/schemas.js';

beforeAll(async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  vi.restoreAllMocks();
});

const authPayload: ReqBodyCreateUser = {
  email: faker.internet.email(),
  password: 'postman',
};

export async function sendSignUp(
  payload: Partial<ReqBodyCreateUser> = authPayload,
) {
  return await request(app).post('/auth/signup').send(payload);
}

describe('Sign Up', () => {
  test('successful', async () => {
    const res = await sendSignUp();
    expect(res.status).toEqual(200);

    expect(res.body).toEqual({
      status: 'success',
      data: {
        token: expect.any(String),
      },
    });
  });

  test('email already exists', async () => {
    const res = await sendSignUp();

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');

    expect(res.body.message).toMatch(
      'Unique constraint failed on the fields: (`email`)',
    );
  });

  test('email missing', async () => {
    const res = await sendSignUp({ password: authPayload.password });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('Required at "email"');
  });

  test('email invalid', async () => {
    const res = await sendSignUp({ ...authPayload, email: 'invalid_email' });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('Invalid email');
  });

  test('email too long', async () => {
    const res = await sendSignUp({
      ...authPayload,
      email:
        'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong@gmail.com',
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('contain at most 255 character(s)');
  });

  test('password missing', async () => {
    const res = await sendSignUp({
      email: authPayload.email,
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('Required at "password"');
  });

  test('password too short', async () => {
    const res = await sendSignUp({
      ...authPayload,
      password: 'abc',
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('contain at least 4 character(s)');
  });
});

describe('Sign In', () => {
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
      .send({ ...authPayload, email: faker.internet.exampleEmail() });

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
    await sendSignUp();

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
});
