import { randomUUID } from "node:crypto";

import { getDb } from "@/lib/db";

export type AdminGuideArticleStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminGuideCategorySlug =
  | "coming-to-germany"
  | "visas"
  | "family"
  | "invitation"
  | "embassy-and-appointments"
  | "documents"
  | "language-and-certificates"
  | "education"
  | "work-and-career"
  | "after-arrival"
  | "recognition"
  | "integration";

export type AdminGuideArticleSummary = {
  id: string;
  legacyId: string;
  slug: string;
  categorySlug: AdminGuideCategorySlug;
  titleUz: string;
  titleDe: string;
  lastReviewedAt: string;
  status: AdminGuideArticleStatus;
  featured: boolean;
  updatedAt: string;
};

export type AdminGuideFact = {
  label: string;
  value: string;
};

export type AdminGuideSection = {
  title: string;
  paragraphs: string[];
  items: string[];
};

export type AdminGuideStep = {
  title: string;
  description: string;
};

export type AdminGuideFaq = {
  question: string;
  answer: string;
};

export type AdminGuideSource = {
  title: string;
  organization: string;
  url: string;
  language: "de" | "en";
};

export type AdminGuideArticle = {
  id: string;
  legacyId: string;

  slug: string;
  categorySlug: AdminGuideCategorySlug;

  titleUz: string;
  titleDe: string;

  excerptUz: string;
  excerptDe: string;

  introUz: string;
  introDe: string;

  readingTimeUz: string;
  readingTimeDe: string;

  factsUz: AdminGuideFact[];
  factsDe: AdminGuideFact[];

  sectionsUz: Record<
    string,
    AdminGuideSection
  >;

  sectionsDe: Record<
    string,
    AdminGuideSection
  >;

  stepsUz: AdminGuideStep[];
  stepsDe: AdminGuideStep[];

  faqUz: AdminGuideFaq[];
  faqDe: AdminGuideFaq[];

  sources: AdminGuideSource[];

  relatedArticleSlugs: string[];

  lastReviewedAt: string;

  status: AdminGuideArticleStatus;
  featured: boolean;

  createdAt: string;
  updatedAt: string;
};

export type AdminGuideArticleInput = {
  slug: string;
  categorySlug: AdminGuideCategorySlug;

  titleUz: string;
  titleDe: string;

  excerptUz: string;
  excerptDe: string;

  introUz: string;
  introDe: string;

  readingTimeUz: string;
  readingTimeDe: string;

  factsUz: AdminGuideFact[];
  factsDe: AdminGuideFact[];

  sectionsUz: Record<
    string,
    AdminGuideSection
  >;

  sectionsDe: Record<
    string,
    AdminGuideSection
  >;

  stepsUz: AdminGuideStep[];
  stepsDe: AdminGuideStep[];

  faqUz: AdminGuideFaq[];
  faqDe: AdminGuideFaq[];

  sources: AdminGuideSource[];

  relatedArticleSlugs: string[];

  lastReviewedAt: string;
};

type SummaryRow = {
  id: string;
  legacy_id: string;
  slug: string;
  category_slug: string;
  title_uz: string;
  title_de: string;
  last_reviewed_at: string | Date;
  status: string;
  featured: boolean;
  updated_at: string | Date;
};

type DetailRow = SummaryRow & {
  excerpt_uz: string;
  excerpt_de: string;

  intro_uz: string;
  intro_de: string;

  reading_time_uz: string;
  reading_time_de: string;

  facts_uz: unknown;
  facts_de: unknown;

  sections_uz: unknown;
  sections_de: unknown;

  steps_uz: unknown;
  steps_de: unknown;

  faq_uz: unknown;
  faq_de: unknown;

  sources: unknown;

  related_article_slugs: string[];

  created_at: string | Date;
};

export const adminGuideCategorySlugs:
  ReadonlyArray<AdminGuideCategorySlug> = [
    "coming-to-germany",
    "visas",
    "family",
    "invitation",
    "embassy-and-appointments",
    "documents",
    "language-and-certificates",
    "education",
    "work-and-career",
    "after-arrival",
    "recognition",
    "integration",
  ];

function normalizeStatus(
  value: string,
): AdminGuideArticleStatus {
  if (
    value === "published" ||
    value === "archived"
  ) {
    return value;
  }

  return "draft";
}

function normalizeCategorySlug(
  value: string,
): AdminGuideCategorySlug {
  if (
    adminGuideCategorySlugs.includes(
      value as AdminGuideCategorySlug,
    )
  ) {
    return value as AdminGuideCategorySlug;
  }

  return "coming-to-germany";
}

function toDateString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : value.slice(0, 10);
}

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function parseFacts(
  value: unknown,
): AdminGuideFact[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap(
    (item) => {
      if (
        !isObject(item) ||
        typeof item.label !== "string" ||
        typeof item.value !== "string"
      ) {
        return [];
      }

      return [
        {
          label: item.label,
          value: item.value,
        },
      ];
    },
  );
}

