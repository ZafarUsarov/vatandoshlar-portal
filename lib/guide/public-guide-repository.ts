import { cache } from "react";

import { getDb } from "@/lib/db";
import type {
  GuideArticle,
  GuideArticleSectionKey,
  GuideSource,
  SupportedGuideLocale,
} from "@/types/guide";

export type PublicGuideCategorySlug =
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

type GuideArticleRow = {
  id: string;
  legacy_id: string;

  slug: string;
  category_slug: string;

  title_uz: string;
  title_de: string;

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

  last_reviewed_at:
    | string
    | Date;

  updated_at:
    | string
    | Date;

  featured: boolean;
};

type CategoryCountRow = {
  category_slug: string;
  count: number;
};

const categorySlugs:
  ReadonlyArray<PublicGuideCategorySlug> = [
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

const sectionKeys:
  ReadonlyArray<GuideArticleSectionKey> = [
    "overview",
    "eligibility",
    "requirements",
    "documents",
    "conditions",
    "warnings",
  ];

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
    "DATABASE_URL is not configured for public Guide runtime.",
  );
}

function normalizeCategorySlug(
  value: string,
): PublicGuideCategorySlug | null {
  return categorySlugs.includes(
    value as PublicGuideCategorySlug,
  )
    ? (
        value as PublicGuideCategorySlug
      )
    : null;
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
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : value.slice(0, 10);
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
): GuideArticle["facts"] {
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
          label:
            item.label,
          value:
            item.value,
        },
      ];
    },
  );
}

function parseSections(
  value: unknown,
): GuideArticle["sections"] {
  if (!isObject(value)) {
    return {};
  }

  const entries =
    Object.entries(value).flatMap(
      (
        [
          key,
          item,
        ],
      ) => {
        if (
          !sectionKeys.includes(
            key as GuideArticleSectionKey,
          ) ||
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
            key as GuideArticleSectionKey,
            {
              title:
                item.title,
              paragraphs,
              items,
            },
          ] as const,
        ];
      },
    );

  return Object.fromEntries(
    entries,
  ) as GuideArticle["sections"];
}

function parseSteps(
  value: unknown,
): GuideArticle["steps"] {
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
          title:
            item.title,
          description:
            item.description,
        },
      ];
    },
  );
}

function parseFaq(
  value: unknown,
): GuideArticle["faq"] {
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
): ReadonlyArray<GuideSource> {
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

function toGuideArticle(
  row: GuideArticleRow,
  locale: SupportedGuideLocale,
): GuideArticle | null {
  const categorySlug =
    normalizeCategorySlug(
      row.category_slug,
    );

  if (!categorySlug) {
    return null;
  }

  const isGerman =
    locale === "de";

  return {
    id:
      row.legacy_id ||
      row.id,

    slug:
      row.slug,

    categorySlug,

    title:
      isGerman
        ? row.title_de
        : row.title_uz,

    excerpt:
      isGerman
        ? row.excerpt_de
        : row.excerpt_uz,

    intro:
      isGerman
        ? row.intro_de
        : row.intro_uz,

    status:
      "published",

    featured:
      row.featured,

    lastReviewedAt:
      toDateString(
        row.last_reviewed_at,
      ),

    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),

    readingTime:
      isGerman
        ? row.reading_time_de
        : row.reading_time_uz,

    facts:
      parseFacts(
        isGerman
          ? row.facts_de
          : row.facts_uz,
      ),

    sections:
      parseSections(
        isGerman
          ? row.sections_de
          : row.sections_uz,
      ),

    steps:
      parseSteps(
        isGerman
          ? row.steps_de
          : row.steps_uz,
      ),

    faq:
      parseFaq(
        isGerman
          ? row.faq_de
          : row.faq_uz,
      ),

    sources:
      parseSources(
        row.sources,
      ),

    relatedArticleSlugs:
      row.related_article_slugs,
  };
}

const publishedGuideSelect = `
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
    updated_at,
    featured

  FROM guide_articles
`;

const getPublishedGuideArticlesByCategoryCached =
  cache(
    async (
      categorySlug: PublicGuideCategorySlug,
      locale: SupportedGuideLocale,
    ): Promise<ReadonlyArray<GuideArticle>> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<GuideArticleRow>(
          `
            ${publishedGuideSelect}

            WHERE
              status = 'published'
              AND category_slug = $1

            ORDER BY
              featured DESC,
              last_reviewed_at DESC,
              id ASC
          `,
          [
            categorySlug,
          ],
        );

      return result.rows.flatMap(
        (row) => {
          const article =
            toGuideArticle(
              row,
              locale,
            );

          return article
            ? [article]
            : [];
        },
      );
    },
  );

const getPublishedGuideArticleBySlugCached =
  cache(
    async (
      categorySlug: PublicGuideCategorySlug,
      articleSlug: string,
      locale: SupportedGuideLocale,
    ): Promise<GuideArticle | null> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return null;
      }

      const result =
        await getDb().query<GuideArticleRow>(
          `
            ${publishedGuideSelect}

            WHERE
              status = 'published'
              AND category_slug = $1
              AND slug = $2

            LIMIT 1
          `,
          [
            categorySlug,
            articleSlug,
          ],
        );

      const row =
        result.rows[0];

      return row
        ? toGuideArticle(
            row,
            locale,
          )
        : null;
    },
  );

