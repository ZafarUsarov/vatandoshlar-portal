import { cache } from "react";

import { getDb } from "@/lib/db";
import type {
  JobCategory,
  JobGuide,
  SupportedJobLocale,
} from "@/types/jobs";

type PublishedJobGuideSummaryRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  short_title_uz: string;
  short_title_de: string;
  description_uz: string;
  description_de: string;
  category: string;
  icon: string;
  audience_uz: string;
  audience_de: string;
  highlights_uz: string[];
  highlights_de: string[];
  search_keywords: string[];
  official_source_name: string;
  official_source_url: string;
  source_description_uz: string;
  source_description_de: string;
  verified_at: string | Date;
  updated_at: string | Date;
  featured: boolean;
};

type PublishedJobGuideDetailRow =
  PublishedJobGuideSummaryRow & {
    steps_uz: string[];
    steps_de: string[];
    important_notes_uz: string[];
    important_notes_de: string[];
  };

const categoryLabels: Readonly<
  Record<
    SupportedJobLocale,
    Record<
      JobCategory,
      string
    >
  >
> = {
  uz: {
    students: "Talabalar",
    english: "Ingliz tilida",
    minijob: "Minijob",
    internship: "Amaliyot",
    professionals:
      "Malakali mutaxassislar",
    safety:
      "Xavfsiz ish qidirish",
  },
  de: {
    students: "Studierende",
    english:
      "Englischsprachige Stellen",
    minijob: "Minijob",
    internship: "Praktikum",
    professionals:
      "Fachkräfte",
    safety:
      "Sichere Jobsuche",
  },
};

function normalizeCategory(
  category: string,
): JobCategory {
  if (
    category === "english" ||
    category === "minijob" ||
    category === "internship" ||
    category === "professionals" ||
    category === "safety"
  ) {
    return category;
  }

  return "students";
}

function toSafeNumericId(
  value: string,
): number {
  const id =
    Number.parseInt(
      value,
      10,
    );

  return Number.isSafeInteger(
    id,
  )
    ? id
    : 0;
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
  const serialized =
    value instanceof Date
      ? value.toISOString()
      : value;

  return serialized.slice(
    0,
    10,
  );
}

function toPublicJobGuideSummary(
  row: PublishedJobGuideSummaryRow,
  locale: SupportedJobLocale,
): JobGuide {
  const category =
    normalizeCategory(
      row.category,
    );

  return {
    id: toSafeNumericId(
      row.id,
    ),
    slug: row.slug,
    title:
      locale === "de"
        ? row.title_de
        : row.title_uz,
    shortTitle:
      locale === "de"
        ? row.short_title_de
        : row.short_title_uz,
    description:
      locale === "de"
        ? row.description_de
        : row.description_uz,
    category:
      categoryLabels[
        locale
      ][category],
    icon: row.icon,
    audience:
      locale === "de"
        ? row.audience_de
        : row.audience_uz,
    highlights:
      locale === "de"
        ? row.highlights_de
        : row.highlights_uz,
    searchKeywords:
      row.search_keywords,
    steps: [],
    importantNotes: [],
    officialSourceName:
      row.official_source_name,
    officialSourceUrl:
      row.official_source_url,
    sourceDescription:
      locale === "de"
        ? row.source_description_de
        : row.source_description_uz,
    verifiedAt:
      toDateOnlyString(
        row.verified_at,
      ),
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
    featured:
      row.featured,
  };
}

function toPublicJobGuideDetail(
  row: PublishedJobGuideDetailRow,
  locale: SupportedJobLocale,
): JobGuide {
  return {
    ...toPublicJobGuideSummary(
      row,
      locale,
    ),
    steps:
      locale === "de"
        ? row.steps_de
        : row.steps_uz,
    importantNotes:
      locale === "de"
        ? row.important_notes_de
        : row.important_notes_uz,
  };
}

function hasDatabaseConfiguration(): boolean {
  return Boolean(
    process.env.DATABASE_URL,
  );
}

function canSkipDatabaseDuringCi(): boolean {
  return (
    process.env.CI === "true" &&
    !hasDatabaseConfiguration()
  );
}

function assertDatabaseAvailable(): void {
  if (
    hasDatabaseConfiguration() ||
    canSkipDatabaseDuringCi()
  ) {
    return;
  }

  throw new Error(
    "DATABASE_URL is not configured for public Jobs runtime.",
  );
}

const getPublishedJobsCached =
  cache(
    async (
      locale: SupportedJobLocale,
      limit: number | null,
    ): Promise<JobGuide[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedJobGuideSummaryRow>(
          `
            SELECT
              id::text,
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
              official_source_name,
              official_source_url,
              source_description_uz,
              source_description_de,
              verified_at,
              updated_at,
              featured
            FROM job_guides
            WHERE
              status = 'published'
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
          toPublicJobGuideSummary(
            row,
            locale,
          ),
      );
    },
  );

const getPublishedJobBySlugCached =
  cache(
    async (
      slug: string,
      locale: SupportedJobLocale,
    ): Promise<JobGuide | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedJobGuideDetailRow>(
          `
            SELECT
              id::text,
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
              updated_at,
              featured
            FROM job_guides
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
        ? toPublicJobGuideDetail(
            row,
            locale,
          )
        : null;
    },
  );

const getFeaturedPublishedJobCached =
  cache(
    async (
      locale: SupportedJobLocale,
    ): Promise<JobGuide | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedJobGuideSummaryRow>(
          `
            SELECT
              id::text,
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
              official_source_name,
              official_source_url,
              source_description_uz,
              source_description_de,
              verified_at,
              updated_at,
              featured
            FROM job_guides
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
        ? toPublicJobGuideSummary(
            row,
            locale,
          )
        : null;
    },
  );

const getRelatedPublishedJobsCached =
  cache(
    async (
      slug: string,
      locale: SupportedJobLocale,
      limit: number,
    ): Promise<JobGuide[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedJobGuideSummaryRow>(
          `
            SELECT
              id::text,
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
              official_source_name,
              official_source_url,
              source_description_uz,
              source_description_de,
              verified_at,
              updated_at,
              featured
            FROM job_guides
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
          toPublicJobGuideSummary(
            row,
            locale,
          ),
      );
    },
  );

export async function getPublishedJobGuides(
  locale: SupportedJobLocale,
  limit?: number,
): Promise<JobGuide[]> {
  const normalizedLimit =
    typeof limit === "number" &&
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : null;

  return getPublishedJobsCached(
    locale,
    normalizedLimit,
  );
}

export async function getPublishedJobGuideBySlug(
  slug: string,
  locale: SupportedJobLocale,
): Promise<JobGuide | null> {
  return getPublishedJobBySlugCached(
    slug,
    locale,
  );
}

export async function getFeaturedPublishedJobGuide(
  locale: SupportedJobLocale,
): Promise<JobGuide | null> {
  return getFeaturedPublishedJobCached(
    locale,
  );
}

export async function getRelatedPublishedJobGuides(
  slug: string,
  locale: SupportedJobLocale,
  limit = 3,
): Promise<JobGuide[]> {
  const normalizedLimit =
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : 3;

  return getRelatedPublishedJobsCached(
    slug,
    locale,
    normalizedLimit,
  );
}
