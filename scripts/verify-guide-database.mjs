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
    idleTimeoutMillis: 5_000,
    connectionTimeoutMillis: 5_000,
  });

const client =
  await pool.connect();

const allowedCategories = [
  "coming-to-germany",
  "visas",
  "family",
  "invitation",
  "embassy-and-appointments",
  "documents",
  "language-and-certificates",
  "education",
  "work-and-career",
  "after-arrival",
  "recognition",
  "integration",
];

try {
  const [
    totalResult,
    statusResult,
    featuredResult,
    lifecycleViolationResult,
    duplicateLegacyIdResult,
    duplicateCategorySlugResult,
    duplicateGlobalSlugResult,
    invalidCategoryResult,
    missingRequiredTextResult,
    factsMismatchResult,
    stepsMismatchResult,
    faqMismatchResult,
    sectionKeyMismatchResult,
    invalidJsonShapeResult,
    danglingRelatedSlugResult,
  ] = await Promise.all([
    client.query(
      `
        SELECT
          COUNT(*)::int AS count
        FROM guide_articles
      `,
    ),

    client.query(
      `
        SELECT
          status,
          COUNT(*)::int AS count
        FROM guide_articles
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
        FROM guide_articles
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug,
          status,
          featured
        FROM guide_articles
        WHERE
          featured = TRUE
          AND status <> 'published'
      `,
    ),

    client.query(
      `
        SELECT
          legacy_id,
          COUNT(*)::int AS count
        FROM guide_articles
        GROUP BY legacy_id
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          category_slug,
          slug,
          COUNT(*)::int AS count
        FROM guide_articles
        GROUP BY
          category_slug,
          slug
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          slug,
          COUNT(*)::int AS count
        FROM guide_articles
        GROUP BY slug
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          category_slug <> ALL($1::text[])
      `,
      [allowedCategories],
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          BTRIM(title_uz) = ''
          OR BTRIM(title_de) = ''
          OR BTRIM(excerpt_uz) = ''
          OR BTRIM(excerpt_de) = ''
          OR BTRIM(intro_uz) = ''
          OR BTRIM(intro_de) = ''
          OR BTRIM(reading_time_uz) = ''
          OR BTRIM(reading_time_de) = ''
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          jsonb_array_length(facts_uz)
          <>
          jsonb_array_length(facts_de)
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          jsonb_array_length(steps_uz)
          <>
          jsonb_array_length(steps_de)
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          jsonb_array_length(faq_uz)
          <>
          jsonb_array_length(faq_de)
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          (
            SELECT
              COALESCE(
                array_agg(key ORDER BY key),
                ARRAY[]::text[]
              )
            FROM jsonb_object_keys(
              sections_uz
            ) AS key
          )
          <>
          (
            SELECT
              COALESCE(
                array_agg(key ORDER BY key),
                ARRAY[]::text[]
              )
            FROM jsonb_object_keys(
              sections_de
            ) AS key
          )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug,
          category_slug
        FROM guide_articles
        WHERE
          jsonb_typeof(facts_uz) <> 'array'
          OR jsonb_typeof(facts_de) <> 'array'
          OR jsonb_typeof(sections_uz) <> 'object'
          OR jsonb_typeof(sections_de) <> 'object'
          OR jsonb_typeof(steps_uz) <> 'array'
          OR jsonb_typeof(steps_de) <> 'array'
          OR jsonb_typeof(faq_uz) <> 'array'
          OR jsonb_typeof(faq_de) <> 'array'
          OR jsonb_typeof(sources) <> 'array'
      `,
    ),

    client.query(
      `
        SELECT DISTINCT
          current_article.id::text,
          current_article.slug,
          current_article.category_slug,
          related_slug
        FROM guide_articles AS current_article
        CROSS JOIN LATERAL
          UNNEST(
            current_article.related_article_slugs
          ) AS related_slug
        WHERE
          NOT EXISTS (
            SELECT 1
            FROM guide_articles AS related_article
            WHERE
              related_article.slug = related_slug
          )
        ORDER BY
          current_article.category_slug,
          current_article.slug,
          related_slug
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
    "Guide database verification",
  );
  console.log(
    "---------------------------",
  );
  console.log(
    `Total articles: ${total}`,
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
      `Found ${lifecycleViolationResult.rows.length} non-published article(s) with featured enabled.`,
    );
  }

  if (
    duplicateLegacyIdResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateLegacyIdResult.rows.length} duplicate legacy_id group(s).`,
    );
  }

  if (
    duplicateCategorySlugResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateCategorySlugResult.rows.length} duplicate category + slug group(s).`,
    );
  }

  if (
    duplicateGlobalSlugResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateGlobalSlugResult.rows.length} globally duplicated slug group(s). Related article lookup uses slug-only references, so Guide slugs must remain globally unique.`,
    );
  }

  if (
    invalidCategoryResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidCategoryResult.rows.length} article(s) with unsupported category slugs.`,
    );
  }

  if (
    missingRequiredTextResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${missingRequiredTextResult.rows.length} article(s) with empty required UZ/DE text fields.`,
    );
  }

  if (
    factsMismatchResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${factsMismatchResult.rows.length} article(s) with mismatched UZ/DE facts length.`,
    );
  }

  if (
    stepsMismatchResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${stepsMismatchResult.rows.length} article(s) with mismatched UZ/DE steps length.`,
    );
  }

  if (
    faqMismatchResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${faqMismatchResult.rows.length} article(s) with mismatched UZ/DE FAQ length.`,
    );
  }

  if (
    sectionKeyMismatchResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${sectionKeyMismatchResult.rows.length} article(s) whose UZ/DE sections use different keys.`,
    );
  }

  if (
    invalidJsonShapeResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidJsonShapeResult.rows.length} article(s) with invalid JSONB container types.`,
    );
  }

  if (
    danglingRelatedSlugResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${danglingRelatedSlugResult.rows.length} dangling related article slug reference(s).`,
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