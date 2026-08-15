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

export type AdminEventOperationalStatus =
  | "planning"
  | "scheduled"
  | "cancelled";

export type AdminEventOrganizerType =
  | "vatandoshlar"
  | "external";

export type AdminEventRegistrationMethod =
  | "google_form"
  | "telegram"
  | "email"
  | "phone"
  | "external_url"
  | "none";

export type AdminEventSummary = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  category: AdminEventCategory;
  format: AdminEventFormat;
  eventStatus: AdminEventOperationalStatus;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  city: string | null;
  bundesland: string | null;
  organizerType: AdminEventOrganizerType;
  organizerName: string;
  registrationStatus: AdminEventRegistrationStatus;
  registrationMethod: AdminEventRegistrationMethod;
  verifiedAt: string | null;
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
  eventStatus: AdminEventOperationalStatus;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  timezone: string;
  city: string | null;
  bundesland: string | null;
  venueName: string | null;
  address: string | null;
  onlineUrl: string | null;
  organizerType: AdminEventOrganizerType;
  organizerName: string;
  organizerUrl: string | null;
  registrationStatus: AdminEventRegistrationStatus;
  registrationMethod: AdminEventRegistrationMethod;
  registrationUrl: string | null;
  registrationValue: string | null;
  registrationRequired: boolean;
  registrationDeadline: string | null;
  capacity: number | null;
  languages: string[];
  priceLabelUz: string;
  priceLabelDe: string;
  officialSourceName: string | null;
  officialSourceUrl: string | null;
  verifiedAt: string | null;
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
  eventStatus: AdminEventOperationalStatus;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  timezone: string;
  city: string | null;
  bundesland: string | null;
  venueName: string | null;
  address: string | null;
  onlineUrl: string | null;
  organizerType: AdminEventOrganizerType;
  organizerName: string;
  organizerUrl: string | null;
  registrationStatus: AdminEventRegistrationStatus;
  registrationMethod: AdminEventRegistrationMethod;
  registrationUrl: string | null;
  registrationValue: string | null;
  registrationRequired: boolean;
  registrationDeadline: string | null;
  capacity: number | null;
  languages: string[];
  priceLabelUz: string;
  priceLabelDe: string;
  officialSourceName: string | null;
  officialSourceUrl: string | null;
  verifiedAt: string | null;
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
  event_status: string;
  start_date: string | Date | null;
  end_date: string | Date | null;
  start_time: string | null;
  end_time: string | null;
  city: string | null;
  bundesland: string | null;
  organizer_type: string;
  organizer_name: string;
  registration_status: string;
  registration_method: string;
  verified_at: string | Date | null;
  status: string;
  featured: boolean;
  updated_at: string | Date;
};

type AdminEventRow = AdminEventSummaryRow & {
  excerpt_uz: string;
  excerpt_de: string;
  description_uz: string[];
  description_de: string[];
  timezone: string;
  venue_name: string | null;
  address: string | null;
  online_url: string | null;
  organizer_url: string | null;
  registration_url: string | null;
  registration_value: string | null;
  registration_required: boolean;
  registration_deadline: string | Date | null;
  capacity: number | null;
  languages: string[];
  price_label_uz: string;
  price_label_de: string;
  official_source_name: string | null;
  official_source_url: string | null;
  important_notes_uz: string[];
  important_notes_de: string[];
  created_at: string | Date;
};

function normalizeStatus(value: string): AdminEventStatus {
  if (value === "published" || value === "archived") {
    return value;
  }

  return "draft";
}

