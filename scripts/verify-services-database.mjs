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
  const statusResult = await client.query(
    `
      SELECT
        status,
        COUNT(*)::int AS count
      FROM services
      GROUP BY status
      ORDER BY status
    `,
  );

  const featuredResult = await client.query(
    `
      SELECT
        COUNT(*)::int AS count
      FROM services
      WHERE featured = TRUE
    `,
  );

  const invalidFeaturedResult = await client.query(
    `
      SELECT
        id::text,
        slug,
        status
      FROM services
      WHERE
        featured = TRUE
        AND status <> 'published'
    `,
  );

  const invalidParallelListsResult = await client.query(
    `
      SELECT
        id::text,
        slug
      FROM services
      WHERE
        cardinality(services_uz)
          <> cardinality(services_de)
        OR cardinality(verification_steps_uz)
          <> cardinality(verification_steps_de)
        OR cardinality(important_notes_uz)
          <> cardinality(important_notes_de)
    `,
  );

  const duplicateSlugResult = await client.query(
    `
      SELECT
        slug,
        COUNT(*)::int AS count
      FROM services
      GROUP BY slug
      HAVING COUNT(*) > 1
    `,
  );

  const emptyRequiredArrayResult = await client.query(
    `
      SELECT
        id::text,
        slug
      FROM services
      WHERE
        cardinality(services_uz) = 0
        OR cardinality(services_de) = 0
        OR cardinality(verification_steps_uz) = 0
        OR cardinality(verification_steps_de) = 0
        OR cardinality(important_notes_uz) = 0
        OR cardinality(important_notes_de) = 0
    `,
  );

  const totalResult = await client.query(
    `
      SELECT
        COUNT(*)::int AS count
      FROM services
    `,
  );

  const total = totalResult.rows[0]?.count ?? 0;

  const featuredCount =
    featuredResult.rows[0]?.count ?? 0;

  console.log("");
  console.log(
    "Services database verification",
  );
  console.log(
    "------------------------------",
  );
  console.log(
    `Total services: ${total}`,
  );

  for (const row of statusResult.rows) {
    console.log(
      `${row.status}: ${row.count}`,
    );
  }

  console.log(
    `Featured: ${featuredCount}`,
  );

  const errors = [];

  if (featuredCount > 1) {
    errors.push(
      `Expected at most one featured service, found ${featuredCount}.`,
    );
  }

  if (invalidFeaturedResult.rows.length > 0) {
    errors.push(
      "Featured service must always be published.",
    );
  }

  if (invalidParallelListsResult.rows.length > 0) {
    errors.push(
      `Found ${invalidParallelListsResult.rows.length} service(s) with mismatched UZ/DE list lengths.`,
    );
  }

  if (duplicateSlugResult.rows.length > 0) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate slug group(s).`,
    );
  }

  if (emptyRequiredArrayResult.rows.length > 0) {
    errors.push(
      `Found ${emptyRequiredArrayResult.rows.length} service(s) with empty required lists.`,
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
  client.release();
  await pool.end();
}