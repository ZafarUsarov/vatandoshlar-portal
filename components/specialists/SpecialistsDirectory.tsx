"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

import SpecialistCard from "@/components/specialists/SpecialistCard";
import { Link } from "@/i18n/navigation";
import SpecialistFilters from "@/components/specialists/SpecialistFilters";
import SpecialistsCategoryMarquee from "./SpecialistsCategoryMarquee";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
} from "@/types/specialist";

type SpecialistsDirectoryProps = Readonly<{
  specialists: ReadonlyArray<LocalizedSpecialist>;
  initialCategory?: SpecialistCategory;
  labels: Readonly<{
    filters: Readonly<{
      searchLabel: string;
      searchPlaceholder: string;
      categoryLabel: string;
      bundeslandLabel: string;
      allBundeslaender: string;
      verifiedOnly: string;
      premiumOnly: string;
      reset: string;
    }>;
    categories: Readonly<
      Record<"all" | SpecialistCategory, string>
    >;
    bundeslaender: Readonly<Record<string, string>>;
    featured: Readonly<{
      eyebrow: string;
      title: string;
      description: string;
    }>;
    results: Readonly<{
      title: string;
      count: string;
    }>;
    empty: Readonly<{
      title: string;
      description: string;
      applyButton: string;
    }>;
    card: Readonly<{
      verified: string;
      premium: string;
      sponsored: string;
      details: string;
      detailsSoon: string;
      languages: string;
      serviceArea: string;
    }>;
  }>;
}>;

const categoryKeys: ReadonlyArray<
  "all" | SpecialistCategory
> = [
  "all",
  "medical",
  "legal",
  "technology",
  "translation",
  "entrepreneur",
  "automotive",
  "home",
  "education",
  "language-teaching",
  "academic-documents",
  "beauty",
  "finance",
  "creative",
  "science",
];

