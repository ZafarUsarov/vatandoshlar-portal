import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

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

const client = await pool.connect();

try {
  const [
    totalResult,
    statusResult,
    flagResult,
    invalidLifecycleResult,
    duplicateCodeResult,
    duplicateSlugResult,
    invalidServicesResult,
    emptyCategoriesResult,
  ] = await Promise.all([
    client.query(
      `
        SELECT
          COUNT(*)::int AS count
        FROM specialists
      `,
    ),

    client.query(
      `
        SELECT
          status,
          COUNT(*)::int AS count
        FROM specialists
        GROUP BY status
        ORDER BY status
      `,
    ),

    client.query(
      `
        SELECT
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
      `,
    ),

    client.query(
      `
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
      `,
    ),

    client.query(
      `
        SELECT
          code,
          COUNT(*)::int AS count
        FROM specialists
        GROUP BY code
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          slug,
          COUNT(*)::int AS count
        FROM specialists
        GROUP BY slug
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug
        FROM specialists
        WHERE
          cardinality(services_uz)
          <>
          cardinality(services_de)
          OR cardinality(services_uz) = 0
          OR cardinality(services_de) = 0
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          slug
        FROM specialists
        WHERE
          cardinality(categories) = 0
      `,
    ),
  ]);

  const total =
    totalResult.rows[0]?.count ??
    0;

  const flags =
    flagResult.rows[0] ?? {
      verified: 0,
      featured: 0,
      premium: 0,
      sponsored: 0,
    };

  console.log("");
  console.log(
    "Specialists database verification",
  );

  console.log(
    "---------------------------------",
  );

  console.log(
    `Total specialists: ${total}`,
  );

  for (const row of statusResult.rows) {
    console.log(
      `${row.status}: ${row.count}`,
    );
  }

  console.log(
    `Verified: ${flags.verified}`,
  );

  console.log(
    `Featured: ${flags.featured}`,
  );

  console.log(
    `Premium: ${flags.premium}`,
  );

  console.log(
    `Sponsored: ${flags.sponsored}`,
  );

  const errors = [];

  if (
    invalidLifecycleResult.rows.length > 0
  ) {
    errors.push(
      `Found ${invalidLifecycleResult.rows.length} non-published specialist(s) with featured/premium/sponsored enabled.`,
    );
  }

  if (
    duplicateCodeResult.rows.length > 0
  ) {
    errors.push(
      `Found ${duplicateCodeResult.rows.length} duplicate specialist code group(s).`,
    );
  }

  if (
    duplicateSlugResult.rows.length > 0
  ) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate specialist slug group(s).`,
    );
  }

  if (
    invalidServicesResult.rows.length > 0
  ) {
    errors.push(
      `Found ${invalidServicesResult.rows.length} specialist(s) with empty or mismatched UZ/DE service lists.`,
    );
  }

  if (
    emptyCategoriesResult.rows.length > 0
  ) {
    errors.push(
      `Found ${emptyCategoriesResult.rows.length} specialist(s) without a category.`,
    );
  }

  if (
    errors.length > 0
  ) {
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
  client.release();
  await pool.end();
}