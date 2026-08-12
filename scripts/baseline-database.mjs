import {
  createHash,
} from "node:crypto";

import {
  readdir,
  readFile,
} from "node:fs/promises";

import {
  join,
  resolve,
} from "node:path";

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

const confirmationFlag =
  "--confirm-existing-schema";

if (
  !process.argv.includes(
    confirmationFlag,
  )
) {
  throw new Error(
    [
      "Baseline stopped.",
      `Run again with ${confirmationFlag} only after confirming that migrations 001–017 are already present in this database.`,
    ].join(" "),
  );
}

const migrationsDirectory =
  resolve(
    process.cwd(),
    "db/migrations",
  );

const migrationFilePattern =
  /^\d{3}_[a-z0-9_]+\.sql$/;

const expectedTables = [
  "admin_users",
  "news_articles",
  "job_guides",
  "services",
  "specialists",
  "events",
  "guide_articles",
  "telegram_groups",
];

const advisoryLockId =
  8_246_201_726;

const pool =
  new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 5_000,
    connectionTimeoutMillis: 5_000,
  });

function createChecksum(
  content,
) {
  return createHash(
    "sha256",
  )
    .update(
      content,
      "utf8",
    )
    .digest(
      "hex",
    );
}

async function loadMigrations() {
  const entries =
    await readdir(
      migrationsDirectory,
      {
        withFileTypes:
          true,
      },
    );

  const filenames =
    entries
      .filter(
        (entry) =>
          entry.isFile() &&
          migrationFilePattern.test(
            entry.name,
          ),
      )
      .map(
        (entry) =>
          entry.name,
      )
      .sort();

  if (
    filenames.length === 0
  ) {
    throw new Error(
      "No migration files were found in db/migrations.",
    );
  }

  const migrations = [];

  for (
    const filename
    of filenames
  ) {
    const content =
      await readFile(
        join(
          migrationsDirectory,
          filename,
        ),
        "utf8",
      );

    migrations.push({
      filename,
      checksum:
        createChecksum(
          content,
        ),
    });
  }

  return migrations;
}

async function ensureExpectedTablesExist(
  client,
) {
  const result =
    await client.query(
      `
        SELECT
          table_name
        FROM information_schema.tables
        WHERE
          table_schema = 'public'
          AND table_name = ANY($1::text[])
      `,
      [
        expectedTables,
      ],
    );

  const existingTables =
    new Set(
      result.rows.map(
        (row) =>
          row.table_name,
      ),
    );

  const missingTables =
    expectedTables.filter(
      (tableName) =>
        !existingTables.has(
          tableName,
        ),
    );

  if (
    missingTables.length > 0
  ) {
    throw new Error(
      [
        "Baseline stopped because the existing database schema is incomplete.",
        `Missing table(s): ${missingTables.join(", ")}.`,
      ].join(" "),
    );
  }
}

async function ensureMigrationTable(
  client,
) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      checksum TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function ensureHistoryIsEmpty(
  client,
) {
  const result =
    await client.query(`
      SELECT
        COUNT(*)::int AS count
      FROM schema_migrations
    `);

  const count =
    result.rows[0]?.count ??
    0;

  if (
    count !== 0
  ) {
    throw new Error(
      [
        "Baseline stopped because schema_migrations is not empty.",
        `Existing history rows: ${count}.`,
        "Use the normal migration runner instead.",
      ].join(" "),
    );
  }
}

const client =
  await pool.connect();

try {
  await client.query(
    "SELECT pg_advisory_lock($1)",
    [
      advisoryLockId,
    ],
  );

  const migrations =
    await loadMigrations();

  await ensureExpectedTablesExist(
    client,
  );

  await ensureMigrationTable(
    client,
  );

  await ensureHistoryIsEmpty(
    client,
  );

  console.log("");
  console.log(
    "Database migration baseline",
  );
  console.log(
    "---------------------------",
  );

  console.log(
    `Migration files: ${migrations.length}`,
  );

  console.log(
    `Schema tables:   ${expectedTables.length}`,
  );

  console.log("");
  console.log(
    "No migration SQL will be executed.",
  );
  console.log(
    "Existing migrations will only be recorded in schema_migrations.",
  );
  console.log("");

  await client.query(
    "BEGIN",
  );

  try {
    for (
      const migration
      of migrations
    ) {
      await client.query(
        `
          INSERT INTO schema_migrations (
            filename,
            checksum
          )
          VALUES (
            $1,
            $2
          )
        `,
        [
          migration.filename,
          migration.checksum,
        ],
      );

      console.log(
        `BASELINE ${migration.filename}`,
      );
    }

    await client.query(
      "COMMIT",
    );
  } catch (error) {
    await client.query(
      "ROLLBACK",
    );

    throw error;
  }

  console.log("");
  console.log(
    `Recorded ${migrations.length} existing migration(s).`,
  );

  console.log(
    "Baseline PASSED.",
  );
} finally {
  try {
    await client.query(
      "SELECT pg_advisory_unlock($1)",
      [
        advisoryLockId,
      ],
    );
  } catch {
    // Connection cleanup must continue even
    // when unlocking fails.
  }

  client.release();

  await pool.end();
}