import { getDb } from "@/lib/db";

export type AdminJobStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminJobCategory =
  | "students"
  | "english"
  | "minijob"
  | "internship"
  | "professionals"
  | "safety";

export type AdminJobGuideSummary = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  shortTitleUz: string;
  shortTitleDe: string;
  category: AdminJobCategory;
  status: AdminJobStatus;
  featured: boolean;
  verifiedAt: string;
  updatedAt: string;
};

export type AdminJobGuide = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  shortTitleUz: string;
  shortTitleDe: string;
  descriptionUz: string;
  descriptionDe: string;
  category: AdminJobCategory;
  icon: string;
  audienceUz: string;
  audienceDe: string;
  highlightsUz: string[];
  highlightsDe: string[];
  searchKeywords: string[];
  stepsUz: string[];
  stepsDe: string[];
  importantNotesUz: string[];
  importantNotesDe: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescriptionUz: string;
  sourceDescriptionDe: string;
  verifiedAt: string;
  status: AdminJobStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminJobGuideInput = {
  slug: string;
  titleUz: string;
  titleDe: string;
  shortTitleUz: string;
  shortTitleDe: string;
  descriptionUz: string;
  descriptionDe: string;
  category: AdminJobCategory;
  icon: string;
  audienceUz: string;
  audienceDe: string;
  highlightsUz: string[];
  highlightsDe: string[];
  searchKeywords: string[];
  stepsUz: string[];
  stepsDe: string[];
  importantNotesUz: string[];
  importantNotesDe: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescriptionUz: string;
  sourceDescriptionDe: string;
  verifiedAt: string;
};

export type CreateAdminJobGuideInput =
  AdminJobGuideInput;

type AdminJobGuideSummaryRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  short_title_uz: string;
  short_title_de: string;
  category: string;
  status: string;
  featured: boolean;
  verified_at: string | Date;
  updated_at: string | Date;
};

type AdminJobGuideRow = {
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
  steps_uz: string[];
  steps_de: string[];
  important_notes_uz: string[];
  important_notes_de: string[];
  official_source_name: string;
  official_source_url: string;
  source_description_uz: string;
  source_description_de: string;
  verified_at: string | Date;
  status: string;
  featured: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

function normalizeStatus(
  status: string,
): AdminJobStatus {
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
): AdminJobCategory {
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

function toAdminJobGuideSummary(
  row: AdminJobGuideSummaryRow,
): AdminJobGuideSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    shortTitleUz: row.short_title_uz,
    shortTitleDe: row.short_title_de,
    category:
      normalizeCategory(
        row.category,
      ),
    status:
      normalizeStatus(
        row.status,
      ),
    featured:
      row.featured,
    verifiedAt:
      toDateOnlyString(
        row.verified_at,
      ),
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

function toAdminJobGuide(
  row: AdminJobGuideRow,
): AdminJobGuide {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    shortTitleUz:
      row.short_title_uz,
    shortTitleDe:
      row.short_title_de,
    descriptionUz:
      row.description_uz,
    descriptionDe:
      row.description_de,
    category:
      normalizeCategory(
        row.category,
      ),
    icon: row.icon,
    audienceUz:
      row.audience_uz,
    audienceDe:
      row.audience_de,
    highlightsUz:
      row.highlights_uz,
    highlightsDe:
      row.highlights_de,
    searchKeywords:
      row.search_keywords,
    stepsUz:
      row.steps_uz,
    stepsDe:
      row.steps_de,
    importantNotesUz:
      row.important_notes_uz,
    importantNotesDe:
      row.important_notes_de,
    officialSourceName:
      row.official_source_name,
    officialSourceUrl:
      row.official_source_url,
    sourceDescriptionUz:
      row.source_description_uz,
    sourceDescriptionDe:
      row.source_description_de,
    verifiedAt:
      toDateOnlyString(
        row.verified_at,
      ),
    status:
      normalizeStatus(
        row.status,
      ),
    featured:
      row.featured,
    createdAt:
      toDateTimeString(
        row.created_at,
      ),
    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

export async function getAdminJobGuides(): Promise<
  AdminJobGuideSummary[]
> {
  const result =
    await getDb().query<AdminJobGuideSummaryRow>(
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
          verified_at,
          updated_at
        FROM job_guides
        ORDER BY
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toAdminJobGuideSummary,
  );
}

export async function getAdminJobGuideById(
  id: string,
): Promise<AdminJobGuide | null> {
  const result =
    await getDb().query<AdminJobGuideRow>(
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
          status,
          featured,
          created_at,
          updated_at
        FROM job_guides
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row =
    result.rows[0];

  return row
    ? toAdminJobGuide(row)
    : null;
}

export async function createAdminJobGuide(
  input: CreateAdminJobGuideInput,
): Promise<string> {
  const result =
    await getDb().query<{
      id: string;
    }>(
      `
        INSERT INTO job_guides (
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
          status,
          featured
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
          $14,$15,$16,$17,$18,$19,$20,$21,$22,$23,
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
        input.audienceUz,
        input.audienceDe,
        input.highlightsUz,
        input.highlightsDe,
        input.searchKeywords,
        input.stepsUz,
        input.stepsDe,
        input.importantNotesUz,
        input.importantNotesDe,
        input.officialSourceName,
        input.officialSourceUrl,
        input.sourceDescriptionUz,
        input.sourceDescriptionDe,
        input.verifiedAt,
      ],
    );

  const row =
    result.rows[0];

  if (!row) {
    throw new Error(
      "Job guide was not created.",
    );
  }

  return row.id;
}

export async function updateAdminJobGuide(
  id: string,
  input: AdminJobGuideInput,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE job_guides
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
          audience_uz = $10,
          audience_de = $11,
          highlights_uz = $12,
          highlights_de = $13,
          search_keywords = $14,
          steps_uz = $15,
          steps_de = $16,
          important_notes_uz = $17,
          important_notes_de = $18,
          official_source_name = $19,
          official_source_url = $20,
          source_description_uz = $21,
          source_description_de = $22,
          verified_at = $23,
          updated_at = NOW()
        WHERE id = $24
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
        input.audienceUz,
        input.audienceDe,
        input.highlightsUz,
        input.highlightsDe,
        input.searchKeywords,
        input.stepsUz,
        input.stepsDe,
        input.importantNotesUz,
        input.importantNotesDe,
        input.officialSourceName,
        input.officialSourceUrl,
        input.sourceDescriptionUz,
        input.sourceDescriptionDe,
        input.verifiedAt,
        id,
      ],
    );

  return (
    result.rowCount ?? 0
  ) > 0;
}

export async function updateAdminJobGuideStatus(
  id: string,
  status: AdminJobStatus,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE job_guides
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

export async function setAdminJobGuideFeatured(
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
          FROM job_guides
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
      target.status !==
        "published"
    ) {
      await client.query(
        "ROLLBACK",
      );

      return "not_published";
    }

    if (featured) {
      await client.query(
        `
          UPDATE job_guides
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
        UPDATE job_guides
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
