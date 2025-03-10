import { faker } from '@faker-js/faker';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import app from '../server.js';
import { testIds } from '../test/projectTaskHelpers.js';
import { ResBody } from '../types/express/ResBody.js';

let token: string;
const userId = testIds.user[0].id;
const projectId = testIds.user[0].projects[2].id;
const taskId = testIds.user[0].projects[2].tasks[0].id;

beforeAll(async () => {
  const signInRes = await request(app)
    .post('/auth/signin')
    .send({ email: 'postman@gmail.com', password: 'postman' });

  token = signInRes.headers['set-cookie'][0].split('token=')[1].split(';')[0];
});

describe('Unauthorized cases', () => {
  test('Missing Token header', async () => {
    const res = await request(app).get('/api/project');
    expect(res.status).toStrictEqual(401);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: "Token doesn't exist",
    });
  });

  test('Invalid Bearer token', async () => {
    const res = await request(app)
      .get('/api/project')
      .set('Cookie', `token=abc`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      error: {
        message: 'jwt malformed',
        name: 'JsonWebTokenError',
      },
      message: 'jwt malformed',
    });
  });
});

describe('CREATE project', () => {
  test('Success', async () => {
    const name = faker.commerce.productName();

    const res = await request(app)
      .post('/api/project')
      .send({
        name,
      })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);
    expect(res.body).toMatchObject({ status: 'success', data: { name } });
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
      .set('Cookie', `token=${token}`);

    const resBody: ResBody = {
      status: 'success',
      data: {
        id: expect.not.stringMatching(reqBody.id),
        name: reqBody.name,
        lexorank: expect.any(String),
        createdAt: expect.not.stringMatching(reqBody.createdAt),
        updatedAt: expect.not.stringMatching(reqBody.createdAt),
        userId: expect.not.stringMatching(reqBody.userId),
        tasks: expect.any(Array),
      },
    };

    expect(res.status).toStrictEqual(200);
    expect(res.body).toStrictEqual(resBody);
  });

  test('Name too long throws error', async () => {
    const name = faker.lorem.paragraphs();

    const res = await request(app)
      .post('/api/project')
      .send({ name })
      .set('Cookie', `token=${token}`);

    expect(name.length).toBeGreaterThan(255);
    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
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
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: 'Validation error: Required at "name"',
      error: expect.any(Object),
    });
  });
});

describe('READ project', () => {
  test('Get All - Success', async () => {
    const res = await request(app)
      .get('/api/project')
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body.data).toContainEqual({
      id: expect.any(String),
      name: expect.any(String),
      lexorank: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      userId: testIds.user[0].id,
    });
  });

  test('Get By Id - Success', async () => {
    const res = await request(app)
      .get(`/api/project/${projectId}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toStrictEqual({
      status: 'success',
      data: {
        id: projectId,
        name: expect.any(String),
        lexorank: expect.any(String),
        createdAt: '2025-03-03T10:39:36.752Z',
        updatedAt: expect.any(String),
        userId: userId,
        tasks: expect.any(Array),
      },
    });
  });

  test('Get By Id - Non-existent Id throws error', async () => {
    const res = await request(app)
      .get(`/api/project/${faker.string.uuid()}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: 'No Project found',
      error: expect.any(Object),
    });
  });

  test('Get By Id - Invalid UUID throws error', async () => {
    const res = await request(app)
      .get(`/api/project/${faker.string.nanoid()}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringMatching('Error creating UUID'),
      error: expect.any(Object),
    });
  });
});

describe('UPDATE project', () => {
  test('Success - Rename', async () => {
    const newName = faker.commerce.productName();

    const res = await request(app)
      .patch(`/api/project/${projectId}`)
      .send({ name: newName })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: {
        id: projectId,
        name: newName,
        userId,
      },
    });
  });

  test('Unrecognized Key throws error', async () => {
    const res = await request(app)
      .patch(`/api/project/${projectId}`)
      .send({ verb: faker.word.verb() })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringMatching('Unknown argument'),
      error: {
        name: 'PrismaClientValidationError',
        clientVersion: expect.any(String),
      },
    });
  });

  test('Empty req.body throws error', async () => {
    const res = await request(app)
      .patch(`/api/project/${projectId}`)
      .send()
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: "Request's body must not be empty",
      error: expect.any(Object),
    });
  });
});

describe('DELETE project', () => {
  test('All tasks inside should be deleted', async () => {
    const delProjectRes = await request(app)
      .delete(`/api/project/${projectId}`)
      .set('Cookie', `token=${token}`);

    expect(delProjectRes.status).toStrictEqual(200);

    expect(delProjectRes.body).toMatchObject({
      status: 'success',
      data: {
        id: projectId,
        userId,
      },
    });

    const getTaskInsideRes = await request(app)
      .get(`/api/task/${taskId}`)
      .set('Cookie', `token=${token}`);

    expect(getTaskInsideRes.status).toStrictEqual(400);

    expect(getTaskInsideRes.body).toMatchObject({
      status: 'error',
      message: 'No Task found',
    });
  });

  test('Non-existent id throws error', async () => {
    const res = await request(app)
      .delete(`/api/project/${faker.string.uuid()}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toMatchObject({
      status: 'error',
      message: expect.any(String),
      error: expect.any(Object),
    });
  });
});
