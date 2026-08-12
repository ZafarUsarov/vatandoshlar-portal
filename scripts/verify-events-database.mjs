import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 5_000,
  connectionTimeoutMillis: 5_000,
});

const client =
  await pool.connect();

try {
  const [
    totalResult,
    statusResult,
    featuredResult,
    lifecycleViolationResult,
    duplicateSlugResult,
    descriptionMismatchResult,
    notesMismatchResult,
    invalidDateRangeResult,
    invalidTimeRangeResult,
    invalidRegistrationDeadlineResult,
    invalidLocationResult,
  ] = await Promise.all([
    client.query(
      `
        SELECT
          COUNT(*)::int AS count
        FROM events
      `,
    ),

    client.query(
      `
        SELECT
          status,
          COUNT(*)::int AS count
        FROM events
        GROUP BY status
        ORDER BY status
      `,
    ),

    client.query(
      `
        SELECT
          COUNT(*) FILTER (
            WHERE featured = TRUE
          )::int AS featured
        FROM events
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          status,
          featured
        FROM events
        WHERE
          status <> 'published'
          AND featured = TRUE
      `,
    ),

    client.query(
      `
        SELECT
          slug,
          COUNT(*)::int AS count
        FROM events
        GROUP BY slug
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug
        FROM events
        WHERE
          cardinality(description_uz)
          <>
          cardinality(description_de)
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug
        FROM events
        WHERE
          cardinality(important_notes_uz)
          <>
          cardinality(important_notes_de)
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          start_date,
          end_date
        FROM events
        WHERE
          end_date IS NOT NULL
          AND end_date < start_date
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          start_date,
          end_date,
          start_time,
          end_time
        FROM events
        WHERE
          end_time IS NOT NULL
          AND start_time IS NOT NULL
          AND end_date IS NULL
          AND end_time < start_time
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          registration_deadline,
          start_date,
          end_date
        FROM events
        WHERE
          registration_deadline IS NOT NULL
          AND registration_deadline
              >
              COALESCE(
                end_date,
                start_date
              )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          format,
          city,
          bundesland,
          venue_name,
          address,
          online_url
        FROM events
        WHERE
          (
            format = 'online'
            AND online_url IS NULL
          )
          OR (
            format = 'offline'
            AND city IS NULL
            AND bundesland IS NULL
            AND venue_name IS NULL
            AND address IS NULL
          )
          OR (
            format = 'hybrid'
            AND (
              online_url IS NULL
              OR (
                city IS NULL
                AND bundesland IS NULL
                AND venue_name IS NULL
                AND address IS NULL
              )
            )
          )
      `,
    ),
  ]);

  const total =
    totalResult.rows[0]?.count ??
    0;

  const featured =
    featuredResult.rows[0]?.featured ??
    0;

  console.log("");
  console.log(
    "Events database verification",
  );
  console.log(
    "----------------------------",
  );
  console.log(
    `Total events: ${total}`,
  );

  for (
    const row
    of statusResult.rows
  ) {
    console.log(
      `${row.status}: ${row.count}`,
    );
  }

  console.log(
    `Featured: ${featured}`,
  );

  const errors = [];

  if (
    lifecycleViolationResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${lifecycleViolationResult.rows.length} non-published event(s) with featured enabled.`,
    );
  }

  if (
    duplicateSlugResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate event slug group(s).`,
    );
  }

  if (
    descriptionMismatchResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${descriptionMismatchResult.rows.length} event(s) with mismatched UZ/DE description lists.`,
    );
  }

  if (
    notesMismatchResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${notesMismatchResult.rows.length} event(s) with mismatched UZ/DE important note lists.`,
    );
  }

  if (
    invalidDateRangeResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidDateRangeResult.rows.length} event(s) with end_date before start_date.`,
    );
  }

  if (
    invalidTimeRangeResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidTimeRangeResult.rows.length} one-day event(s) with end_time before start_time.`,
    );
  }

  if (
    invalidRegistrationDeadlineResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidRegistrationDeadlineResult.rows.length} event(s) with registration deadline after the event end date.`,
    );
  }

  if (
    invalidLocationResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidLocationResult.rows.length} event(s) with format/location invariant violations.`,
    );
  }

  if (
    errors.length > 0
  ) {
    console.error("");
    console.error(
      "Verification FAILED:",
    );

    for (
      const error
      of errors
    ) {
      console.error(
        `- ${error}`,
      );
    }

    process.exitCode = 1;
  } else {
    console.log("");
    console.log(
      "Verification PASSED.",
    );
  }
} finally {
  client.release();
  await pool.end();
}