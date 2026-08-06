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