function parseSections(
  value: unknown,
): Record<
  string,
  AdminGuideSection
> {
  if (!isObject(value)) {
    return {};
  }

  const entries =
    Object.entries(value).flatMap(
      ([key, item]) => {
        if (
          !isObject(item) ||
          typeof item.title !== "string"
        ) {
          return [];
        }

        const paragraphs =
          Array.isArray(
            item.paragraphs,
          )
            ? item.paragraphs.filter(
                (
                  paragraph,
                ): paragraph is string =>
                  typeof paragraph === "string",
              )
            : [];

        const items =
          Array.isArray(
            item.items,
          )
            ? item.items.filter(
                (
                  listItem,
                ): listItem is string =>
                  typeof listItem === "string",
              )
            : [];

        return [
          [
            key,
            {
              title: item.title,
              paragraphs,
              items,
            },
          ] as const,
        ];
      },
    );

  return Object.fromEntries(
    entries,
  );
}

function parseSteps(
  value: unknown,
): AdminGuideStep[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap(
    (item) => {
      if (
        !isObject(item) ||
        typeof item.title !== "string" ||
        typeof item.description !== "string"
      ) {
        return [];
      }

      return [
        {
          title: item.title,
          description:
            item.description,
        },
      ];
    },
  );
}

function parseFaq(
  value: unknown,
): AdminGuideFaq[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap(
    (item) => {
      if (
        !isObject(item) ||
        typeof item.question !== "string" ||
        typeof item.answer !== "string"
      ) {
        return [];
      }

      return [
        {
          question:
            item.question,
          answer:
            item.answer,
        },
      ];
    },
  );
}

function parseSources(
  value: unknown,
): AdminGuideSource[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap(
    (item) => {
      if (
        !isObject(item) ||
        typeof item.title !== "string" ||
        typeof item.organization !== "string" ||
        typeof item.url !== "string" ||
        (
          item.language !== "de" &&
          item.language !== "en"
        )
      ) {
        return [];
      }

      return [
        {
          title:
            item.title,
          organization:
            item.organization,
          url:
            item.url,
          language:
            item.language,
        },
      ];
    },
  );
}

