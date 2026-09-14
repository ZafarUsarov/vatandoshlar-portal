import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const apply =
  process.argv.includes("--apply");

const pool =
  new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis:
      10_000,
    connectionTimeoutMillis:
      5_000,
  });

function clean(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed =
    value.trim();

  return trimmed.length > 0
    ? trimmed
    : null;
}

async function findMatch(
  client,
  city,
  bundesland,
) {
  const cleanCity =
    clean(city);

  const cleanBundesland =
    clean(bundesland);

  if (
    cleanCity &&
    cleanBundesland
  ) {
    const result =
      await client.query(
        `
          SELECT
            id::text,
            slug,
            location_type
          FROM locations
          WHERE
            status = 'active'
            AND location_type = 'city'
            AND LOWER(BTRIM(city_name)) =
                LOWER(BTRIM($1))
            AND LOWER(BTRIM(state_name)) =
                LOWER(BTRIM($2))
          ORDER BY id
        `,
        [
          cleanCity,
          cleanBundesland,
        ],
      );

    return {
      strategy:
        "city+state",
      rows:
        result.rows,
    };
  }

  if (
    !cleanCity &&
    cleanBundesland
  ) {
    const result =
      await client.query(
        `
          SELECT
            id::text,
            slug,
            location_type
          FROM locations
          WHERE
            status = 'active'
            AND location_type = 'state'
            AND LOWER(BTRIM(state_name)) =
                LOWER(BTRIM($1))
          ORDER BY id
        `,
        [
          cleanBundesland,
        ],
      );

    return {
      strategy:
        "state",
      rows:
        result.rows,
    };
  }

  return {
    strategy:
      "insufficient-data",
    rows:
      [],
  };
}

async function processTable(
  client,
  {
    table,
    label,
  },
) {
  const sourceResult =
    await client.query(
      `
        SELECT
          id::text,
          slug,
          city,
          bundesland
        FROM ${table}
        WHERE location_id IS NULL
        ORDER BY id
      `,
    );

  let matched = 0;
  let updated = 0;
  const unmatched = [];
  const ambiguous = [];

  for (
    const row
    of sourceResult.rows
  ) {
    const match =
      await findMatch(
        client,
        row.city,
        row.bundesland,
      );

    if (
      match.rows.length === 1
    ) {
      matched += 1;

      if (apply) {
        const updateResult =
          await client.query(
            `
              UPDATE ${table}
              SET location_id = $1
              WHERE
                id = $2
                AND location_id IS NULL
            `,
            [
              match.rows[0].id,
              row.id,
            ],
          );

        updated +=
          updateResult.rowCount ?? 0;
      }

      continue;
    }

    const reportRow = {
      id:
        row.id,
      slug:
        row.slug,
      city:
        clean(row.city),
      bundesland:
        clean(row.bundesland),
      strategy:
        match.strategy,
    };

    if (
      match.rows.length > 1
    ) {
      ambiguous.push({
        ...reportRow,
        candidates:
          match.rows.map(
            (candidate) =>
              candidate.slug,
          ),
      });
    } else {
      unmatched.push(
        reportRow,
      );
    }
  }

  console.log("");
  console.log(label);
  console.log(
    "-".repeat(label.length),
  );
  console.log(
    `Unmapped rows inspected: ${sourceResult.rows.length}`,
  );
  console.log(
    `Reliable matches: ${matched}`,
  );

  if (apply) {
    console.log(
      `Rows updated: ${updated}`,
    );
  }

  console.log(
    `Unmatched: ${unmatched.length}`,
  );
  console.log(
    `Ambiguous: ${ambiguous.length}`,
  );

  for (
    const row
    of unmatched
  ) {
    console.log(
      `UNMATCHED id=${row.id} slug=${row.slug} city=${row.city ?? "-"} bundesland=${row.bundesland ?? "-"} strategy=${row.strategy}`,
    );
  }

  for (
    const row
    of ambiguous
  ) {
    console.log(
      `AMBIGUOUS id=${row.id} slug=${row.slug} city=${row.city ?? "-"} bundesland=${row.bundesland ?? "-"} candidates=${row.candidates.join(",")}`,
    );
  }

  return {
    inspected:
      sourceResult.rows.length,
    matched,
    updated,
    unmatched:
      unmatched.length,
    ambiguous:
      ambiguous.length,
  };
}

const client =
  await pool.connect();

try {
  if (apply) {
    await client.query(
      "BEGIN",
    );
  }

  const specialists =
    await processTable(
      client,
      {
        table:
          "specialists",
        label:
          "Specialists location mapping",
      },
    );

  const events =
    await processTable(
      client,
      {
        table:
          "events",
        label:
          "Events location mapping",
      },
    );

  if (apply) {
    await client.query(
      "COMMIT",
    );
  }

  console.log("");
  console.log(
    apply
      ? "Backfill APPLY completed."
      : "Dry run completed. No database rows were changed.",
  );
  console.log(
    `Total reliable matches: ${specialists.matched + events.matched}`,
  );
  console.log(
    `Total unmatched: ${specialists.unmatched + events.unmatched}`,
  );
  console.log(
    `Total ambiguous: ${specialists.ambiguous + events.ambiguous}`,
  );
} catch (error) {
  if (apply) {
    try {
      await client.query(
        "ROLLBACK",
      );
    } catch {
      // Preserve the original error.
    }
  }

  throw error;
} finally {
  client.release();
  await pool.end();
}
