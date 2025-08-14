// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

// Parse the connection string from environment
const connectionString = process.env.POSTGRES_URL!;
const url = new URL(connectionString);

const drizzleConfig: Config = {
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading slash
    ssl: false, // Set to true if your local PostgreSQL requires SSL
  },
  verbose: true,
  strict: true,
};

export default drizzleConfig;
