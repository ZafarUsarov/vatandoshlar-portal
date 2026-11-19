import { getDb } from "@/lib/db";
import { getPublishedNewsBySlug } from "@/lib/news/public-news-repository";
import { getActiveFeaturedContent, localizeFeaturedContent } from "./featured-repository";
import type { FeaturedLocale } from "@/types/featured-content";

export type HomeFeatured = {
  title: string;
  description: string | null;
  category: string;
  imageUrl: string | null;
  href: string;
  cta: string;
};

export async function resolveHomeFeatured(locale: FeaturedLocale): Promise<HomeFeatured> {
  const de = locale === "de";
  const fallbackCta = de ? "Mehr erfahren" : "Batafsil";
  let active = null;
  if (process.env.DATABASE_URL) {
    try {
      active = await getActiveFeaturedContent();
    } catch (error) {
      // Allow deploying the UI before the additive migration is applied.
      if (!(error && typeof error === "object" && "code" in error && error.code === "42P01")) throw error;
    }
  }
  if (active) {
    const item = localizeFeaturedContent(active, locale);
    if (item.contentType === "article") {
      const source = item.sourceId;
      if (source && /^[1-9]\d*$/.test(source)) {
        const result = await getDb().query<{ slug: string }>(
          "SELECT slug FROM news_articles WHERE id::text = $1 AND status = 'published' LIMIT 1", [source],
        );
        const slug = result.rows[0]?.slug;
        const article = slug ? await getPublishedNewsBySlug(slug, locale) : null;
        if (article) return {
          title: item.title || article.title,
          description: item.description || article.excerpt || null,
          category: item.category || article.category,
          imageUrl: item.imageUrl || article.imageUrl || null,
          href: `/news/${article.slug}`,
          cta: item.ctaLabel || fallbackCta,
        };
      }
    } else if (item.title && item.internalPath.startsWith("/") && !item.internalPath.startsWith("//")) {
      return {
        title: item.title,
        description: item.description,
        category: item.category || (de ? "Hauptthema" : "Asosiy mavzu"),
        imageUrl: item.imageUrl,
        href: item.internalPath,
        cta: item.ctaLabel || fallbackCta,
      };
    }
  }
  return {
    title: de
      ? "Usbekische Fachkräfte in Deutschland"
      : "Germaniyadagi özbek mutaxassislari",
    description: de
      ? "Entdecken Sie usbekische Fachkräfte aus verschiedenen Bereichen in Deutschland."
      : "Germaniyada turli sohalarda faoliyat yuritayotgan özbek mutaxassislari.",
    category: de ? "FACHKRÄFTE" : "MUTAXASSISLAR",
    imageUrl: "/images/home/featured/uzde-specialists-featured.webp",
    href: "/specialists",
    cta: de ? "Fachkräfte entdecken" : "Mutaxassislarni körish",
  };
}
