import { getDb } from "@/lib/db";
import type {
  ContentType,
  NewsItem,
} from "@/types/news";

export type PublicNewsLocale =
  | "uz"
  | "de";

type PublishedNewsRow = {
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
  featured: boolean;
};

const contentTypeLabels = {
  official_info: {
    uz: "Rasmiy ma’lumot",
    de: "Offizielle Information",
  },
  guide: {
    uz: "Foydali qo‘llanma",
    de: "Praktischer Ratgeber",
  },
  education: {
    uz: "Ta’lim",
    de: "Bildung",
  },
  work_migration: {
    uz: "Ish va migratsiya",
    de: "Arbeit und Migration",
  },
  consular: {
    uz: "Konsullik",
    de: "Konsularisches",
  },
} as const;

function getLocalizedContentType(
  contentType: string,
  locale: PublicNewsLocale,
): ContentType {
  const key =
    contentType in contentTypeLabels
      ? (contentType as keyof typeof contentTypeLabels)
      : "official_info";

  return contentTypeLabels[key][
    locale
  ] as ContentType;
}

function toDateOnlyString(
  value: string | Date,
): string {
  const date =
    value instanceof Date
      ? value.toISOString()
      : value;

  return date.slice(0, 10);
}

function toPublicNewsItem(
  row: PublishedNewsRow,
  locale: PublicNewsLocale,
): NewsItem {
  const databaseId =
    Number.parseInt(
      row.id,
      10,
    );

  return {
    id:
      Number.isSafeInteger(
        databaseId,
      )
        ? databaseId
        : 0,
    slug: row.slug,
    title:
      locale === "de"
        ? row.title_de
        : row.title_uz,
    excerpt:
      locale === "de"
        ? row.excerpt_de
        : row.excerpt_uz,
    content:
      locale === "de"
        ? row.content_de
        : row.content_uz,
    category:
      locale === "de"
        ? row.category_de
        : row.category_uz,
    contentType:
      getLocalizedContentType(
        row.content_type,
        locale,
      ),
    readingTime:
      locale === "de"
        ? row.reading_time_de
        : row.reading_time_uz,
    verifiedAt:
      toDateOnlyString(
        row.verified_at,
      ),
    sourceName:
      row.source_name,
    sourceUrl:
      row.source_url,
    sourceLanguage:
      locale === "de"
        ? row.source_language_de
        : row.source_language_uz,
    location:
      locale === "de"
        ? row.location_de ??
          undefined
        : row.location_uz ??
          undefined,
    featured: row.featured,
  };
}

function hasDatabaseConfiguration(): boolean {
  return Boolean(
    process.env.DATABASE_URL,
  );
}

async function queryPublishedNews(
  whereClause = "",
  values: unknown[] = [],
): Promise<PublishedNewsRow[]> {
  if (
    !hasDatabaseConfiguration()
  ) {
    return [];
  }

  try {
    const result =
      await getDb().query<PublishedNewsRow>(
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
            featured
          FROM news_articles
          WHERE
            status = 'published'
            ${whereClause}
          ORDER BY
            featured DESC,
            verified_at DESC,
            updated_at DESC,
            id DESC
        `,
        values,
      );

    return result.rows;
  } catch (error) {
    console.error(
      "Failed to load published news from database:",
      error,
    );

    return [];
  }
}

export async function getPublishedNews(
  locale: PublicNewsLocale,
): Promise<NewsItem[]> {
  const rows =
    await queryPublishedNews();

  return rows.map(
    (row) =>
      toPublicNewsItem(
        row,
        locale,
      ),
  );
}

export async function getPublishedNewsBySlug(
  slug: string,
  locale: PublicNewsLocale,
): Promise<NewsItem | null> {
  const rows =
    await queryPublishedNews(
      "AND slug = $1",
      [slug],
    );

  const row = rows[0];

  return row
    ? toPublicNewsItem(
        row,
        locale,
      )
    : null;
}

export async function getFeaturedPublishedNews(
  locale: PublicNewsLocale,
): Promise<NewsItem | null> {
  const rows =
    await queryPublishedNews(
      "AND featured = TRUE",
    );

  const row = rows[0];

  return row
    ? toPublicNewsItem(
        row,
        locale,
      )
    : null;
}
