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

try {
  const tableResult = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('public_users','user_profiles','user_interests')
    ORDER BY table_name
  `);

  const requiredColumnResult = await client.query(`
    SELECT table_name, column_name, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND (
        (table_name = 'public_users' AND column_name IN ('id','email','password_hash','account_status','email_verified_at','last_login_at'))
        OR (table_name = 'user_profiles' AND column_name IN ('user_id','preferred_locale','home_location_id','residency_stage'))
        OR (table_name = 'user_interests' AND column_name IN ('user_id','interest_key'))
      )
    ORDER BY table_name, column_name
  `);

  const indexResult = await client.query(`
    SELECT indexname
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND indexname IN (
        'public_users_email_unique_idx',
        'public_users_status_idx',
        'user_profiles_home_location_idx',
        'user_profiles_residency_stage_idx',
        'user_interests_key_idx'
      )
  `);

  const duplicateEmailResult = await client.query(`
    SELECT LOWER(email) AS normalized_email, COUNT(*)::int AS count
    FROM public_users
    GROUP BY LOWER(email)
    HAVING COUNT(*) > 1
  `);

  const orphanProfileResult = await client.query(`
    SELECT p.user_id::text
    FROM user_profiles p
    LEFT JOIN public_users u ON u.id = p.user_id
    WHERE u.id IS NULL
  `);

  const orphanInterestResult = await client.query(`
    SELECT i.user_id::text, i.interest_key
    FROM user_interests i
    LEFT JOIN public_users u ON u.id = i.user_id
    WHERE u.id IS NULL
  `);

  const invalidHomeLocationResult = await client.query(`
    SELECT p.user_id::text, p.home_location_id::text, l.location_type, l.status
    FROM user_profiles p
    JOIN locations l ON l.id = p.home_location_id
    WHERE p.home_location_id IS NOT NULL
      AND (l.location_type <> 'city' OR l.status <> 'active')
  `);

  const crossIdentityForeignKeyResult = await client.query(`
    SELECT c.conname
    FROM pg_constraint c
    JOIN pg_class source_table ON source_table.oid = c.conrelid
    JOIN pg_class target_table ON target_table.oid = c.confrelid
    WHERE c.contype = 'f'
      AND (
        (source_table.relname = 'admin_users' AND target_table.relname IN ('public_users','user_profiles','user_interests'))
        OR
        (target_table.relname = 'admin_users' AND source_table.relname IN ('public_users','user_profiles','user_interests'))
      )
  `);

  const countResult = await client.query(`
    SELECT
      (SELECT COUNT(*)::int FROM public_users) AS users,
      (SELECT COUNT(*)::int FROM user_profiles) AS profiles,
      (SELECT COUNT(*)::int FROM user_interests) AS interests
  `);

  const errors = [];

  if (tableResult.rows.length !== 3) errors.push(`Expected 3 Vatandoshlar ID tables, found ${tableResult.rows.length}.`);
  if (requiredColumnResult.rows.length !== 12) errors.push(`Expected 12 required foundation columns, found ${requiredColumnResult.rows.length}.`);
  if (indexResult.rows.length !== 5) errors.push(`Expected 5 foundation indexes, found ${indexResult.rows.length}.`);
  if (duplicateEmailResult.rows.length > 0) errors.push(`Found ${duplicateEmailResult.rows.length} duplicate normalized email group(s).`);
  if (orphanProfileResult.rows.length > 0) errors.push(`Found ${orphanProfileResult.rows.length} orphan profile(s).`);
  if (orphanInterestResult.rows.length > 0) errors.push(`Found ${orphanInterestResult.rows.length} orphan interest record(s).`);
  if (invalidHomeLocationResult.rows.length > 0) errors.push(`Found ${invalidHomeLocationResult.rows.length} profile(s) linked to a non-active-city home location.`);
  if (crossIdentityForeignKeyResult.rows.length > 0) errors.push("Public user identity must remain structurally separate from admin_users.");

  const passwordHashColumn = requiredColumnResult.rows.find((row) => row.table_name === 'public_users' && row.column_name === 'password_hash');
  if (passwordHashColumn?.is_nullable !== 'YES') errors.push('public_users.password_hash must remain nullable.');

  const homeLocationColumn = requiredColumnResult.rows.find((row) => row.table_name === 'user_profiles' && row.column_name === 'home_location_id');
  if (homeLocationColumn?.is_nullable !== 'YES') errors.push('user_profiles.home_location_id must remain nullable.');

  const counts = countResult.rows[0];
  console.log('');
  console.log('Vatandoshlar ID foundation verification');
  console.log('--------------------------------------');
  console.log(`Users: ${counts?.users ?? 0}`);
  console.log(`Profiles: ${counts?.profiles ?? 0}`);
  console.log(`Interests: ${counts?.interests ?? 0}`);

  if (errors.length > 0) {
    console.error('');
    for (const error of errors) console.error(`ERROR: ${error}`);
    throw new Error('Vatandoshlar ID foundation verification failed.');
  }

  console.log('');
  console.log('Verification PASSED.');
} finally {
  client.release();
  await pool.end();
}
