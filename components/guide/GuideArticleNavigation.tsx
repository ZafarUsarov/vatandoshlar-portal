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
      className="space-y-2"
    >
      {(previous || next) && (
        <div className="grid gap-3 md:grid-cols-2">
          {previous ? (
            <Link
              href={`/guide/${previous.categorySlug}/${previous.slug}`}
              className="group border-t border-slate-200 py-4 no-underline transition-colors hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:border-slate-700 dark:hover:border-emerald-700 dark:focus-visible:ring-offset-slate-950"
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
              className="group border-t border-slate-200 py-4 text-left no-underline transition-colors hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 md:text-right dark:border-slate-700 dark:hover:border-emerald-700 dark:focus-visible:ring-offset-slate-950"
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

      <div className="flex justify-start">
        <Link
          href={`/guide/${category.slug}`}
          className="inline-flex min-h-11 items-center border-b border-slate-300 py-2 text-sm font-semibold text-slate-700 no-underline transition-colors hover:border-emerald-500 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:border-slate-600 dark:text-slate-200 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
        >
          {copy.backToCategory}
        </Link>
      </div>
    </nav>
  );
}
