import fs from "node:fs/promises";
import path from "node:path";

import pg from "pg";

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const projectRoot = process.cwd();

async function readJson(relativePath) {
  const filePath = path.join(
    projectRoot,
    relativePath,
  );

  const source = await fs.readFile(
    filePath,
    "utf8",
  );

  return JSON.parse(source);
}

function requireObject(value, label) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      `${label} is missing or invalid.`,
    );
  }

  return value;
}

function requireString(value, label) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${label} is missing or invalid.`,
    );
  }

  return value.trim();
}

function requireStringArray(value, label) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some(
      (item) =>
        typeof item !== "string" ||
        !item.trim(),
    )
  ) {
    throw new Error(
      `${label} is missing or invalid.`,
    );
  }

  return value.map((item) =>
    item.trim(),
  );
}

function optionalString(value) {
  return typeof value === "string" &&
    value.trim()
    ? value.trim()
    : null;
}

const staticMetadata = [
  {
    id: "1",
    slug:
      "germaniyada-integratsiya-kurslari",
    contentType: "guide",
    verifiedAt: "2026-07-30",
    sourceName:
      "Bundesamt für Migration und Flüchtlinge — BAMF",
    sourceUrl:
      "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
  },
  {
    id: "2",
    slug:
      "bamf-navi-orqali-integratsiya-kursini-topish",
    contentType: "guide",
    verifiedAt: "2026-07-30",
    sourceName: "BAMF-NAvI",
    sourceUrl:
      "https://bamf-navi.bamf.de/de/Themen/Integrationskurse/",
  },
  {
    id: "3",
    slug:
      "germaniya-opportunity-card-ish-qidirish",
    contentType: "work_migration",
    verifiedAt: "2026-07-30",
    sourceName:
      "Make it in Germany — Germaniya federal hukumati",
    sourceUrl:
      "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card",
  },
  {
    id: "4",
    slug:
      "daad-stipendiyalar-bazasidan-foydalanish",
    contentType: "education",
    verifiedAt: "2026-07-30",
    sourceName:
      "Deutscher Akademischer Austauschdienst — DAAD",
    sourceUrl:
      "https://www.daad.de/en/studying-in-germany/scholarships/daad-funding-programmes/",
  },
  {
    id: "5",
    slug:
      "ozbekistonning-berlindagi-konsullik-xizmatlari",
    contentType: "consular",
    verifiedAt: "2026-07-30",
    sourceName:
      "O‘zbekiston Respublikasining Germaniyadagi elchixonasi",
    sourceUrl:
      "https://uzbekistan.de/frontend/web/page/1051?language=uz",
  },
  {
    id: "6",
    slug:
      "germaniyada-vaqtincha-konsullik-royxati",
    contentType: "official_info",
    verifiedAt: "2026-07-30",
    sourceName:
      "O‘zbekiston Respublikasining Germaniyadagi elchixonasi",
    sourceUrl:
      "https://uzbekistan.de/page/1071?language=uz",
  },
];

function buildArticle(
  metadata,
  uzMessages,
  deMessages,
) {
  const uzListItem = requireObject(
    uzMessages?.NewsPage?.items?.[
      metadata.id
    ],
    `messages/uz.json NewsPage.items.${metadata.id}`,
  );

  const deListItem = requireObject(
    deMessages?.NewsPage?.items?.[
      metadata.id
    ],
    `messages/de.json NewsPage.items.${metadata.id}`,
  );

  const uzDetailItem = requireObject(
    uzMessages?.NewsDetailPage?.items?.[
      metadata.id
    ],
    `messages/uz.json NewsDetailPage.items.${metadata.id}`,
  );

  const deDetailItem = requireObject(
    deMessages?.NewsDetailPage?.items?.[
      metadata.id
    ],
    `messages/de.json NewsDetailPage.items.${metadata.id}`,
  );

  return {
    slug: metadata.slug,

    titleUz: requireString(
      uzListItem.title,
      `UZ title ${metadata.id}`,
    ),

    titleDe: requireString(
      deListItem.title,
      `DE title ${metadata.id}`,
    ),

    excerptUz: requireString(
      uzListItem.excerpt,
      `UZ excerpt ${metadata.id}`,
    ),

    excerptDe: requireString(
      deListItem.excerpt,
      `DE excerpt ${metadata.id}`,
    ),

    contentUz: requireStringArray(
      uzDetailItem.content,
      `UZ content ${metadata.id}`,
    ),

    contentDe: requireStringArray(
      deDetailItem.content,
      `DE content ${metadata.id}`,
    ),

    categoryUz: requireString(
      uzListItem.category,
      `UZ category ${metadata.id}`,
    ),

    categoryDe: requireString(
      deListItem.category,
      `DE category ${metadata.id}`,
    ),

    contentType: metadata.contentType,

    readingTimeUz: requireString(
      uzListItem.readingTime,
      `UZ readingTime ${metadata.id}`,
    ),

    readingTimeDe: requireString(
      deListItem.readingTime,
      `DE readingTime ${metadata.id}`,
    ),

    sourceName: metadata.sourceName,
    sourceUrl: metadata.sourceUrl,

    sourceLanguageUz: requireString(
      uzListItem.sourceLanguage,
      `UZ sourceLanguage ${metadata.id}`,
    ),

    sourceLanguageDe: requireString(
      deListItem.sourceLanguage,
      `DE sourceLanguage ${metadata.id}`,
    ),

    locationUz: optionalString(
      uzListItem.location,
    ),

    locationDe: optionalString(
      deListItem.location,
    ),

    verifiedAt: metadata.verifiedAt,
  };
}

async function main() {
  const [uzMessages, deMessages] =
    await Promise.all([
      readJson("messages/uz.json"),
      readJson("messages/de.json"),
    ]);

  const articles = staticMetadata.map(
    (metadata) =>
      buildArticle(
        metadata,
        uzMessages,
        deMessages,
      ),
  );

  const pool = new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });

  const client = await pool.connect();

  let inserted = 0;
  let skipped = 0;

  try {
    await client.query("BEGIN");

    for (const article of articles) {
      const existing =
        await client.query(
          `
            SELECT id::text
            FROM news_articles
            WHERE LOWER(slug) = LOWER($1)
            LIMIT 1
          `,
          [article.slug],
        );

      if (existing.rowCount) {
        skipped += 1;

        console.log(
          `SKIP   ${article.slug} (already exists)`,
        );

        continue;
      }

      await client.query(
        `
          INSERT INTO news_articles (
            slug,
            title_uz,
            title_de,
            excerpt_uz,
            excerpt_de,
            content_uz,
            content_de,
            category_uz,
            category_de,
            content_type,
            reading_time_uz,
            reading_time_de,
            source_name,
            source_url,
            source_language_uz,
            source_language_de,
            location_uz,
            location_de,
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
            'published',
            FALSE
          )
        `,
        [
          article.slug,
          article.titleUz,
          article.titleDe,
          article.excerptUz,
          article.excerptDe,
          article.contentUz,
          article.contentDe,
          article.categoryUz,
          article.categoryDe,
          article.contentType,
          article.readingTimeUz,
          article.readingTimeDe,
          article.sourceName,
          article.sourceUrl,
          article.sourceLanguageUz,
          article.sourceLanguageDe,
          article.locationUz,
          article.locationDe,
          article.verifiedAt,
        ],
      );

      inserted += 1;

      console.log(
        `INSERT ${article.slug}`,
      );
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
    "Static News seed completed.",
  );
  console.log(
    `Inserted: ${inserted}`,
  );
  console.log(
    `Skipped:  ${skipped}`,
  );
}

main().catch((error) => {
  console.error(
    "Static News seed failed:",
    error,
  );

  process.exitCode = 1;
});