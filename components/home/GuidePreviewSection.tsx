import { getLocale } from "next-intl/server";

import { getGuideCategories } from "../../data/guide";
import { Link } from "../../i18n/navigation";
import type {
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";

type IconProps = Readonly<{
  className?: string;
}>;

const featuredCategorySlugs = [
  "visas",
  "documents",
  "family",
  "language-and-certificates",
  "education",
  "work-and-career",
] as const;

function BookOpenIcon({
  className = "size-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M4.5 4.75h5A3.5 3.5 0 0 1 13 8.25v11h-5A3.5 3.5 0 0 1 4.5 15.75v-11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 4.75h-3A3.5 3.5 0 0 0 13 8.25v11h3A3.5 3.5 0 0 0 19.5 15.75v-11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({
  className = "size-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon({
  className = "size-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.5 19 6v5.2c0 4.5-2.8 7.9-7 9.3-4.2-1.4-7-4.8-7-9.3V6l7-2.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.75 11.9 2.15 2.15 4.5-4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isGuideCategory(
  value: GuideCategory | undefined,
): value is GuideCategory {
  return value !== undefined;
}

export default async function GuidePreviewSection() {
  const locale = (await getLocale()) as SupportedGuideLocale;
  const categories = getGuideCategories(locale);

  const featuredCategories = featuredCategorySlugs
    .map((slug) =>
      categories.find((category) => category.slug === slug),
    )
    .filter(isGuideCategory);

  const totalArticleCount = categories.reduce(
    (total, category) => total + category.articleCount,
    0,
  );

  const copy =
    locale === "uz"
      ? {
          eyebrow: "Germaniya qo‘llanmasi",
          title:
            "Germaniyada hayotning muhim bosqichlarini tushunarli qo‘llanmalar bilan boshlang",
          description:
            "Viza, hujjatlar, oila birlashtirish, til, ta’lim va ish bo‘yicha tartibli maqolalar. Murakkab jarayonlar sodda tilda tushuntiriladi va rasmiy manbalarga yo‘naltiriladi.",
          primaryAction: "Qo‘llanmani ochish",
          reliabilityTitle: "Rasmiy manbalarga tayangan",
          reliabilityDescription:
            "Talablar va jarayonlar Germaniyaning vakolatli idoralari hamda rasmiy manbalari asosida tekshiriladi.",
          articleCountLabel: "ta maqola",
          categoryAction: "Bo‘limni ochish",
          totalLabel: "mavjud maqola",
        }
      : {
          eyebrow: "Deutschland Guide",
          title:
            "Starten Sie wichtige Schritte in Deutschland mit verständlichen Leitfäden",
          description:
            "Strukturierte Artikel zu Visa, Dokumenten, Familiennachzug, Sprache, Bildung und Arbeit. Komplexe Abläufe werden verständlich erklärt und mit offiziellen Quellen verknüpft.",
          primaryAction: "Guide öffnen",
          reliabilityTitle: "Auf offiziellen Quellen aufgebaut",
          reliabilityDescription:
            "Anforderungen und Abläufe werden anhand zuständiger deutscher Behörden und offizieller Quellen geprüft.",
          articleCountLabel: "Artikel",
          categoryAction: "Bereich öffnen",
          totalLabel: "verfügbare Artikel",
        };

  return (
    <section
      id="guide-preview"
      aria-labelledby="guide-preview-heading"
      className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-950 py-20 text-white sm:py-24 lg:py-28 dark:border-slate-800"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 -top-40 size-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-48 right-0 size-[32rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
              <BookOpenIcon />
              {copy.eyebrow}
            </div>

            <h2
              id="guide-preview-heading"
              className="mt-6 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {copy.title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/guide"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {copy.primaryAction}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {totalArticleCount > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
                  <span className="block text-xl font-extrabold text-white">
                    {totalArticleCount}+
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-slate-400">
                    {copy.totalLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <ShieldCheckIcon />
              </span>

              <div>
                <h3 className="font-bold text-white">
                  {copy.reliabilityTitle}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {copy.reliabilityDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/guide/${category.slug}`}
                aria-label={`${copy.categoryAction}: ${category.title}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.065] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.095] hover:shadow-xl hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 size-28 rounded-full bg-emerald-400/10 blur-2xl transition group-hover:bg-emerald-400/20"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-300 transition group-hover:bg-emerald-500 group-hover:text-white">
                      <BookOpenIcon />
                    </span>

                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-400 transition group-hover:border-emerald-400/20 group-hover:text-emerald-300">
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-7 text-white">
                    {category.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-300">
                      {category.articleCount} {copy.articleCountLabel}
                    </span>

                    <span className="text-xs font-semibold text-slate-500 transition group-hover:text-slate-300">
                      {copy.categoryAction}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
