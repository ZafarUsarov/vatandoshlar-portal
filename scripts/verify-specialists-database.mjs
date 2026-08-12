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
    invalidLifecycleResult,
    duplicateCodeResult,
    duplicateSlugResult,
    invalidServicesResult,
    emptyCategoriesResult,
    invalidCategoriesResult,
    invalidLanguagesResult,
    emptyRequiredFieldsResult,
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
          WHERE verified = TRUE
        )::int AS verified,

        COUNT(*) FILTER (
          WHERE featured = TRUE
        )::int AS featured,

        COUNT(*) FILTER (
          WHERE premium = TRUE
        )::int AS premium,

        COUNT(*) FILTER (
          WHERE sponsored = TRUE
        )::int AS sponsored
      FROM specialists
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status,
        featured,
        premium,
        sponsored
      FROM specialists
      WHERE
        status <> 'published'
        AND (
          featured = TRUE
          OR premium = TRUE
          OR sponsored = TRUE
        )
    `),

    pool.query(`
      SELECT
        code,
        COUNT(*)::int AS count
      FROM specialists
      GROUP BY code
      HAVING COUNT(*) > 1
    `),

    pool.query(`
      SELECT
        slug,
        COUNT(*)::int AS count
      FROM specialists
      GROUP BY slug
      HAVING COUNT(*) > 1
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM specialists
      WHERE
        cardinality(
          services_uz
        )
        <>
        cardinality(
          services_de
        )
        OR cardinality(
          services_uz
        ) = 0
        OR cardinality(
          services_de
        ) = 0
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM specialists
      WHERE
        cardinality(
          categories
        ) = 0
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        categories
      FROM specialists
      WHERE EXISTS (
        SELECT 1
        FROM UNNEST(
          categories
        ) AS category
        WHERE category NOT IN (
          'medical',
          'legal',
          'technology',
          'automotive',
          'home',
          'education',
          'language-teaching',
          'academic-documents',
          'beauty',
          'finance',
          'creative'
        )
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        languages
      FROM specialists
      WHERE EXISTS (
        SELECT 1
        FROM UNNEST(
          languages
        ) AS language
        WHERE language NOT IN (
          'uz',
          'de',
          'ru',
          'en',
          'tr'
        )
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug
      FROM specialists
      WHERE
        BTRIM(code) = ''
        OR BTRIM(slug) = ''
        OR BTRIM(name) = ''
        OR BTRIM(
          profession_uz
        ) = ''
        OR BTRIM(
          profession_de
        ) = ''
        OR BTRIM(
          short_description_uz
        ) = ''
        OR BTRIM(
          short_description_de
        ) = ''
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
    "Specialists database verification",
  );
  console.log(
    "---------------------------------",
  );

  console.log(
    `Total specialists: ${summary.total}`,
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
    `Verified: ${summary.verified}`,
  );

  console.log(
    `Featured: ${summary.featured}`,
  );

  console.log(
    `Premium: ${summary.premium}`,
  );

  console.log(
    `Sponsored: ${summary.sponsored}`,
  );

  const errors = [];

  if (
    invalidLifecycleResult.rows
      .length > 0
  ) {
    errors.push(
      `Found ${invalidLifecycleResult.rows.length} non-published specialist(s) with featured/premium/sponsored enabled.`,
    );
  }

  if (
    duplicateCodeResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateCodeResult.rows.length} duplicate specialist code group(s).`,
    );
  }

  if (
    duplicateSlugResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate specialist slug group(s).`,
    );
  }

  if (
    invalidServicesResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidServicesResult.rows.length} specialist(s) with empty or mismatched UZ/DE service lists.`,
    );
  }

  if (
    emptyCategoriesResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${emptyCategoriesResult.rows.length} specialist(s) without a category.`,
    );
  }

  if (
    invalidCategoriesResult.rows
      .length > 0
  ) {
    errors.push(
      `Found ${invalidCategoriesResult.rows.length} specialist(s) with unsupported categories.`,
    );
  }

  if (
    invalidLanguagesResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidLanguagesResult.rows.length} specialist(s) with unsupported language values.`,
    );
  }

  if (
    emptyRequiredFieldsResult.rows
      .length > 0
  ) {
    errors.push(
      `Found ${emptyRequiredFieldsResult.rows.length} specialist(s) with empty required identity/content fields.`,
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