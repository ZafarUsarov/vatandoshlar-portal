import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const { specialists } = await import(
  new URL("../data/specialists.ts", import.meta.url)
);

if (!Array.isArray(specialists)) {
  throw new Error(
    "specialists could not be loaded from data/specialists.ts."
  );
}

if (specialists.length === 0) {
  throw new Error(
    "data/specialists.ts contains no specialist profiles. " +
      "Recovery seed stopped without changing the database."
  );
}

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 5_000,
  connectionTimeoutMillis: 5_000,
});

function localizeList(items, locale) {
  return items.map((item) => item[locale]);
}

function nullableString(value) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

async function findExistingSpecialist(client, specialist) {
  const result = await client.query(
    `
      SELECT
        id::text,
        code,
        slug
      FROM specialists
      WHERE
        code = $1
        OR slug = $2
      LIMIT 1
    `,
    [specialist.code, specialist.slug]
  );

  return result.rows[0] ?? null;
}

async function insertSpecialist(client, specialist) {
  const status = specialist.profilePublished
    ? "published"
    : "draft";

  const location = specialist.location ?? {};
  const contact = specialist.contact ?? {};

  await client.query(
    `
      INSERT INTO specialists (
        code,
        slug,
        name,
        profession_uz,
        profession_de,
        short_description_uz,
        short_description_de,
        categories,
        languages,
        services_uz,
        services_de,
        city,
        bundesland,
        postal_code,
        service_area_uz,
        service_area_de,
        email,
        phone,
        website,
        whatsapp,
        telegram,
        instagram,
        youtube,
        facebook,
        pricing_note_uz,
        pricing_note_de,
        avatar_url,
        years_of_experience,
        rating,
        review_count,
        status,
        verified,
        featured,
        premium,
        sponsored
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25,
        $26, $27, $28, $29, $30,
        $31, $32, $33, $34, $35
      )
    `,
    [
      specialist.code,
      specialist.slug,
      specialist.name,

      specialist.profession.uz,
      specialist.profession.de,

      specialist.shortDescription.uz,
      specialist.shortDescription.de,

      [...specialist.categories],
      [...specialist.languages],

      localizeList(specialist.services, "uz"),
      localizeList(specialist.services, "de"),

      nullableString(location.city),
      nullableString(location.bundesland),
      nullableString(location.postalCode),

      nullableString(specialist.serviceArea?.uz),
      nullableString(specialist.serviceArea?.de),

      nullableString(contact.email),
      nullableString(contact.phone),
      nullableString(contact.website),
      nullableString(contact.whatsapp),
      nullableString(contact.telegram),
      nullableString(contact.instagram),
      nullableString(contact.youtube),
      nullableString(contact.facebook),

      nullableString(specialist.pricingNote?.uz),
      nullableString(specialist.pricingNote?.de),

      nullableString(specialist.avatarUrl),

      specialist.yearsOfExperience ?? null,
      specialist.rating ?? null,
      specialist.reviewCount ?? null,

      status,

      Boolean(specialist.status?.verified),

      status === "published"
        ? Boolean(specialist.status?.featured)
        : false,

      status === "published"
        ? Boolean(specialist.status?.premium)
        : false,

      status === "published"
        ? Boolean(specialist.status?.sponsored)
        : false,
    ]
  );
}

let inserted = 0;
let skipped = 0;

const client = await pool.connect();

try {
  await client.query("BEGIN");

  for (const specialist of specialists) {
    const existing = await findExistingSpecialist(
      client,
      specialist
    );

    if (existing) {
      console.log(
        `SKIP   ${specialist.slug} (existing code/slug)`
      );

      skipped += 1;
      continue;
    }

    await insertSpecialist(client, specialist);

    console.log(
      `INSERT ${specialist.slug}${
        specialist.profilePublished
          ? " [published]"
          : " [draft]"
      }`
    );

    inserted += 1;
  }

  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");

  throw error;
} finally {
  client.release();
  await pool.end();
}

console.log("");
console.log(
  "Static Specialists recovery seed completed."
);
console.log(`Source profiles: ${specialists.length}`);
console.log(`Inserted: ${inserted}`);
console.log(`Skipped:  ${skipped}`);