function normalizeSpecialistSearch(value: string): string {
  return value
    .toLocaleLowerCase("uz")
    .replace(/[’‘ʻʼ']/g, "'")
    .replace(/o'/g, "o")
    .replace(/g'/g, "g")
    .replace(/ş/g, "sh")
    .replace(/ç/g, "ch")
    .replace(/ö/g, "o")
    .replace(/ǵ/g, "g");
}

export default function SpecialistsDirectory({
  specialists,
  initialCategory,
  labels,
}: SpecialistsDirectoryProps) {
  const locale = useLocale();
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "all" | SpecialistCategory
  >(initialCategory ?? "all");
  const [bundesland, setBundesland] = useState("all");
  const [verifiedOnly, setVerifiedOnly] =
    useState(false);
  const [premiumOnly, setPremiumOnly] = useState(false);

  const bundeslandKeys = useMemo(
    () =>
      Object.keys(labels.bundeslaender).sort(
        (first, second) =>
          first.localeCompare(second, "de"),
      ),
    [labels.bundeslaender],
  );

  const filteredSpecialists = useMemo(() => {
    const query = normalizeSpecialistSearch(searchQuery.trim());

    return specialists.filter((specialist) => {
      const matchesQuery =
        query.length === 0 ||
        normalizeSpecialistSearch([
          specialist.name,
          specialist.profession,
          specialist.shortDescription,
          specialist.serviceArea ?? "",
          specialist.location?.city ?? "",
          specialist.location?.bundesland ?? "",
          ...specialist.services,
          ...specialist.languages,
        ]
          .join(" "))
          .includes(query);

      const matchesCategory =
        category === "all" ||
        specialist.categories.includes(category);

      const matchesBundesland =
        bundesland === "all" ||
        specialist.location?.bundesland === bundesland;

      const matchesVerified =
        !verifiedOnly || specialist.status.verified;

      const matchesPremium =
        !premiumOnly || specialist.status.premium;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesBundesland &&
        matchesVerified &&
        matchesPremium
      );
    }).sort((first, second) => {
      if (first.slug === "zafar-usarov") return -1;
      if (second.slug === "zafar-usarov") return 1;

      const firstDate = first.createdAt ? Date.parse(first.createdAt) : NaN;
      const secondDate = second.createdAt ? Date.parse(second.createdAt) : NaN;
      const firstTime = Number.isFinite(firstDate) ? firstDate : -Infinity;
      const secondTime = Number.isFinite(secondDate) ? secondDate : -Infinity;

      if (firstTime === secondTime) return 0;
      return secondTime > firstTime ? 1 : -1;
    });
  }, [
    bundesland,
    category,
    premiumOnly,
    searchQuery,
    specialists,
    verifiedOnly,
  ]);

  const updateFilter = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setVisibleCount(12);
  };

  const resetFilters = () => {
    setVisibleCount(12);
    setSearchQuery("");
    setCategory("all");
    setBundesland("all");
    setVerifiedOnly(false);
    setPremiumOnly(false);
  };

  const categories = categoryKeys.map((key) => ({
    value: key,
    label: labels.categories[key],
  }));

  const bundeslaender = bundeslandKeys.map((key) => ({
    value: key,
    label: labels.bundeslaender[key] ?? key,
  }));

  return (
    <div className="space-y-14">
      <div>
        <SpecialistsCategoryMarquee
          categories={categories}
          selectedCategory={category}
          label={labels.filters.categoryLabel}
          onSelect={(value) => updateFilter(setCategory, value)}
        />

        <SpecialistFilters
          searchQuery={searchQuery}
          onSearchQueryChange={(value) => updateFilter(setSearchQuery, value)}
          category={category}
          onCategoryChange={(value) => updateFilter(setCategory, value)}
          bundesland={bundesland}
          onBundeslandChange={(value) => updateFilter(setBundesland, value)}
          verifiedOnly={verifiedOnly}
          onVerifiedOnlyChange={(value) => updateFilter(setVerifiedOnly, value)}
          premiumOnly={premiumOnly}
          onPremiumOnlyChange={(value) => updateFilter(setPremiumOnly, value)}
          onReset={resetFilters}
          categories={categories}
          bundeslaender={bundeslaender}
          labels={labels.filters}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
              {labels.results.title}
            </h2>

            <p
              aria-live="polite"
              className="mt-2 text-sm text-slate-500 dark:text-slate-400"
            >
              {locale === "de" ? `${filteredSpecialists.length} Profile gefunden` : `${filteredSpecialists.length} ta profil topildi`}
            </p>
          </div>
          <Link href="/premium?context=specialist" className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg border border-emerald-700/30 bg-white px-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 dark:border-emerald-500/30 dark:bg-[#1a1c1e] dark:text-white dark:hover:border-emerald-400">
            UzDe. Premium
          </Link>
        </div>

        {filteredSpecialists.length > 0 ? (
          <div>
          <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {filteredSpecialists.slice(0, visibleCount).map((specialist) => (
              <SpecialistCard
                compact
                key={specialist.id}
                specialist={specialist}
                labels={{
                  ...labels.card,
                  categories: labels.categories,
                }}
              />
            ))}
          </div>
          {filteredSpecialists.length > visibleCount && (
            <div className="mt-7 flex justify-center">
              <button type="button" onClick={() => setVisibleCount((count) => count + 12)} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:text-white">
                {locale === "de" ? "Weitere 12 anzeigen" : "Yana 12 ta ko‘rsatish"}
              </button>
            </div>
          )}
          </div>
        ) : (
          <div className="mt-6 flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-white/10 dark:bg-white/[0.035] sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-white/10 dark:text-zinc-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-4A4.5 4.5 0 0 0 3 18.5V20" />
                  <circle cx="9.5" cy="7.5" r="3.5" />
                  <path d="M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14.5a4.5 4.5 0 0 1 3 4.2V20" />
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-xl">
                  {locale === "de" ? labels.empty.title : "Bu yönalışda hali mutaxassis yöq"}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  {locale === "de" ? labels.empty.description : "Böşqa yönalışni tanlang yoki katalogga mutaxassis tavsiya qiling."}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 pl-0 sm:pl-[52px] lg:pl-0">
              <button type="button" onClick={resetFilters} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 text-[13px] font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-white/20 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
                {labels.filters.reset}
              </button>
              <a href="mailto:info@uzde.de?subject=Mutaxassislar%20katalogiga%20qo%27shilish" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                {locale === "de" ? labels.empty.applyButton : "Mutaxassis tavsiya qılış"}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
