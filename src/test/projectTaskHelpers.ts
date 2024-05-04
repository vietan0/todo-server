export const testIds = {
  user: [
    {
      id: 'da94b4b6-8234-4698-a493-c96433c61aa3',
      projects: [
        {
          id: '057c17a4-c96c-40fb-8e3b-422865f1d0d2',
          tasks: [
            {
              id: '4f1cbf6f-20b2-4a32-b4d3-dc5ba7d02698',
              parentTaskId: null,
            },
            {
              id: '77355ead-5d66-425d-806e-a2fbd5cb770e',
              parentTaskId: null,
            },
            {
              id: '8ada3d13-438c-4d50-9d7f-f2cef95bb566',
              parentTaskId: '4f1cbf6f-20b2-4a32-b4d3-dc5ba7d02698',
            },
            {
              id: '8e2f61fa-a0f4-45a4-9dd1-27d7dcba3642',
              parentTaskId: '77355ead-5d66-425d-806e-a2fbd5cb770e',
            },
            {
              id: 'e8865efd-54c1-4fe2-9520-af76d0c5bb78',
              parentTaskId: '4f1cbf6f-20b2-4a32-b4d3-dc5ba7d02698',
            },
          ],
        },
        {
          id: 'acdd0c13-ad06-4596-8026-d62fc7e25b02',
          tasks: [
            {
              id: '5bf97843-4e24-46c6-ba88-1f4da98d7b95', // is child
              parentTaskId: '92d2adc2-d785-4d99-9c65-8ef126feb818',
            },
            {
              id: '92d2adc2-d785-4d99-9c65-8ef126feb818', // is parent
              parentTaskId: null,
            },
            {
              id: '9d44af76-3abf-491d-9087-cc68ecc6bcc0', // is parent 2
              parentTaskId: null,
            },
            {
              id: '9e33670d-157f-4ca7-88dc-4ade6d18db45', // is nothing
              parentTaskId: null,
            },
          ],
        },
      ],
    },
  ],
};
