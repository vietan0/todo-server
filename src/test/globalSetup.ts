import { exec } from 'node:child_process';
import util from 'node:util';

const execPromise = util.promisify(exec);

export default async function setup() {
  try {
    const { stdout, stderr } = await execPromise('npx prisma db seed');
    stdout && console.log('stdout :>> ', stdout);
    stderr && console.log('stderr :>> ', stderr);
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
