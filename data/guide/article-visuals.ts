const GUIDE_ARTICLE_VISUALS: Readonly<Record<string, string>> = {
  "visas/national-visa": "/images/guide/articles/national-visa.webp",
};

export function getGuideArticleVisual(
  categorySlug: string,
  articleSlug: string,
): string | undefined {
  return GUIDE_ARTICLE_VISUALS[`${categorySlug}/${articleSlug}`];
}
