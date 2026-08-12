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
  max: 4,
  idleTimeoutMillis: 5_000,
  connectionTimeoutMillis: 5_000,
});

try {
  const [
    summaryResult,
    invalidStatusResult,
    invalidCategoryResult,
    invalidFormatResult,
    invalidRegistrationStatusResult,
    lifecycleViolationResult,
    duplicateSlugResult,
    descriptionMismatchResult,
    notesMismatchResult,
    invalidDateRangeResult,
    invalidTimeRangeResult,
    invalidRegistrationDeadlineResult,
    invalidLocationResult,
  ] = await Promise.all([
    pool.query(`
      SELECT
        COUNT(*)::int AS total,

        COUNT(*) FILTER (
          WHERE status = 'draft'
        )::int AS draft,

        COUNT(*) FILTER (
          WHERE status = 'published'
        )::int AS published,

        COUNT(*) FILTER (
          WHERE status = 'archived'
        )::int AS archived,

        COUNT(*) FILTER (
          WHERE featured = TRUE
        )::int AS featured
      FROM events
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status
      FROM events
      WHERE status NOT IN (
        'draft',
        'published',
        'archived'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        category
      FROM events
      WHERE category NOT IN (
        'culture',
        'education',
        'career',
        'business',
        'community',
        'sport',
        'children',
        'consular'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        format
      FROM events
      WHERE format NOT IN (
        'offline',
        'online',
        'hybrid'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        registration_status
      FROM events
      WHERE registration_status NOT IN (
        'open',
        'not_required',
        'sold_out',
        'closed'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status,
        featured
      FROM events
      WHERE
        status <> 'published'
        AND featured = TRUE
    `),

    pool.query(`
      SELECT
        slug,
        COUNT(*)::int AS count
      FROM events
      GROUP BY slug
      HAVING COUNT(*) > 1
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM events
      WHERE
        cardinality(
          description_uz
        )
        <>
        cardinality(
          description_de
        )
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM events
      WHERE
        cardinality(
          important_notes_uz
        )
        <>
        cardinality(
          important_notes_de
        )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        start_date,
        end_date
      FROM events
      WHERE
        end_date IS NOT NULL
        AND end_date < start_date
    `),

    pool.query(`
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
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        registration_deadline,
        start_date,
        end_date
      FROM events
      WHERE
        registration_deadline
          IS NOT NULL
        AND registration_deadline
          >
          COALESCE(
            end_date,
            start_date
          )
    `),

    pool.query(`
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
    `),
  ]);

  const summary =
    summaryResult.rows[0];

  if (!summary) {
    throw new Error(
      "Verification FAILED: database summary could not be read.",
    );
  }

  console.log("");
  console.log(
    "Events database verification",
  );
  console.log(
    "----------------------------",
  );

  console.log(
    `Total events: ${summary.total}`,
  );

  console.log(
    `draft: ${summary.draft}`,
  );

  console.log(
    `published: ${summary.published}`,
  );

  console.log(
    `archived: ${summary.archived}`,
  );

  console.log(
    `Featured: ${summary.featured}`,
  );

  const errors = [];

  if (
    invalidStatusResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidStatusResult.rows.length} event(s) with unsupported status.`,
    );
  }

  if (
    invalidCategoryResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidCategoryResult.rows.length} event(s) with unsupported category.`,
    );
  }

  if (
    invalidFormatResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidFormatResult.rows.length} event(s) with unsupported format.`,
    );
  }

  if (
    invalidRegistrationStatusResult
      .rows.length > 0
  ) {
    errors.push(
      `Found ${invalidRegistrationStatusResult.rows.length} event(s) with unsupported registration status.`,
    );
  }

  if (
    lifecycleViolationResult.rows
      .length > 0
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
    descriptionMismatchResult.rows
      .length > 0
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
    invalidRegistrationDeadlineResult
      .rows.length > 0
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

  if (errors.length > 0) {
    console.error("");
    console.error(
      "Verification FAILED:",
    );

    for (const error of errors) {
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
  await pool.end();
}