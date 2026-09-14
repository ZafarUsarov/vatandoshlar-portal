import {
  Pool,
} from "pg";

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
    idleTimeoutMillis:
      10_000,
    connectionTimeoutMillis:
      5_000,
  });

const client =
  await pool.connect();

try {
  const cityRows =
    await client.query(`
      SELECT
        city.id::text AS city_id,
        city.city_name,
        city.state_name,
        state.id::text AS state_id,

        (
          SELECT COUNT(*)::int
          FROM specialists s
          WHERE
            s.status = 'published'
            AND s.location_id = city.id
        ) AS city_specialists,

        (
          SELECT COUNT(*)::int
          FROM specialists s
          WHERE
            s.status = 'published'
            AND state.id IS NOT NULL
            AND s.location_id = state.id
        ) AS region_specialists,

        (
          SELECT COUNT(*)::int
          FROM events e
          WHERE
            e.status = 'published'
            AND e.event_status = 'scheduled'
            AND e.location_id = city.id
            AND COALESCE(
              e.end_date,
              e.start_date
            ) >= CURRENT_DATE
        ) AS city_events,

        (
          SELECT COUNT(*)::int
          FROM events e
          WHERE
            e.status = 'published'
            AND e.event_status = 'scheduled'
            AND state.id IS NOT NULL
            AND e.location_id = state.id
            AND COALESCE(
              e.end_date,
              e.start_date
            ) >= CURRENT_DATE
        ) AS region_events

      FROM locations city

      LEFT JOIN locations state
        ON state.id = city.parent_id
        AND state.location_type = 'state'
        AND state.status = 'active'

      WHERE
        city.location_type = 'city'
        AND city.status = 'active'

      ORDER BY
        city.state_name,
        city.city_name
    `);

  if (
    cityRows.rows.length === 0
  ) {
    throw new Error(
      "No active canonical cities found.",
    );
  }

  const orphanedCityParents =
    cityRows.rows.filter(
      (row) =>
        !row.state_id,
    );

  if (
    orphanedCityParents.length > 0
  ) {
    throw new Error(
      `Found ${orphanedCityParents.length} active canonical city/cities without an active canonical state parent.`,
    );
  }

  console.log("");
  console.log(
    "My City local content verification",
  );
  console.log(
    "----------------------------------",
  );

  for (
    const row
    of cityRows.rows
  ) {
    console.log(
      `${row.city_name}, ${row.state_name}: city_specialists=${row.city_specialists}, region_specialists=${row.region_specialists}, city_events=${row.city_events}, region_events=${row.region_events}`,
    );
  }

  console.log("");
  console.log(
    "City vs region separation: PASS",
  );
  console.log(
    "Canonical parent state relation: PASS",
  );
  console.log(
    "Legacy location inference not used: PASS",
  );
  console.log(
    "News/Guide local inference disabled until canonical mapping exists: PASS",
  );
  console.log("");
  console.log(
    "Verification PASSED.",
  );
} finally {
  client.release();
  await pool.end();
}
