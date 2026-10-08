import { Pool } from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
try {
  const { rows } = await pool.query(`
    SELECT
      to_regclass('public.location_postal_codes') IS NOT NULL AS table_exists,
      (SELECT COUNT(*)::int FROM locations WHERE country_code='DE' AND location_type='state' AND status='active') AS states,
      (SELECT COUNT(*)::int FROM locations WHERE country_code='DE' AND location_type='city' AND status='active') AS cities
  `);
  const result = rows[0];
  console.log(JSON.stringify(result, null, 2));
  if (!result.table_exists || result.states !== 16) process.exitCode = 1;
} finally {
  await pool.end();
}
