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

export type PublicEventOrganizerType =
  | "vatandoshlar"
  | "external";

export type PublicEventRegistrationMethod =
  | "google_form"
  | "telegram"
  | "email"
  | "phone"
  | "external_url"
  | "none";

type PublicEventCommon = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string[];
  category: PublicEventCategory;
  format: PublicEventFormat;
  timezone: string;
  organizerType: PublicEventOrganizerType;
  organizerName: string;
  organizerUrl?: string;
  registrationStatus:
    PublicEventRegistrationStatus;
  registrationMethod:
    PublicEventRegistrationMethod;
  registrationRequired: boolean;
  registrationUrl?: string;
  registrationValue?: string;
  registrationDeadline?: string;
  capacity?: number;
  languages: string[];
  priceLabel: string;
  importantNotes: string[];
  featured: boolean;
  updatedAt: string;
};

export type PublicEventItem =
  PublicEventCommon & {
    eventStatus: "scheduled";
    startDate: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    city?: string;
    bundesland?: string;
    venueName?: string;
    address?: string;
    onlineUrl?: string;
    officialSourceName: string;
    officialSourceUrl: string;
    verifiedAt: string;
  };

export type PublicPlanningEventItem =
  PublicEventCommon & {
    eventStatus: "planning";
  };

export type PublicEventDetailItem =
  | PublicEventItem
  | PublicPlanningEventItem;

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
  event_status: string;
  start_date: string | Date | null;
  end_date: string | Date | null;
  start_time: string | null;
  end_time: string | null;
  timezone: string;
  city: string | null;
  bundesland: string | null;
  venue_name: string | null;
  address: string | null;
  online_url: string | null;
  organizer_type: string;
  organizer_name: string;
  organizer_url: string | null;
  registration_status: string;
  registration_method: string;
  registration_url: string | null;
  registration_value: string | null;
  registration_required: boolean;
  registration_deadline:
    | string
    | Date
    | null;
  capacity: number | null;
  languages: string[];
  price_label_uz: string;
  price_label_de: string;
  official_source_name: string | null;
  official_source_url: string | null;
  verified_at: string | Date | null;
  updated_at: string | Date;
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

const registrationMethodValues:
  ReadonlyArray<PublicEventRegistrationMethod> = [
    "google_form",
    "telegram",
    "email",
    "phone",
    "external_url",
    "none",
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

function normalizeOrganizerType(
  value: string,
): PublicEventOrganizerType {
  return value === "vatandoshlar"
    ? "vatandoshlar"
    : "external";
}

function normalizeRegistrationMethod(
  value: string,
): PublicEventRegistrationMethod {
  return registrationMethodValues.includes(
    value as PublicEventRegistrationMethod,
  )
    ? (value as PublicEventRegistrationMethod)
    : "none";
}

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toDateString(
  value: string | Date,
): string {
  return toDateTimeString(
    value,
  ).slice(0, 10);
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

  const trimmed = value.trim();

  return trimmed.length > 0
    ? trimmed
    : undefined;
}

function getCommonEventFields(
  row: PublishedEventRow,
  locale: SupportedEventLocale,
): PublicEventCommon {
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
    timezone:
      row.timezone,
    organizerType:
      normalizeOrganizerType(
        row.organizer_type,
      ),
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
    registrationMethod:
      normalizeRegistrationMethod(
        row.registration_method,
      ),
    registrationRequired:
      row.registration_required,
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
    ...(cleanOptional(
      row.registration_value,
    )
      ? {
          registrationValue:
            cleanOptional(
              row.registration_value,
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
    ...(row.capacity !== null
      ? {
          capacity:
            row.capacity,
        }
      : {}),
    languages:
      row.languages,
    priceLabel:
      isGerman
        ? row.price_label_de
        : row.price_label_uz,
    importantNotes:
      isGerman
        ? row.important_notes_de
        : row.important_notes_uz,
    featured:
      row.featured,
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

function toScheduledPublicEvent(
  row: PublishedEventRow,
  locale: SupportedEventLocale,
): PublicEventItem {
  if (
    row.start_date === null ||
    row.official_source_name === null ||
    row.official_source_url === null ||
    row.verified_at === null
  ) {
    throw new Error(
      `Scheduled event "${row.slug}" is missing required public data.`,
    );
  }

  return {
    ...getCommonEventFields(
      row,
      locale,
    ),
    eventStatus: "scheduled",
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
    officialSourceName:
      row.official_source_name,
    officialSourceUrl:
      row.official_source_url,
    verifiedAt:
      toDateString(
        row.verified_at,
      ),
  };
}

function toPlanningPublicEvent(
  row: PublishedEventRow,
  locale: SupportedEventLocale,
): PublicPlanningEventItem {
  return {
    ...getCommonEventFields(
      row,
      locale,
    ),
    eventStatus: "planning",
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
    event_status,
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
    organizer_type,
    organizer_name,
    organizer_url,
    registration_status,
    registration_method,
    registration_url,
    registration_value,
    registration_required,
    registration_deadline,
    capacity,
    languages,
    price_label_uz,
    price_label_de,
    official_source_name,
    official_source_url,
    verified_at,
    updated_at,
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
              AND event_status = 'scheduled'
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
          toScheduledPublicEvent(
            row,
            locale,
          ),
      );
    },
  );

const getPlanningPublishedEventsCached =
  cache(
    async (
      locale: SupportedEventLocale,
    ): Promise<PublicPlanningEventItem[]> => {
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
              AND event_status = 'planning'
            ORDER BY
              updated_at DESC,
              id ASC
          `,
        );

      return result.rows.map(
        (row) =>
          toPlanningPublicEvent(
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
              AND event_status = 'scheduled'
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
          toScheduledPublicEvent(
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
              AND event_status = 'scheduled'
              AND slug = $1
            LIMIT 1
          `,
          [slug],
        );

      const row =
        result.rows[0];

      return row
        ? toScheduledPublicEvent(
            row,
            locale,
          )
        : null;
    },
  );

const getPublishedEventDetailBySlugCached =
  cache(
    async (
      slug: string,
      locale: SupportedEventLocale,
    ): Promise<PublicEventDetailItem | null> => {
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
              AND event_status IN (
                'scheduled',
                'planning'
              )
              AND slug = $1
            LIMIT 1
          `,
          [slug],
        );

      const row =
        result.rows[0];

      if (!row) {
        return null;
      }

      return row.event_status === "planning"
        ? toPlanningPublicEvent(
            row,
            locale,
          )
        : toScheduledPublicEvent(
            row,
            locale,
          );
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
              AND event_status = 'scheduled'
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
        ? toScheduledPublicEvent(
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

export async function getPlanningPublishedEvents(
  locale: SupportedEventLocale,
): Promise<PublicPlanningEventItem[]> {
  return getPlanningPublishedEventsCached(
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

export async function getPublishedEventDetailBySlug(
  slug: string,
  locale: SupportedEventLocale,
): Promise<PublicEventDetailItem | null> {
  return getPublishedEventDetailBySlugCached(
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
              AND event_status = 'scheduled'
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
          toScheduledPublicEvent(
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
