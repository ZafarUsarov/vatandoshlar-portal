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

const email =
  `public-journey-${Date.now()}@example.invalid`;

const password =
  "Vatandoshlar-Test-2026!";

try {
  await client.query(
    "BEGIN",
  );

  const passwordHash =
    await hash(
      password,
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
        RETURNING id::text
      `,
      [
        email,
        passwordHash,
      ],
    );

  const userId =
    userResult.rows[0]?.id;

  if (!userId) {
    throw new Error(
      "Public user creation verification failed.",
    );
  }

  const validPassword =
    await compare(
      password,
      passwordHash,
    );

  const invalidPassword =
    await compare(
      "wrong-password",
      passwordHash,
    );

  if (
    !validPassword ||
    invalidPassword
  ) {
    throw new Error(
      "Password verification behavior is invalid.",
    );
  }

  let duplicateBlocked =
    false;

  await client.query(
    "SAVEPOINT duplicate_test",
  );

  try {
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
      `,
      [
        email,
        passwordHash,
      ],
    );
  } catch (error) {
    duplicateBlocked =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505";

    await client.query(
      "ROLLBACK TO SAVEPOINT duplicate_test",
    );
  }

  if (!duplicateBlocked) {
    throw new Error(
      "Duplicate email verification failed.",
    );
  }

  await client.query(
    "ROLLBACK",
  );

  console.log("");
  console.log(
    "Public user journey verification",
  );
  console.log(
    "-------------------------------",
  );
  console.log(
    "Password hashing/valid login: PASS",
  );
  console.log(
    "Invalid password rejection: PASS",
  );
  console.log(
    "Duplicate email protection: PASS",
  );
  console.log(
    "Rollback safety: PASS",
  );
  console.log("");
  console.log(
    "Verification PASSED.",
  );
} finally {
  client.release();
  await pool.end();
}
