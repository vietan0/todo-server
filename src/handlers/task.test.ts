import { faker } from '@faker-js/faker';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import app from '../server.js';
import { testIds } from '../test/projectTaskHelpers.js';
import { ResBody } from '../types/express/ResBody.js';

let token: string;
const projectId = testIds.user[0].projects[1].id;
const newProjectId = testIds.user[0].projects[0].id;
const taskInAnotherProject = testIds.user[0].projects[0].tasks[0].id;
const taskIsChild = testIds.user[0].projects[1].tasks[0].id;
const taskIsParent = testIds.user[0].projects[1].tasks[1].id;
const taskIsParent2 = testIds.user[0].projects[1].tasks[2].id;
const taskIsNothing = testIds.user[0].projects[1].tasks[3].id;

beforeAll(async () => {
  const signInRes = await request(app)
    .post('/auth/signin')
    .send({ email: 'postman@gmail.com', password: 'postman' });

  token = signInRes.headers['set-cookie'][0].split('token=')[1].split(';')[0];
});

describe('CREATE task', () => {
  test('Success', async () => {
    const name = `${faker.word.verb()} the ${faker.word.noun()}`;
    const body = faker.lorem.sentence();

    const res = await request(app)
      .post(`/api/project/${projectId}/task`)
      .send({ name, body })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: { name, body, completed: false, parentTaskId: null },
    });
  });

  test('Success - Keys other than `name` and `body` are ignored', async () => {
    const name = `${faker.word.verb()} the ${faker.word.noun()}`;
    const body = faker.lorem.sentence();

    const reqBody = {
      name,
      body,
      id: faker.string.uuid(),
      completed: true,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
      verb: faker.word.verb(),
      cat: faker.animal.cat(),
    };

    const res = await request(app)
      .post(`/api/project/${projectId}/task`)
      .send(reqBody)
      .set('Cookie', `token=${token}`);

    const resBody: ResBody = {
      status: 'success',
      data: {
        id: expect.not.stringMatching(reqBody.id),
        name: reqBody.name,
        body: reqBody.body,
        completed: false,
        lexorank: expect.any(String),
        createdAt: expect.not.stringMatching(reqBody.createdAt),
        updatedAt: expect.not.stringMatching(reqBody.createdAt),
        projectId,
        parentTaskId: null,
        subTasks: expect.any(Array),
      },
    };

    expect(res.status).toStrictEqual(200);
    expect(res.body).toStrictEqual(resBody);
  });

  test('Name missing throws error', async () => {
    const res = await request(app)
      .post(`/api/project/${projectId}/task`)
      .send()
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: 'Validation error: Required at "name"',
      error: expect.any(Object),
    });
  });

  test('Create sub-task - Success', async () => {
    const name = `${faker.word.verb()} the ${faker.word.noun()}`;

    const res = await request(app)
      .post(`/api/project/${projectId}/task`)
      .send({ name, parentTaskId: taskIsParent })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: {
        parentTaskId: taskIsParent,
      },
    });
  });

  test('Create sub-task - Throw error if `parentTaskId` is a child', async () => {
    const name = `${faker.word.verb()} the ${faker.word.noun()}`;

    const res = await request(app)
      .post(`/api/project/${projectId}/task`)
      .send({ name, parentTaskId: taskIsChild })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: "Parent task can't be a child task, must be root-level",
      error: {},
    });
  });
});

describe('READ task', () => {
  test('Get All - Success', async () => {
    const res = await request(app)
      .get(`/api/project/${projectId}/task`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body.data).toContainEqual({
      id: expect.any(String),
      name: expect.any(String),
      body: expect.toBeOneOf([expect.any(String), null]),
      completed: false,
      lexorank: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      parentTaskId: expect.anything(),
      projectId,
      subTasks: expect.any(Array),
    });
  });

  test('Get By Id - Success', async () => {
    const res = await request(app)
      .get(`/api/task/${taskIsChild}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: {
        id: taskIsChild,
        parentTaskId: expect.any(String),
        subTasks: expect.any(Array),
      },
    });
  });

  test('Get By Id - Non-existent Id throws error', async () => {
    const res = await request(app)
      .get(`/api/task/${faker.string.uuid()}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: 'No Task found',
      error: expect.any(Object),
    });
  });

  test('Get By Id - Invalid UUID throws error', async () => {
    const res = await request(app)
      .get(`/api/task/${faker.string.nanoid()}`)
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: expect.stringMatching('Error creating UUID'),
      error: expect.any(Object),
    });
  });
});

