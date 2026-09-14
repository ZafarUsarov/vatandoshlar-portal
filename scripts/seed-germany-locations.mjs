import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const states = [
  ["DE-BW", "Baden-Württemberg", "baden-wuerttemberg"],
  ["DE-BY", "Bayern", "bayern"],
  ["DE-BE", "Berlin", "berlin"],
  ["DE-BB", "Brandenburg", "brandenburg"],
  ["DE-HB", "Bremen", "bremen"],
  ["DE-HH", "Hamburg", "hamburg"],
  ["DE-HE", "Hessen", "hessen"],
  ["DE-MV", "Mecklenburg-Vorpommern", "mecklenburg-vorpommern"],
  ["DE-NI", "Niedersachsen", "niedersachsen"],
  ["DE-NW", "Nordrhein-Westfalen", "nordrhein-westfalen"],
  ["DE-RP", "Rheinland-Pfalz", "rheinland-pfalz"],
  ["DE-SL", "Saarland", "saarland"],
  ["DE-SN", "Sachsen", "sachsen"],
  ["DE-ST", "Sachsen-Anhalt", "sachsen-anhalt"],
  ["DE-SH", "Schleswig-Holstein", "schleswig-holstein"],
  ["DE-TH", "Thüringen", "thueringen"],
];

const cities = [
  {
    stateCode:
      "DE-NW",
    cityName:
      "Essen",
    slug:
      "essen-nordrhein-westfalen",
  },
  {
    stateCode:
      "DE-NW",
    cityName:
      "Hamm",
    slug:
      "hamm-nordrhein-westfalen",
  },
  {
    stateCode:
      "DE-NW",
    cityName:
      "Beckum",
    slug:
      "beckum-nordrhein-westfalen",
  },
  {
    stateCode:
      "DE-NI",
    cityName:
      "Osnabrück",
    slug:
      "osnabrueck-niedersachsen",
  },
  {
    stateCode:
      "DE-SH",
    cityName:
      "Rendsburg",
    slug:
      "rendsburg-schleswig-holstein",
  },
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

let insertedStates = 0;
let skippedStates = 0;
let insertedCities = 0;
let skippedCities = 0;

try {
  await client.query(
    "BEGIN",
  );

  for (
    const [
      stateCode,
      stateName,
      slug,
    ]
    of states
  ) {
    const result =
      await client.query(
        `
          INSERT INTO locations (
            country_code,
            location_type,
            state_code,
            state_name,
            city_name,
            slug,
            parent_id,
            status
          )
          VALUES (
            'DE',
            'state',
            $1,
            $2,
            NULL,
            $3,
            NULL,
            'active'
          )
          ON CONFLICT (slug)
          DO NOTHING
          RETURNING id
        `,
        [
          stateCode,
          stateName,
          slug,
        ],
      );

    if (result.rowCount === 1) {
      insertedStates += 1;
    } else {
      skippedStates += 1;
    }
  }

  for (
    const city
    of cities
  ) {
    const parentResult =
      await client.query(
        `
          SELECT
            id,
            state_name
          FROM locations
          WHERE
            location_type = 'state'
            AND state_code = $1
            AND status = 'active'
          LIMIT 1
        `,
        [
          city.stateCode,
        ],
      );

    const parent =
      parentResult.rows[0];

    if (!parent) {
      throw new Error(
        `Missing active parent state for ${city.cityName}: ${city.stateCode}.`,
      );
    }

    const result =
      await client.query(
        `
          INSERT INTO locations (
            country_code,
            location_type,
            state_code,
            state_name,
            city_name,
            slug,
            parent_id,
            status
          )
          VALUES (
            'DE',
            'city',
            $1,
            $2,
            $3,
            $4,
            $5,
            'active'
          )
          ON CONFLICT (slug)
          DO NOTHING
          RETURNING id
        `,
        [
          city.stateCode,
          parent.state_name,
          city.cityName,
          city.slug,
          parent.id,
        ],
      );

    if (result.rowCount === 1) {
      insertedCities += 1;
    } else {
      skippedCities += 1;
    }
  }

  await client.query(
    "COMMIT",
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

console.log("");
console.log("Germany locations seed");
console.log("----------------------");
console.log(
  `States inserted: ${insertedStates}`,
);
console.log(
  `States skipped: ${skippedStates}`,
);
console.log(
  `Cities inserted: ${insertedCities}`,
);
console.log(
  `Cities skipped: ${skippedCities}`,
);
