import { NextResponse } from "next/server";

import {
  getGuideCategories,
  getGuideCategoryBySlug,
} from "../../../data/guide/categories";
import type {
  GlobalSearchItem,
} from "../../../data/searchIndex";
import {
  getPublishedGuideArticlesByCategory,
  isPublicGuideCategorySlug,
} from "../../../lib/guide/public-guide-repository";
import type {
  SupportedGuideLocale,
} from "../../../types/guide";

export const dynamic = "force-dynamic";

function getLocale(
  request: Request,
): SupportedGuideLocale {
  const url = new URL(request.url);

  return url.searchParams.get("locale") === "de"
    ? "de"
    : "uz";
}

export async function GET(
  request: Request,
): Promise<NextResponse> {
  const locale = getLocale(request);

  const categories =
    getGuideCategories(locale).filter((category) =>
      isPublicGuideCategorySlug(category.slug),
    );

  const articleGroups = await Promise.all(
    categories.map(async (category) => {
      if (!isPublicGuideCategorySlug(category.slug)) {
        return [];
      }

      const articles =
        await getPublishedGuideArticlesByCategory(
          category.slug,
          locale,
        );

      const localizedCategory =
        getGuideCategoryBySlug(
          category.slug,
          locale,
        );

      const categoryTitle =
        localizedCategory?.title ??
        category.title;

      return articles.map(
        (article): GlobalSearchItem => ({
          id: `guide-article-${article.id}`,
          title: article.title,
          description: article.excerpt,
          href: `/${locale}/guide/${category.slug}/${article.slug}`,
          category: "Qo‘llanma",
          badge: categoryTitle,
          keywords: [
            article.title,
            article.excerpt,
            article.intro,
            article.readingTime,
            categoryTitle,
            ...article.facts.flatMap((fact) => [
              fact.label,
              fact.value,
            ]),
            ...Object.values(article.sections).flatMap(
              (section) =>
                section
                  ? [
                      section.title,
                      ...section.paragraphs,
                      ...section.items,
                    ]
                  : [],
            ),
            ...article.steps.flatMap((step) => [
              step.title,
              step.description,
            ]),
            ...article.faq.flatMap((item) => [
              item.question,
              item.answer,
            ]),
          ],
        }),
      );
    }),
  );

  const items =
    articleGroups.flat();

  return NextResponse.json(
    {
      items,
    },
    {
      headers: {
        "Cache-Control":
          "private, max-age=0, must-revalidate",
      },
    },
  );
}
