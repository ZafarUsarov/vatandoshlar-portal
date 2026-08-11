import { getDb } from "@/lib/db";

export type AdminServiceStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminServiceCategory =
  | "translation"
  | "legal"
  | "tax"
  | "medical"
  | "craft"
  | "consumer";

export type AdminServiceSummary = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  shortTitleUz: string;
  shortTitleDe: string;
  category: AdminServiceCategory;
  status: AdminServiceStatus;
  featured: boolean;
  updatedAt: string;
};

export type AdminService = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  shortTitleUz: string;
  shortTitleDe: string;
  descriptionUz: string;
  descriptionDe: string;
  category: AdminServiceCategory;
  icon: string;
  servicesUz: string[];
  servicesDe: string[];
  verificationStepsUz: string[];
  verificationStepsDe: string[];
  importantNotesUz: string[];
  importantNotesDe: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescriptionUz: string;
  sourceDescriptionDe: string;
  locationUz: string;
  locationDe: string;
  status: AdminServiceStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminServiceInput = {
  slug: string;
  titleUz: string;
  titleDe: string;
  shortTitleUz: string;
  shortTitleDe: string;
  descriptionUz: string;
  descriptionDe: string;
  category: AdminServiceCategory;
  icon: string;
  servicesUz: string[];
  servicesDe: string[];
  verificationStepsUz: string[];
  verificationStepsDe: string[];
  importantNotesUz: string[];
  importantNotesDe: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescriptionUz: string;
  sourceDescriptionDe: string;
  locationUz: string;
  locationDe: string;
};

type AdminServiceSummaryRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  short_title_uz: string;
  short_title_de: string;
  category: string;
  status: string;
  featured: boolean;
  updated_at: string | Date;
};

type AdminServiceRow = {
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
  verification_steps_uz: string[];
  verification_steps_de: string[];
  important_notes_uz: string[];
  important_notes_de: string[];
  official_source_name: string;
  official_source_url: string;
  source_description_uz: string;
  source_description_de: string;
  location_uz: string;
  location_de: string;
  status: string;
  featured: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

function normalizeStatus(
  status: string,
): AdminServiceStatus {
  if (
    status === "published" ||
    status === "archived"
  ) {
    return status;
  }

  return "draft";
}

function normalizeCategory(
  category: string,
): AdminServiceCategory {
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

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toAdminServiceSummary(
  row: AdminServiceSummaryRow,
): AdminServiceSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    shortTitleUz: row.short_title_uz,
    shortTitleDe: row.short_title_de,
    category: normalizeCategory(row.category),
    status: normalizeStatus(row.status),
    featured: row.featured,
    updatedAt: toDateTimeString(row.updated_at),
  };
}

function toAdminService(
  row: AdminServiceRow,
): AdminService {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    shortTitleUz: row.short_title_uz,
    shortTitleDe: row.short_title_de,
    descriptionUz: row.description_uz,
    descriptionDe: row.description_de,
    category: normalizeCategory(row.category),
    icon: row.icon,
    servicesUz: row.services_uz,
    servicesDe: row.services_de,
    verificationStepsUz: row.verification_steps_uz,
    verificationStepsDe: row.verification_steps_de,
    importantNotesUz: row.important_notes_uz,
    importantNotesDe: row.important_notes_de,
    officialSourceName: row.official_source_name,
    officialSourceUrl: row.official_source_url,
    sourceDescriptionUz: row.source_description_uz,
    sourceDescriptionDe: row.source_description_de,
    locationUz: row.location_uz,
    locationDe: row.location_de,
    status: normalizeStatus(row.status),
    featured: row.featured,
    createdAt: toDateTimeString(row.created_at),
    updatedAt: toDateTimeString(row.updated_at),
  };
}

export async function getAdminServices(): Promise<
  AdminServiceSummary[]
