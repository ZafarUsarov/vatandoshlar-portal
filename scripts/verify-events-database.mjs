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
    invalidEventStatusResult,
    invalidOrganizerTypeResult,
    invalidRegistrationMethodResult,
    lifecycleViolationResult,
    duplicateSlugResult,
    descriptionMismatchResult,
    notesMismatchResult,
    invalidDateRangeResult,
    invalidTimeRangeResult,
    invalidRegistrationDeadlineResult,
    invalidScheduledRequirementsResult,
    invalidRegistrationDestinationResult,
    invalidCapacityResult,
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
        )::int AS featured,
        COUNT(*) FILTER (
          WHERE event_status = 'planning'
        )::int AS planning,
        COUNT(*) FILTER (
          WHERE event_status = 'scheduled'
        )::int AS scheduled,
        COUNT(*) FILTER (
          WHERE event_status = 'cancelled'
        )::int AS cancelled
      FROM events
    `),

    pool.query(`
      SELECT id::text, slug, status
      FROM events
      WHERE status NOT IN (
        'draft',
        'published',
        'archived'
      )
    `),

    pool.query(`
      SELECT id::text, slug, category
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
      SELECT id::text, slug, format
      FROM events
      WHERE format NOT IN (
        'offline',
        'online',
        'hybrid'
      )
    `),

    pool.query(`
      SELECT id::text, slug, registration_status
      FROM events
      WHERE registration_status NOT IN (
        'open',
        'not_required',
        'sold_out',
        'closed'
      )
    `),

    pool.query(`
      SELECT id::text, slug, event_status
      FROM events
      WHERE event_status NOT IN (
        'planning',
        'scheduled',
        'cancelled'
      )
    `),

    pool.query(`
      SELECT id::text, slug, organizer_type
      FROM events
      WHERE organizer_type NOT IN (
        'vatandoshlar',
        'external'
      )
    `),

    pool.query(`
      SELECT id::text, slug, registration_method
      FROM events
      WHERE registration_method NOT IN (
        'google_form',
        'telegram',
        'email',
        'phone',
        'external_url',
        'none'
      )
    `),

    pool.query(`
      SELECT id::text, slug, status, featured
      FROM events
      WHERE
        status <> 'published'
        AND featured = TRUE
    `),

    pool.query(`
      SELECT slug, COUNT(*)::int AS count
      FROM events
      GROUP BY slug
      HAVING COUNT(*) > 1
    `),

    pool.query(`
      SELECT id::text, slug
      FROM events
      WHERE
        cardinality(description_uz)
        <>
        cardinality(description_de)
    `),

    pool.query(`
      SELECT id::text, slug
      FROM events
      WHERE
        cardinality(important_notes_uz)
        <>
        cardinality(important_notes_de)
    `),

    pool.query(`
      SELECT id::text, slug, start_date, end_date
      FROM events
      WHERE
        end_date IS NOT NULL
        AND (
          start_date IS NULL
          OR end_date < start_date
        )
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
        registration_deadline IS NOT NULL
        AND (
          start_date IS NULL
          OR registration_deadline >
            COALESCE(end_date, start_date)
        )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        event_status,
        format,
        start_date,
        official_source_name,
        official_source_url,
        verified_at
      FROM events
      WHERE
        event_status = 'scheduled'
        AND (
          start_date IS NULL
          OR official_source_name IS NULL
          OR official_source_url IS NULL
          OR verified_at IS NULL
          OR (
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
        )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        registration_method,
        registration_url,
        registration_value,
        registration_required
      FROM events
      WHERE NOT (
        (
          registration_method = 'none'
          AND registration_url IS NULL
          AND registration_value IS NULL
          AND registration_required = FALSE
        )
        OR (
          registration_method IN (
            'google_form',
            'external_url'
          )
          AND registration_url IS NOT NULL
          AND registration_value IS NULL
        )
        OR (
          registration_method IN (
            'telegram',
            'email',
            'phone'
          )
          AND registration_value IS NOT NULL
          AND registration_url IS NULL
        )
      )
    `),

    pool.query(`
      SELECT id::text, slug, capacity
      FROM events
      WHERE
        capacity IS NOT NULL
        AND capacity <= 0
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
  console.log(
    `planning: ${summary.planning}`,
  );
  console.log(
    `scheduled: ${summary.scheduled}`,
  );
  console.log(
    `cancelled: ${summary.cancelled}`,
  );

  const checks = [
    [
      invalidStatusResult,
      "event(s) with unsupported CMS status.",
    ],
    [
      invalidCategoryResult,
      "event(s) with unsupported category.",
    ],
    [
      invalidFormatResult,
      "event(s) with unsupported format.",
    ],
    [
      invalidRegistrationStatusResult,
      "event(s) with unsupported registration status.",
    ],
    [
      invalidEventStatusResult,
      "event(s) with unsupported event status.",
    ],
    [
      invalidOrganizerTypeResult,
      "event(s) with unsupported organizer type.",
    ],
    [
      invalidRegistrationMethodResult,
      "event(s) with unsupported registration method.",
    ],
    [
      lifecycleViolationResult,
      "non-published event(s) with featured enabled.",
    ],
    [
      duplicateSlugResult,
      "duplicate event slug group(s).",
    ],
    [
      descriptionMismatchResult,
      "event(s) with mismatched UZ/DE description lists.",
    ],
    [
      notesMismatchResult,
      "event(s) with mismatched UZ/DE important note lists.",
    ],
    [
      invalidDateRangeResult,
      "event(s) with invalid date range.",
    ],
    [
      invalidTimeRangeResult,
      "one-day event(s) with invalid time range.",
    ],
    [
      invalidRegistrationDeadlineResult,
      "event(s) with invalid registration deadline.",
    ],
    [
      invalidScheduledRequirementsResult,
      "scheduled event(s) missing required confirmed-event data.",
    ],
    [
      invalidRegistrationDestinationResult,
      "event(s) with invalid registration destination data.",
    ],
    [
      invalidCapacityResult,
      "event(s) with invalid capacity.",
    ],
  ];

  const errors = [];

  for (const [result, message] of checks) {
    if (result.rows.length > 0) {
      errors.push(
        `Found ${result.rows.length} ${message}`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("");
    console.error(
      "Verification FAILED:",
    );

    for (const error of errors) {
      console.error(`- ${error}`);
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