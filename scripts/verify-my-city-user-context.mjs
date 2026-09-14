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

const email =
  `my-city-context-${Date.now()}@example.invalid`;

try {
  await client.query(
    "BEGIN",
  );

  const cityResult =
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
      LIMIT 1
    `);

  const city =
    cityResult.rows[0];

  if (!city?.id) {
    throw new Error(
      "No active canonical city available.",
    );
  }

  const userResult =
    await client.query(
      `
        INSERT INTO public_users (
          email,
          account_status
        )
        VALUES (
          $1,
          'active'
        )
        RETURNING id::text
      `,
      [
        email,
      ],
    );

  const userId =
    userResult.rows[0]?.id;

  if (!userId) {
    throw new Error(
      "Verification user creation failed.",
    );
  }

  await client.query(
    `
      INSERT INTO user_profiles (
        user_id,
        display_name,
        preferred_locale,
        home_location_id,
        residency_stage
      )
      VALUES (
        $1,
        'My City Verification',
        'uz',
        $2,
        'long_term_resident'
      )
    `,
    [
      userId,
      city.id,
    ],
  );

  for (
    const interestKey
    of [
      "career",
      "community",
    ]
  ) {
    await client.query(
      `
        INSERT INTO user_interests (
          user_id,
          interest_key
        )
        VALUES (
          $1,
          $2
        )
      `,
      [
        userId,
        interestKey,
      ],
    );
  }

  const contextResult =
    await client.query(
      `
        SELECT
          u.id::text,
          p.home_location_id::text,
          l.city_name,
          l.state_name,
          COUNT(i.interest_key)::int AS interest_count
        FROM public_users u
        LEFT JOIN user_profiles p
          ON p.user_id = u.id
        LEFT JOIN locations l
          ON l.id = p.home_location_id
          AND l.location_type = 'city'
          AND l.status = 'active'
        LEFT JOIN user_interests i
          ON i.user_id = u.id
        WHERE u.id = $1
        GROUP BY
          u.id,
          p.home_location_id,
          l.id
      `,
      [
        userId,
      ],
    );

  const context =
    contextResult.rows[0];

  if (
    context?.home_location_id !== city.id ||
    context?.city_name !== city.city_name ||
    context?.state_name !== city.state_name ||
    context?.interest_count !== 2
  ) {
    throw new Error(
      "My City-ready context verification failed.",
    );
  }

  const nullFallbackUser =
    await client.query(
      `
        INSERT INTO public_users (
          email,
          account_status
        )
        VALUES (
          $1,
          'active'
        )
        RETURNING id::text
      `,
      [
        `my-city-null-${Date.now()}@example.invalid`,
      ],
    );

  const nullUserId =
    nullFallbackUser.rows[0]?.id;

  if (!nullUserId) {
    throw new Error(
      "Null fallback verification user creation failed.",
    );
  }

  await client.query(
    `
      INSERT INTO user_profiles (
        user_id,
        preferred_locale,
        home_location_id
      )
      VALUES (
        $1,
        'de',
        NULL
      )
    `,
    [
      nullUserId,
    ],
  );

  const nullContextResult =
    await client.query(
      `
        SELECT
          p.home_location_id::text,
          l.id::text AS location_id
        FROM public_users u
        LEFT JOIN user_profiles p
          ON p.user_id = u.id
        LEFT JOIN locations l
          ON l.id = p.home_location_id
          AND l.location_type = 'city'
          AND l.status = 'active'
        WHERE u.id = $1
      `,
      [
        nullUserId,
      ],
    );

  const nullContext =
    nullContextResult.rows[0];

  if (
    nullContext?.home_location_id !== null ||
    nullContext?.location_id !== null
  ) {
    throw new Error(
      "NULL home_location fallback verification failed.",
    );
  }

  await client.query(
    "ROLLBACK",
  );

  console.log("");
  console.log(
    "My City-ready user context verification",
  );
  console.log(
    "---------------------------------------",
  );
  console.log(
    "Canonical home location join: PASS",
  );
  console.log(
    "Interest aggregation: PASS",
  );
  console.log(
    "NULL home location fallback: PASS",
  );
  console.log(
    "Transactional rollback: PASS",
  );
  console.log("");
  console.log(
    "Verification PASSED.",
  );
} catch (error) {
  try {
    await client.query(
      "ROLLBACK",
    );
  } catch {
    // Preserve the original error.
  }

  throw error;
} finally {
  client.release();
  await pool.end();
}
