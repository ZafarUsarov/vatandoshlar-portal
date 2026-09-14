import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
});

const client = await pool.connect();
const email = `profile-flow-${Date.now()}@example.invalid`;

try {
  await client.query("BEGIN");

  const cityResult = await client.query(`
    SELECT id::text
    FROM locations
    WHERE location_type = 'city' AND status = 'active'
    ORDER BY id
    LIMIT 1
  `);

  const cityId = cityResult.rows[0]?.id;
  if (!cityId) throw new Error("No active canonical city is available for verification.");

  const userResult = await client.query(
    `
      INSERT INTO public_users (email, account_status)
      VALUES ($1, 'active')
      RETURNING id::text
    `,
    [email],
  );

  const userId = userResult.rows[0]?.id;
  if (!userId) throw new Error("Verification user insert failed.");

  await client.query(
    `
      INSERT INTO user_profiles (
        user_id, display_name, preferred_locale,
        home_location_id, residency_stage
      )
      VALUES ($1, 'Profile Verification', 'uz', $2, 'long_term_resident')
    `,
    [userId, cityId],
  );

  for (const interestKey of ["career", "community"]) {
    await client.query(
      `INSERT INTO user_interests (user_id, interest_key) VALUES ($1, $2)`,
      [userId, interestKey],
    );
  }

  const result = await client.query(
    `
      SELECT
        p.home_location_id::text,
        p.residency_stage,
        COUNT(i.interest_key)::int AS interest_count
      FROM user_profiles p
      LEFT JOIN user_interests i ON i.user_id = p.user_id
      WHERE p.user_id = $1
      GROUP BY p.home_location_id, p.residency_stage
    `,
    [userId],
  );

  const row = result.rows[0];

  if (
    row?.home_location_id !== cityId ||
    row?.residency_stage !== "long_term_resident" ||
    row?.interest_count !== 2
  ) {
    throw new Error("Profile persistence verification failed.");
  }

  await client.query("ROLLBACK");

  const persistedResult = await client.query(
    `SELECT COUNT(*)::int AS count FROM public_users WHERE email = $1`,
    [email],
  );

  if (persistedResult.rows[0]?.count !== 0) {
    throw new Error("Verification rollback failed.");
  }

  console.log("");
  console.log("Public profile flow verification");
  console.log("--------------------------------");
  console.log("Canonical city relation: PASS");
  console.log("Residency stage persistence: PASS");
  console.log("Interest persistence: PASS");
  console.log("Rollback safety: PASS");
  console.log("");
  console.log("Verification PASSED.");
} catch (error) {
  try { await client.query("ROLLBACK"); } catch {}
  throw error;
} finally {
  client.release();
  await pool.end();
}
