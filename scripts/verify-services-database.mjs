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
    invalidFeaturedResult,
    duplicateSlugResult,
    emptyRequiredFieldsResult,
    emptyServicesResult,
    emptyVerificationStepsResult,
    emptyImportantNotesResult,
    invalidSourceUrlResult,
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
      FROM services
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status
      FROM services
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
      FROM services
      WHERE category NOT IN (
        'translation',
        'legal',
        'tax',
        'medical',
        'craft',
        'consumer'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status
      FROM services
      WHERE
        featured = TRUE
        AND status <> 'published'
    `),

    pool.query(`
      SELECT
        slug,
        COUNT(*)::int AS count
      FROM services
      GROUP BY slug
      HAVING COUNT(*) > 1
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM services
      WHERE
        BTRIM(slug) = ''
        OR BTRIM(title_uz) = ''
        OR BTRIM(title_de) = ''
        OR BTRIM(short_title_uz) = ''
        OR BTRIM(short_title_de) = ''
        OR BTRIM(description_uz) = ''
        OR BTRIM(description_de) = ''
        OR BTRIM(icon) = ''
        OR BTRIM(official_source_name) = ''
        OR BTRIM(official_source_url) = ''
        OR BTRIM(source_description_uz) = ''
        OR BTRIM(source_description_de) = ''
        OR BTRIM(location_uz) = ''
        OR BTRIM(location_de) = ''
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM services
      WHERE
        COALESCE(
          array_length(services_uz, 1),
          0
        ) = 0
        OR COALESCE(
          array_length(services_de, 1),
          0
        ) = 0
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM services
      WHERE
        COALESCE(
          array_length(
            verification_steps_uz,
            1
          ),
          0
        ) = 0
        OR COALESCE(
          array_length(
            verification_steps_de,
            1
          ),
          0
        ) = 0
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM services
      WHERE
        COALESCE(
          array_length(
            important_notes_uz,
            1
          ),
          0
        ) = 0
        OR COALESCE(
          array_length(
            important_notes_de,
            1
          ),
          0
        ) = 0
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        official_source_url
      FROM services
      WHERE
        official_source_url !~* '^https?://'
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
    "Services database verification",
  );
  console.log(
    "------------------------------",
  );
  console.log(
    `Total services: ${summary.total}`,
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
    `featured: ${summary.featured}`,
  );

  const errors = [];

  if (
    invalidStatusResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidStatusResult.rows.length} service(s) with unsupported status.`,
    );
  }

  if (
    invalidCategoryResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidCategoryResult.rows.length} service(s) with unsupported category.`,
    );
  }

  if (
    invalidFeaturedResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidFeaturedResult.rows.length} featured service(s) that are not published.`,
    );
  }

  if (summary.featured > 1) {
    errors.push(
      `Found ${summary.featured} featured services; at most one is allowed.`,
    );
  }

  if (
    duplicateSlugResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate slug group(s).`,
    );
  }

  if (
    emptyRequiredFieldsResult.rows
      .length > 0
  ) {
    errors.push(
      `Found ${emptyRequiredFieldsResult.rows.length} service(s) with empty required fields.`,
    );
  }

  if (
    emptyServicesResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${emptyServicesResult.rows.length} service(s) with empty UZ or DE services arrays.`,
    );
  }

  if (
    emptyVerificationStepsResult.rows
      .length > 0
  ) {
    errors.push(
      `Found ${emptyVerificationStepsResult.rows.length} service(s) with empty UZ or DE verification steps.`,
    );
  }

  if (
    emptyImportantNotesResult.rows
      .length > 0
  ) {
    errors.push(
      `Found ${emptyImportantNotesResult.rows.length} service(s) with empty UZ or DE important notes.`,
    );
  }

  if (
    invalidSourceUrlResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidSourceUrlResult.rows.length} service(s) with invalid official source URL.`,
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