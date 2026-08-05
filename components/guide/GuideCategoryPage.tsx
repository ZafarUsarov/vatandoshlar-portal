import type {
  GuideArticle,
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";

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
  const copy =
    locale === "uz"
      ? {
          back: "Barcha yo‘nalishlar",
          eyebrow: "Germany Guide yo‘nalishi",
          articleCount: `${articles.length} ta maqola`,
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
          guideHome: "Guide bosh sahifasiga qaytish",
        }
      : {
          back: "Alle Bereiche",
          eyebrow: "Bereich im Deutschland Guide",
          articleCount: `${articles.length} Artikel`,
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
    <main className="min-h-screen bg-slate-50 pt-20 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -right-32 -top-36 size-[30rem] rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-44 left-10 size-[28rem] rounded-full bg-blue-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span aria-hidden="true">←</span>
            {copy.back}
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-6xl sm:leading-[1.08]">
              {category.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {category.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                {copy.articleCount}
              </span>

              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200">
                {copy.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <h2 className="text-xl font-bold">
                    {article.title}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-emerald-700 to-slate-950 p-10 text-white">
                  <div className="text-center">
                    <div className="mx-auto flex size-24 items-center justify-center rounded-[2rem] bg-white/10 text-5xl">
                      ◇
                    </div>
                    <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      {category.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                  <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    {copy.status}
                  </span>

                  <h2 className="mt-6 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                    {copy.emptyTitle}
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                    {copy.emptyDescription}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-bold">
                {copy.roadmapTitle}
              </h2>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {copy.roadmapItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-100">
                {copy.reliabilityTitle}
              </h2>

              <p className="mt-4 leading-7 text-emerald-900 dark:text-emerald-200">
                {copy.reliabilityDescription}
              </p>
            </aside>
          </div>

          <div className="mt-10">
            <Link
              href="/guide"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
            >
              {copy.guideHome}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
