export const testIds = {
  user: [
    {
      id: 'da94b4b6-8234-4698-a493-c96433c61aa3',
      projects: [
        {
          id: '7760fd08-cbab-4fb1-9698-db00bcaca014',
          tasks: [
            {
              id: 'ee0c7d8a-95ee-487e-8d66-3589faacb883',
              parentTaskId: null,
            },
            {
              id: '443edac1-e763-4d70-b605-03f35cf60299',
              parentTaskId: null,
            },
            {
              id: 'c04336a9-85e6-4a43-a84d-801eb27ed3e3',
              parentTaskId: 'ee0c7d8a-95ee-487e-8d66-3589faacb883',
            },
            {
              id: '697c5127-ec2f-4390-8a3f-408ed742681a',
              parentTaskId: '443edac1-e763-4d70-b605-03f35cf60299',
            },
            {
              id: '7ac58372-fcb0-49e7-8326-80ae5882cd6a',
              parentTaskId: 'ee0c7d8a-95ee-487e-8d66-3589faacb883',
            },
            {
              id: 'deff9eba-003a-4897-9906-eef2fccc3782',
              parentTaskId: '443edac1-e763-4d70-b605-03f35cf60299',
            },
          ],
        },
        {
          id: 'acdd0c13-ad06-4596-8026-d62fc7e25b02',
          tasks: [
            {
              id: '6edb4bb4-beb8-4bf0-a02c-90cd9ceef95e', // is child
              parentTaskId: '827e8b48-e748-4dc1-ba15-8a93874504d0',
            },
            {
              id: '827e8b48-e748-4dc1-ba15-8a93874504d0', // is parent
              parentTaskId: null,
            },
            {
              id: '7dcfd443-6800-4432-9817-f443e5d5cea3', // is parent of 2
              parentTaskId: null,
            },
            {
              id: '3c34634f-f6a4-41e4-9bf8-5c46e68f1d23', // is nothing
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
        {
          id: '508fac0c-fde0-4288-aee2-9d7ae22012b9',
          tasks: [
            {
              id: '0c23434a-b6a8-4161-803a-0562b3ffc249',
              parentTaskId: null,
            },
          ],
        },
      ],
    },
  ],
};
