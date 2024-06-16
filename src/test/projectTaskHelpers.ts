export const testIds = {
  user: [
    {
      id: 'da94b4b6-8234-4698-a493-c96433c61aa3',
      projects: [
        {
          id: '65f38cc9-13e3-49b4-92eb-ad01aedd94ad',
          tasks: [
            {
              id: '9d44af76-3abf-491d-9087-cc68ecc6bcc0',
              parentTaskId: null,
            },
            {
              id: '8a59655d-ea8a-4323-a877-1a5b8084f284',
              parentTaskId: null,
            },
            {
              id: '2de8dcad-2a0f-43b8-b3e7-a6c3492fd66f',
              parentTaskId: '9d44af76-3abf-491d-9087-cc68ecc6bcc0',
            },
            {
              id: '8e2f61fa-a0f4-45a4-9dd1-27d7dcba3642',
              parentTaskId: '8a59655d-ea8a-4323-a877-1a5b8084f284',
            },
            {
              id: '837a9979-a06a-4587-933a-cb1310283e22',
              parentTaskId: '9d44af76-3abf-491d-9087-cc68ecc6bcc0',
            },
            {
              id: 'bec8c750-95f8-46c2-a6a3-b9aa456a8982',
              parentTaskId: '8a59655d-ea8a-4323-a877-1a5b8084f284',
            },
          ],
        },
        {
          id: 'acdd0c13-ad06-4596-8026-d62fc7e25b02',
          tasks: [
            {
              id: '7bb88df7-5a75-43c0-a201-2dbf60ba80c4', // is child
              parentTaskId: '6da9d06d-7fe7-4d52-b84d-23da38ac24be',
            },
            {
              id: '6da9d06d-7fe7-4d52-b84d-23da38ac24be', // is parent
              parentTaskId: null,
            },
            {
              id: '7dcfd443-6800-4432-9817-f443e5d5cea3', // is parent of 2
              parentTaskId: null,
            },
            {
              id: 'a9cad9a7-53e3-472d-ab98-5d0d6d3eb94f', // is nothing
              parentTaskId: null,
            },
            {
              id: '83eea42f-556a-4302-a79b-c9be015400eb',
              parentTaskId: '7dcfd443-6800-4432-9817-f443e5d5cea3',
            },
            {
              id: '8ae29c43-3acf-4cc5-ab29-d896164e8320',
              parentTaskId: '7dcfd443-6800-4432-9817-f443e5d5cea3',
            },
          ],
        },
      ],
    },
  ],
};
