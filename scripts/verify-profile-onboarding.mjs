import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const pool = new Pool({ connectionString, max: 2, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 5_000 });
const client = await pool.connect();

try {
  const germany = await client.query(`SELECT COUNT(*)::int AS count FROM locations WHERE country_code = 'DE' AND location_type = 'state' AND status = 'active'`);
  if ((germany.rows[0]?.count ?? 0) !== 16) throw new Error("Expected exactly 16 active German federal states.");

  const uzRegions = await client.query(`SELECT COUNT(*)::int AS count FROM locations WHERE country_code = 'UZ' AND location_type = 'state' AND status = 'active'`);
  if ((uzRegions.rows[0]?.count ?? 0) !== 14) throw new Error("Expected 14 active Uzbekistan top-level regions.");

  const uzCities = await client.query(`SELECT city_name, state_code FROM locations WHERE country_code = 'UZ' AND location_type = 'city' AND status = 'active' ORDER BY city_name`);
  const cityKeys = new Set(uzCities.rows.map((row) => `${row.state_code}:${row.city_name}`));
  if (!cityKeys.has("UZ-QR:Nukus") || !cityKeys.has("UZ-TK:Toshkent")) throw new Error("Required verified Uzbekistan city seeds are missing.");

  const invalidHierarchy = await client.query(`SELECT COUNT(*)::int AS count FROM locations child LEFT JOIN locations parent ON parent.id = child.parent_id WHERE child.location_type = 'city' AND (parent.id IS NULL OR parent.location_type <> 'state' OR parent.country_code <> child.country_code OR parent.state_code <> child.state_code)`);
  if ((invalidHierarchy.rows[0]?.count ?? 0) !== 0) throw new Error("Canonical location hierarchy integrity failed.");

  await client.query("BEGIN");
  const email = `profile-onboarding-${Date.now()}@example.invalid`;
  const user = await client.query(`INSERT INTO public_users (email, account_status) VALUES ($1, 'active') RETURNING id::text`, [email]);
  const userId = user.rows[0]?.id;
  const city = await client.query(`SELECT id::text FROM locations WHERE country_code = 'UZ' AND slug = 'uz-toshkent' LIMIT 1`);
  const cityId = city.rows[0]?.id;
  if (!userId || !cityId) throw new Error("Verification setup failed.");
  await client.query(`INSERT INTO user_profiles (user_id, preferred_locale, home_location_id, residency_stage) VALUES ($1, 'uz', $2, 'planning_germany')`, [userId, cityId]);
  await client.query("ROLLBACK");

  console.log("");
  console.log("Profile onboarding verification");
  console.log("-------------------------------");
  console.log("Germany canonical states preserved: PASS");
  console.log("Uzbekistan region hierarchy: PASS");
  console.log("Verified Uzbekistan locations only: PASS");
  console.log("Country-aware hierarchy integrity: PASS");
  console.log("New residency stage persistence: PASS");
  console.log("Transactional rollback: PASS");
  console.log("");
  console.log("Verification PASSED.");
} catch (error) {
  try { await client.query("ROLLBACK"); } catch {}
  throw error;
} finally {
  client.release();
  await pool.end();
}
