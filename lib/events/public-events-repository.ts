import { cache } from "react";

import { getDb } from "@/lib/db";

export type SupportedEventLocale =
  | "uz"
  | "de";

export type PublicEventCategory =
  | "culture"
  | "education"
  | "career"
  | "business"
  | "community"
  | "sport"
  | "children"
  | "consular";

export type PublicEventFormat =
  | "offline"
  | "online"
  | "hybrid";

export type PublicEventRegistrationStatus =
  | "open"
  | "not_required"
  | "sold_out"
  | "closed";

export type PublicEventItem = {
  id: string;
  slug: string;

  title: string;
  excerpt: string;
  description: string[];

  category: PublicEventCategory;
  format: PublicEventFormat;

  startDate: string;
  endDate?: string;

  startTime?: string;
  endTime?: string;

  timezone: string;

  city?: string;
  bundesland?: string;
  venueName?: string;
  address?: string;
  onlineUrl?: string;

  organizerName: string;
  organizerUrl?: string;

  registrationStatus:
    PublicEventRegistrationStatus;

  registrationUrl?: string;
  registrationDeadline?: string;

  languages: string[];

  priceLabel: string;

  officialSourceName: string;
  officialSourceUrl: string;

  verifiedAt: string;

  importantNotes: string[];

  featured: boolean;
};

type PublishedEventRow = {
  id: string;
  slug: string;

  title_uz: string;
  title_de: string;

  excerpt_uz: string;
  excerpt_de: string;

  description_uz: string[];
  description_de: string[];

  category: string;
  format: string;

  start_date: string | Date;
  end_date: string | Date | null;

  start_time: string | null;
  end_time: string | null;

  timezone: string;

  city: string | null;
  bundesland: string | null;
  venue_name: string | null;
  address: string | null;
  online_url: string | null;

  organizer_name: string;
  organizer_url: string | null;

  registration_status: string;
  registration_url: string | null;
  registration_deadline:
    | string
    | Date
    | null;

  languages: string[];

  price_label_uz: string;
  price_label_de: string;

  official_source_name: string;
  official_source_url: string;

  verified_at: string | Date;

  important_notes_uz: string[];
  important_notes_de: string[];

  featured: boolean;
};

const categoryValues:
  ReadonlyArray<PublicEventCategory> = [
    "culture",
    "education",
    "career",
    "business",
    "community",
    "sport",
    "children",
    "consular",
  ];

const formatValues:
  ReadonlyArray<PublicEventFormat> = [
    "offline",
    "online",
    "hybrid",
  ];

const registrationStatusValues:
  ReadonlyArray<PublicEventRegistrationStatus> = [
    "open",
    "not_required",
    "sold_out",
    "closed",
  ];

function normalizeCategory(
  value: string,
): PublicEventCategory {
  return categoryValues.includes(
    value as PublicEventCategory,
  )
    ? (value as PublicEventCategory)
    : "community";
}

function normalizeFormat(
  value: string,
): PublicEventFormat {
  return formatValues.includes(
    value as PublicEventFormat,
  )
    ? (value as PublicEventFormat)
    : "offline";
}

function normalizeRegistrationStatus(
  value: string,
): PublicEventRegistrationStatus {
  return registrationStatusValues.includes(
    value as PublicEventRegistrationStatus,
  )
    ? (value as PublicEventRegistrationStatus)
    : "closed";
}

function toDateString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : value.slice(0, 10);
}

function toNullableDateString(
  value:
    | string
    | Date
    | null,
): string | undefined {
  return value === null
    ? undefined
    : toDateString(value);
}

function cleanOptional(
  value: string | null,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed =
    value.trim();

  return trimmed.length > 0
    ? trimmed
    : undefined;
}

