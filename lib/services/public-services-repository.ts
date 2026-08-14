import { cache } from "react";

import { getDb } from "@/lib/db";
import type {
  ServiceCategory,
  ServiceItem,
  SupportedContentLocale,
} from "@/types/service";

type PublishedServiceSummaryRow = {
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
  services_uz: string[];
  services_de: string[];
  official_source_name: string;
  official_source_url: string;
  source_description_uz: string;
  source_description_de: string;
  location_uz: string;
  location_de: string;
  updated_at: string | Date;
  featured: boolean;
};

type PublishedServiceDetailRow =
  PublishedServiceSummaryRow & {
    verification_steps_uz: string[];
    verification_steps_de: string[];
    important_notes_uz: string[];
    important_notes_de: string[];
  };

const categoryLabels: Readonly<
  Record<
    SupportedContentLocale,
    Record<
      ServiceCategory,
      string
    >
  >
> = {
  uz: {
    translation: "Tarjima",
    legal: "Huquq",
    tax: "Soliq",
    medical: "Tibbiyot",
    craft: "Hunarmandchilik",
    consumer:
      "Iste’molchi huquqlari",
  },
  de: {
    translation: "Übersetzung",
    legal: "Recht",
    tax: "Steuern",
    medical: "Medizin",
    craft: "Handwerk",
    consumer: "Verbraucherschutz",
  },
};

function normalizeCategory(
  category: string,
): ServiceCategory {
  if (
    category === "legal" ||
    category === "tax" ||
    category === "medical" ||
    category === "craft" ||
    category === "consumer"
  ) {
    return category;
  }

  return "translation";
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

function toPublicServiceSummary(
  row: PublishedServiceSummaryRow,
  locale: SupportedContentLocale,
): ServiceItem {
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

    services:
      locale === "de"
        ? row.services_de
        : row.services_uz,

    verificationSteps: [],

    importantNotes: [],

    officialSourceName:
      row.official_source_name,

    officialSourceUrl:
      row.official_source_url,

    sourceDescription:
      locale === "de"
        ? row.source_description_de
        : row.source_description_uz,

    location:
      locale === "de"
        ? row.location_de
        : row.location_uz,

    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),

    featured:
      row.featured,
  };
}

function toPublicServiceDetail(
  row: PublishedServiceDetailRow,
  locale: SupportedContentLocale,
): ServiceItem {
  return {
    ...toPublicServiceSummary(
      row,
      locale,
    ),

    verificationSteps:
      locale === "de"
        ? row.verification_steps_de
        : row.verification_steps_uz,

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
    "DATABASE_URL is not configured for public Services runtime.",
  );
}

const getPublishedServicesCached =
  cache(
    async (
      locale: SupportedContentLocale,
      limit: number | null,
    ): Promise<ServiceItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedServiceSummaryRow>(
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
              services_uz,
              services_de,
              official_source_name,
              official_source_url,
              source_description_uz,
              source_description_de,
              location_uz,
              location_de,
              updated_at,
              featured
            FROM services
            WHERE
              status = 'published'
            ORDER BY
              featured DESC,
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
          toPublicServiceSummary(
            row,
            locale,
          ),
      );
    },
  );

const getPublishedServiceBySlugCached =
  cache(
    async (
      slug: string,
      locale: SupportedContentLocale,
    ): Promise<ServiceItem | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedServiceDetailRow>(
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
              updated_at,
              featured
            FROM services
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
        ? toPublicServiceDetail(
            row,
            locale,
          )
        : null;
    },
  );

const getFeaturedPublishedServiceCached =
  cache(
    async (
      locale: SupportedContentLocale,
    ): Promise<ServiceItem | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedServiceSummaryRow>(
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
              services_uz,
              services_de,
              official_source_name,
              official_source_url,
              source_description_uz,
              source_description_de,
              location_uz,
              location_de,
              updated_at,
              featured
            FROM services
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
        ? toPublicServiceSummary(
            row,
            locale,
          )
        : null;
    },
  );

const getRelatedPublishedServicesCached =
  cache(
    async (
      slug: string,
      locale: SupportedContentLocale,
      limit: number,
    ): Promise<ServiceItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedServiceSummaryRow>(
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
              services_uz,
              services_de,
              official_source_name,
              official_source_url,
              source_description_uz,
              source_description_de,
              location_uz,
              location_de,
              updated_at,
              featured
            FROM services
            WHERE
              status = 'published'
              AND slug <> $1
            ORDER BY
              featured DESC,
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
          toPublicServiceSummary(
            row,
            locale,
          ),
      );
    },
  );

export async function getPublishedServices(
  locale: SupportedContentLocale,
  limit?: number,
): Promise<ServiceItem[]> {
  const normalizedLimit =
    typeof limit === "number" &&
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : null;

  return getPublishedServicesCached(
    locale,
    normalizedLimit,
  );
}

export async function getPublishedServiceBySlug(
  slug: string,
  locale: SupportedContentLocale,
): Promise<ServiceItem | null> {
  return getPublishedServiceBySlugCached(
    slug,
    locale,
  );
}

export async function getFeaturedPublishedService(
  locale: SupportedContentLocale,
): Promise<ServiceItem | null> {
  return getFeaturedPublishedServiceCached(
    locale,
  );
}

export async function getRelatedPublishedServices(
  slug: string,
  locale: SupportedContentLocale,
  limit = 3,
): Promise<ServiceItem[]> {
  const normalizedLimit =
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : 3;

  return getRelatedPublishedServicesCached(
    slug,
    locale,
    normalizedLimit,
  );
}
