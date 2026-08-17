import { cache } from "react";

import { getDb } from "@/lib/db";
import type {
  ContentType,
  NewsItem,
} from "@/types/news";

export type PublicNewsLocale =
  | "uz"
  | "de";

type PublishedNewsSummaryRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  excerpt_uz: string;
  excerpt_de: string;
  category_uz: string;
  category_de: string;
  content_type: string;
  reading_time_uz: string;
  reading_time_de: string;
  source_name_uz: string;
  source_name_de: string;
  source_url: string;
  source_language_uz: string;
  source_language_de: string;
  location_uz: string | null;
  location_de: string | null;
  verified_at: string | Date;
  published_at: string | Date | null;
  updated_at: string | Date;
  featured: boolean;
};

type PublishedNewsDetailRow =
  PublishedNewsSummaryRow & {
    content_uz: string[];
    content_de: string[];
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
} as const satisfies Record<
  string,
  Record<PublicNewsLocale, ContentType>
>;

function getLocalizedContentType(
  contentType: string,
  locale: PublicNewsLocale,
): ContentType {
  if (
    contentType in contentTypeLabels
  ) {
    const key =
      contentType as keyof typeof contentTypeLabels;

    return contentTypeLabels[key][locale];
  }

  return contentTypeLabels.official_info[
    locale
  ];
}

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toDateOnlyString(
  value: string | Date,
): string {
  return toDateTimeString(
    value,
  ).slice(0, 10);
}

function toSafeNumericId(
  value: string,
): number {
  const databaseId =
    Number.parseInt(
      value,
      10,
    );

  return Number.isSafeInteger(
    databaseId,
  )
    ? databaseId
    : 0;
}

function toPublicNewsSummary(
  row: PublishedNewsSummaryRow,
  locale: PublicNewsLocale,
): NewsItem {
  return {
    id: toSafeNumericId(
      row.id,
    ),
    slug: row.slug,
    title:
      locale === "de"
        ? row.title_de
        : row.title_uz,
    excerpt:
      locale === "de"
        ? row.excerpt_de
        : row.excerpt_uz,
    content: [],
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
    publishedAt:
      row.published_at === null
        ? null
        : toDateTimeString(
            row.published_at,
          ),
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
    sourceName:
      locale === "de"
        ? row.source_name_de
        : row.source_name_uz,
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
    featured:
      row.featured,
  };
}

function toPublicNewsDetail(
  row: PublishedNewsDetailRow,
  locale: PublicNewsLocale,
): NewsItem {
  return {
    ...toPublicNewsSummary(
      row,
      locale,
    ),
    content:
      locale === "de"
        ? row.content_de
        : row.content_uz,
  };
}

function hasDatabaseConfiguration(): boolean {
  return Boolean(
    process.env.DATABASE_URL,
  );
}

function canSkipDatabaseDuringBuild(): boolean {
  return (
    !hasDatabaseConfiguration() &&
    process.env.CI === "true"
  );
}

function assertDatabaseAvailable(): void {
  if (
    hasDatabaseConfiguration() ||
    canSkipDatabaseDuringBuild()
  ) {
    return;
  }

  throw new Error(
    "DATABASE_URL is not configured for public News runtime.",
  );
}

const loadPublishedNews =
  cache(
    async (
      locale: PublicNewsLocale,
      limit: number | null,
    ): Promise<NewsItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringBuild()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedNewsSummaryRow>(
          `
            SELECT
              id::text,
              slug,
              title_uz,
              title_de,
              excerpt_uz,
              excerpt_de,
              category_uz,
              category_de,
              content_type,
              reading_time_uz,
              reading_time_de,
              source_name_uz,
              source_name_de,
              source_url,
              source_language_uz,
              source_language_de,
              location_uz,
              location_de,
              verified_at,
              published_at,
              updated_at,
              featured
            FROM news_articles
            WHERE status = 'published'
            ORDER BY
              featured DESC,
              verified_at DESC,
              updated_at DESC,
              id DESC
            ${
              limit === null
                ? ""
                : "LIMIT $1"
            }
          `,
          limit === null
            ? []
            : [limit],
        );

      return result.rows.map(
        (row) =>
          toPublicNewsSummary(
            row,
            locale,
          ),
      );
    },
  );

