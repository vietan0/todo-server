import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./src/test/setup.ts'],
    fileParallelism: false,
    coverage: {
      provider: 'istanbul',
      exclude: [...configDefaults.coverage.exclude!, '**/{ignore,test}'],
    },
    hookTimeout: 20000,
  },
});
