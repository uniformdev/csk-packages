import type { Config } from 'drizzle-kit';

export default {
  schema: './src/modules/chat/rag/db/schema',
  dialect: 'postgresql',
  out: './src/modules/chat/rag/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
