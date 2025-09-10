import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import { authPayload, sendSignUp } from '../test/authHelpers.js';

beforeAll(async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  vi.restoreAllMocks();
});

describe('Sign Up', () => {
  test('successful', async () => {
    const res = await sendSignUp();
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');

    expect(res.body.data).toMatchObject({
      id: expect.any(String),
    });

    expect(res.headers['set-cookie'][0]).toContain('token=');
    expect(res.headers['set-cookie'][0]).toContain('HttpOnly');
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

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringContaining('received undefined at "email"'),
      error: {
        name: 'ZodError',
        message: expect.any(String),
      },
    });
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

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringContaining('expected string to have <=255 characters at "email"'),
      error: {
        name: 'ZodError',
        message: expect.any(String),
      },
    });
  });

  test('password missing', async () => {
    const res = await sendSignUp({
      email: authPayload.email,
    });

    expect(res.status).toEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringContaining('received undefined at "password"'),
      error: {
        name: 'ZodError',
        message: expect.any(String),
      },
    });
  });

  test('password too short', async () => {
    const res = await sendSignUp({
      ...authPayload,
      password: 'abc',
    });

    expect(res.status).toEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringContaining('expected string to have >=4 characters at "password"'),
      error: {
        name: 'ZodError',
        message: expect.any(String),
      },
    });
  });
});
