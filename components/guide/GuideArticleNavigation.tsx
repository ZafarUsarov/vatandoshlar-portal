import type {
  GuideArticle,
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";

type GuideArticleNavigationProps = Readonly<{
  category: GuideCategory;
  previous?: GuideArticle;
  next?: GuideArticle;
  locale: SupportedGuideLocale;
}>;

export default function GuideArticleNavigation({
  category,
  previous,
  next,
  locale,
}: GuideArticleNavigationProps) {
  const copy =
    locale === "uz"
      ? {
          previous: "Oldingi maqola",
          next: "Keyingi maqola",
          backToCategory: `${category.title} bo‘limiga qaytish`,
        }
      : {
          previous: "Vorheriger Artikel",
          next: "Nächster Artikel",
          backToCategory: `Zurück zu ${category.title}`,
        };

  return (
    <nav
      aria-label={
        locale === "uz"
          ? "Maqola navigatsiyasi"
          : "Artikelnavigation"
      }
      className="space-y-5"
    >
      {(previous || next) && (
        <div className="grid gap-4 md:grid-cols-2">
          {previous ? (
            <Link
              href={`/guide/${previous.categorySlug}/${previous.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 no-underline transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                ← {copy.previous}
              </span>
              <span className="mt-3 block text-lg font-bold leading-7 text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div aria-hidden="true" className="hidden md:block" />
          )}

          {next && (
            <Link
              href={`/guide/${next.categorySlug}/${next.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left no-underline transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 md:text-right dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {copy.next} →
              </span>
              <span className="mt-3 block text-lg font-bold leading-7 text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      )}

      <div className="flex justify-center">
        <Link
          href={`/guide/${category.slug}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold !text-white no-underline transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 visited:!text-white hover:!text-white dark:bg-white dark:!text-slate-950 dark:visited:!text-slate-950 dark:hover:!text-slate-950 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
        >
          {copy.backToCategory}
        </Link>
      </div>
    </nav>
  );
}
