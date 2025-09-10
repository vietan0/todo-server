import { execSync } from 'node:child_process';

import { beforeAll } from 'vitest';

async function runSeed() {
  const stdout = execSync('pnpx prisma db seed');
  console.log(stdout.toString());
}

beforeAll(() => {
  runSeed();
});
