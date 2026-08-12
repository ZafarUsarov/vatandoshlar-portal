import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const pool = new Pool({
  connectionString,
  max: 1,
  idleTimeoutMillis: 5_000,
  connectionTimeoutMillis: 5_000,
});

const allowedStatuses = new Set([
  "draft",
  "published",
  "archived",
]);

const allowedCategories = new Set([
  "students",
  "english",
  "minijob",
  "internship",
  "professionals",
  "safety",
]);

function fail(message) {
  throw new Error(`Verification FAILED: ${message}`);
}

try {
  const [
    summaryResult,
    invalidStatusResult,
    invalidCategoryResult,
    invalidFeaturedResult,
  ] = await Promise.all([
    pool.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'draft')::int AS draft,
        COUNT(*) FILTER (WHERE status = 'published')::int AS published,
        COUNT(*) FILTER (WHERE status = 'archived')::int AS archived,
        COUNT(*) FILTER (WHERE featured = TRUE)::int AS featured
      FROM job_guides
    `),

    pool.query(`
      SELECT DISTINCT status
      FROM job_guides
      WHERE status NOT IN (
        'draft',
        'published',
        'archived'
      )
    `),

    pool.query(`
      SELECT DISTINCT category
      FROM job_guides
      WHERE category NOT IN (
        'students',
        'english',
        'minijob',
        'internship',
        'professionals',
        'safety'
      )
    `),

    pool.query(`
      SELECT
        id::text,
        slug,
        status
      FROM job_guides
      WHERE
        featured = TRUE
        AND status <> 'published'
    `),
  ]);

  const summary = summaryResult.rows[0];

  if (!summary) {
    fail("database summary could not be read.");
  }

  if (invalidStatusResult.rows.length > 0) {
    const statuses = invalidStatusResult.rows
      .map((row) => row.status)
      .filter((status) => !allowedStatuses.has(status));

    fail(
      `invalid status value(s): ${statuses.join(", ")}`,
    );
  }

  if (invalidCategoryResult.rows.length > 0) {
    const categories = invalidCategoryResult.rows
      .map((row) => row.category)
      .filter(
        (category) => !allowedCategories.has(category),
      );

    fail(
      `invalid category value(s): ${categories.join(", ")}`,
    );
  }

  if (invalidFeaturedResult.rows.length > 0) {
    fail(
      "a featured Jobs guide is not published.",
    );
  }

  if (summary.featured > 1) {
    fail(
      `expected at most one featured guide, found ${summary.featured}.`,
    );
  }

  console.log("");
  console.log("Jobs database verification");
  console.log("--------------------------");
  console.log(`Total guides: ${summary.total}`);
  console.log(`draft: ${summary.draft}`);
  console.log(`published: ${summary.published}`);
  console.log(`archived: ${summary.archived}`);
  console.log(`featured: ${summary.featured}`);
  console.log("");
  console.log("Verification PASSED.");
} finally {
  await pool.end();
}