import type {
  GuideArticle,
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";

type RelatedGuideArticlesProps = Readonly<{
  articles: ReadonlyArray<GuideArticle>;
  locale: SupportedGuideLocale;
  category?: GuideCategory;
  compact?: boolean;
}>;

export default function RelatedGuideArticles({
  articles,
  locale,
  category,
  compact = false,
}: RelatedGuideArticlesProps) {
  if (articles.length === 0) return null;

  const copy = locale === "uz"
    ? {
        eyebrow: "Davom eting",
        title: "Bog‘liq qo‘llanmalar",
        description: "Ushbu mavzu bilan bevosita bog‘liq keyingi qo‘llanmalarni ko‘rib chiqing.",
        readArticle: "Maqolani o‘qish",
        nextTitle: "Sizga keyin kerak bo‘lishi mumkin",
        nextDescription: "Uy-joy masalasidan keyin Germaniyadagi kundalik ishlarni shu qo‘llanmalar bilan davom ettiring.",
      }
    : {
        eyebrow: "Weiterlesen",
        title: "Verwandte Leitfäden",
        description: "Entdecken Sie weitere Leitfäden, die direkt mit diesem Thema zusammenhängen.",
        readArticle: "Artikel lesen",
        nextTitle: "Das könnte als Nächstes wichtig sein",
        nextDescription: "Nach der Wohnungssuche helfen diese Leitfäden bei den nächsten Schritten im Alltag in Deutschland.",
      };

  if (compact && category) {
    return (
      <section
        aria-labelledby="related-guide-articles-title"
        className="border-t border-slate-200 pt-6 dark:border-slate-800 sm:pt-7"
      >
        <Link
          href={`/guide/${category.slug}`}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-600 no-underline transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 motion-reduce:transition-none dark:text-slate-300 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
        >
          <span aria-hidden="true" className="mr-2">←</span>
          {category.title}
        </Link>

        <div className="mt-4 max-w-3xl">
          <h2
            id="related-guide-articles-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {copy.nextTitle}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            {copy.nextDescription}
          </p>
        </div>

        <div className="mt-5 grid gap-2 sm:gap-3 md:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={`${article.categorySlug}-${article.slug}`}
              href={`/guide/${article.categorySlug}/${article.slug}`}
              aria-label={`${copy.readArticle}: ${article.title}`}
              className="group grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 no-underline transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="min-w-0">
                <span className="block font-bold leading-6 text-slate-950 dark:text-white">
                  {article.title}
                </span>
                <span className="mt-0.5 line-clamp-2 block text-sm leading-5 text-slate-600 dark:text-slate-400">
                  {article.excerpt}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-lg text-emerald-700 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none dark:text-emerald-300"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="related-guide-articles-title" className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
      <div className="mt-3 max-w-3xl">
        <h2 id="related-guide-articles-title" className="text-2xl font-bold tracking-tight sm:text-3xl">{copy.title}</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{copy.description}</p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article key={`${article.categorySlug}-${article.slug}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-700">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">{article.readingTime}</p>
            <h3 className="mt-3 text-lg font-bold leading-7 text-slate-950 dark:text-white">{article.title}</h3>
            <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">{article.excerpt}</p>
            <Link href={`/guide/${article.categorySlug}/${article.slug}`} className="mt-5 inline-flex min-h-11 items-center font-semibold text-emerald-700 no-underline transition group-hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 motion-reduce:transition-none dark:text-emerald-300 dark:group-hover:text-emerald-200 dark:focus-visible:ring-offset-slate-950" aria-label={`${copy.readArticle}: ${article.title}`}>
              {copy.readArticle}<span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
