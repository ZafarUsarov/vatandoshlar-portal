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
      5_000,
    connectionTimeoutMillis:
      5_000,
  });

const client =
  await pool.connect();

try {
  const [
    totalResult,
    recordStatusResult,
    groupStatusResult,
    buttonTypeResult,
    activeWithoutHrefResult,
    duplicateShortNameResult,
    invalidShortNameResult,
    invalidRecordStatusResult,
    invalidGroupStatusResult,
    invalidButtonTypeResult,
    invalidSortOrderResult,
    customNamePairResult,
    customDescriptionPairResult,
    emptyBundeslandResult,
  ] = await Promise.all([
    client.query(
      `
        SELECT
          COUNT(*)::int AS count
        FROM telegram_groups
      `,
    ),

    client.query(
      `
        SELECT
          status,
          COUNT(*)::int AS count
        FROM telegram_groups
        GROUP BY status
        ORDER BY status
      `,
    ),

    client.query(
      `
        SELECT
          group_status,
          COUNT(*)::int AS count
        FROM telegram_groups
        GROUP BY group_status
        ORDER BY group_status
      `,
    ),

    client.query(
      `
        SELECT
          button_type,
          COUNT(*)::int AS count
        FROM telegram_groups
        GROUP BY button_type
        ORDER BY button_type
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          bundesland
        FROM telegram_groups
        WHERE
          group_status = 'active'
          AND (
            href IS NULL
            OR BTRIM(href) = ''
          )
      `,
    ),

    client.query(
      `
        SELECT
          short_name,
          COUNT(*)::int AS count
        FROM telegram_groups
        GROUP BY short_name
        HAVING COUNT(*) > 1
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          bundesland
        FROM telegram_groups
        WHERE
          BTRIM(short_name) = ''
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          status
        FROM telegram_groups
        WHERE
          status NOT IN (
            'draft',
            'published',
            'archived'
          )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          group_status
        FROM telegram_groups
        WHERE
          group_status NOT IN (
            'active',
            'coming-soon'
          )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          button_type
        FROM telegram_groups
        WHERE
          button_type NOT IN (
            'bot',
            'group'
          )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          sort_order
        FROM telegram_groups
        WHERE
          sort_order < 0
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          custom_name_uz,
          custom_name_de
        FROM telegram_groups
        WHERE
          (
            custom_name_uz IS NULL
            AND custom_name_de IS NOT NULL
          )
          OR (
            custom_name_uz IS NOT NULL
            AND custom_name_de IS NULL
          )
          OR (
            custom_name_uz IS NOT NULL
            AND BTRIM(custom_name_uz) = ''
          )
          OR (
            custom_name_de IS NOT NULL
            AND BTRIM(custom_name_de) = ''
          )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          custom_description_uz,
          custom_description_de
        FROM telegram_groups
        WHERE
          (
            custom_description_uz IS NULL
            AND custom_description_de IS NOT NULL
          )
          OR (
            custom_description_uz IS NOT NULL
            AND custom_description_de IS NULL
          )
          OR (
            custom_description_uz IS NOT NULL
            AND BTRIM(custom_description_uz) = ''
          )
          OR (
            custom_description_de IS NOT NULL
            AND BTRIM(custom_description_de) = ''
          )
      `,
    ),

    client.query(
      `
        SELECT
          id::text,
          short_name,
          bundesland
        FROM telegram_groups
        WHERE
          BTRIM(bundesland) = ''
      `,
    ),
  ]);

  const total =
    totalResult.rows[0]?.count ??
    0;

  console.log("");
  console.log(
    "Telegram database verification",
  );
  console.log(
    "------------------------------",
  );
  console.log(
    `Total groups: ${total}`,
  );

  console.log("");
  console.log(
    "Record status:",
  );

  for (
    const row
    of recordStatusResult.rows
  ) {
    console.log(
      `- ${row.status}: ${row.count}`,
    );
  }

  console.log("");
  console.log(
    "Group status:",
  );

  for (
    const row
    of groupStatusResult.rows
  ) {
    console.log(
      `- ${row.group_status}: ${row.count}`,
    );
  }

  console.log("");
  console.log(
    "Button type:",
  );

  for (
    const row
    of buttonTypeResult.rows
  ) {
    console.log(
      `- ${row.button_type}: ${row.count}`,
    );
  }

  const errors = [];

  if (
    activeWithoutHrefResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${activeWithoutHrefResult.rows.length} active group(s) without Telegram URL.`,
    );
  }

  if (
    duplicateShortNameResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${duplicateShortNameResult.rows.length} duplicate short_name group(s).`,
    );
  }

  if (
    invalidShortNameResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidShortNameResult.rows.length} group(s) with empty short_name.`,
    );
  }

  if (
    invalidRecordStatusResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidRecordStatusResult.rows.length} group(s) with unsupported record status.`,
    );
  }

  if (
    invalidGroupStatusResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidGroupStatusResult.rows.length} group(s) with unsupported group status.`,
    );
  }

  if (
    invalidButtonTypeResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidButtonTypeResult.rows.length} group(s) with unsupported button type.`,
    );
  }

  if (
    invalidSortOrderResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${invalidSortOrderResult.rows.length} group(s) with negative sort_order.`,
    );
  }

  if (
    customNamePairResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${customNamePairResult.rows.length} group(s) with invalid UZ/DE custom-name pairing.`,
    );
  }

  if (
    customDescriptionPairResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${customDescriptionPairResult.rows.length} group(s) with invalid UZ/DE custom-description pairing.`,
    );
  }

  if (
    emptyBundeslandResult.rows.length >
    0
  ) {
    errors.push(
      `Found ${emptyBundeslandResult.rows.length} group(s) with empty Bundesland.`,
    );
  }

  if (
    errors.length > 0
  ) {
    console.error("");
    console.error(
      "Verification FAILED:",
    );

    for (
      const error
      of errors
    ) {
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