import { getDb } from "@/lib/db";

export type AdminNewsStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminNewsContentType =
  | "official_info"
  | "guide"
  | "education"
  | "work_migration"
  | "consular";

export type AdminNewsArticleSummary = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  status: AdminNewsStatus;
  featured: boolean;
  verifiedAt: string;
  updatedAt: string;
};

export type AdminNewsArticle = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  excerptUz: string;
  excerptDe: string;
  contentUz: string[];
  contentDe: string[];
  categoryUz: string;
  categoryDe: string;
  contentType: AdminNewsContentType;
  readingTimeUz: string;
  readingTimeDe: string;
  sourceName: string;
  sourceUrl: string;
  sourceLanguageUz: string;
  sourceLanguageDe: string;
  locationUz: string | null;
  locationDe: string | null;
  verifiedAt: string;
  status: AdminNewsStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminNewsArticleInput = {
  slug: string;
  titleUz: string;
  titleDe: string;
  excerptUz: string;
  excerptDe: string;
  contentUz: string[];
  contentDe: string[];
  categoryUz: string;
  categoryDe: string;
  contentType: AdminNewsContentType;
  readingTimeUz: string;
  readingTimeDe: string;
  sourceName: string;
  sourceUrl: string;
  sourceLanguageUz: string;
  sourceLanguageDe: string;
  locationUz?: string;
  locationDe?: string;
  verifiedAt: string;
};

export type CreateAdminNewsArticleInput =
  AdminNewsArticleInput;

type AdminNewsArticleSummaryRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  status: string;
  featured: boolean;
  verified_at: string | Date;
  updated_at: string | Date;
};

type AdminNewsArticleRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  excerpt_uz: string;
  excerpt_de: string;
  content_uz: string[];
  content_de: string[];
  category_uz: string;
  category_de: string;
  content_type: string;
  reading_time_uz: string;
  reading_time_de: string;
  source_name: string;
  source_url: string;
  source_language_uz: string;
  source_language_de: string;
  location_uz: string | null;
  location_de: string | null;
  verified_at: string | Date;
  status: string;
  featured: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

function normalizeStatus(
  status: string,
): AdminNewsStatus {
  if (
    status === "published" ||
    status === "archived"
  ) {
    return status;
  }

  return "draft";
}

function normalizeContentType(
  contentType: string,
): AdminNewsContentType {
  if (
    contentType === "guide" ||
    contentType === "education" ||
    contentType === "work_migration" ||
    contentType === "consular"
  ) {
    return contentType;
  }

  return "official_info";
}

function toDateTimeString(
  value: string | Date,
): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function toDateOnlyString(
  value: string | Date,
): string {
  return toDateTimeString(value).slice(0, 10);
}

function toAdminNewsArticleSummary(
  row: AdminNewsArticleSummaryRow,
): AdminNewsArticleSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    status: normalizeStatus(row.status),
    featured: row.featured,
    verifiedAt: toDateOnlyString(
      row.verified_at,
    ),
    updatedAt: toDateTimeString(
      row.updated_at,
    ),
  };
}

function toAdminNewsArticle(
  row: AdminNewsArticleRow,
): AdminNewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    excerptUz: row.excerpt_uz,
    excerptDe: row.excerpt_de,
    contentUz: row.content_uz,
    contentDe: row.content_de,
    categoryUz: row.category_uz,
    categoryDe: row.category_de,
    contentType: normalizeContentType(
      row.content_type,
    ),
    readingTimeUz: row.reading_time_uz,
    readingTimeDe: row.reading_time_de,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    sourceLanguageUz:
      row.source_language_uz,
    sourceLanguageDe:
      row.source_language_de,
    locationUz: row.location_uz,
    locationDe: row.location_de,
    verifiedAt: toDateOnlyString(
      row.verified_at,
    ),
    status: normalizeStatus(row.status),
    featured: row.featured,
    createdAt: toDateTimeString(
      row.created_at,
    ),
    updatedAt: toDateTimeString(
      row.updated_at,
    ),
  };
}

export async function getAdminNewsArticles(): Promise<
  AdminNewsArticleSummary[]
