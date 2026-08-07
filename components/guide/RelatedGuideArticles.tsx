import type {
  GuideArticle,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";

type RelatedGuideArticlesProps = Readonly<{
  articles: ReadonlyArray<GuideArticle>;
  locale: SupportedGuideLocale;
}>;

export default function RelatedGuideArticles({
  articles,
  locale,
}: RelatedGuideArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  const copy =
    locale === "uz"
      ? {
          eyebrow: "Davom eting",
          title: "Bog‘liq qo‘llanmalar",
          description:
            "Ushbu mavzu bilan bevosita bog‘liq keyingi qo‘llanmalarni ko‘rib chiqing.",
          readArticle: "Maqolani o‘qish",
        }
      : {
          eyebrow: "Weiterlesen",
          title: "Verwandte Leitfäden",
          description:
            "Entdecken Sie weitere Leitfäden, die direkt mit diesem Thema zusammenhängen.",
          readArticle: "Artikel lesen",
        };

  return (
    <section
      aria-labelledby="related-guide-articles-title"
      className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
        {copy.eyebrow}
      </p>

      <div className="mt-3 max-w-3xl">
        <h2
          id="related-guide-articles-title"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {copy.title}
        </h2>

        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          {copy.description}
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article
            key={`${article.categorySlug}-${article.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-700"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              {article.readingTime}
            </p>

            <h3 className="mt-3 text-lg font-bold leading-7 text-slate-950 dark:text-white">
              {article.title}
            </h3>

            <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">
              {article.excerpt}
            </p>

            <Link
              href={`/guide/${article.categorySlug}/${article.slug}`}
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-emerald-700 no-underline transition group-hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-emerald-300 dark:group-hover:text-emerald-200 dark:focus-visible:ring-offset-slate-950"
              aria-label={`${copy.readArticle}: ${article.title}`}
            >
              {copy.readArticle}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
