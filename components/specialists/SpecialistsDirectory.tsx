"use client";

import { useMemo, useState } from "react";

import SpecialistCard from "@/components/specialists/SpecialistCard";
import SpecialistFilters from "@/components/specialists/SpecialistFilters";
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
  "automotive",
  "home",
  "education",
  "language-teaching",
  "academic-documents",
  "beauty",
  "finance",
  "creative",
];

export default function SpecialistsDirectory({
  specialists,
  initialCategory,
  labels,
}: SpecialistsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "all" | SpecialistCategory
  >(initialCategory ?? "all");
  const [bundesland, setBundesland] = useState("all");
  const [verifiedOnly, setVerifiedOnly] =
    useState(false);
  const [premiumOnly, setPremiumOnly] =
    useState(false);

  const bundeslandKeys = useMemo(
    () =>
      Array.from(
        new Set(
          specialists
            .map(
              (specialist) =>
                specialist.location?.bundesland,
            )
            .filter(
              (value): value is string =>
                Boolean(value),
            ),
        ),
      ).sort((first, second) =>
        first.localeCompare(second),
      ),
    [specialists],
  );

  const filteredSpecialists = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return specialists.filter((specialist) => {
      const matchesQuery =
        query.length === 0 ||
        [
          specialist.name,
          specialist.profession,
          specialist.shortDescription,
          specialist.serviceArea ?? "",
          specialist.location?.city ?? "",
          specialist.location?.bundesland ?? "",
          ...specialist.services,
          ...specialist.languages,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "all" ||
        specialist.categories.includes(category);

      const matchesBundesland =
        bundesland === "all" ||
        specialist.location?.bundesland ===
          bundesland;

      const matchesVerified =
        !verifiedOnly ||
        specialist.status.verified;

      const matchesPremium =
        !premiumOnly ||
        specialist.status.premium;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesBundesland &&
        matchesVerified &&
        matchesPremium
      );
    });
  }, [
    bundesland,
    category,
    premiumOnly,
    searchQuery,
    specialists,
    verifiedOnly,
  ]);

  const resetFilters = () => {
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
    <div className="space-y-12">
      <div>
        <div
          aria-label={labels.filters.categoryLabel}
          className="mb-5 flex flex-wrap gap-2"
          role="group"
        >
          {categories.map((option) => {
            const isActive =
              category === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  setCategory(option.value)
                }
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  isActive
                    ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <SpecialistFilters
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          category={category}
          onCategoryChange={setCategory}
          bundesland={bundesland}
          onBundeslandChange={setBundesland}
          verifiedOnly={verifiedOnly}
          onVerifiedOnlyChange={setVerifiedOnly}
          premiumOnly={premiumOnly}
          onPremiumOnlyChange={setPremiumOnly}
          onReset={resetFilters}
          categories={categories}
          bundeslaender={bundeslaender}
          labels={labels.filters}
        />
      </div>

      <div>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
              {labels.results.title}
            </h2>

            <p
              aria-live="polite"
              className="mt-2 text-sm text-slate-500 dark:text-slate-400"
            >
              {labels.results.count.replace(
                "{count}",
                String(
                  filteredSpecialists.length,
                ),
              )}
            </p>
          </div>
        </div>

        {filteredSpecialists.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredSpecialists.map(
              (specialist) => (
                <SpecialistCard
                  key={specialist.id}
                  specialist={specialist}
                  labels={{
                    ...labels.card,
                    categories:
                      labels.categories,
                  }}
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/60 sm:px-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              V
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
              {labels.empty.title}
            </h3>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
              {labels.empty.description}
            </p>

            <a
              href="mailto:info.vatandoshlar@gmx.de?subject=Mutaxassislar%20katalogiga%20qo%27shilish"
              className="mt-7 inline-flex rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
            >
              {labels.empty.applyButton}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
