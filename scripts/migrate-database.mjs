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

const migrationsDirectory =
  resolve(
    process.cwd(),
    "db/migrations",
  );

const migrationFilePattern =
  /^\d{3}_[a-z0-9_]+\.sql$/;

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

function extractMigrationBody(
  content,
  filename,
) {
  const normalized =
    content
      .replace(
        /^\uFEFF/,
        "",
      )
      .trim();

  const match =
    normalized.match(
      /^BEGIN\s*;\s*([\s\S]*?)\s*COMMIT\s*;\s*$/i,
    );

  if (!match) {
    throw new Error(
      `${filename} must contain exactly one top-level BEGIN; ... COMMIT; transaction wrapper.`,
    );
  }

  const body =
    match[1].trim();

  if (!body) {
    throw new Error(
      `${filename} contains no migration statements.`,
    );
  }

  return body;
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
    const fullPath =
      join(
        migrationsDirectory,
        filename,
      );

    const content =
      await readFile(
        fullPath,
        "utf8",
      );

    migrations.push({
      filename,
      checksum:
        createChecksum(
          content,
        ),
      body:
        extractMigrationBody(
          content,
          filename,
        ),
    });
  }

  return migrations;
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

async function getAppliedMigrations(
  client,
) {
  const result =
    await client.query(`
      SELECT
        filename,
        checksum,
        applied_at
      FROM schema_migrations
      ORDER BY filename
    `);

  return new Map(
    result.rows.map(
      (row) => [
        row.filename,
        row,
      ],
    ),
  );
}

function validateMigrationHistory(
  migrations,
  appliedMigrations,
) {
  const availableFilenames =
    new Set(
      migrations.map(
        (migration) =>
          migration.filename,
      ),
    );

  for (
    const [
      filename,
      applied,
    ]
    of appliedMigrations
  ) {
    if (
      !availableFilenames.has(
        filename,
      )
    ) {
      throw new Error(
        `Applied migration ${filename} no longer exists in db/migrations.`,
      );
    }

    const current =
      migrations.find(
        (migration) =>
          migration.filename ===
          filename,
      );

    if (
      current.checksum !==
      applied.checksum
    ) {
      throw new Error(
        [
          `Checksum mismatch for applied migration ${filename}.`,
          "An already-applied migration file has been modified.",
          "Create a new migration instead of editing migration history.",
        ].join(" "),
      );
    }
  }
}

async function applyMigration(
  client,
  migration,
) {
  console.log(
    `APPLY  ${migration.filename}`,
  );

  await client.query(
    "BEGIN",
  );

  try {
    await client.query(
      migration.body,
    );

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

    await client.query(
      "COMMIT",
    );
  } catch (error) {
    await client.query(
      "ROLLBACK",
    );

    throw error;
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

  await ensureMigrationTable(
    client,
  );

  const migrations =
    await loadMigrations();

  const appliedMigrations =
    await getAppliedMigrations(
      client,
    );

  validateMigrationHistory(
    migrations,
    appliedMigrations,
  );

  const pendingMigrations =
    migrations.filter(
      (migration) =>
        !appliedMigrations.has(
          migration.filename,
        ),
    );

  console.log("");
  console.log(
    "Database migrations",
  );
  console.log(
    "-------------------",
  );
  console.log(
    `Available: ${migrations.length}`,
  );
  console.log(
    `Applied:   ${appliedMigrations.size}`,
  );
  console.log(
    `Pending:   ${pendingMigrations.length}`,
  );
  console.log("");

  if (
    pendingMigrations.length === 0
  ) {
    console.log(
      "Database is up to date.",
    );
  } else {
    for (
      const migration
      of pendingMigrations
    ) {
      await applyMigration(
        client,
        migration,
      );
    }

    console.log("");
    console.log(
      `Applied ${pendingMigrations.length} migration(s).`,
    );
  }

  console.log("");
  console.log(
    "Migration PASSED.",
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