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

function looksComposite(city) {
  return Boolean(
    city &&
    /[/|;]/.test(city),
  );
}

async function classifyRow(
  client,
  row,
) {
  const city =
    clean(row.city);

  const bundesland =
    clean(row.bundesland);

  if (
    !city &&
    !bundesland
  ) {
    return {
      classification:
        "insufficient-data",
      canonicalCandidates:
        [],
    };
  }

  if (
    looksComposite(city)
  ) {
    return {
      classification:
        "composite-city-manual-review",
      canonicalCandidates:
        [],
    };
  }

  if (city) {
    const cityCandidates =
      await client.query(
        `
          SELECT
            id::text,
            city_name,
            state_name,
            slug
          FROM locations
          WHERE
            status = 'active'
            AND location_type = 'city'
            AND LOWER(BTRIM(city_name)) =
                LOWER(BTRIM($1))
          ORDER BY id
        `,
        [
          city,
        ],
      );

    if (
      cityCandidates.rows.length > 0
    ) {
      if (bundesland) {
        const exact =
          cityCandidates.rows.filter(
            (candidate) =>
              candidate.state_name
                .trim()
                .toLocaleLowerCase("de-DE") ===
              bundesland
                .trim()
                .toLocaleLowerCase("de-DE"),
          );

        if (exact.length === 1) {
          return {
            classification:
              "exact-canonical-match",
            canonicalCandidates:
              exact,
          };
        }

        return {
          classification:
            "city-state-conflict",
          canonicalCandidates:
            cityCandidates.rows,
        };
      }

      return {
        classification:
          cityCandidates.rows.length === 1
            ? "city-only-manual-review"
            : "ambiguous-city-manual-review",
        canonicalCandidates:
          cityCandidates.rows,
      };
    }
  }

  return {
    classification:
      "canonical-city-missing-or-invalid",
    canonicalCandidates:
      [],
  };
}

async function auditTable(
  client,
  table,
  label,
) {
  const result =
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

  const summary =
    new Map();

  console.log("");
  console.log(label);
  console.log(
    "-".repeat(label.length),
  );

  for (
    const row
    of result.rows
  ) {
    const classification =
      await classifyRow(
        client,
        row,
      );

    summary.set(
      classification.classification,
      (
        summary.get(
          classification.classification,
        ) ?? 0
      ) + 1,
    );

    const candidates =
      classification.canonicalCandidates
        .map(
          (candidate) =>
            `${candidate.city_name}, ${candidate.state_name} [${candidate.slug}]`,
        )
        .join(" | ");

    console.log(
      [
        classification.classification.toUpperCase(),
        `id=${row.id}`,
        `slug=${row.slug}`,
        `city=${clean(row.city) ?? "-"}`,
        `bundesland=${clean(row.bundesland) ?? "-"}`,
        candidates
          ? `canonical=${candidates}`
          : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  console.log("");
  console.log("Summary");

  for (
    const [
      key,
      value,
    ]
    of [...summary.entries()].sort()
  ) {
    console.log(
      `${key}: ${value}`,
    );
  }

  return {
    total:
      result.rows.length,
    summary,
  };
}

const client =
  await pool.connect();

try {
  const specialists =
    await auditTable(
      client,
      "specialists",
      "Specialists reconciliation audit",
    );

  const events =
    await auditTable(
      client,
      "events",
      "Events reconciliation audit",
    );

  console.log("");
  console.log(
    "Correction policy",
  );
  console.log(
    "-----------------",
  );
  console.log(
    "exact-canonical-match: safe for existing backfill script.",
  );
  console.log(
    "composite-city-manual-review: do not auto-correct.",
  );
  console.log(
    "city-state-conflict: verify source record before changing legacy fields.",
  );
  console.log(
    "city-only-manual-review: do not infer Bundesland automatically.",
  );
  console.log(
    "insufficient-data: leave location_id NULL.",
  );
  console.log(
    "canonical-city-missing-or-invalid: investigate source before adding or correcting data.",
  );

  console.log("");
  console.log(
    `Total unresolved records audited: ${specialists.total + events.total}`,
  );
  console.log(
    "Audit PASSED. No database rows were changed.",
  );
} finally {
  client.release();
  await pool.end();
}
