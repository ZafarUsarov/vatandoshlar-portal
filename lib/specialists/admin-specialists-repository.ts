import { getDb } from "@/lib/db";

export type AdminSpecialistStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminSpecialistCategory =
  | "medical"
  | "legal"
  | "technology"
  | "entrepreneur"
  | "automotive"
  | "home"
  | "education"
  | "language-teaching"
  | "academic-documents"
  | "beauty"
  | "finance"
  | "creative"
  | "science";

export type AdminSpecialistLanguage =
  | "uz"
  | "de"
  | "ru"
  | "en"
  | "tr";

export type AdminSpecialistAchievement = {
  year: string;
  titleUz: string;
  titleDe: string;
  awardUz: string | null;
  awardDe: string | null;
  sourceUrl: string | null;
};

export type AdminSpecialistFlag =
  | "verified"
  | "featured"
  | "premium"
  | "sponsored";

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
  profileUz: string[];
  profileDe: string[];
  educationUz: string[];
  educationDe: string[];
  membershipsUz: string[];
  membershipsDe: string[];
  achievements: AdminSpecialistAchievement[];
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
  googleScholar: string | null;
  researchGate: string | null;
  github: string | null;
  linkedin: string | null;
  pricingNoteUz: string | null;
  pricingNoteDe: string | null;
  avatarUrl: string | null;
  imageFit: "cover" | "contain" | null;
  imagePosition: string | null;
  imageScale: number | null;
  avatarCredit: string | null;
  avatarSourceUrl: string | null;
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
  profileUz: string[];
  profileDe: string[];
  educationUz: string[];
  educationDe: string[];
  membershipsUz: string[];
  membershipsDe: string[];
  achievements: AdminSpecialistAchievement[];
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
  googleScholar: string | null;
  researchGate: string | null;
  github: string | null;
  linkedin: string | null;
  pricingNoteUz: string | null;
  pricingNoteDe: string | null;
  avatarUrl: string | null;
  imageFit: "cover" | "contain" | null;
  imagePosition: string | null;
  imageScale: number | null;
  avatarCredit: string | null;
  avatarSourceUrl: string | null;
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
  profile_uz: string[];
  profile_de: string[];
  education_uz: string[];
  education_de: string[];
  memberships_uz: string[];
  memberships_de: string[];
  achievements: unknown;
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
  google_scholar: string | null;
  research_gate: string | null;
  github: string | null;
  linkedin: string | null;
  pricing_note_uz: string | null;
  pricing_note_de: string | null;
  avatar_url: string | null;
  image_fit: "cover" | "contain" | null;
  image_position: string | null;
  image_scale: string | number | null;
  avatar_credit: string | null;
  avatar_source_url: string | null;
  years_of_experience: number | null;
  rating: string | number | null;
  review_count: number | null;
  created_at: string | Date;
};

const categoryKeys: ReadonlyArray<AdminSpecialistCategory> = [
  "medical",
  "legal",
  "technology",
  "entrepreneur",
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
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : null;
}

function normalizeAchievements(value: unknown): AdminSpecialistAchievement[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    if (typeof row.year !== "string" || typeof row.title_uz !== "string" || typeof row.title_de !== "string") return [];
    return [{
      year: row.year,
      titleUz: row.title_uz,
      titleDe: row.title_de,
      awardUz: typeof row.award_uz === "string" ? row.award_uz : null,
      awardDe: typeof row.award_de === "string" ? row.award_de : null,
      sourceUrl: typeof row.source_url === "string" ? row.source_url : null,
    }];
  });
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
    profileUz: row.profile_uz,
    profileDe: row.profile_de,
    educationUz: row.education_uz,
    educationDe: row.education_de,
    membershipsUz: row.memberships_uz,
    membershipsDe: row.memberships_de,
    achievements: normalizeAchievements(row.achievements),
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
    googleScholar: row.google_scholar,
    researchGate: row.research_gate,
    github: row.github,
    linkedin: row.linkedin,
    pricingNoteUz: row.pricing_note_uz,
    pricingNoteDe: row.pricing_note_de,
    avatarUrl: row.avatar_url,
    imageFit: row.image_fit,
    imagePosition: row.image_position,
    imageScale: toNullableNumber(row.image_scale),
    avatarCredit: row.avatar_credit,
    avatarSourceUrl: row.avatar_source_url,
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
        profile_uz,
        profile_de,
        education_uz,
        education_de,
        memberships_uz,
        memberships_de,
        achievements,
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
        google_scholar,
        research_gate,
        github,
        linkedin,
        pricing_note_uz,
        pricing_note_de,
        avatar_url,
        image_fit,
        image_position,
        image_scale,
        avatar_credit,
        avatar_source_url,
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
        profile_uz,
        profile_de,
        education_uz,
        education_de,
        memberships_uz,
        memberships_de,
        achievements,
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
        google_scholar,
        research_gate,
        github,
        linkedin,
        pricing_note_uz,
        pricing_note_de,
        avatar_url,
        image_fit,
        image_position,
        image_scale,
        avatar_credit,
        avatar_source_url,
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
        $31,$32,$33,$34,$35,$36,$37,$38,$39,$40,
        $41,$42,$43,$44,$45,$46,
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
      input.profileUz,
      input.profileDe,
      input.educationUz,
      input.educationDe,
      input.membershipsUz,
      input.membershipsDe,
      JSON.stringify(input.achievements.map((item) => ({ year: item.year, title_uz: item.titleUz, title_de: item.titleDe, award_uz: item.awardUz, award_de: item.awardDe, source_url: item.sourceUrl }))),
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
      input.googleScholar,
      input.researchGate,
      input.github,
      input.linkedin,
      input.pricingNoteUz,
      input.pricingNoteDe,
      input.avatarUrl,
      input.imageFit,
      input.imagePosition,
      input.imageScale,
      input.avatarCredit,
      input.avatarSourceUrl,
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

