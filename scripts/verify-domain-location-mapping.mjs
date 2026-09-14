import { Pool } from "pg";

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

async function verifySchema() {
  const columnsResult =
    await client.query(`
      SELECT
        table_name,
        column_name,
        is_nullable
      FROM information_schema.columns
      WHERE
        table_schema = 'public'
        AND table_name IN (
          'specialists',
          'events'
        )
        AND column_name = 'location_id'
      ORDER BY table_name
    `);

  const fkResult =
    await client.query(`
      SELECT
        conname
      FROM pg_constraint
      WHERE conname IN (
        'specialists_location_id_fkey',
        'events_location_id_fkey'
      )
      ORDER BY conname
    `);

  const indexResult =
    await client.query(`
      SELECT
        indexname
      FROM pg_indexes
      WHERE
        schemaname = 'public'
        AND indexname IN (
          'specialists_location_id_idx',
          'events_location_id_idx'
        )
      ORDER BY indexname
    `);

  const errors = [];

  if (
    columnsResult.rows.length !== 2
  ) {
    errors.push(
      "Expected nullable location_id on both specialists and events.",
    );
  }

  for (
    const row
    of columnsResult.rows
  ) {
    if (
      row.is_nullable !== "YES"
    ) {
      errors.push(
        `${row.table_name}.location_id must remain nullable.`,
      );
    }
  }

  if (
    fkResult.rows.length !== 2
  ) {
    errors.push(
      "Expected both location_id foreign keys.",
    );
  }

  if (
    indexResult.rows.length !== 2
  ) {
    errors.push(
      "Expected both location_id indexes.",
    );
  }

  return errors;
}

async function verifyTable({
  table,
  label,
}) {
  const countsResult =
    await client.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(location_id)::int AS mapped,
        COUNT(*) FILTER (
          WHERE location_id IS NULL
        )::int AS unmapped
      FROM ${table}
    `);

  const invalidTargetResult =
    await client.query(`
      SELECT
        d.id::text,
        d.slug,
        d.location_id::text
      FROM ${table} d
      LEFT JOIN locations l
        ON l.id = d.location_id
      WHERE
        d.location_id IS NOT NULL
        AND l.id IS NULL
      ORDER BY d.id
    `);

  const mismatchResult =
    await client.query(`
      SELECT
        d.id::text,
        d.slug,
        d.city,
        d.bundesland,
        d.location_id::text,
        l.location_type,
        l.city_name,
        l.state_name,
        l.slug AS location_slug
      FROM ${table} d
      JOIN locations l
        ON l.id = d.location_id
      WHERE
        d.location_id IS NOT NULL
        AND (
          (
            l.location_type = 'city'
            AND (
              d.city IS NULL
              OR BTRIM(d.city) = ''
              OR d.bundesland IS NULL
              OR BTRIM(d.bundesland) = ''
              OR LOWER(BTRIM(d.city)) <>
                 LOWER(BTRIM(l.city_name))
              OR LOWER(BTRIM(d.bundesland)) <>
                 LOWER(BTRIM(l.state_name))
            )
          )
          OR (
            l.location_type = 'state'
            AND (
              (
                d.city IS NOT NULL
                AND BTRIM(d.city) <> ''
              )
              OR d.bundesland IS NULL
              OR BTRIM(d.bundesland) = ''
              OR LOWER(BTRIM(d.bundesland)) <>
                 LOWER(BTRIM(l.state_name))
            )
          )
        )
      ORDER BY d.id
    `);

  const unmappedWithDataResult =
    await client.query(`
      SELECT
        id::text,
        slug,
        city,
        bundesland
      FROM ${table}
      WHERE
        location_id IS NULL
        AND (
          (
            city IS NOT NULL
            AND BTRIM(city) <> ''
          )
          OR (
            bundesland IS NOT NULL
            AND BTRIM(bundesland) <> ''
          )
        )
      ORDER BY id
    `);

  const counts =
    countsResult.rows[0];

  console.log("");
  console.log(label);
  console.log(
    "-".repeat(label.length),
  );
  console.log(
    `Total: ${counts?.total ?? 0}`,
  );
  console.log(
    `Mapped: ${counts?.mapped ?? 0}`,
  );
  console.log(
    `Unmapped: ${counts?.unmapped ?? 0}`,
  );
  console.log(
    `Unmapped with legacy location data: ${unmappedWithDataResult.rows.length}`,
  );

  for (
    const row
    of unmappedWithDataResult.rows
  ) {
    console.log(
      `UNMAPPED id=${row.id} slug=${row.slug} city=${row.city ?? "-"} bundesland=${row.bundesland ?? "-"}`,
    );
  }

  const errors = [];

  if (
    invalidTargetResult.rows.length > 0
  ) {
    errors.push(
      `${label}: found ${invalidTargetResult.rows.length} dangling location_id reference(s).`,
    );
  }

  if (
    mismatchResult.rows.length > 0
  ) {
    errors.push(
      `${label}: found ${mismatchResult.rows.length} mapped row(s) inconsistent with legacy city/bundesland values.`,
    );

    for (
      const row
      of mismatchResult.rows
    ) {
      console.error(
        `MISMATCH id=${row.id} slug=${row.slug} location=${row.location_slug}`,
      );
    }
  }

  return errors;
}

try {
  const errors = [
    ...(await verifySchema()),
    ...(await verifyTable({
      table:
        "specialists",
      label:
        "Specialists",
    })),
    ...(await verifyTable({
      table:
        "events",
      label:
        "Events",
    })),
  ];

  if (
    errors.length > 0
  ) {
    console.error("");

    for (
      const error
      of errors
    ) {
      console.error(
        `ERROR: ${error}`,
      );
    }

    throw new Error(
      "Domain location mapping verification failed.",
    );
  }

  console.log("");
  console.log(
    "Verification PASSED.",
  );
} finally {
  client.release();
  await pool.end();
}
