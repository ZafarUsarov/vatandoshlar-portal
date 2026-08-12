import { cache } from "react";

import { getDb } from "@/lib/db";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
  SpecialistLanguage,
  SupportedLocale,
} from "@/types/specialist";

type PublishedSpecialistRow = {
  id: string;
  code: string;
  slug: string;
  name: string;

  profession_uz: string;
  profession_de: string;

  short_description_uz: string;
  short_description_de: string;

  categories: string[];
  languages: string[];

  services_uz: string[];
  services_de: string[];

  city: string | null;
  bundesland: string | null;
  postal_code: string | null;

  service_area_uz: string | null;
  service_area_de: string | null;

  email: string | null;
  phone: string | null;
  website: string | null;
  whatsapp: string | null;
  telegram: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;

  pricing_note_uz: string | null;
  pricing_note_de: string | null;

  avatar_url: string | null;

  years_of_experience: number | null;
  rating: string | number | null;
  review_count: number | null;

  verified: boolean;
  featured: boolean;
  premium: boolean;
  sponsored: boolean;
};

const categoryKeys: ReadonlyArray<SpecialistCategory> = [
  "medical",
  "legal",
  "technology",
  "automotive",
  "home",
  "education",
  "language-teaching",
  "academic-documents",
  "beauty",
  "finance",
  "creative",
];

const languageKeys: ReadonlyArray<SpecialistLanguage> = [
  "uz",
  "de",
  "ru",
  "en",
  "tr",
];

function normalizeCategories(
  values: string[],
): SpecialistCategory[] {
  return values.filter(
    (value): value is SpecialistCategory =>
      categoryKeys.includes(
        value as SpecialistCategory,
      ),
  );
}

function normalizeLanguages(
  values: string[],
): SpecialistLanguage[] {
  return values.filter(
    (value): value is SpecialistLanguage =>
      languageKeys.includes(
        value as SpecialistLanguage,
      ),
  );
}

function toNullableNumber(
  value: string | number | null,
): number | undefined {
  if (value === null) {
    return undefined;
  }

  const numericValue =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : undefined;
}

function compactObject<
  TValue extends Record<string, string | undefined>
>(
  value: TValue,
): Partial<TValue> {
  return Object.fromEntries(
    Object.entries(value).filter(
      (
        entry,
      ): entry is [string, string] =>
        typeof entry[1] === "string" &&
        entry[1].length > 0,
    ),
  ) as Partial<TValue>;
}

function toPublicSpecialist(
  row: PublishedSpecialistRow,
  locale: SupportedLocale,
): LocalizedSpecialist {
  const location =
    row.city ||
    row.bundesland ||
    row.postal_code
      ? compactObject({
          city:
            row.city ??
            undefined,
          bundesland:
            row.bundesland ??
            undefined,
          postalCode:
            row.postal_code ??
            undefined,
        })
      : undefined;

  const contact =
    compactObject({
      email:
        row.email ??
        undefined,
      phone:
        row.phone ??
        undefined,
      website:
        row.website ??
        undefined,
      whatsapp:
        row.whatsapp ??
        undefined,
      telegram:
        row.telegram ??
        undefined,
      instagram:
        row.instagram ??
        undefined,
      youtube:
        row.youtube ??
        undefined,
      facebook:
        row.facebook ??
        undefined,
    });

  const serviceArea =
    locale === "de"
      ? row.service_area_de
      : row.service_area_uz;

  const pricingNote =
    locale === "de"
      ? row.pricing_note_de
      : row.pricing_note_uz;

  return {
    id: row.id,
    code: row.code,
    slug: row.slug,
    name: row.name,

    profession:
      locale === "de"
        ? row.profession_de
        : row.profession_uz,

    shortDescription:
      locale === "de"
        ? row.short_description_de
        : row.short_description_uz,

    categories:
      normalizeCategories(
        row.categories,
      ),

    languages:
      normalizeLanguages(
        row.languages,
      ),

    services:
      locale === "de"
        ? row.services_de
        : row.services_uz,

    ...(location
      ? {
          location,
        }
      : {}),

    ...(serviceArea
      ? {
          serviceArea,
        }
      : {}),

    contact,

    status: {
      verified:
        row.verified,
      featured:
        row.featured,
      premium:
        row.premium,
      sponsored:
        row.sponsored,
    },

    ...(pricingNote
      ? {
          pricingNote,
        }
      : {}),

    profilePublished:
      true,

    ...(row.avatar_url
      ? {
          avatarUrl:
            row.avatar_url,
        }
      : {}),

    ...(row.years_of_experience !== null
      ? {
          yearsOfExperience:
            row.years_of_experience,
        }
      : {}),

    ...(toNullableNumber(row.rating) !== undefined
      ? {
          rating:
            toNullableNumber(
              row.rating,
            ),
        }
      : {}),

    ...(row.review_count !== null
      ? {
          reviewCount:
            row.review_count,
        }
      : {}),
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
    "DATABASE_URL is not configured for public Specialists runtime.",
  );
}

const publishedSpecialistSelect = `
  SELECT
    id::text,
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
    verified,
    featured,
    premium,
    sponsored
  FROM specialists
`;

const getPublishedSpecialistsCached =
  cache(
    async (
      locale: SupportedLocale,
    ): Promise<LocalizedSpecialist[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedSpecialistRow>(
          `
            ${publishedSpecialistSelect}
            WHERE
              status = 'published'
            ORDER BY
              featured DESC,
              premium DESC,
              verified DESC,
              sponsored DESC,
              updated_at DESC,
              id DESC
          `,
        );

      return result.rows.map(
        (row) =>
          toPublicSpecialist(
            row,
            locale,
          ),
      );
    },
  );

const getPublishedSpecialistBySlugCached =
  cache(
    async (
      slug: string,
      locale: SupportedLocale,
    ): Promise<LocalizedSpecialist | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedSpecialistRow>(
          `
            ${publishedSpecialistSelect}
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
        ? toPublicSpecialist(
            row,
            locale,
          )
        : null;
    },
  );

const getFeaturedPublishedSpecialistsCached =
  cache(
    async (
      locale: SupportedLocale,
      limit: number,
    ): Promise<LocalizedSpecialist[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedSpecialistRow>(
          `
            ${publishedSpecialistSelect}
            WHERE
              status = 'published'
              AND featured = TRUE
              AND verified = TRUE
            ORDER BY
              premium DESC,
              sponsored DESC,
              updated_at DESC,
              id DESC
            LIMIT $1
          `,
          [limit],
        );

      return result.rows.map(
        (row) =>
          toPublicSpecialist(
            row,
            locale,
          ),
      );
    },
  );

export async function getPublishedSpecialists(
  locale: SupportedLocale,
): Promise<LocalizedSpecialist[]> {
  return getPublishedSpecialistsCached(
    locale,
  );
}

export async function getPublishedSpecialistBySlug(
  slug: string,
  locale: SupportedLocale,
): Promise<LocalizedSpecialist | null> {
  return getPublishedSpecialistBySlugCached(
    slug,
    locale,
  );
}

export async function getFeaturedPublishedSpecialists(
  locale: SupportedLocale,
  limit = 3,
): Promise<LocalizedSpecialist[]> {
  const normalizedLimit =
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : 3;

  return getFeaturedPublishedSpecialistsCached(
    locale,
    normalizedLimit,
  );
}