const loadPublishedNewsBySlug =
  cache(
    async (
      slug: string,
      locale: PublicNewsLocale,
    ): Promise<NewsItem | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringBuild()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedNewsDetailRow>(
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
              source_name_uz,
              source_name_de,
              source_url,
              source_language_uz,
              source_language_de,
              location_uz,
              location_de,
              verified_at,
              published_at,
              updated_at,
              featured
            FROM news_articles
            WHERE
              status = 'published'
              AND slug = $1
            LIMIT 1
          `,
          [slug],
        );

      const row =
        result.rows[0];

      return row
        ? toPublicNewsDetail(
            row,
            locale,
          )
        : null;
    },
  );

const loadRelatedPublishedNews =
  cache(
    async (
      slug: string,
      locale: PublicNewsLocale,
      limit: number,
    ): Promise<NewsItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringBuild()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedNewsSummaryRow>(
          `
            SELECT
              id::text,
              slug,
              title_uz,
              title_de,
              excerpt_uz,
              excerpt_de,
              category_uz,
              category_de,
              content_type,
              reading_time_uz,
              reading_time_de,
              source_name_uz,
              source_name_de,
              source_url,
              source_language_uz,
              source_language_de,
              location_uz,
              location_de,
              verified_at,
              published_at,
              updated_at,
              featured
            FROM news_articles
            WHERE
              status = 'published'
              AND slug <> $1
            ORDER BY
              featured DESC,
              verified_at DESC,
              updated_at DESC,
              id DESC
            LIMIT $2
          `,
          [
            slug,
            limit,
          ],
        );

      return result.rows.map(
        (row) =>
          toPublicNewsSummary(
            row,
            locale,
          ),
      );
    },
  );

const loadFeaturedPublishedNews =
  cache(
    async (
      locale: PublicNewsLocale,
    ): Promise<NewsItem | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringBuild()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedNewsSummaryRow>(
          `
            SELECT
              id::text,
              slug,
              title_uz,
              title_de,
              excerpt_uz,
              excerpt_de,
              category_uz,
              category_de,
              content_type,
              reading_time_uz,
              reading_time_de,
              source_name_uz,
              source_name_de,
              source_url,
              source_language_uz,
              source_language_de,
              location_uz,
              location_de,
              verified_at,
              published_at,
              updated_at,
              featured
            FROM news_articles
            WHERE
              status = 'published'
              AND featured = TRUE
            ORDER BY
              updated_at DESC,
              id DESC
            LIMIT 1
          `,
        );

      const row =
        result.rows[0];

      return row
        ? toPublicNewsSummary(
            row,
            locale,
          )
        : null;
    },
  );

export async function getPublishedNews(
  locale: PublicNewsLocale,
  limit?: number,
): Promise<NewsItem[]> {
  const normalizedLimit =
    typeof limit === "number" &&
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : null;

  return loadPublishedNews(
    locale,
    normalizedLimit,
  );
}

export async function getPublishedNewsBySlug(
  slug: string,
  locale: PublicNewsLocale,
): Promise<NewsItem | null> {
  return loadPublishedNewsBySlug(
    slug,
    locale,
  );
}

export async function getRelatedPublishedNews(
  slug: string,
  locale: PublicNewsLocale,
  limit = 3,
): Promise<NewsItem[]> {
  const normalizedLimit =
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : 3;

  return loadRelatedPublishedNews(
    slug,
    locale,
    normalizedLimit,
  );
}

export async function getFeaturedPublishedNews(
  locale: PublicNewsLocale,
): Promise<NewsItem | null> {
  return loadFeaturedPublishedNews(
    locale,
  );
}
