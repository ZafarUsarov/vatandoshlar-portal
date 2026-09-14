import {
  compare,
  hash,
} from "bcryptjs";
import {
  Pool,
} from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const pool =
  new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis:
      10_000,
    connectionTimeoutMillis:
      5_000,
  });

const client =
  await pool.connect();

const testEmail =
  `auth-flow-${Date.now()}@example.invalid`;

const testPassword =
  "verification-only-password";

try {
  await client.query(
    "BEGIN",
  );

  const passwordHash =
    await hash(
      testPassword,
      12,
    );

  const userResult =
    await client.query(
      `
        INSERT INTO public_users (
          email,
          password_hash,
          account_status
        )
        VALUES (
          $1,
          $2,
          'active'
        )
        RETURNING
          id::text,
          email,
          password_hash,
          account_status
      `,
      [
        testEmail,
        passwordHash,
      ],
    );

  const user =
    userResult.rows[0];

  if (!user) {
    throw new Error(
      "Verification user was not created.",
    );
  }

  await client.query(
    `
      INSERT INTO user_profiles (
        user_id,
        display_name,
        preferred_locale
      )
      VALUES (
        $1,
        'Verification User',
        'uz'
      )
    `,
    [
      user.id,
    ],
  );

  const passwordMatches =
    await compare(
      testPassword,
      user.password_hash,
    );

  if (!passwordMatches) {
    throw new Error(
      "bcrypt password verification failed.",
    );
  }

  const profileResult =
    await client.query(
      `
        SELECT
          user_id::text,
          display_name,
          preferred_locale
        FROM user_profiles
        WHERE user_id = $1
      `,
      [
        user.id,
      ],
    );

  if (
    profileResult.rows[0]
      ?.preferred_locale !== "uz"
  ) {
    throw new Error(
      "Public profile verification failed.",
    );
  }

  const adminCollisionResult =
    await client.query(
      `
        SELECT COUNT(*)::int AS count
        FROM admin_users
        WHERE LOWER(email) = LOWER($1)
      `,
      [
        testEmail,
      ],
    );

  if (
    adminCollisionResult.rows[0]
      ?.count !== 0
  ) {
    throw new Error(
      "Unexpected admin identity collision.",
    );
  }

  await client.query(
    "ROLLBACK",
  );

  const persistedResult =
    await client.query(
      `
        SELECT COUNT(*)::int AS count
        FROM public_users
        WHERE email = $1
      `,
      [
        testEmail,
      ],
    );

  if (
    persistedResult.rows[0]
      ?.count !== 0
  ) {
    throw new Error(
      "Verification transaction rollback failed.",
    );
  }

  console.log("");
  console.log(
    "Public auth flow verification",
  );
  console.log(
    "-----------------------------",
  );
  console.log(
    "Password hashing: PASS",
  );
  console.log(
    "User/profile transaction: PASS",
  );
  console.log(
    "Rollback safety: PASS",
  );
  console.log(
    "Admin identity separation: PASS",
  );
  console.log("");
  console.log(
    "Verification PASSED.",
  );
} catch (error) {
  try {
    await client.query(
      "ROLLBACK",
    );
  } catch {
    // Preserve original error.
  }

  throw error;
} finally {
  client.release();
  await pool.end();
}
