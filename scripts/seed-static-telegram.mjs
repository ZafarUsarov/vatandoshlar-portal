import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const telegramGroups = [
  {
    bundesland:
      "Nordrhein-Westfalen",
    shortName:
      "NRW",
    href:
      "https://t.me/NRW_Vatandoshlar_bot",
    groupStatus:
      "active",
    buttonType:
      "bot",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      "NRW vatandoshlari Telegram hamjamiyatiga qo‘shilish uchun rasmiy botdan foydalaning.",
    customDescriptionDe:
      "Nutzen Sie den offiziellen Bot, um der usbekischen Telegram-Community in Nordrhein-Westfalen beizutreten.",
  },

  {
    bundesland:
      "Baden-Württemberg",
    shortName:
      "BW",
    href:
      "https://t.me/baden_wurttemberg_vatandoshlar",
    groupStatus:
      "active",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Schleswig-Holstein",
    shortName:
      "SH",
    href:
      "https://t.me/SH_Vatandoshlar",
    groupStatus:
      "active",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Berlin",
    shortName:
      "BE",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Bayern",
    shortName:
      "BY",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Brandenburg",
    shortName:
      "BB",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Bremen",
    shortName:
      "HB",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Hamburg",
    shortName:
      "HH",
    href:
      "https://t.me/+1qwEUmNLr-NiMTRi",
    groupStatus:
      "active",
    buttonType:
      "group",
    customNameUz:
      "Hamburgdagi O‘zbeklar",
    customNameDe:
      "Usbeken in Hamburg",
    customDescriptionUz:
      "Hamburg va atrofida yashayotgan o‘zbekistonliklar uchun Telegram hamjamiyati.",
    customDescriptionDe:
      "Telegram-Community für Usbeken, die in Hamburg und Umgebung leben.",
  },

  {
    bundesland:
      "Hessen",
    shortName:
      "HE",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Mecklenburg-Vorpommern",
    shortName:
      "MV",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Niedersachsen",
    shortName:
      "NI",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Rheinland-Pfalz",
    shortName:
      "RP",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Saarland",
    shortName:
      "SL",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Sachsen",
    shortName:
      "SN",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Sachsen-Anhalt",
    shortName:
      "ST",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
  },

  {
    bundesland:
      "Thüringen",
    shortName:
      "TH",
    href:
      null,
    groupStatus:
      "coming-soon",
    buttonType:
      "group",
    customNameUz:
      null,
    customNameDe:
      null,
    customDescriptionUz:
      null,
    customDescriptionDe:
      null,
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

let inserted = 0;
let skipped = 0;

try {
  await client.query(
    "BEGIN",
  );

  for (
    const [
      index,
      group,
    ]
    of telegramGroups.entries()
  ) {
    const existing =
      await client.query(
        `
          SELECT
            id::text
          FROM telegram_groups
          WHERE short_name = $1
          LIMIT 1
        `,
        [
          group.shortName,
        ],
      );

    if (
      existing.rows[0]
    ) {
      console.log(
        `SKIP   ${group.shortName} ${group.bundesland}`,
      );

      skipped += 1;
      continue;
    }

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
          'published',
          $10
        )
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

        index,
      ],
    );

    console.log(
      `INSERT ${group.shortName} ${group.bundesland} [${group.groupStatus}]`,
    );

    inserted += 1;
  }

  await client.query(
    "COMMIT",
  );
} catch (error) {
  await client.query(
    "ROLLBACK",
  );

  throw error;
} finally {
  client.release();
  await pool.end();
}

console.log("");
console.log(
  "Static Telegram seed completed.",
);

console.log(
  `Source groups: ${telegramGroups.length}`,
);

console.log(
  `Inserted: ${inserted}`,
);

console.log(
  `Skipped:  ${skipped}`,
);