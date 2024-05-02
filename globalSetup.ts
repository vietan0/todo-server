import { exec } from 'node:child_process';
import util from 'node:util';

import type { GlobalSetupContext } from 'vitest/node';

const execPromise = util.promisify(exec);

export default async function setup({ provide }: GlobalSetupContext) {
  provide('wsPort', 3000);

  try {
    const { stdout, stderr } = await execPromise('npx prisma db seed');
    console.log('stdout :>> ', stdout);
    console.log('stderr :>> ', stderr);
  } catch (error) {
    console.error(error);
  }
}

// do this to have type-safe access to `provide/inject` methods in test files
declare module 'vitest' {
  export interface ProvidedContext {
    wsPort: number;
  }
}
