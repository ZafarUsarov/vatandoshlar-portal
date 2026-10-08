import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 5_000 });
try {
  const tables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'market_listings'`);
  if (tables.rowCount !== 1) throw new Error("Missing market_listings table.");

  const expectedColumns = ["id", "author_user_id", "location_id", "slug", "listing_type", "title", "description", "content_language", "price_amount", "currency", "status", "created_at", "updated_at", "published_at"];
  const columns = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'market_listings'`);
  const columnNames = new Set(columns.rows.map((row) => row.column_name));
  const expectedIndexes = ["market_listings_slug_key", "market_listings_status_published_idx", "market_listings_location_status_idx", "market_listings_author_created_idx", "market_listings_type_status_idx"];
  const indexes = await pool.query(`SELECT indexname FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'market_listings'`);
  const indexNames = new Set(indexes.rows.map((row) => row.indexname));
  const foreignKeys = await pool.query(`SELECT a.attname AS column_name, target.relname AS target_table FROM pg_constraint c JOIN pg_class source ON source.oid = c.conrelid JOIN pg_class target ON target.oid = c.confrelid JOIN unnest(c.conkey) AS key(attnum) ON TRUE JOIN pg_attribute a ON a.attrelid = source.oid AND a.attnum = key.attnum WHERE source.relname = 'market_listings' AND c.contype = 'f'`);
  const fkMap = new Map(foreignKeys.rows.map((row) => [row.column_name, row.target_table]));
  const checks = await pool.query(`SELECT conname FROM pg_constraint WHERE conrelid = 'market_listings'::regclass AND contype = 'c'`);
  const checkNames = new Set(checks.rows.map((row) => row.conname));
  const requiredChecks = ["market_listings_type_check", "market_listings_language_check", "market_listings_currency_check", "market_listings_status_check", "market_listings_price_check", "market_listings_publication_check"];
  const errors = [];
  for (const name of expectedColumns) if (!columnNames.has(name)) errors.push(`Missing column: ${name}`);
  for (const name of expectedIndexes) if (!indexNames.has(name)) errors.push(`Missing index: ${name}`);
  for (const name of requiredChecks) if (!checkNames.has(name)) errors.push(`Missing constraint: ${name}`);
  if (fkMap.get("author_user_id") !== "public_users") errors.push("Invalid author FK");
  if (fkMap.get("location_id") !== "locations") errors.push("Invalid location FK");
  const count = await pool.query(`SELECT COUNT(*)::int AS count FROM market_listings`);
  console.log("Market Foundation verification");
  console.log(`Listings: ${count.rows[0].count}`);
  if (errors.length) throw new Error(errors.join("\n"));
  console.log("Schema, constraints, indexes and FKs: PASS");
  console.log("Verification PASSED.");
} finally {
  await pool.end();
}
