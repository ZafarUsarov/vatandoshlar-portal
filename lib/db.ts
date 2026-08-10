import { Pool } from "pg";

declare global {
  var __vatandoshlarPgPool:
    | Pool
    | undefined;
}

function createPool(): Pool {
  const connectionString =
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not configured.",
    );
  }

  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });
}

export const db =
  globalThis.__vatandoshlarPgPool ??
  createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.__vatandoshlarPgPool = db;
}
