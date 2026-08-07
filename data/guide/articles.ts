import type {
  GuideArticle,
  LocalizedGuideArticle,
  SupportedGuideLocale,
} from "../../types/guide";

import { comingToGermanyArticles } from "./articles/coming-to-germany";
import { familyArticles } from "./articles/family";
import { visaArticles } from "./articles/visas";
import { embassyArticles } from "./articles/embassy";
import { afterArrivalArticles } from "./articles/after-arrival";
import { invitationArticles } from "./articles/invitation";
import { documentArticles } from "./articles/documents";
import { languageArticles } from "./articles/language";
import { educationArticles } from "./articles/education";
import { careerArticles } from "./articles/career";
import { recognitionArticles } from "./articles/recognition";
import { integrationArticles } from "./articles/integration";

export const localizedGuideArticles: ReadonlyArray<LocalizedGuideArticle> = [
  ...comingToGermanyArticles,
  ...familyArticles,
  ...visaArticles,
  ...embassyArticles,
  ...afterArrivalArticles,
  ...invitationArticles,
  ...documentArticles,
  ...languageArticles,
  ...educationArticles,
  ...careerArticles,
  ...recognitionArticles,
  ...integrationArticles,
];

function localizeArticle(
  article: LocalizedGuideArticle,
  locale: SupportedGuideLocale,
): GuideArticle {
  const localizedSections = Object.fromEntries(
    Object.entries(article.sections).flatMap(
      ([key, section]) => {
        if (!section) {
          return [];
        }

        return [
          [
            key,
            {
              title: section.title[locale],
              paragraphs:
                section.paragraphs?.map(
                  (paragraph) => paragraph[locale],
                ) ?? [],
              items:
                section.items?.map(
                  (item) => item[locale],
                ) ?? [],
            },
          ],
        ];
      },
    ),
  ) as GuideArticle["sections"];

  return {
    id: article.id,
    slug: article.slug,
    categorySlug: article.categorySlug,
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    intro: article.intro[locale],
    status: article.status,
    featured: article.featured,
    lastReviewedAt: article.lastReviewedAt,
    readingTime: article.readingTime[locale],
    facts: article.facts.map((fact) => ({
      label: fact.label[locale],
      value: fact.value[locale],
    })),
    sections: localizedSections,
    steps: article.steps.map((step) => ({
      title: step.title[locale],
      description: step.description[locale],
    })),
    faq: article.faq.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale],
    })),
    sources: article.sources,
    relatedArticleSlugs: article.relatedArticleSlugs,
  };
}

export function getGuideArticlesByCategory(
  categorySlug: string,
  locale: SupportedGuideLocale,
): ReadonlyArray<GuideArticle> {
  return localizedGuideArticles
    .filter(
      (article) =>
        article.categorySlug === categorySlug &&
        article.status === "published",
    )
    .map((article) => localizeArticle(article, locale));
}

export function getGuideArticleBySlug(
  categorySlug: string,
  articleSlug: string,
  locale: SupportedGuideLocale,
): GuideArticle | undefined {
  const article = localizedGuideArticles.find(
    (item) =>
      item.categorySlug === categorySlug &&
      item.slug === articleSlug &&
      item.status === "published",
  );

  return article
    ? localizeArticle(article, locale)
    : undefined;
}


export function getRelatedGuideArticles(
  article: GuideArticle,
  locale: SupportedGuideLocale,
  limit = 3,
): ReadonlyArray<GuideArticle> {
  if (limit <= 0 || article.relatedArticleSlugs.length === 0) {
    return [];
  }

  const relatedSlugOrder = new Map(
    article.relatedArticleSlugs.map((slug, index) => [
      slug,
      index,
    ]),
  );

  return localizedGuideArticles
    .filter(
      (item) =>
        item.status === "published" &&
        item.slug !== article.slug &&
        relatedSlugOrder.has(item.slug),
    )
    .sort(
      (firstArticle, secondArticle) =>
        (relatedSlugOrder.get(firstArticle.slug) ?? 0) -
        (relatedSlugOrder.get(secondArticle.slug) ?? 0),
    )
    .slice(0, limit)
    .map((item) => localizeArticle(item, locale));
}

export type AdjacentGuideArticles = Readonly<{
  previous?: GuideArticle;
  next?: GuideArticle;
}>;

export function getAdjacentGuideArticles(
  categorySlug: string,
  articleSlug: string,
  locale: SupportedGuideLocale,
): AdjacentGuideArticles {
  const categoryArticles = localizedGuideArticles.filter(
    (article) =>
      article.categorySlug === categorySlug &&
      article.status === "published",
  );

  const currentIndex = categoryArticles.findIndex(
    (article) => article.slug === articleSlug,
  );

  if (currentIndex === -1) {
    return {};
  }

  const previousArticle = categoryArticles[currentIndex - 1];
  const nextArticle = categoryArticles[currentIndex + 1];

  return {
    previous: previousArticle
      ? localizeArticle(previousArticle, locale)
      : undefined,
    next: nextArticle
      ? localizeArticle(nextArticle, locale)
      : undefined,
  };
}

export function getGuideArticleStaticParams(): Array<{
  category: string;
  article: string;
}> {
  return localizedGuideArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      category: article.categorySlug,
      article: article.slug,
    }));
}
