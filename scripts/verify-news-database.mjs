import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

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
    totalResult,
    statusResult,
    featuredResult,
    duplicateSlugResult,
    invalidStatusResult,
    invalidContentTypeResult,
    featuredUnpublishedResult,
    emptyRequiredTextResult,
    emptyContentResult,
    invalidSourceUrlResult,
  ] = await Promise.all([
    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM news_articles
    `),

    pool.query(`
      SELECT
        status,
        COUNT(*)::int AS count
      FROM news_articles
      GROUP BY status
      ORDER BY status
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM news_articles
      WHERE featured = TRUE
    `),

    pool.query(`
      SELECT
        slug,
        COUNT(*)::int AS count
      FROM news_articles
      GROUP BY slug
      HAVING COUNT(*) > 1
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status
      FROM news_articles
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
        content_type
      FROM news_articles
      WHERE content_type NOT IN (
        'official_info',
        'guide',
        'education',
        'work_migration',
        'consular'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status
      FROM news_articles
      WHERE
        featured = TRUE
        AND status <> 'published'
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM news_articles
      WHERE
        BTRIM(slug) = ''
        OR BTRIM(title_uz) = ''
        OR BTRIM(title_de) = ''
        OR BTRIM(excerpt_uz) = ''
        OR BTRIM(excerpt_de) = ''
        OR BTRIM(category_uz) = ''
        OR BTRIM(category_de) = ''
        OR BTRIM(reading_time_uz) = ''
        OR BTRIM(reading_time_de) = ''
        OR BTRIM(source_name) = ''
        OR BTRIM(source_url) = ''
        OR BTRIM(source_language_uz) = ''
        OR BTRIM(source_language_de) = ''
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM news_articles
      WHERE
        COALESCE(array_length(content_uz, 1), 0) = 0
        OR COALESCE(array_length(content_de, 1), 0) = 0
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        source_url
      FROM news_articles
      WHERE source_url !~* '^https?://'
    `),
  ]);

  const total =
    totalResult.rows[0]?.count ?? 0;

  const featured =
    featuredResult.rows[0]?.count ?? 0;

  console.log("");
  console.log(
    "News database verification",
  );
  console.log(
    "--------------------------",
  );
  console.log(
    `Total articles: ${total}`,
  );
  console.log(
    `Featured: ${featured}`,
  );

  console.log("");
  console.log(
    "Record status:",
  );

  for (const row of statusResult.rows) {
    console.log(
      `- ${row.status}: ${row.count}`,
    );
  }

  const errors = [];

  if (
    duplicateSlugResult.rows.length > 0
  ) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate slug group(s).`,
    );
  }

  if (
    invalidStatusResult.rows.length > 0
  ) {
    errors.push(
      `Found ${invalidStatusResult.rows.length} article(s) with unsupported status.`,
    );
  }

  if (
    invalidContentTypeResult.rows.length > 0
  ) {
    errors.push(
      `Found ${invalidContentTypeResult.rows.length} article(s) with unsupported content_type.`,
    );
  }

  if (
    featuredUnpublishedResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${featuredUnpublishedResult.rows.length} featured article(s) that are not published.`,
    );
  }

  if (featured > 1) {
    errors.push(
      `Found ${featured} featured articles; at most one is allowed.`,
    );
  }

  if (
    emptyRequiredTextResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${emptyRequiredTextResult.rows.length} article(s) with empty required fields.`,
    );
  }

  if (
    emptyContentResult.rows.length > 0
  ) {
    errors.push(
      `Found ${emptyContentResult.rows.length} article(s) with empty UZ or DE content arrays.`,
    );
  }

  if (
    invalidSourceUrlResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidSourceUrlResult.rows.length} article(s) with invalid source URL format.`,
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