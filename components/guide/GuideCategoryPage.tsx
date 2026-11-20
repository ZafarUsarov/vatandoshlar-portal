import type {
  GuideArticle,
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";
import { getGuideCategories } from "../../data/guide";

type GuideCategoryPageProps = Readonly<{
  category: GuideCategory;
  articles: ReadonlyArray<GuideArticle>;
  locale: SupportedGuideLocale;
}>;

export default function GuideCategoryPage({
  category,
  articles,
  locale,
}: GuideCategoryPageProps) {
  const categoryIndex = getGuideCategories(locale).findIndex(
    (entry) => entry.slug === category.slug,
  );
  const categoryNumber = String(categoryIndex >= 0 ? categoryIndex + 1 : 1).padStart(2, "0");

  const copy =
    locale === "uz"
      ? {
          back: "Barça mavzular",
          eyebrow: "UZDE / QÖLLANMA",
          articleCount: `${articles.length} ta maqola`,
          articlesTitle: "Maqolalar",
          trustNote: "Rasmiy manbalar asosida · Ma’lumotlar muntazam tekshiriladi",
          status: "Maqolalar tayyorlanmoqda",
          emptyTitle:
            "Bu yo‘nalishdagi qo‘llanmalar tez orada qo‘shiladi",
          emptyDescription:
            "Materiallar rasmiy manbalar asosida tekshirilib, bosqichma-bosqich e’lon qilinadi. Birinchi maqolalar tayyor bo‘lgach shu sahifada ko‘rinadi.",
          roadmapTitle: "Bu bo‘limda nimalar bo‘ladi?",
          roadmapItems: [
            "Talablar va kimlar foydalanishi mumkinligi",
            "Kerakli hujjatlar ro‘yxati",
            "Bosqichma-bosqich ariza jarayoni",
            "Xarajatlar va muhim muddatlar",
            "Rasmiy manbalar va foydali havolalar",
            "Ko‘p so‘raladigan savollar",
          ],
          reliabilityTitle: "Ishonchli ma’lumot tamoyili",
          reliabilityDescription:
            "Har bir maqola e’lon qilinishidan oldin birlamchi rasmiy manbalar bilan tekshiriladi. Qonun va jarayonlar o‘zgarishi mumkinligi sababli, har bir materialda oxirgi tekshiruv sanasi va rasmiy manbalar ko‘rsatiladi.",
          guideHome: "Qöllanmalar sahifasiga qaytiş",
        }
      : {
          back: "Alle Bereiche",
          eyebrow: "Bereich im Deutschland Guide",
          articleCount: `${articles.length} Artikel`,
          articlesTitle: "Artikel",
          trustNote: "Auf Grundlage offizieller Quellen · Inhalte werden regelmäßig geprüft",
          status: "Artikel werden vorbereitet",
          emptyTitle:
            "Die Leitfäden für diesen Bereich erscheinen demnächst",
          emptyDescription:
            "Die Inhalte werden anhand offizieller Quellen geprüft und schrittweise veröffentlicht. Sobald die ersten Artikel fertig sind, erscheinen sie auf dieser Seite.",
          roadmapTitle: "Was wird dieser Bereich enthalten?",
          roadmapItems: [
            "Voraussetzungen und Zielgruppen",
            "Liste der erforderlichen Unterlagen",
            "Schrittweiser Ablauf des Verfahrens",
            "Kosten und wichtige Fristen",
            "Offizielle Quellen und hilfreiche Links",
            "Häufig gestellte Fragen",
          ],
          reliabilityTitle: "Grundsatz verlässlicher Informationen",
          reliabilityDescription:
            "Jeder Artikel wird vor der Veröffentlichung anhand primärer offizieller Quellen geprüft. Da sich Gesetze und Verfahren ändern können, werden das Datum der letzten Prüfung und die offiziellen Quellen angegeben.",
          guideHome: "Zur Guide-Startseite",
        };

  return (
      <main className="min-h-screen bg-[#F7FAFB] pt-20 text-slate-950 dark:bg-[#111419] dark:text-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-5 sm:px-8 sm:pt-7 lg:px-12 lg:pb-20">
          <nav aria-label={locale === "uz" ? "Qöllanma navigatsiyasi" : "Ratgeber-Navigation"}>
            <Link
              href="/guide"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#008F78] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008F78] dark:text-slate-300 dark:hover:text-[#65CBB6] motion-reduce:transition-none"
            >
              <span aria-hidden="true">←</span>
              {copy.back}
            </Link>
          </nav>

          <header className="mt-4 max-w-4xl pb-8 sm:mt-6 sm:pb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#008F78] dark:text-[#65CBB6]">
              {locale === "uz" ? `UZDE / QÖLLANMA / ${categoryNumber}` : `UZDE / RATGEBER / ${categoryNumber}`}
            </p>
            <h1 className="mt-4 text-[clamp(2.2rem,4.2vw,3.65rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
              {category.title}
            </h1>
            <p className="mt-4 max-w-2xl line-clamp-2 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
              {category.description}
            </p>
            <p className="mt-5 text-xs font-medium tabular-nums tracking-wide text-slate-500 dark:text-slate-400">
              {copy.articleCount}
            </p>
          </header>

          <section aria-labelledby="guide-category-articles">
            <h2 id="guide-category-articles" className="sr-only">{copy.articlesTitle}</h2>
            {articles.length > 0 ? (
              <ol className="border-t border-slate-300/80 dark:border-slate-700">
                {articles.map((article, index) => (
                  <li key={article.id} className="border-b border-slate-200 dark:border-slate-800">
                    <Link
                      href={`/guide/${category.slug}/${article.slug}`}
                      className="group grid min-h-28 grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-start gap-3 px-1 py-6 transition-colors duration-200 hover:bg-slate-900/[0.025] focus-visible:relative focus-visible:z-10 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008F78] sm:grid-cols-[3.5rem_minmax(0,1fr)_2rem] sm:gap-6 sm:px-3 sm:py-7 dark:hover:bg-white/[0.035] dark:focus-visible:outline-[#65CBB6] motion-reduce:transition-none"
                    >
                      <span aria-hidden="true" className="pt-1 text-xs font-medium tabular-nums tracking-wider text-slate-400 dark:text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-lg font-semibold leading-snug tracking-[-0.025em] text-slate-950 transition-colors duration-200 group-hover:text-[#007F69] sm:text-xl dark:text-slate-100 dark:group-hover:text-[#65CBB6] motion-reduce:transition-none">
                          {article.title}
                        </span>
                        <span className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {article.excerpt}
                        </span>
                      </span>
                      <span aria-hidden="true" className="mt-0.5 justify-self-end text-lg leading-6 text-slate-400 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#008F78] dark:text-slate-500 dark:group-hover:text-[#65CBB6] motion-reduce:transform-none motion-reduce:transition-none">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="border-t border-slate-300 py-8 dark:border-slate-700">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">{copy.status}</p>
                <h3 className="mt-3 text-xl font-semibold">{copy.emptyTitle}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{copy.emptyDescription}</p>
              </div>
            )}
            {articles.length > 0 && (
              <p className="mt-7 text-xs leading-6 text-slate-500 dark:text-slate-400">{copy.trustNote}</p>
            )}
          </section>
        </div>
      </main>
    );
}
