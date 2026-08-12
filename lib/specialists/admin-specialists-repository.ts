import { getDb } from "@/lib/db";

export type AdminSpecialistStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminSpecialistCategory =
  | "medical"
  | "legal"
  | "technology"
  | "automotive"
  | "home"
  | "education"
  | "language-teaching"
  | "academic-documents"
  | "beauty"
  | "finance"
  | "creative";

export type AdminSpecialistLanguage =
  | "uz"
  | "de"
  | "ru"
  | "en"
  | "tr";

export type AdminSpecialistSummary = {
  id: string;
  code: string;
  slug: string;
  name: string;
  professionUz: string;
  professionDe: string;
  categories: AdminSpecialistCategory[];
  languages: AdminSpecialistLanguage[];
  city: string | null;
  bundesland: string | null;
  status: AdminSpecialistStatus;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  sponsored: boolean;
  updatedAt: string;
};

export type AdminSpecialist = {
  id: string;
  code: string;
  slug: string;
  name: string;
  professionUz: string;
  professionDe: string;
  shortDescriptionUz: string;
  shortDescriptionDe: string;
  categories: AdminSpecialistCategory[];
  languages: AdminSpecialistLanguage[];
  servicesUz: string[];
  servicesDe: string[];
  city: string | null;
  bundesland: string | null;
  postalCode: string | null;
  serviceAreaUz: string | null;
  serviceAreaDe: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  whatsapp: string | null;
  telegram: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;
  pricingNoteUz: string | null;
  pricingNoteDe: string | null;
  avatarUrl: string | null;
  yearsOfExperience: number | null;
  rating: number | null;
  reviewCount: number | null;
  status: AdminSpecialistStatus;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  sponsored: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminSpecialistInput = {
  code: string;
  slug: string;
  name: string;
  professionUz: string;
  professionDe: string;
  shortDescriptionUz: string;
  shortDescriptionDe: string;
  categories: AdminSpecialistCategory[];
  languages: AdminSpecialistLanguage[];
  servicesUz: string[];
  servicesDe: string[];
  city: string | null;
  bundesland: string | null;
  postalCode: string | null;
  serviceAreaUz: string | null;
  serviceAreaDe: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  whatsapp: string | null;
  telegram: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;
  pricingNoteUz: string | null;
  pricingNoteDe: string | null;
  avatarUrl: string | null;
  yearsOfExperience: number | null;
  rating: number | null;
  reviewCount: number | null;
};

type SummaryRow = {
  id: string;
  code: string;
  slug: string;
  name: string;
  profession_uz: string;
  profession_de: string;
  categories: string[];
  languages: string[];
  city: string | null;
  bundesland: string | null;
  status: string;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  sponsored: boolean;
  updated_at: string | Date;
};

type DetailRow = SummaryRow & {
  short_description_uz: string;
  short_description_de: string;
  services_uz: string[];
  services_de: string[];
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
  created_at: string | Date;
};

const categoryKeys: ReadonlyArray<AdminSpecialistCategory> = [
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

const languageKeys: ReadonlyArray<AdminSpecialistLanguage> = [
  "uz",
  "de",
  "ru",
  "en",
  "tr",
];

function normalizeStatus(status: string): AdminSpecialistStatus {
  if (status === "published" || status === "archived") {
    return status;
  }

  return "draft";
}

function normalizeCategories(
  values: string[],
): AdminSpecialistCategory[] {
  return values.filter(
    (value): value is AdminSpecialistCategory =>
      categoryKeys.includes(value as AdminSpecialistCategory),
  );
}

function normalizeLanguages(
  values: string[],
): AdminSpecialistLanguage[] {
  return values.filter(
    (value): value is AdminSpecialistLanguage =>
      languageKeys.includes(value as AdminSpecialistLanguage),
  );
}

function toDateTimeString(value: string | Date): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toNullableNumber(
  value: string | number | null,
): number | null {
  if (value === null) {
    return null;
  }

  const numericValue =
    typeof value === "number" ? value : Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : null;
}

function toSummary(row: SummaryRow): AdminSpecialistSummary {
  return {
    id: row.id,
    code: row.code,
    slug: row.slug,
    name: row.name,
    professionUz: row.profession_uz,
    professionDe: row.profession_de,
    categories: normalizeCategories(row.categories),
    languages: normalizeLanguages(row.languages),
    city: row.city,
    bundesland: row.bundesland,
    status: normalizeStatus(row.status),
    verified: row.verified,
    featured: row.featured,
    premium: row.premium,
    sponsored: row.sponsored,
    updatedAt: toDateTimeString(row.updated_at),
  };
}

function toDetail(row: DetailRow): AdminSpecialist {
  return {
    ...toSummary(row),
    shortDescriptionUz: row.short_description_uz,
    shortDescriptionDe: row.short_description_de,
    servicesUz: row.services_uz,
    servicesDe: row.services_de,
    postalCode: row.postal_code,
    serviceAreaUz: row.service_area_uz,
    serviceAreaDe: row.service_area_de,
    email: row.email,
    phone: row.phone,
    website: row.website,
    whatsapp: row.whatsapp,
    telegram: row.telegram,
    instagram: row.instagram,
    youtube: row.youtube,
    facebook: row.facebook,
    pricingNoteUz: row.pricing_note_uz,
    pricingNoteDe: row.pricing_note_de,
    avatarUrl: row.avatar_url,
    yearsOfExperience: row.years_of_experience,
    rating: toNullableNumber(row.rating),
    reviewCount: row.review_count,
    createdAt: toDateTimeString(row.created_at),
  };
}

export async function getAdminSpecialists(): Promise<
  AdminSpecialistSummary[]
> {
  const result = await getDb().query<SummaryRow>(
    `
      SELECT
        id::text,
        code,
        slug,
        name,
        profession_uz,
        profession_de,
        categories,
        languages,
        city,
        bundesland,
        status,
        verified,
        featured,
        premium,
        sponsored,
        updated_at
      FROM specialists
      ORDER BY updated_at DESC, id DESC
    `,
  );

  return result.rows.map(toSummary);
}

export async function getAdminSpecialistById(
  id: string,
): Promise<AdminSpecialist | null> {
  const result = await getDb().query<DetailRow>(
    `
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
        status,
        verified,
        featured,
        premium,
        sponsored,
        created_at,
        updated_at
      FROM specialists
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  const row = result.rows[0];

  return row
    ? toDetail(row)
    : null;
}

export async function createAdminSpecialist(
  input: AdminSpecialistInput,
): Promise<string> {
  const result = await getDb().query<{
    id: string;
  }>(
    `
      INSERT INTO specialists (
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
        status,
        verified,
        featured,
        premium,
        sponsored
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
        $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
        'draft',
        FALSE,
        FALSE,
        FALSE,
        FALSE
      )
      RETURNING id::text
    `,
    [
      input.code,
      input.slug,
      input.name,
      input.professionUz,
      input.professionDe,
      input.shortDescriptionUz,
      input.shortDescriptionDe,
      input.categories,
      input.languages,
      input.servicesUz,
      input.servicesDe,
      input.city,
      input.bundesland,
      input.postalCode,
      input.serviceAreaUz,
      input.serviceAreaDe,
      input.email,
      input.phone,
      input.website,
      input.whatsapp,
      input.telegram,
      input.instagram,
      input.youtube,
      input.facebook,
      input.pricingNoteUz,
      input.pricingNoteDe,
      input.avatarUrl,
      input.yearsOfExperience,
      input.rating,
      input.reviewCount,
    ],
  );

  const row = result.rows[0];

  if (!row) {
    throw new Error("Specialist was not created.");
  }

  return row.id;
}
