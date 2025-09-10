import { defineConfig } from 'prisma/config';

export default defineConfig({
  migrations: {
    seed: 'psql -qtf prisma/dump.sql',
  },
});
