import { getDb } from "@/lib/db";

export type AdminEventStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminEventCategory =
  | "culture"
  | "education"
  | "career"
  | "business"
  | "community"
  | "sport"
  | "children"
  | "consular";

export type AdminEventFormat =
  | "offline"
  | "online"
  | "hybrid";

export type AdminEventRegistrationStatus =
  | "open"
  | "not_required"
  | "sold_out"
  | "closed";

export type AdminEventSummary = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  category: AdminEventCategory;
  format: AdminEventFormat;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  city: string | null;
  bundesland: string | null;
  organizerName: string;
  registrationStatus:
    AdminEventRegistrationStatus;
  verifiedAt: string;
  status: AdminEventStatus;
  featured: boolean;
  updatedAt: string;
};

export type AdminEvent = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  excerptUz: string;
  excerptDe: string;
  descriptionUz: string[];
  descriptionDe: string[];
  category: AdminEventCategory;
  format: AdminEventFormat;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  timezone: string;
  city: string | null;
  bundesland: string | null;
  venueName: string | null;
  address: string | null;
  onlineUrl: string | null;
  organizerName: string;
  organizerUrl: string | null;
  registrationStatus:
    AdminEventRegistrationStatus;
  registrationUrl: string | null;
  registrationDeadline: string | null;
  languages: string[];
  priceLabelUz: string;
  priceLabelDe: string;
  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;
  importantNotesUz: string[];
  importantNotesDe: string[];
  status: AdminEventStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminEventInput = {
  slug: string;
  titleUz: string;
  titleDe: string;
  excerptUz: string;
  excerptDe: string;
  descriptionUz: string[];
  descriptionDe: string[];
  category: AdminEventCategory;
  format: AdminEventFormat;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  timezone: string;
  city: string | null;
  bundesland: string | null;
  venueName: string | null;
  address: string | null;
  onlineUrl: string | null;
  organizerName: string;
  organizerUrl: string | null;
  registrationStatus:
    AdminEventRegistrationStatus;
  registrationUrl: string | null;
  registrationDeadline: string | null;
  languages: string[];
  priceLabelUz: string;
  priceLabelDe: string;
  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;
  importantNotesUz: string[];
  importantNotesDe: string[];
};

type AdminEventSummaryRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  category: string;
  format: string;
  start_date: string | Date;
  end_date: string | Date | null;
  start_time: string | null;
  end_time: string | null;
  city: string | null;
  bundesland: string | null;
  organizer_name: string;
  registration_status: string;
  verified_at: string | Date;
  status: string;
  featured: boolean;
  updated_at: string | Date;
};

