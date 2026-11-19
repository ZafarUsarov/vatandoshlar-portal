import { getLocale } from "next-intl/server";

import { getGuideCategories } from "../../data/guide";
import {
  getPublishedGuideArticleCountsByCategory,
  isPublicGuideCategorySlug,
} from "../../lib/guide/public-guide-repository";
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
  "work-and-career",
] as const;

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

function isGuideCategory(
  value: GuideCategory | undefined,
): value is GuideCategory {
  return value !== undefined;
}

export default async function GuidePreviewSection() {
  const locale = (await getLocale()) as SupportedGuideLocale;
  const categoryCounts =
    await getPublishedGuideArticleCountsByCategory();

  const categories = getGuideCategories(locale).map(
    (category): GuideCategory => {
      const articleCount =
        isPublicGuideCategorySlug(category.slug)
          ? categoryCounts[category.slug]
          : 0;

      return {
        ...category,
        articleCount,
        status:
          articleCount > 0
            ? "available"
            : "coming-soon",
      };
    },
  );

  const featuredCategories = featuredCategorySlugs
    .map((slug) =>
      categories.find((category) => category.slug === slug),
    )
    .filter(isGuideCategory);

  // Homepage-only Uzbek labels. Keep shared Guide category data unchanged.
  const homepageUzCategories: Record<string, { title: string; description: string }> = {
    visas: {
      title: "Vizalar",
      description: "Öqiş, iş, til kursi, oila va mehmon vizalari böyiça yöriqnomalar.",
    },
    documents: {
      title: "Hujjatlar",
      description: "Tarjima, apostil, notarial tasdiq, diplom va sertifikatlar böyiça ma’lumot.",
    },
    family: {
      title: "Oila birlaştiriş",
      description: "Turmuş örtoǵi, farzandlar va boşqa oila a’zolari uçun jarayonlar.",
    },
    "work-and-career": {
      title: "Iş va karyera",
      description: "Rezyume, işga ariza, suhbat, amaliyot va Germaniyada iş boşlaş böyiça yönalişlar.",
    },
  };

  const totalArticleCount = categories.reduce(
    (total, category) => total + category.articleCount,
    0,
  );

  const copy =
    locale === "uz"
      ? {
          eyebrow: "Germaniya qöllanmasi",
          editorialHeading: "KERAKLI MA’LUMOTLAR",
          title:
            "Germaniyada hayotning muhim bosqiçlarini tuşunarli qöllanmalar bilan boşlang",
          description:
            "Viza, hujjatlar, oila birlaştiriş, til, ta’lim va iş böyiça tartibli maqolalar. Murakkab jarayonlar sodda tilda tuşuntiriladi va rasmiy manbalarga yönaltiriladi.",
          primaryAction: "Qöllanmani oçiş",
          reliabilityTitle: "Rasmiy manbalarga tayangan",
          reliabilityDescription:
            "Talablar va jarayonlar Germaniyaning vakolatli idoralari hamda rasmiy manbalari asosida tekşiriladi.",
          articleCountLabel: "ta maqola",
          categoryAction: "Bölimni oçiş",
          totalLabel: "mavjud maqola",
        }
      : {
          eyebrow: "Deutschland Guide",
          editorialHeading: "WISSENSWERTES",
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
      className="border-b border-[#DADADA] bg-[#F7F7F7] py-10 text-[#202020] sm:py-14 lg:py-16 dark:border-[var(--uzde-home-border)] dark:bg-[var(--uzde-home-surface)] dark:text-white"
    >
      <div className="w-full px-[clamp(16px,3.5vw,96px)]">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#686868] dark:text-slate-400">
            {copy.eyebrow}
          </span>
          <h2
            id="guide-preview-heading"
            className="mt-5 text-[clamp(26px,4.5vw,76px)] font-semibold uppercase leading-[1.05] tracking-[-0.01em] [word-spacing:0.08em]"
          >
            {copy.editorialHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#686868] sm:text-lg dark:text-slate-300">
            {copy.title}
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-[#686868] sm:text-base dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="mt-8 border-t border-[#DADADA] dark:border-slate-700 sm:mt-12">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/guide/${category.slug}`}
              aria-label={`${copy.categoryAction}: ${locale === "uz" ? (homepageUzCategories[category.slug]?.title ?? category.title) : category.title}`}
              className="group grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#DADADA] py-5 transition-colors hover:bg-black/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-6 sm:py-7 dark:border-slate-700 dark:hover:bg-white/[0.04]"
            >
              <span className="self-start pt-1 text-xs font-medium tabular-nums text-[#888888] sm:text-sm dark:text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl lg:text-3xl">
                  {locale === "uz" ? (homepageUzCategories[category.slug]?.title ?? category.title) : category.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#686868] dark:text-slate-400 sm:text-base">
                  {locale === "uz" ? (homepageUzCategories[category.slug]?.description ?? category.description) : category.description}
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-[#686868] dark:text-slate-400">
                  {category.articleCount} {copy.articleCountLabel}
                </span>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#DADADA] transition-colors group-hover:border-[#202020] dark:border-slate-700 dark:group-hover:border-white">
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold">{copy.reliabilityTitle}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#686868] dark:text-slate-400">
              {copy.reliabilityDescription}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            {totalArticleCount > 0 && (
              <span className="text-sm text-[#686868] dark:text-slate-400">
                <strong className="font-semibold text-[#202020] dark:text-white">{totalArticleCount}+</strong> {copy.totalLabel}
              </span>
            )}
            <Link
              href="/guide"
              className="inline-flex min-h-11 items-center gap-2 border-b border-[#202020] text-sm font-semibold transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:border-white"
            >
              {copy.primaryAction}
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