> {
  const result =
    await getDb().query<AdminNewsArticleSummaryRow>(
      `
        SELECT
          id::text,
          slug,
          title_uz,
          title_de,
          status,
          featured,
          verified_at,
          updated_at
        FROM news_articles
        ORDER BY
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toAdminNewsArticleSummary,
  );
}

export async function getAdminNewsArticleById(
  id: string,
): Promise<AdminNewsArticle | null> {
  const result =
    await getDb().query<AdminNewsArticleRow>(
      `
        SELECT
          id::text,
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
          featured,
          created_at,
          updated_at
        FROM news_articles
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row = result.rows[0];

  return row
    ? toAdminNewsArticle(row)
    : null;
}

export async function createAdminNewsArticle(
  input: CreateAdminNewsArticleInput,
): Promise<string> {
  const result = await getDb().query<{
    id: string;
  }>(
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
        'draft',
        FALSE
      )
      RETURNING id::text
    `,
    [
      input.slug,
      input.titleUz,
      input.titleDe,
      input.excerptUz,
      input.excerptDe,
      input.contentUz,
      input.contentDe,
      input.categoryUz,
      input.categoryDe,
      input.contentType,
      input.readingTimeUz,
      input.readingTimeDe,
      input.sourceName,
      input.sourceUrl,
      input.sourceLanguageUz,
      input.sourceLanguageDe,
      input.locationUz ?? null,
      input.locationDe ?? null,
      input.verifiedAt,
    ],
  );

  const row = result.rows[0];

  if (!row) {
    throw new Error(
      "News article was not created.",
    );
  }

  return row.id;
}

export async function updateAdminNewsArticle(
  id: string,
  input: AdminNewsArticleInput,
): Promise<boolean> {
  const result = await getDb().query(
    `
      UPDATE news_articles
      SET
        slug = $1,
        title_uz = $2,
        title_de = $3,
        excerpt_uz = $4,
        excerpt_de = $5,
        content_uz = $6,
        content_de = $7,
        category_uz = $8,
        category_de = $9,
        content_type = $10,
        reading_time_uz = $11,
        reading_time_de = $12,
        source_name = $13,
        source_url = $14,
        source_language_uz = $15,
        source_language_de = $16,
        location_uz = $17,
        location_de = $18,
        verified_at = $19,
        updated_at = NOW()
      WHERE id = $20
    `,
    [
      input.slug,
      input.titleUz,
      input.titleDe,
      input.excerptUz,
      input.excerptDe,
      input.contentUz,
      input.contentDe,
      input.categoryUz,
      input.categoryDe,
      input.contentType,
      input.readingTimeUz,
      input.readingTimeDe,
      input.sourceName,
      input.sourceUrl,
      input.sourceLanguageUz,
      input.sourceLanguageDe,
      input.locationUz ?? null,
      input.locationDe ?? null,
      input.verifiedAt,
      id,
    ],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function updateAdminNewsArticleStatus(
  id: string,
  status: AdminNewsStatus,
): Promise<boolean> {
  const result = await getDb().query(
    `
      UPDATE news_articles
      SET
        status = $1,
        featured =
          CASE
            WHEN $1 = 'published'
              THEN featured
            ELSE FALSE
          END,
        updated_at = NOW()
      WHERE id = $2
    `,
    [status, id],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function setAdminNewsArticleFeatured(
  id: string,
  featured: boolean,
): Promise<
  "updated" | "not_found" | "not_published"
> {
  const client =
    await getDb().connect();

  try {
    await client.query("BEGIN");

    const targetResult =
      await client.query<{
        status: string;
      }>(
        `
          SELECT status
          FROM news_articles
          WHERE id = $1
          FOR UPDATE
        `,
        [id],
      );

    const target =
      targetResult.rows[0];

    if (!target) {
      await client.query("ROLLBACK");
      return "not_found";
    }

    if (
      featured &&
      target.status !== "published"
    ) {
      await client.query("ROLLBACK");
      return "not_published";
    }

    if (featured) {
      await client.query(
        `
          UPDATE news_articles
          SET
            featured = FALSE,
            updated_at = NOW()
          WHERE
            featured = TRUE
            AND id <> $1
        `,
        [id],
      );
    }

    await client.query(
      `
        UPDATE news_articles
        SET
          featured = $1,
          updated_at = NOW()
        WHERE id = $2
      `,
      [featured, id],
    );

    await client.query("COMMIT");

    return "updated";
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
