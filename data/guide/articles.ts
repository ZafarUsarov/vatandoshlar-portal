import type {
  GuideArticle,
  LocalizedGuideArticle,
  SupportedGuideLocale,
} from "../../types/guide";

/**
 * Guide maqolalari keyingi bosqichlarda shu ro‘yxatga qo‘shiladi.
 * Guide-Artikel werden in den nächsten Phasen hier ergänzt.
 */
export const localizedGuideArticles: ReadonlyArray<LocalizedGuideArticle> = [];

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
    .map((article) => ({
      id: article.id,
      slug: article.slug,
      categorySlug: article.categorySlug,
      title: article.title[locale],
      excerpt: article.excerpt[locale],
      status: article.status,
      featured: article.featured,
      lastReviewedAt: article.lastReviewedAt,
    }));
}
