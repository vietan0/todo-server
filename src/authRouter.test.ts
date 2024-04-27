import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import resetDb from './prisma/resetDb.js';
import app from './server.js';
import { AuthPayload } from './types/AuthPayload.js';

beforeAll(async () => {
  await resetDb();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  await resetDb();
  vi.restoreAllMocks();
});

const authPayload: AuthPayload = {
  email: 'vitest@gmail.com',
  password: 'vitest',
};

async function sendSignUp(payload: Partial<AuthPayload> = authPayload) {
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
    expect(res.body.message).toMatch('Email is required');
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
    expect(res.body.message).toMatch('Email is longer');
  });

  test('password missing', async () => {
    const res = await sendSignUp({
      email: authPayload.email,
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('Password is required');
  });

  test('password too short', async () => {
    const res = await sendSignUp({
      ...authPayload,
      password: 'abc',
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body.message).toMatch('Password must be at least');
  });
});

describe('Sign In', () => {
  test('success', async () => {
    await sendSignUp();
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
      .send({ ...authPayload, email: 'non-existing@gmail.com' });

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
