import { execSync } from 'node:child_process';

import { beforeAll } from 'vitest';

async function runSeed() {
  const stdout = execSync('npx prisma db seed');
  console.log(stdout.toString());
}

beforeAll(() => {
  runSeed();
});
