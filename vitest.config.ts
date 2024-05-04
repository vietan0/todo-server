import { defineConfig } from 'vitest/config';

import setup from './globalSetup.js';

export default defineConfig({
  test: {
    globalSetup: ['./globalSetup.ts'],
    reporters: [
      'default',
      {
        async onWatcherRerun() {
          await setup();
        },
      },
    ],
    poolOptions: {
      threads: {
        singleThread: true, // default is false
      },
    },
  },
});