export async function updateAdminSpecialist(
  id: string,
  input: AdminSpecialistInput,
): Promise<boolean> {
  const achievements = JSON.stringify(input.achievements.map((item) => ({
    year: item.year, title_uz: item.titleUz, title_de: item.titleDe,
    award_uz: item.awardUz, award_de: item.awardDe, source_url: item.sourceUrl,
  })));
  const values = [
    input.code, input.slug, input.name, input.professionUz, input.professionDe,
    input.shortDescriptionUz, input.shortDescriptionDe, input.categories, input.languages,
    input.servicesUz, input.servicesDe, input.profileUz, input.profileDe, input.educationUz, input.educationDe,
    input.membershipsUz, input.membershipsDe, achievements, input.city, input.bundesland, input.postalCode,
    input.serviceAreaUz, input.serviceAreaDe, input.email, input.phone, input.website, input.whatsapp, input.telegram,
    input.instagram, input.youtube, input.facebook, input.googleScholar, input.researchGate, input.github, input.linkedin,
    input.pricingNoteUz, input.pricingNoteDe, input.avatarUrl, input.imageFit, input.imagePosition, input.imageScale,
    input.avatarCredit, input.avatarSourceUrl, input.yearsOfExperience, input.rating, input.reviewCount, id,
  ];
  const result = await getDb().query(
    `UPDATE specialists SET
      code=$1, slug=$2, name=$3, profession_uz=$4, profession_de=$5, short_description_uz=$6, short_description_de=$7,
      categories=$8, languages=$9, services_uz=$10, services_de=$11, profile_uz=$12, profile_de=$13, education_uz=$14, education_de=$15,
      memberships_uz=$16, memberships_de=$17, achievements=$18::jsonb, city=$19, bundesland=$20, postal_code=$21, service_area_uz=$22, service_area_de=$23,
      email=$24, phone=$25, website=$26, whatsapp=$27, telegram=$28, instagram=$29, youtube=$30, facebook=$31, google_scholar=$32, research_gate=$33,
      github=$34, linkedin=$35, pricing_note_uz=$36, pricing_note_de=$37, avatar_url=$38, image_fit=$39, image_position=$40, image_scale=$41,
      avatar_credit=$42, avatar_source_url=$43, years_of_experience=$44, rating=$45, review_count=$46, updated_at=NOW() WHERE id=$47`,
    values,
  );
  return (result.rowCount ?? 0) > 0;
}

export async function updateAdminSpecialistStatus(
  id: string,
  status: AdminSpecialistStatus,
): Promise<boolean> {
  const result = await getDb().query(
    `
      UPDATE specialists
      SET
        status = $1,
        featured =
          CASE
            WHEN $1 = 'published'
              THEN featured
            ELSE FALSE
          END,
        premium =
          CASE
            WHEN $1 = 'published'
              THEN premium
            ELSE FALSE
          END,
        sponsored =
          CASE
            WHEN $1 = 'published'
              THEN sponsored
            ELSE FALSE
          END,
        updated_at = NOW()
      WHERE id = $2
    `,
    [status, id],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function setAdminSpecialistFlag(
  id: string,
  flag: AdminSpecialistFlag,
  enabled: boolean,
): Promise<
  "updated" | "not_found" | "not_published"
> {
  const result = await getDb().query<{
    status: string;
  }>(
    `
      SELECT status
      FROM specialists
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  const specialist = result.rows[0];

  if (!specialist) {
    return "not_found";
  }

  if (
    flag !== "verified" &&
    enabled &&
    specialist.status !== "published"
  ) {
    return "not_published";
  }

  const column =
    flag === "verified"
      ? "verified"
      : flag === "featured"
        ? "featured"
        : flag === "premium"
          ? "premium"
          : "sponsored";

  await getDb().query(
    `
      UPDATE specialists
      SET
        ${column} = $1,
        updated_at = NOW()
      WHERE id = $2
    `,
    [enabled, id],
  );

  return "updated";
}
