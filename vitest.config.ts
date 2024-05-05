import { configDefaults, defineConfig } from 'vitest/config';

import setup from './src/test/globalSetup.js';

export default defineConfig({
  test: {
    globalSetup: ['./src/test/globalSetup.ts'],
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
    coverage: {
      provider: 'istanbul',
      exclude: [...configDefaults.coverage.exclude!, '**/{ignore,test}'],
    },
  },
});
