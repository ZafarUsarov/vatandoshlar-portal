import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const {
  localizedServices,
} = await import(
  new URL(
    "../data/services.ts",
    import.meta.url,
  ),
);

if (
  !Array.isArray(
    localizedServices,
  )
) {
  throw new Error(
    "localizedServices could not be loaded from data/services.ts.",
  );
}

const pool =
  new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis: 5_000,
    connectionTimeoutMillis: 5_000,
  });

function localizeList(
  items,
  locale,
) {
  return items.map(
    (item) =>
      item[locale],
  );
}

async function serviceExists(
  client,
  slug,
) {
  const result =
    await client.query(
      `
        SELECT 1
        FROM services
        WHERE slug = $1
        LIMIT 1
      `,
      [slug],
    );

  return (
    result.rowCount ?? 0
  ) > 0;
}

async function hasFeaturedService(
  client,
) {
  const result =
    await client.query(
      `
        SELECT 1
        FROM services
        WHERE featured = TRUE
        LIMIT 1
      `,
    );

  return (
    result.rowCount ?? 0
  ) > 0;
}

async function insertService(
  client,
  service,
  featured,
) {
  await client.query(
    `
      INSERT INTO services (
        slug,
        title_uz,
        title_de,
        short_title_uz,
        short_title_de,
        description_uz,
        description_de,
        category,
        icon,
        services_uz,
        services_de,
        verification_steps_uz,
        verification_steps_de,
        important_notes_uz,
        important_notes_de,
        official_source_name,
        official_source_url,
        source_description_uz,
        source_description_de,
        location_uz,
        location_de,
        status,
        featured
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
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20,
        $21,
        'published',
        $22
      )
    `,
    [
      service.slug,
      service.title.uz,
      service.title.de,
      service.shortTitle.uz,
      service.shortTitle.de,
      service.description.uz,
      service.description.de,
      service.category,
      service.icon,

      localizeList(
        service.services,
        "uz",
      ),

      localizeList(
        service.services,
        "de",
      ),

      localizeList(
        service.verificationSteps,
        "uz",
      ),

      localizeList(
        service.verificationSteps,
        "de",
      ),

      localizeList(
        service.importantNotes,
        "uz",
      ),

      localizeList(
        service.importantNotes,
        "de",
      ),

      service.officialSourceName,
      service.officialSourceUrl,
      service.sourceDescription.uz,
      service.sourceDescription.de,
      service.location.uz,
      service.location.de,
      featured,
    ],
  );
}

let inserted = 0;
let skipped = 0;
let featuredAssigned = false;

const client =
  await pool.connect();

try {
  await client.query(
    "BEGIN",
  );

  let featuredAlreadyExists =
    await hasFeaturedService(
      client,
    );

  for (
    const service
    of localizedServices
  ) {
    const exists =
      await serviceExists(
        client,
        service.slug,
      );

    if (exists) {
      console.log(
        `SKIP   ${service.slug}`,
      );

      skipped += 1;
      continue;
    }

    const shouldBeFeatured =
      Boolean(
        service.featured,
      ) &&
      !featuredAlreadyExists;

    await insertService(
      client,
      service,
      shouldBeFeatured,
    );

    if (shouldBeFeatured) {
      featuredAlreadyExists =
        true;

      featuredAssigned =
        true;
    }

    console.log(
      `INSERT ${service.slug}${shouldBeFeatured ? " [featured]" : ""}`,
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
  "Static Services seed completed.",
);

console.log(
  `Inserted: ${inserted}`,
);

console.log(
  `Skipped:  ${skipped}`,
);

if (
  localizedServices.some(
    (service) =>
      service.featured,
  ) &&
  !featuredAssigned
) {
  console.log(
    "Featured: existing database featured service preserved.",
  );
}