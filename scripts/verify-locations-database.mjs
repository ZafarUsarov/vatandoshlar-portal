import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const requiredCitySlugs = [
  "essen-nordrhein-westfalen",
  "hamm-nordrhein-westfalen",
  "beckum-nordrhein-westfalen",
  "osnabrueck-niedersachsen",
  "rendsburg-schleswig-holstein",
];

const pool =
  new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis:
      10_000,
    connectionTimeoutMillis:
      5_000,
  });

const client =
  await pool.connect();

try {
  const countResult = await client.query(`
    SELECT
      COUNT(*)::int AS count
    FROM locations
  `);

  const stateCountResult = await client.query(`
    SELECT
      COUNT(*)::int AS count
    FROM locations
    WHERE location_type = 'state'
  `);

  const duplicateSlugResult = await client.query(`
    SELECT
      slug,
      COUNT(*)::int AS count
    FROM locations
    GROUP BY slug
    HAVING COUNT(*) > 1
  `);

  const duplicateStateCodeResult = await client.query(`
    SELECT
      state_code,
      COUNT(*)::int AS count
    FROM locations
    WHERE location_type = 'state'
    GROUP BY state_code
    HAVING COUNT(*) > 1
  `);

  const duplicateCityResult = await client.query(`
    SELECT
      state_code,
      LOWER(city_name) AS city_name,
      COUNT(*)::int AS count
    FROM locations
    WHERE location_type = 'city'
    GROUP BY
      state_code,
      LOWER(city_name)
    HAVING COUNT(*) > 1
  `);

  const invalidCityParentResult = await client.query(`
    SELECT
      c.id::text,
      c.slug
    FROM locations c
    LEFT JOIN locations p
      ON p.id = c.parent_id
    WHERE
      c.location_type = 'city'
      AND (
        p.id IS NULL
        OR p.location_type <> 'state'
      )
  `);

  const hierarchyMismatchResult = await client.query(`
    SELECT
      c.id::text,
      c.slug
    FROM locations c
    JOIN locations p
      ON p.id = c.parent_id
    WHERE
      c.location_type = 'city'
      AND (
        c.country_code <> p.country_code
        OR c.state_code <> p.state_code
        OR c.state_name <> p.state_name
      )
  `);

  const coordinatePairResult = await client.query(`
    SELECT
      id::text,
      slug
    FROM locations
    WHERE
      (
        latitude IS NULL
        AND longitude IS NOT NULL
      )
      OR (
        latitude IS NOT NULL
        AND longitude IS NULL
      )
  `);

  const requiredCityResult =
    await client.query(
      `
        SELECT
          slug
        FROM locations
        WHERE slug = ANY($1::text[])
      `,
      [
        requiredCitySlugs,
      ],
    );

  const errors = [];

  const stateCount =
    stateCountResult.rows[0]?.count ?? 0;

  if (stateCount !== 16) {
    errors.push(
      `Expected 16 German federal states, found ${stateCount}.`,
    );
  }

  if (duplicateSlugResult.rows.length > 0) {
    errors.push(
      `Found ${duplicateSlugResult.rows.length} duplicate location slug group(s).`,
    );
  }

  if (duplicateStateCodeResult.rows.length > 0) {
    errors.push(
      `Found ${duplicateStateCodeResult.rows.length} duplicate federal-state code group(s).`,
    );
  }

  if (duplicateCityResult.rows.length > 0) {
    errors.push(
      `Found ${duplicateCityResult.rows.length} duplicate city/state group(s).`,
    );
  }

  if (invalidCityParentResult.rows.length > 0) {
    errors.push(
      `Found ${invalidCityParentResult.rows.length} city record(s) without a valid state parent.`,
    );
  }

  if (hierarchyMismatchResult.rows.length > 0) {
    errors.push(
      `Found ${hierarchyMismatchResult.rows.length} city record(s) whose state data does not match the parent.`,
    );
  }

  if (coordinatePairResult.rows.length > 0) {
    errors.push(
      `Found ${coordinatePairResult.rows.length} location(s) with incomplete coordinates.`,
    );
  }

  const requiredCities =
    new Set(
      requiredCityResult.rows.map(
        (row) =>
          row.slug,
      ),
    );

  for (
    const slug
    of requiredCitySlugs
  ) {
    if (!requiredCities.has(slug)) {
      errors.push(
        `Missing required canonical city: ${slug}.`,
      );
    }
  }

  console.log("");
  console.log(
    "Locations database verification",
  );
  console.log(
    "-------------------------------",
  );
  console.log(
    `Total locations: ${countResult.rows[0]?.count ?? 0}`,
  );
  console.log(
    `Federal states: ${stateCount}`,
  );
  console.log(
    `Required cities found: ${requiredCities.size}/${requiredCitySlugs.length}`,
  );

  if (errors.length > 0) {
    console.error("");

    for (
      const error
      of errors
    ) {
      console.error(
        `ERROR: ${error}`,
      );
    }

    throw new Error(
      "Locations database verification failed.",
    );
  }

  console.log("");
  console.log(
    "Verification PASSED.",
  );
} finally {
  client.release();
  await pool.end();
}