function toSummary(
  row: SummaryRow,
): AdminGuideArticleSummary {
  return {
    id:
      row.id,
    legacyId:
      row.legacy_id,
    slug:
      row.slug,
    categorySlug:
      normalizeCategorySlug(
        row.category_slug,
      ),
    titleUz:
      row.title_uz,
    titleDe:
      row.title_de,
    lastReviewedAt:
      toDateString(
        row.last_reviewed_at,
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

function toDetail(
  row: DetailRow,
): AdminGuideArticle {
  return {
    ...toSummary(row),

    excerptUz:
      row.excerpt_uz,
    excerptDe:
      row.excerpt_de,

    introUz:
      row.intro_uz,
    introDe:
      row.intro_de,

    readingTimeUz:
      row.reading_time_uz,
    readingTimeDe:
      row.reading_time_de,

    factsUz:
      parseFacts(
        row.facts_uz,
      ),
    factsDe:
      parseFacts(
        row.facts_de,
      ),

    sectionsUz:
      parseSections(
        row.sections_uz,
      ),
    sectionsDe:
      parseSections(
        row.sections_de,
      ),

    stepsUz:
      parseSteps(
        row.steps_uz,
      ),
    stepsDe:
      parseSteps(
        row.steps_de,
      ),

    faqUz:
      parseFaq(
        row.faq_uz,
      ),
    faqDe:
      parseFaq(
        row.faq_de,
      ),

    sources:
      parseSources(
        row.sources,
      ),

    relatedArticleSlugs:
      row.related_article_slugs,

    createdAt:
      toDateTimeString(
        row.created_at,
      ),
  };
}

export async function getAdminGuideArticles(): Promise<
  AdminGuideArticleSummary[]
> {
  const result =
    await getDb().query<SummaryRow>(
      `
        SELECT
          id::text,
          legacy_id,
          slug,
          category_slug,
          title_uz,
          title_de,
          last_reviewed_at,
          status,
          featured,
          updated_at
        FROM guide_articles
        ORDER BY
          category_slug ASC,
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toSummary,
  );
}

export async function getAdminGuideArticleById(
  id: string,
): Promise<AdminGuideArticle | null> {
  const result =
    await getDb().query<DetailRow>(
      `
        SELECT
          id::text,
          legacy_id,
          slug,
          category_slug,
          title_uz,
          title_de,
          excerpt_uz,
          excerpt_de,
          intro_uz,
          intro_de,
          reading_time_uz,
          reading_time_de,
          facts_uz,
          facts_de,
          sections_uz,
          sections_de,
          steps_uz,
          steps_de,
          faq_uz,
          faq_de,
          sources,
          related_article_slugs,
          last_reviewed_at,
          status,
          featured,
          created_at,
          updated_at
        FROM guide_articles
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row =
    result.rows[0];

  return row
    ? toDetail(row)
    : null;
}

export async function createAdminGuideArticle(
  input: AdminGuideArticleInput,
): Promise<string> {
  const legacyId =
    `admin-${randomUUID()}`;

  const result =
    await getDb().query<{
      id: string;
    }>(
      `
        INSERT INTO guide_articles (
          legacy_id,
          slug,
          category_slug,

          title_uz,
          title_de,

          excerpt_uz,
          excerpt_de,

          intro_uz,
          intro_de,

          reading_time_uz,
          reading_time_de,

          facts_uz,
          facts_de,

          sections_uz,
          sections_de,

          steps_uz,
          steps_de,

          faq_uz,
          faq_de,

          sources,
          related_article_slugs,

          last_reviewed_at,

          status,
          featured
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12::jsonb,$13::jsonb,$14::jsonb,$15::jsonb,
          $16::jsonb,$17::jsonb,$18::jsonb,$19::jsonb,
          $20::jsonb,$21,$22,
          'draft',
          FALSE
        )
        RETURNING id::text
      `,
      [
        legacyId,
        input.slug,
        input.categorySlug,

        input.titleUz,
        input.titleDe,

        input.excerptUz,
        input.excerptDe,

        input.introUz,
        input.introDe,

        input.readingTimeUz,
        input.readingTimeDe,

        JSON.stringify(
          input.factsUz,
        ),
        JSON.stringify(
          input.factsDe,
        ),

        JSON.stringify(
          input.sectionsUz,
        ),
        JSON.stringify(
          input.sectionsDe,
        ),

        JSON.stringify(
          input.stepsUz,
        ),
        JSON.stringify(
          input.stepsDe,
        ),

        JSON.stringify(
          input.faqUz,
        ),
        JSON.stringify(
          input.faqDe,
        ),

        JSON.stringify(
          input.sources,
        ),

        input.relatedArticleSlugs,

        input.lastReviewedAt,
      ],
    );

  const row =
    result.rows[0];

  if (!row) {
    throw new Error(
      "Guide article was not created.",
    );
  }

  return row.id;
}

export async function updateAdminGuideArticle(
  id: string,
  input: AdminGuideArticleInput,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE guide_articles
        SET
          slug = $1,
          category_slug = $2,

          title_uz = $3,
          title_de = $4,

          excerpt_uz = $5,
          excerpt_de = $6,

          intro_uz = $7,
          intro_de = $8,

          reading_time_uz = $9,
          reading_time_de = $10,

          facts_uz = $11::jsonb,
          facts_de = $12::jsonb,

          sections_uz = $13::jsonb,
          sections_de = $14::jsonb,

          steps_uz = $15::jsonb,
          steps_de = $16::jsonb,

          faq_uz = $17::jsonb,
          faq_de = $18::jsonb,

          sources = $19::jsonb,
          related_article_slugs = $20,

          last_reviewed_at = $21,

          updated_at = NOW()
        WHERE id = $22
      `,
      [
        input.slug,
        input.categorySlug,

        input.titleUz,
        input.titleDe,

        input.excerptUz,
        input.excerptDe,

        input.introUz,
        input.introDe,

        input.readingTimeUz,
        input.readingTimeDe,

        JSON.stringify(
          input.factsUz,
        ),
        JSON.stringify(
          input.factsDe,
        ),

        JSON.stringify(
          input.sectionsUz,
        ),
        JSON.stringify(
          input.sectionsDe,
        ),

        JSON.stringify(
          input.stepsUz,
        ),
        JSON.stringify(
          input.stepsDe,
        ),

        JSON.stringify(
          input.faqUz,
        ),
        JSON.stringify(
          input.faqDe,
        ),

        JSON.stringify(
          input.sources,
        ),

        input.relatedArticleSlugs,

        input.lastReviewedAt,

        id,
      ],
    );

  return (
    result.rowCount ??
    0
  ) > 0;
}

export async function updateAdminGuideArticleStatus(
  id: string,
  status: AdminGuideArticleStatus,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE guide_articles
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
      [
        status,
        id,
      ],
    );

  return (
    result.rowCount ??
    0
  ) > 0;
}

export async function setAdminGuideArticleFeatured(
  id: string,
  enabled: boolean,
): Promise<
  "updated"
  | "not_found"
  | "not_published"
> {
  const result =
    await getDb().query<{
      status: string;
    }>(
      `
        SELECT status
        FROM guide_articles
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const article =
    result.rows[0];

  if (!article) {
    return "not_found";
  }

  if (
    enabled &&
    article.status !== "published"
  ) {
    return "not_published";
  }

  await getDb().query(
    `
      UPDATE guide_articles
      SET
        featured = $1,
        updated_at = NOW()
      WHERE id = $2
    `,
    [
      enabled,
      id,
    ],
  );

  return "updated";
}