function toPublicEvent(
  row: PublishedEventRow,
  locale: SupportedEventLocale,
): PublicEventItem {
  const isGerman =
    locale === "de";

  return {
    id: row.id,
    slug: row.slug,

    title:
      isGerman
        ? row.title_de
        : row.title_uz,

    excerpt:
      isGerman
        ? row.excerpt_de
        : row.excerpt_uz,

    description:
      isGerman
        ? row.description_de
        : row.description_uz,

    category:
      normalizeCategory(
        row.category,
      ),

    format:
      normalizeFormat(
        row.format,
      ),

    startDate:
      toDateString(
        row.start_date,
      ),

    ...(toNullableDateString(
      row.end_date,
    )
      ? {
          endDate:
            toNullableDateString(
              row.end_date,
            ),
        }
      : {}),

    ...(row.start_time
      ? {
          startTime:
            row.start_time,
        }
      : {}),

    ...(row.end_time
      ? {
          endTime:
            row.end_time,
        }
      : {}),

    timezone:
      row.timezone,

    ...(cleanOptional(
      row.city,
    )
      ? {
          city:
            cleanOptional(
              row.city,
            ),
        }
      : {}),

    ...(cleanOptional(
      row.bundesland,
    )
      ? {
          bundesland:
            cleanOptional(
              row.bundesland,
            ),
        }
      : {}),

    ...(cleanOptional(
      row.venue_name,
    )
      ? {
          venueName:
            cleanOptional(
              row.venue_name,
            ),
        }
      : {}),

    ...(cleanOptional(
      row.address,
    )
      ? {
          address:
            cleanOptional(
              row.address,
            ),
        }
      : {}),

    ...(cleanOptional(
      row.online_url,
    )
      ? {
          onlineUrl:
            cleanOptional(
              row.online_url,
            ),
        }
      : {}),

    organizerName:
      row.organizer_name,

    ...(cleanOptional(
      row.organizer_url,
    )
      ? {
          organizerUrl:
            cleanOptional(
              row.organizer_url,
            ),
        }
      : {}),

    registrationStatus:
      normalizeRegistrationStatus(
        row.registration_status,
      ),

    ...(cleanOptional(
      row.registration_url,
    )
      ? {
          registrationUrl:
            cleanOptional(
              row.registration_url,
            ),
        }
      : {}),

    ...(toNullableDateString(
      row.registration_deadline,
    )
      ? {
          registrationDeadline:
            toNullableDateString(
              row.registration_deadline,
            ),
        }
      : {}),

    languages:
      row.languages,

    priceLabel:
      isGerman
        ? row.price_label_de
        : row.price_label_uz,

    officialSourceName:
      row.official_source_name,

    officialSourceUrl:
      row.official_source_url,

    verifiedAt:
      toDateString(
        row.verified_at,
      ),

    importantNotes:
      isGerman
        ? row.important_notes_de
        : row.important_notes_uz,

    featured:
      row.featured,
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
    "DATABASE_URL is not configured for public Events runtime.",
  );
}

const publishedEventSelect = `
  SELECT
    id::text,
    slug,
    title_uz,
    title_de,
    excerpt_uz,
    excerpt_de,
    description_uz,
    description_de,
    category,
    format,
    start_date,
    end_date,
    start_time::text,
    end_time::text,
    timezone,
    city,
    bundesland,
    venue_name,
    address,
    online_url,
    organizer_name,
    organizer_url,
    registration_status,
    registration_url,
    registration_deadline,
    languages,
    price_label_uz,
    price_label_de,
    official_source_name,
    official_source_url,
    verified_at,
    important_notes_uz,
    important_notes_de,
    featured
  FROM events
`;

const getUpcomingPublishedEventsCached =
  cache(
    async (
      locale: SupportedEventLocale,
    ): Promise<PublicEventItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedEventRow>(
          `
            ${publishedEventSelect}
            WHERE
              status = 'published'
              AND COALESCE(
                end_date,
                start_date
              ) >= CURRENT_DATE
            ORDER BY
              start_date ASC,
              start_time ASC NULLS LAST,
              id ASC
          `,
        );

      return result.rows.map(
        (row) =>
          toPublicEvent(
            row,
            locale,
          ),
      );
    },
  );

