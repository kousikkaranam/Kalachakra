// src/lib/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/db/schema';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool, { schema });

// Health check function
export async function checkDatabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
