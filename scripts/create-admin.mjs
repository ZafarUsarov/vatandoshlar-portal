import { hash } from "bcryptjs";
import pg from "pg";

const { Pool } = pg;

const [
  ,
  ,
  emailArgument,
  passwordArgument,
  nameArgument,
] = process.argv;

const email = emailArgument
  ?.trim()
  .toLowerCase();

const password = passwordArgument ?? "";

const displayName =
  nameArgument?.trim() ||
  "Vatandoshlar.de Admin";

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not configured.",
  );

  process.exit(1);
}

if (!email || !email.includes("@")) {
  console.error(
    "A valid admin email is required.",
  );

  process.exit(1);
}

if (password.length < 12) {
  console.error(
    "Admin password must contain at least 12 characters.",
  );

  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const client = await pool.connect();

try {
  const passwordHash = await hash(
    password,
    12,
  );

  await client.query("BEGIN");

  const existingAdmin =
    await client.query(
      `
        SELECT id
        FROM admin_users
        WHERE LOWER(email) = $1
        LIMIT 1
        FOR UPDATE
      `,
      [email],
    );

  let admin;

  if (existingAdmin.rows[0]) {
    const result = await client.query(
      `
        UPDATE admin_users
        SET
          email = $1,
          display_name = $2,
          password_hash = $3,
          role = 'admin',
          is_active = TRUE,
          updated_at = NOW()
        WHERE id = $4
        RETURNING
          id,
          email,
          display_name,
          role,
          is_active
      `,
      [
        email,
        displayName,
        passwordHash,
        existingAdmin.rows[0].id,
      ],
    );

    admin = result.rows[0];
  } else {
    const result = await client.query(
      `
        INSERT INTO admin_users (
          email,
          display_name,
          password_hash,
          role,
          is_active
        )
        VALUES (
          $1,
          $2,
          $3,
          'admin',
          TRUE
        )
        RETURNING
          id,
          email,
          display_name,
          role,
          is_active
      `,
      [
        email,
        displayName,
        passwordHash,
      ],
    );

    admin = result.rows[0];
  }

  await client.query("COMMIT");

  console.log("");
  console.log("Admin account ready.");
  console.log("--------------------");
  console.log(`ID: ${admin.id}`);
  console.log(`Name: ${admin.display_name}`);
  console.log(`Email: ${admin.email}`);
  console.log(`Role: ${admin.role}`);
  console.log(
    `Active: ${admin.is_active}`,
  );
  console.log("");
} catch (error) {
  await client.query("ROLLBACK");

  console.error(
    "Failed to create admin account:",
    error,
  );

  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}