type AdminEventRow = {
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
  registration_deadline: string | Date | null;
  languages: string[];
  price_label_uz: string;
  price_label_de: string;
  official_source_name: string;
  official_source_url: string;
  verified_at: string | Date;
  important_notes_uz: string[];
  important_notes_de: string[];
  status: string;
  featured: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

function normalizeStatus(
  value: string,
): AdminEventStatus {
  if (
    value === "published" ||
    value === "archived"
  ) {
    return value;
  }

  return "draft";
}

function normalizeCategory(
  value: string,
): AdminEventCategory {
  if (
    value === "education" ||
    value === "career" ||
    value === "business" ||
    value === "community" ||
    value === "sport" ||
    value === "children" ||
    value === "consular"
  ) {
    return value;
  }

  return "culture";
}

function normalizeFormat(
  value: string,
): AdminEventFormat {
  if (
    value === "online" ||
    value === "hybrid"
  ) {
    return value;
  }

  return "offline";
}

function normalizeRegistrationStatus(
  value: string,
): AdminEventRegistrationStatus {
  if (
    value === "not_required" ||
    value === "sold_out" ||
    value === "closed"
  ) {
    return value;
  }

  return "open";
}

function toDateString(
  value: string | Date,
): string {
  if (
    value instanceof Date
  ) {
    return value
      .toISOString()
      .slice(0, 10);
  }

  return value.slice(0, 10);
}

function toNullableDateString(
  value:
    | string
    | Date
    | null,
): string | null {
  return value === null
    ? null
    : toDateString(value);
}

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toAdminEventSummary(
  row: AdminEventSummaryRow,
): AdminEventSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
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
    endDate:
      toNullableDateString(
        row.end_date,
      ),
    startTime:
      row.start_time,
    endTime:
      row.end_time,
    city:
      row.city,
    bundesland:
      row.bundesland,
    organizerName:
      row.organizer_name,
    registrationStatus:
      normalizeRegistrationStatus(
        row.registration_status,
      ),
    verifiedAt:
      toDateString(
        row.verified_at,
      ),
    status:
      normalizeStatus(
        row.status,
      ),
    featured:
      row.featured,
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

function toAdminEvent(
  row: AdminEventRow,
): AdminEvent {
  return {
    ...toAdminEventSummary(
      row,
    ),
    excerptUz:
      row.excerpt_uz,
    excerptDe:
      row.excerpt_de,
    descriptionUz:
      row.description_uz,
    descriptionDe:
      row.description_de,
    timezone:
      row.timezone,
    venueName:
      row.venue_name,
    address:
      row.address,
    onlineUrl:
      row.online_url,
    organizerUrl:
      row.organizer_url,
    registrationUrl:
      row.registration_url,
    registrationDeadline:
      toNullableDateString(
        row.registration_deadline,
      ),
    languages:
      row.languages,
    priceLabelUz:
      row.price_label_uz,
    priceLabelDe:
      row.price_label_de,
    officialSourceName:
      row.official_source_name,
    officialSourceUrl:
      row.official_source_url,
    importantNotesUz:
      row.important_notes_uz,
    importantNotesDe:
      row.important_notes_de,
    createdAt:
      toDateTimeString(
        row.created_at,
      ),
  };
}

export async function getAdminEvents(): Promise<
  AdminEventSummary[]
> {
  const result =
    await getDb().query<AdminEventSummaryRow>(
      `
        SELECT
          id::text,
          slug,
          title_uz,
          title_de,
          category,
          format,
          start_date,
          end_date,
          start_time::text,
          end_time::text,
          city,
          bundesland,
          organizer_name,
          registration_status,
          verified_at,
          status,
          featured,
          updated_at
        FROM events
        ORDER BY
          start_date DESC,
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toAdminEventSummary,
  );
}

export async function getAdminEventById(
  id: string,
): Promise<AdminEvent | null> {
  const result =
    await getDb().query<AdminEventRow>(
      `
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
          status,
          featured,
          created_at,
          updated_at
        FROM events
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row =
    result.rows[0];

  return row
    ? toAdminEvent(row)
    : null;
}

export async function createAdminEvent(
  input: AdminEventInput,
): Promise<string> {
  const result =
    await getDb().query<{
      id: string;
    }>(
      `
        INSERT INTO events (
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
          start_time,
          end_time,
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
          status,
          featured
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
          $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
          $31,$32,
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
        input.descriptionUz,
        input.descriptionDe,
        input.category,
        input.format,
        input.startDate,
        input.endDate,
        input.startTime,
        input.endTime,
        input.timezone,
        input.city,
        input.bundesland,
        input.venueName,
        input.address,
        input.onlineUrl,
        input.organizerName,
        input.organizerUrl,
        input.registrationStatus,
        input.registrationUrl,
        input.registrationDeadline,
        input.languages,
        input.priceLabelUz,
        input.priceLabelDe,
        input.officialSourceName,
        input.officialSourceUrl,
        input.verifiedAt,
        input.importantNotesUz,
        input.importantNotesDe,
      ],
    );

  const row =
    result.rows[0];

  if (!row) {
    throw new Error(
      "Event was not created.",
    );
  }

  return row.id;
}
