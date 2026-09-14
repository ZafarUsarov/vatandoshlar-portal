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
  const locationResult =
    await client.query(`
      SELECT
        id::text,
        city_name,
        state_name
      FROM locations
      WHERE
        location_type = 'city'
        AND status = 'active'
      ORDER BY id
    `);

  if (
    locationResult.rows.length === 0
  ) {
    throw new Error(
      "No active canonical cities are available.",
    );
  }

  const brokenSpecialistMappings =
    await client.query(`
      SELECT
        s.id::text,
        s.slug,
        s.location_id::text
      FROM specialists s
      LEFT JOIN locations l
        ON l.id = s.location_id
      WHERE
        s.status = 'published'
        AND s.location_id IS NOT NULL
        AND (
          l.id IS NULL
          OR l.status <> 'active'
        )
    `);

  const brokenEventMappings =
    await client.query(`
      SELECT
        e.id::text,
        e.slug,
        e.location_id::text
      FROM events e
      LEFT JOIN locations l
        ON l.id = e.location_id
      WHERE
        e.status = 'published'
        AND e.location_id IS NOT NULL
        AND (
          l.id IS NULL
          OR l.status <> 'active'
        )
    `);

  if (
    brokenSpecialistMappings.rows.length > 0
  ) {
    throw new Error(
      `Found ${brokenSpecialistMappings.rows.length} published specialist(s) with broken/inactive canonical locations.`,
    );
  }

  if (
    brokenEventMappings.rows.length > 0
  ) {
    throw new Error(
      `Found ${brokenEventMappings.rows.length} published event(s) with broken/inactive canonical locations.`,
    );
  }

  const nonCitySpecialistMappings =
    await client.query(`
      SELECT
        COUNT(*)::int AS count
      FROM specialists s
      JOIN locations l
        ON l.id = s.location_id
      WHERE
        s.status = 'published'
        AND l.status = 'active'
        AND l.location_type <> 'city'
    `);

  const nonCityEventMappings =
    await client.query(`
      SELECT
        COUNT(*)::int AS count
      FROM events e
      JOIN locations l
        ON l.id = e.location_id
      WHERE
        e.status = 'published'
        AND l.status = 'active'
        AND l.location_type <> 'city'
    `);

  const counts =
    await client.query(`
      SELECT
        l.city_name,
        l.state_name,

        (
          COUNT(
            DISTINCT s.id
          ) FILTER (
            WHERE s.status = 'published'
          )
        )::int AS specialists,

        (
          COUNT(
            DISTINCT e.id
          ) FILTER (
            WHERE
              e.status = 'published'
              AND e.event_status = 'scheduled'
              AND COALESCE(
                e.end_date,
                e.start_date
              ) >= CURRENT_DATE
          )
        )::int AS upcoming_events

      FROM locations l

      LEFT JOIN specialists s
        ON s.location_id = l.id

      LEFT JOIN events e
        ON e.location_id = l.id

      WHERE
        l.location_type = 'city'
        AND l.status = 'active'

      GROUP BY
        l.id,
        l.city_name,
        l.state_name

      ORDER BY
        l.state_name,
        l.city_name
    `);

  console.log("");
  console.log(
    "My City dashboard verification",
  );
  console.log(
    "------------------------------",
  );

  for (
    const row
    of counts.rows
  ) {
    console.log(
      `${row.city_name}, ${row.state_name}: specialists=${row.specialists}, upcoming_events=${row.upcoming_events}`,
    );
  }

  console.log("");
  console.log(
    `State/non-city specialist mappings excluded from city dashboard: ${nonCitySpecialistMappings.rows[0]?.count ?? 0}`,
  );
  console.log(
    `State/non-city event mappings excluded from city dashboard: ${nonCityEventMappings.rows[0]?.count ?? 0}`,
  );
  console.log("");
  console.log(
    "Canonical specialist mapping integrity: PASS",
  );
  console.log(
    "Canonical event mapping integrity: PASS",
  );
  console.log(
    "Legacy-only and non-city mappings excluded by design: PASS",
  );
  console.log("");
  console.log(
    "Verification PASSED.",
  );
} finally {
  client.release();
  await pool.end();
}