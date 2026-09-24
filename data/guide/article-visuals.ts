const GUIDE_ARTICLE_VISUALS: Readonly<Record<string, string>> = {
  "visas/national-visa": "/images/guide/articles/national-visa.webp",
  "housing-and-living/housing-in-germany": "/images/guide/housing/housing-germany-hero.webp",
};

export function getGuideArticleVisual(
  categorySlug: string,
  articleSlug: string,
): string | undefined {
  return GUIDE_ARTICLE_VISUALS[`${categorySlug}/${articleSlug}`];
}
