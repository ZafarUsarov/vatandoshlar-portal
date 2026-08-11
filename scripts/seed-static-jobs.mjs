import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const {
  localizedJobGuides,
} = await import(
  new URL(
    "../data/jobs.ts",
    import.meta.url,
  ),
);

if (
  !Array.isArray(
    localizedJobGuides,
  )
) {
  throw new Error(
    "localizedJobGuides could not be loaded from data/jobs.ts.",
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

async function guideExists(
  client,
  slug,
) {
  const result =
    await client.query(
      `
        SELECT 1
        FROM job_guides
        WHERE slug = $1
        LIMIT 1
      `,
      [slug],
    );

  return result.rowCount > 0;
}

async function hasFeaturedGuide(
  client,
) {
  const result =
    await client.query(
      `
        SELECT 1
        FROM job_guides
        WHERE featured = TRUE
        LIMIT 1
      `,
    );

  return result.rowCount > 0;
}

async function insertGuide(
  client,
  guide,
  featured,
) {
  await client.query(
    `
      INSERT INTO job_guides (
        slug,
        title_uz,
        title_de,
        short_title_uz,
        short_title_de,
        description_uz,
        description_de,
        category,
        icon,
        audience_uz,
        audience_de,
        highlights_uz,
        highlights_de,
        search_keywords,
        steps_uz,
        steps_de,
        important_notes_uz,
        important_notes_de,
        official_source_name,
        official_source_url,
        source_description_uz,
        source_description_de,
        verified_at,
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
        $22,
        $23,
        'published',
        $24
      )
    `,
    [
      guide.slug,
      guide.title.uz,
      guide.title.de,
      guide.shortTitle.uz,
      guide.shortTitle.de,
      guide.description.uz,
      guide.description.de,
      guide.category,
      guide.icon,
      guide.audience.uz,
      guide.audience.de,
      localizeList(
        guide.highlights,
        "uz",
      ),
      localizeList(
        guide.highlights,
        "de",
      ),
      [...guide.searchKeywords],
      localizeList(
        guide.steps,
        "uz",
      ),
      localizeList(
        guide.steps,
        "de",
      ),
      localizeList(
        guide.importantNotes,
        "uz",
      ),
      localizeList(
        guide.importantNotes,
        "de",
      ),
      guide.officialSourceName,
      guide.officialSourceUrl,
      guide.sourceDescription.uz,
      guide.sourceDescription.de,
      guide.verifiedAt,
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
    await hasFeaturedGuide(
      client,
    );

  for (
    const guide
    of localizedJobGuides
  ) {
    const exists =
      await guideExists(
        client,
        guide.slug,
      );

    if (exists) {
      console.log(
        `SKIP   ${guide.slug}`,
      );

      skipped += 1;
      continue;
    }

    const shouldBeFeatured =
      Boolean(
        guide.featured,
      ) &&
      !featuredAlreadyExists;

    await insertGuide(
      client,
      guide,
      shouldBeFeatured,
    );

    if (shouldBeFeatured) {
      featuredAlreadyExists =
        true;

      featuredAssigned =
        true;
    }

    console.log(
      `INSERT ${guide.slug}${shouldBeFeatured ? " [featured]" : ""}`,
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
  "Static Jobs seed completed.",
);
console.log(
  `Inserted: ${inserted}`,
);
console.log(
  `Skipped:  ${skipped}`,
);

if (
  localizedJobGuides.some(
    (guide) =>
      guide.featured,
  ) &&
  !featuredAssigned
) {
  console.log(
    "Featured: existing database featured guide preserved.",
  );
}