const getPastPublishedEventsCached =
  cache(
    async (
      locale: SupportedEventLocale,
    ): Promise<PublicEventItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedEventRow>(
          `
            ${publishedEventSelect}
            WHERE
              status = 'published'
              AND COALESCE(
                end_date,
                start_date
              ) < CURRENT_DATE
            ORDER BY
              start_date DESC,
              start_time DESC NULLS LAST,
              id DESC
          `,
        );

      return result.rows.map(
        (row) =>
          toPublicEvent(
            row,
            locale,
          ),
      );
    },
  );

const getPublishedEventBySlugCached =
  cache(
    async (
      slug: string,
      locale: SupportedEventLocale,
    ): Promise<PublicEventItem | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedEventRow>(
          `
            ${publishedEventSelect}
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
        ? toPublicEvent(
            row,
            locale,
          )
        : null;
    },
  );

const getFeaturedUpcomingEventCached =
  cache(
    async (
      locale: SupportedEventLocale,
    ): Promise<PublicEventItem | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<PublishedEventRow>(
          `
            ${publishedEventSelect}
            WHERE
              status = 'published'
              AND featured = TRUE
              AND COALESCE(
                end_date,
                start_date
              ) >= CURRENT_DATE
            ORDER BY
              start_date ASC,
              start_time ASC NULLS LAST,
              id ASC
            LIMIT 1
          `,
        );

      const row =
        result.rows[0];

      return row
        ? toPublicEvent(
            row,
            locale,
          )
        : null;
    },
  );

export async function getUpcomingPublishedEvents(
  locale: SupportedEventLocale,
): Promise<PublicEventItem[]> {
  return getUpcomingPublishedEventsCached(
    locale,
  );
}

export async function getPastPublishedEvents(
  locale: SupportedEventLocale,
): Promise<PublicEventItem[]> {
  return getPastPublishedEventsCached(
    locale,
  );
}

export async function getPublishedEventBySlug(
  slug: string,
  locale: SupportedEventLocale,
): Promise<PublicEventItem | null> {
  return getPublishedEventBySlugCached(
    slug,
    locale,
  );
}

export async function getFeaturedUpcomingEvent(
  locale: SupportedEventLocale,
): Promise<PublicEventItem | null> {
  return getFeaturedUpcomingEventCached(
    locale,
  );
}

const getRelatedPublishedEventsCached =
  cache(
    async (
      slug: string,
      category: PublicEventCategory,
      city: string | undefined,
      locale: SupportedEventLocale,
      limit: number,
    ): Promise<PublicEventItem[]> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<PublishedEventRow>(
          `
            ${publishedEventSelect}
            WHERE
              status = 'published'
              AND slug <> $1
              AND (
                category = $2
                OR (
                  $3::text IS NOT NULL
                  AND city = $3
                )
              )
            ORDER BY
              CASE
                WHEN category = $2
                  THEN 0
                ELSE 1
              END,
              start_date ASC,
              id ASC
            LIMIT $4
          `,
          [
            slug,
            category,
            city ?? null,
            limit,
          ],
        );

      return result.rows.map(
        (row) =>
          toPublicEvent(
            row,
            locale,
          ),
      );
    },
  );

export async function getRelatedPublishedEvents(
  currentEvent: PublicEventItem,
  locale: SupportedEventLocale,
  limit = 3,
): Promise<PublicEventItem[]> {
  const normalizedLimit =
    Number.isInteger(limit) &&
    limit > 0
      ? limit
      : 3;

  return getRelatedPublishedEventsCached(
    currentEvent.slug,
    currentEvent.category,
    currentEvent.city,
    locale,
    normalizedLimit,
  );
}