> {
  const result =
    await getDb().query<AdminServiceSummaryRow>(
      `
        SELECT
          id::text,
          slug,
          title_uz,
          title_de,
          short_title_uz,
          short_title_de,
          category,
          status,
          featured,
          updated_at
        FROM services
        ORDER BY
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toAdminServiceSummary,
  );
}

export async function getAdminServiceById(
  id: string,
): Promise<AdminService | null> {
  const result =
    await getDb().query<AdminServiceRow>(
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
          status,
          featured,
          created_at,
          updated_at
        FROM services
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row = result.rows[0];

  return row
    ? toAdminService(row)
    : null;
}

export async function createAdminService(
  input: AdminServiceInput,
): Promise<string> {
  const result =
    await getDb().query<{
      id: string;
    }>(
      `
        INSERT INTO services (
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
          status,
          featured
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,
          $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,
          'draft',
          FALSE
        )
        RETURNING id::text
      `,
      [
        input.slug,
        input.titleUz,
        input.titleDe,
        input.shortTitleUz,
        input.shortTitleDe,
        input.descriptionUz,
        input.descriptionDe,
        input.category,
        input.icon,
        input.servicesUz,
        input.servicesDe,
        input.verificationStepsUz,
        input.verificationStepsDe,
        input.importantNotesUz,
        input.importantNotesDe,
        input.officialSourceName,
        input.officialSourceUrl,
        input.sourceDescriptionUz,
        input.sourceDescriptionDe,
        input.locationUz,
        input.locationDe,
      ],
    );

  const row = result.rows[0];

  if (!row) {
    throw new Error(
      "Service was not created.",
    );
  }

  return row.id;
}

export async function updateAdminService(
  id: string,
  input: AdminServiceInput,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE services
        SET
          slug = $1,
          title_uz = $2,
          title_de = $3,
          short_title_uz = $4,
          short_title_de = $5,
          description_uz = $6,
          description_de = $7,
          category = $8,
          icon = $9,
          services_uz = $10,
          services_de = $11,
          verification_steps_uz = $12,
          verification_steps_de = $13,
          important_notes_uz = $14,
          important_notes_de = $15,
          official_source_name = $16,
          official_source_url = $17,
          source_description_uz = $18,
          source_description_de = $19,
          location_uz = $20,
          location_de = $21,
          updated_at = NOW()
        WHERE id = $22
      `,
      [
        input.slug,
        input.titleUz,
        input.titleDe,
        input.shortTitleUz,
        input.shortTitleDe,
        input.descriptionUz,
        input.descriptionDe,
        input.category,
        input.icon,
        input.servicesUz,
        input.servicesDe,
        input.verificationStepsUz,
        input.verificationStepsDe,
        input.importantNotesUz,
        input.importantNotesDe,
        input.officialSourceName,
        input.officialSourceUrl,
        input.sourceDescriptionUz,
        input.sourceDescriptionDe,
        input.locationUz,
        input.locationDe,
        id,
      ],
    );

  return (
    result.rowCount ?? 0
  ) > 0;
}

export async function updateAdminServiceStatus(
  id: string,
  status: AdminServiceStatus,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE services
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

  return (
    result.rowCount ?? 0
  ) > 0;
}

export async function setAdminServiceFeatured(
  id: string,
  featured: boolean,
): Promise<
  "updated" | "not_found" | "not_published"
> {
  const client =
    await getDb().connect();

  try {
    await client.query(
      "BEGIN",
    );

    const targetResult =
      await client.query<{
        status: string;
      }>(
        `
          SELECT status
          FROM services
          WHERE id = $1
          FOR UPDATE
        `,
        [id],
      );

    const target =
      targetResult.rows[0];

    if (!target) {
      await client.query(
        "ROLLBACK",
      );

      return "not_found";
    }

    if (
      featured &&
      target.status !== "published"
    ) {
      await client.query(
        "ROLLBACK",
      );

      return "not_published";
    }

    if (featured) {
      await client.query(
        `
          UPDATE services
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
        UPDATE services
        SET
          featured = $1,
          updated_at = NOW()
        WHERE id = $2
      `,
      [featured, id],
    );

    await client.query(
      "COMMIT",
    );

    return "updated";
  } catch (error) {
    await client.query(
      "ROLLBACK",
    );

    throw error;
  } finally {
    client.release();
  }
}