function normalizeCategory(value: string): AdminEventCategory {
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

function normalizeFormat(value: string): AdminEventFormat {
  if (value === "online" || value === "hybrid") {
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

function normalizeOperationalStatus(
  value: string,
): AdminEventOperationalStatus {
  if (value === "planning" || value === "cancelled") {
    return value;
  }

  return "scheduled";
}

function normalizeOrganizerType(
  value: string,
): AdminEventOrganizerType {
  return value === "vatandoshlar"
    ? "vatandoshlar"
    : "external";
}

function normalizeRegistrationMethod(
  value: string,
): AdminEventRegistrationMethod {
  if (
    value === "google_form" ||
    value === "telegram" ||
    value === "email" ||
    value === "phone" ||
    value === "none"
  ) {
    return value;
  }

  return "external_url";
}

function toDateString(
  value: string | Date,
): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

function toNullableDateString(
  value: string | Date | null,
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

function toSummary(
  row: AdminEventSummaryRow,
): AdminEventSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    category: normalizeCategory(row.category),
    format: normalizeFormat(row.format),
    eventStatus:
      normalizeOperationalStatus(
        row.event_status,
      ),
    startDate:
      toNullableDateString(
        row.start_date,
      ),
    endDate:
      toNullableDateString(
        row.end_date,
      ),
    startTime: row.start_time,
    endTime: row.end_time,
    city: row.city,
    bundesland: row.bundesland,
    organizerType:
      normalizeOrganizerType(
        row.organizer_type,
      ),
    organizerName: row.organizer_name,
    registrationStatus:
      normalizeRegistrationStatus(
        row.registration_status,
      ),
    registrationMethod:
      normalizeRegistrationMethod(
        row.registration_method,
      ),
    verifiedAt:
      toNullableDateString(
        row.verified_at,
      ),
    status:
      normalizeStatus(
        row.status,
      ),
    featured: row.featured,
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

function toDetail(
  row: AdminEventRow,
): AdminEvent {
  return {
    ...toSummary(row),
    excerptUz: row.excerpt_uz,
    excerptDe: row.excerpt_de,
    descriptionUz: row.description_uz,
    descriptionDe: row.description_de,
    timezone: row.timezone,
    venueName: row.venue_name,
    address: row.address,
    onlineUrl: row.online_url,
    organizerUrl: row.organizer_url,
    registrationUrl:
      row.registration_url,
    registrationValue:
      row.registration_value,
    registrationRequired:
      row.registration_required,
    registrationDeadline:
      toNullableDateString(
        row.registration_deadline,
      ),
    capacity: row.capacity,
    languages: row.languages,
    priceLabelUz: row.price_label_uz,
    priceLabelDe: row.price_label_de,
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
          event_status,
          start_date,
          end_date,
          start_time::text,
          end_time::text,
          city,
          bundesland,
          organizer_type,
          organizer_name,
          registration_status,
          registration_method,
          verified_at,
          status,
          featured,
          updated_at
        FROM events
        ORDER BY
          start_date DESC NULLS LAST,
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(toSummary);
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

  const row = result.rows[0];

  return row ? toDetail(row) : null;
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
          event_status,
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
          important_notes_uz,
          important_notes_de,
          status,
          featured
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
          $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
          $31,$32,$33,$34,$35,$36,$37,$38,
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
        input.eventStatus,
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
        input.organizerType,
        input.organizerName,
        input.organizerUrl,
        input.registrationStatus,
        input.registrationMethod,
        input.registrationUrl,
        input.registrationValue,
        input.registrationRequired,
        input.registrationDeadline,
        input.capacity,
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

  const row = result.rows[0];

  if (!row) {
    throw new Error(
      "Event was not created.",
    );
  }

  return row.id;
}

export async function updateAdminEvent(
  id: string,
  input: AdminEventInput,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE events
        SET
          slug = $1,
          title_uz = $2,
          title_de = $3,
          excerpt_uz = $4,
          excerpt_de = $5,
          description_uz = $6,
          description_de = $7,
          category = $8,
          format = $9,
          event_status = $10,
          start_date = $11,
          end_date = $12,
          start_time = $13,
          end_time = $14,
          timezone = $15,
          city = $16,
          bundesland = $17,
          venue_name = $18,
          address = $19,
          online_url = $20,
          organizer_type = $21,
          organizer_name = $22,
          organizer_url = $23,
          registration_status = $24,
          registration_method = $25,
          registration_url = $26,
          registration_value = $27,
          registration_required = $28,
          registration_deadline = $29,
          capacity = $30,
          languages = $31,
          price_label_uz = $32,
          price_label_de = $33,
          official_source_name = $34,
          official_source_url = $35,
          verified_at = $36,
          important_notes_uz = $37,
          important_notes_de = $38,
          updated_at = NOW()
        WHERE id = $39
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
        input.eventStatus,
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
        input.organizerType,
        input.organizerName,
        input.organizerUrl,
        input.registrationStatus,
        input.registrationMethod,
        input.registrationUrl,
        input.registrationValue,
        input.registrationRequired,
        input.registrationDeadline,
        input.capacity,
        input.languages,
        input.priceLabelUz,
        input.priceLabelDe,
        input.officialSourceName,
        input.officialSourceUrl,
        input.verifiedAt,
        input.importantNotesUz,
        input.importantNotesDe,
        id,
      ],
    );

  return (result.rowCount ?? 0) > 0;
}

export async function updateAdminEventStatus(
  id: string,
  status: AdminEventStatus,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE events
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

export async function setAdminEventFeatured(
  id: string,
  enabled: boolean,
): Promise<
  "updated" | "not_found" | "not_published"
> {
  const result =
    await getDb().query<{
      status: string;
    }>(
      `
        SELECT status
        FROM events
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const event = result.rows[0];

  if (!event) {
    return "not_found";
  }

  if (
    enabled &&
    event.status !== "published"
  ) {
    return "not_published";
  }

  await getDb().query(
    `
      UPDATE events
      SET
        featured = $1,
        updated_at = NOW()
      WHERE id = $2
    `,
    [enabled, id],
  );

  return "updated";
}
