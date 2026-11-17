import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GuideExplorer from "../../components/guide/GuideExplorer";
import { Link } from "../../i18n/navigation";
import { getGuideCategories } from "../../data/guide";
import { getFeaturedPublishedGuideArticles, getPublishedGuideArticlesByCategory, getPublishedGuideArticleCountsByCategory, isPublicGuideCategorySlug } from "../../lib/guide/public-guide-repository";
import type { GuideCategory, SupportedGuideLocale } from "../../types/guide";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  return locale === "uz"
    ? {
        title:
          "Germaniya qo‘llanmasi | UzDe",
        description:
          "Germaniyaga kelish, vizalar, ta’lim, ish, oila, hujjatlar va kelgandan keyingi jarayonlar bo‘yicha tizimli qo‘llanmalar.",
        alternates: {
          canonical:
            "/uz/guide",
          languages: {
            uz:
              "/uz/guide",
            de:
              "/de/guide",
          },
        },
      }
    : {
        title:
          "Deutschland-Ratgeber | UzDe",
        description:
          "Strukturierte Leitfäden zu Einreise, Visa, Bildung, Arbeit, Familie, Dokumenten und den ersten Schritten nach der Ankunft.",
        alternates: {
          canonical:
            "/de/guide",
          languages: {
            uz:
              "/uz/guide",
            de:
              "/de/guide",
          },
        },
      };
}

export default async function GuidePage() {
  const locale = (await getLocale()) as SupportedGuideLocale;
  const [counts, featuredArticles, ...articleGroups] = await Promise.all([
    getPublishedGuideArticleCountsByCategory(),
    getFeaturedPublishedGuideArticles(locale, 3),
    ...getGuideCategories(locale).map((category) => isPublicGuideCategorySlug(category.slug)
      ? getPublishedGuideArticlesByCategory(category.slug, locale)
      : Promise.resolve([])),
  ]);
  const entries = getGuideCategories(locale).map((category, index) => {
    const articleCount = isPublicGuideCategorySlug(category.slug) ? counts[category.slug] : 0;
    const updatedCategory: GuideCategory = {
      ...category,
      articleCount,
      status: articleCount > 0 ? "available" : "coming-soon",
    };
    return {
      category: updatedCategory,
      articles: articleGroups[index].map(({ slug, title }) => ({ slug, title })),
    };
  });

  return <>
    <Header />
    <main className="bg-[#F7FAFB] pt-14 min-[1024px]:pt-20 min-[1024px]:max-[1359px]:pt-32 text-[#173B4B] dark:bg-[#091B29] dark:text-[#E7F3F5]">
            <GuideExplorer entries={entries} locale={locale} />

      {featuredArticles.length > 0 && (
        <section className="mx-auto w-full max-w-[1600px] px-4 pb-10 sm:px-6 xl:px-10 2xl:px-12">
          <h2 className="mb-5 border-b border-neutral-200 pb-4 text-xl font-bold text-neutral-950 dark:border-slate-700 dark:text-white sm:text-2xl">
            {locale === "uz" ? "Tavsiya etilgan qo‘llanmalar" : "Empfohlene Ratgeber"}
          </h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {featuredArticles.map((article) => (
              <article key={article.id} className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 dark:border-slate-700 dark:bg-[#122B3B]">
                <h3 className="text-base font-bold leading-snug text-neutral-950 dark:text-white">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-slate-300">
                  {article.excerpt}
                </p>
                <Link
                  href={`/guide/${article.categorySlug}/${article.slug}`}
                  className="mt-5 inline-flex w-fit text-sm font-semibold text-[#008F78] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#4DD6BA]"
                >
                  {locale === "uz" ? "Qo‘llanmani o‘qish" : "Ratgeber lesen"} →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <aside className="mx-auto w-full max-w-[1600px] px-4 pb-12 sm:px-6 xl:px-10 2xl:px-12">
        <p className="rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm leading-relaxed text-neutral-600 dark:border-slate-700 dark:bg-[#122B3B] dark:text-slate-300">
          {locale === "uz"
            ? "Qo‘llanmalar muntazam tekshiriladi va yangilanadi. Yangi mavzular bosqichma-bosqich qo‘shib boriladi."
            : "Die Ratgeber werden regelmäßig geprüft und aktualisiert. Neue Themen werden schrittweise ergänzt."}
        </p>
      </aside>
    </main>
    <Footer />
  </>;
}
