import { faker } from '@faker-js/faker';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import app from './server.js';
import { ResBody } from './types/express/ResBody.js';

let token: string;

beforeAll(async () => {
  const signInRes = await request(app)
    .post('/auth/signin')
    .send({ email: 'postman@gmail.com', password: 'postman' });

  token = signInRes.body.data.token;
});

describe('Unauthorized cases', () => {
  test('Missing Authorization header', async () => {
    const getProjectsRes = await request(app).get('/api/project');
    expect(getProjectsRes.status).toEqual(401);

    expect(getProjectsRes.body).toEqual({
      status: 'error',
      message: "Authorization header doesn't exist",
    });
  });

  test('Invalid Bearer token', async () => {
    const getProjectsRes = await request(app)
      .get('/api/project')
      .set('Authorization', `Bearer abc`);

    expect(getProjectsRes.status).toEqual(400);

    expect(getProjectsRes.body).toEqual({
      status: 'error',
      error: {
        message: 'jwt malformed',
        name: 'JsonWebTokenError',
      },
      message: 'jwt malformed',
    });
  });
});

describe('CREATE projects', () => {
  test('Success', async () => {
    const name = faker.commerce.productName();

    const res = await request(app)
      .post('/api/project')
      .send({
        name,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: { name },
    });
  });

  test('Success - Keys other than `name` are ignored', async () => {
    const reqBody = {
      name: faker.commerce.productName(),
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
      verb: faker.word.verb(),
      cat: faker.animal.cat(),
    };

    const res = await request(app)
      .post('/api/project')
      .send(reqBody)
      .set('Authorization', `Bearer ${token}`);

    const resBody: ResBody = {
      status: 'success',
      data: {
        id: expect.not.stringMatching(reqBody.id),
        name: reqBody.name,
        createdAt: expect.not.stringMatching(reqBody.createdAt),
        updatedAt: expect.not.stringMatching(reqBody.createdAt),
        userId: expect.not.stringMatching(reqBody.userId),
        tasks: expect.any(Array),
        verb: undefined,
        cat: undefined,
      },
    };

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(resBody);
  });

  test('Name too long throws error', async () => {
    const name = faker.lorem.paragraphs();

    const res = await request(app)
      .post('/api/project')
      .send({ name })
      .set('Authorization', `Bearer ${token}`);

    expect(name.length).toBeGreaterThan(255);
    expect(res.status).toEqual(400);

    expect(res.body).toEqual({
      status: 'error',
      message:
        'Validation error: String must contain at most 255 character(s) at "name"',
      error: expect.any(Object),
    });
  });

  test('Name missing throws error', async () => {
    const res = await request(app)
      .post('/api/project')
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toEqual(400);

    expect(res.body).toEqual({
      status: 'error',
      message: 'Validation error: Required at "name"',
      error: expect.any(Object),
    });
  });
});