describe('UPDATE task', () => {
  test('Change `name` - success', async () => {
    const newName = `${faker.word.verb()} the ${faker.word.noun()}`;

    const res = await request(app)
      .patch(`/api/task/${taskIsParent}`)
      .send({ name: newName })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: {
        name: newName,
        id: taskIsParent,
        projectId,
      },
    });
  });

  test('Change `completed` - All subtasks should follow', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsParent}`)
      .send({ completed: true })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body.data.completed).toBe(true);
    expect(res.body.data.subTasks[0].completed).toBe(true);
    expect(res.body.data.subTasks[1].completed).toBe(true);
  });

  test('Change `parentTaskId` - Throw error if `parentTaskId` is in another project', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsNothing}`)
      .send({ parentTaskId: taskInAnotherProject })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toMatchObject({
      status: 'error',
      message: 'No Task found',
      error: expect.any(Object),
    });
  });

  test('Change `parentTaskId` - Throw error if `parentTaskId` is the same as `:taskId`', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsParent}`)
      .send({ parentTaskId: taskIsParent })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toMatchObject({
      status: 'error',
      message: "Task can't be its own parent",
    });
  });

  test('Change `parentTaskId` - Throw error if `:taskId` is a parent', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsParent}`)
      .send({ parentTaskId: taskIsNothing })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: "Target task can't be a parent",
      error: {},
    });
  });

  test('Change `parentTaskId` - Throw error if `parentTaskId` is a child', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsNothing}`)
      .send({ parentTaskId: taskIsChild })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: "Parent task can't be a child",
      error: {},
    });
  });

  test('Change both `parentTaskId` and `projectId` throws error', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsNothing}`)
      .send({
        projectId: newProjectId,
        parentTaskId: taskIsParent,
      })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(400);

    expect(res.body).toStrictEqual({
      status: 'error',
      message: "Can't pass both projectId and parentTaskId in one request",
      error: {},
    });
  });

  test('Change `parentTaskId` - Success', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsNothing}`)
      .send({ parentTaskId: taskIsParent })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);

    expect(res.body).toMatchObject({
      status: 'success',
      data: {
        id: taskIsNothing,
        parentTaskId: taskIsParent,
      },
    });
  });

  test('Change `project` - all subtasks should follow', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsParent2}`)
      .send({ projectId: newProjectId })
      .set('Cookie', `token=${token}`);

    expect(res.status).toStrictEqual(200);
    expect(res.body.data.projectId).toStrictEqual(newProjectId);
    expect(res.body.data.subTasks[0].projectId).toStrictEqual(newProjectId);
    // expect(res.body.data.subTasks[1].projectId).toStrictEqual(newProjectId);
  });

  test('Empty req.body throws error', async () => {
    const res = await request(app)
      .patch(`/api/task/${taskIsNothing}`)
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

describe('DELETE task', () => {
  test('All subtasks should be deleted too', async () => {
    const delParentTaskRes = await request(app)
      .delete(`/api/task/${taskIsParent}`)
      .set('Cookie', `token=${token}`);

    expect(delParentTaskRes.status).toStrictEqual(200);

    expect(delParentTaskRes.body).toMatchObject({
      status: 'success',
      data: {
        id: taskIsParent,
        projectId: projectId,
      },
    });

    const getSubtaskRes = await request(app)
      .get(`/api/task/${taskIsNothing}`)
      .set('Cookie', `token=${token}`);

    expect(getSubtaskRes.status).toStrictEqual(400);

    expect(getSubtaskRes.body).toMatchObject({
      status: 'error',
      message: 'No Task found',
    });
  });
});
