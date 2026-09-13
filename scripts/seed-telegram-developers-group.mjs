import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const group = {
  bundesland:
    "Deutschland",

  shortName:
    "IT",

  customNameUz:
    "Germaniyadagi Dasturchilar",

  customNameDe:
    "Usbekische Entwickler in Deutschland",

  customDescriptionUz:
    "Germaniyada yashayotgan yoki faoliyat yuritayotgan o‘zbek dasturchilar va IT sohasi vakillari uchun professional Telegram hamjamiyati.",

  customDescriptionDe:
    "Professionelle Telegram-Community für usbekische Entwickler und IT-Fachkräfte, die in Deutschland leben oder beruflich tätig sind.",

  href:
    "https://t.me/Germaniyadgi_Dasturchilar",

  buttonType:
    "group",

  groupStatus:
    "active",

  communityType:
    "professional",
};

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
  await client.query(
    "BEGIN",
  );

  const existing =
    await client.query(
      `
        SELECT
          id::text,
          short_name,
          href,
          status
        FROM telegram_groups
        WHERE
          short_name = $1
          OR href = $2
        LIMIT 1
      `,
      [
        group.shortName,
        group.href,
      ],
    );

  if (existing.rows[0]) {
    await client.query(
      "ROLLBACK",
    );

    console.log(
      `Telegram group already exists: ${existing.rows[0].short_name} (id=${existing.rows[0].id}, status=${existing.rows[0].status}). No changes made.`,
    );
  } else {
    const orderResult =
      await client.query(
        `
          SELECT
            COALESCE(
              MAX(sort_order),
              -1
            ) + 1 AS next_sort_order
          FROM telegram_groups
        `,
      );

    const sortOrder =
      Number(
        orderResult.rows[0]
          ?.next_sort_order ?? 0,
      );

    const result =
      await client.query(
        `
          INSERT INTO telegram_groups (
            bundesland,
            short_name,

            custom_name_uz,
            custom_name_de,

            custom_description_uz,
            custom_description_de,

            href,

            button_type,
            group_status,
            community_type,

            status,
            sort_order
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            'published',
            $11
          )
          RETURNING
            id::text,
            short_name,
            community_type,
            status,
            sort_order
        `,
        [
          group.bundesland,
          group.shortName,

          group.customNameUz,
          group.customNameDe,

          group.customDescriptionUz,
          group.customDescriptionDe,

          group.href,

          group.buttonType,
          group.groupStatus,
          group.communityType,

          sortOrder,
        ],
      );

    await client.query(
      "COMMIT",
    );

    const created =
      result.rows[0];

    console.log(
      `Created Telegram professional community: ${created.short_name} (id=${created.id}, type=${created.community_type}, status=${created.status}, sortOrder=${created.sort_order}).`,
    );
  }
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