const getFeaturedPublishedGuideArticlesCached =
  cache(
    async (
      locale: SupportedGuideLocale,
      limit: number,
    ): Promise<ReadonlyArray<GuideArticle>> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return [];
      }

      const result =
        await getDb().query<GuideArticleRow>(
          `
            ${publishedGuideSelect}

            WHERE
              status = 'published'
              AND featured = TRUE

            ORDER BY
              last_reviewed_at DESC,
              id ASC

            LIMIT $1
          `,
          [
            limit,
          ],
        );

      return result.rows.flatMap(
        (row) => {
          const article =
            toGuideArticle(
              row,
              locale,
            );

          return article
            ? [article]
            : [];
        },
      );
    },
  );

const getPublishedGuideArticleCountsCached =
  cache(
    async (): Promise<
      Readonly<Record<PublicGuideCategorySlug, number>>
    > => {
      const emptyCounts =
        Object.fromEntries(
          categorySlugs.map(
            (categorySlug) => [
              categorySlug,
              0,
            ],
          ),
        ) as Record<
          PublicGuideCategorySlug,
          number
        >;

      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi()
      ) {
        return emptyCounts;
      }

      const result =
        await getDb().query<CategoryCountRow>(
          `
            SELECT
              category_slug,
              COUNT(*)::int AS count

            FROM guide_articles

            WHERE
              status = 'published'

            GROUP BY
              category_slug
          `,
        );

      for (
        const row
        of result.rows
      ) {
        const categorySlug =
          normalizeCategorySlug(
            row.category_slug,
          );

        if (!categorySlug) {
          continue;
        }

        emptyCounts[
          categorySlug
        ] =
          row.count;
      }

      return emptyCounts;
    },
  );

const getRelatedPublishedGuideArticlesCached =
  cache(
    async (
      currentCategorySlug: PublicGuideCategorySlug,
      currentSlug: string,
      relatedSlugs: ReadonlyArray<string>,
      locale: SupportedGuideLocale,
      limit: number,
    ): Promise<ReadonlyArray<GuideArticle>> => {
      assertDatabaseAvailable();

      if (
        canSkipDatabaseDuringCi() ||
        relatedSlugs.length === 0
      ) {
        return [];
      }

      const result =
        await getDb().query<GuideArticleRow>(
          `
            ${publishedGuideSelect}

            WHERE
              status = 'published'
              AND slug = ANY($1::text[])
              AND NOT (
                category_slug = $2
                AND slug = $3
              )

            ORDER BY
              array_position(
                $1::text[],
                slug
              ),
              id ASC

            LIMIT $4
          `,
          [
            [
              ...relatedSlugs,
            ],
            currentCategorySlug,
            currentSlug,
            limit,
          ],
        );

      return result.rows.flatMap(
        (row) => {
          const article =
            toGuideArticle(
              row,
              locale,
            );

          return article
            ? [article]
            : [];
        },
      );
    },
  );

export function isPublicGuideCategorySlug(
  value: string,
): value is PublicGuideCategorySlug {
  return categorySlugs.includes(
    value as PublicGuideCategorySlug,
  );
}

export async function getPublishedGuideArticlesByCategory(
  categorySlug: PublicGuideCategorySlug,
  locale: SupportedGuideLocale,
): Promise<ReadonlyArray<GuideArticle>> {
  return getPublishedGuideArticlesByCategoryCached(
    categorySlug,
    locale,
  );
}

export async function getPublishedGuideArticleBySlug(
  categorySlug: PublicGuideCategorySlug,
  articleSlug: string,
  locale: SupportedGuideLocale,
): Promise<GuideArticle | null> {
  return getPublishedGuideArticleBySlugCached(
    categorySlug,
    articleSlug,
    locale,
  );
}

export async function getFeaturedPublishedGuideArticles(
  locale: SupportedGuideLocale,
  limit = 6,
): Promise<ReadonlyArray<GuideArticle>> {
  const normalizedLimit =
    Number.isInteger(
      limit,
    ) &&
    limit > 0
      ? limit
      : 6;

  return getFeaturedPublishedGuideArticlesCached(
    locale,
    normalizedLimit,
  );
}

export async function getPublishedGuideArticleCountsByCategory(): Promise<
  Readonly<Record<PublicGuideCategorySlug, number>>
> {
  return getPublishedGuideArticleCountsCached();
}

export async function getRelatedPublishedGuideArticles(
  currentArticle: GuideArticle,
  locale: SupportedGuideLocale,
  limit = 3,
): Promise<ReadonlyArray<GuideArticle>> {
  if (
    !isPublicGuideCategorySlug(
      currentArticle.categorySlug,
    )
  ) {
    return [];
  }

  const normalizedLimit =
    Number.isInteger(
      limit,
    ) &&
    limit > 0
      ? limit
      : 3;

  return getRelatedPublishedGuideArticlesCached(
    currentArticle.categorySlug,
    currentArticle.slug,
    currentArticle.relatedArticleSlugs,
    locale,
    normalizedLimit,
  );
}
