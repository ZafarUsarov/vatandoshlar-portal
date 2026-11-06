"use client";

import type {
  SpecialistCategory,
} from "@/types/specialist";

type FilterOption<T extends string> = Readonly<{
  value: T;
  label: string;
}>;

type SpecialistFiltersProps = Readonly<{
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  category: "all" | SpecialistCategory;
  onCategoryChange: (
    value: "all" | SpecialistCategory,
  ) => void;
  bundesland: string;
  onBundeslandChange: (value: string) => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (value: boolean) => void;
  premiumOnly: boolean;
  onPremiumOnlyChange: (value: boolean) => void;
  onReset: () => void;
  categories: ReadonlyArray<
    FilterOption<"all" | SpecialistCategory>
  >;
  bundeslaender: ReadonlyArray<FilterOption<string>>;
  labels: Readonly<{
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    bundeslandLabel: string;
    allBundeslaender: string;
    verifiedOnly: string;
    premiumOnly: string;
    reset: string;
  }>;
}>;

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4" strokeLinecap="round" />
    </svg>
  );
}

export default function SpecialistFilters({
  searchQuery,
  onSearchQueryChange,
  category,
  onCategoryChange,
  bundesland,
  onBundeslandChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  premiumOnly,
  onPremiumOnlyChange,
  onReset,
  categories,
  bundeslaender,
  labels,
}: SpecialistFiltersProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <label
            htmlFor="specialist-search"
            className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            {labels.searchLabel}
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>

            <input
              id="specialist-search"
              type="search"
              value={searchQuery}
              onChange={(event) =>
                onSearchQueryChange(event.target.value)
              }
              placeholder={labels.searchPlaceholder}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-emerald-400 dark:focus:bg-slate-950"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="specialist-category"
            className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            {labels.categoryLabel}
          </label>

          <div className="relative">
            <select
            id="specialist-category"
            value={category}
            onChange={(event) =>
              onCategoryChange(
                event.target.value as
                  | "all"
                  | SpecialistCategory,
              )
            }
            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-12 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-emerald-400 dark:focus:bg-slate-950"
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </div>
        </div>

        <div>
          <label
            htmlFor="specialist-bundesland"
            className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            {labels.bundeslandLabel}
          </label>

          <div className="relative">
            <select
            id="specialist-bundesland"
            value={bundesland}
            onChange={(event) =>
              onBundeslandChange(event.target.value)
            }
            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-12 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-emerald-400 dark:focus:bg-slate-950"
          >
            <option value="all">
              {labels.allBundeslaender}
            </option>

            {bundeslaender.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <label className="inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-semibold sm:gap-2 sm:px-4 sm:text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(event) =>
                onVerifiedOnlyChange(event.target.checked)
              }
              className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="sm:hidden">{labels.verifiedOnly.replace(/^Faqat\s+/i, "")}</span>
            <span className="hidden sm:inline">{labels.verifiedOnly}</span>
          </label>

          <label className="inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-semibold sm:gap-2 sm:px-4 sm:text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            <input
              type="checkbox"
              checked={premiumOnly}
              onChange={(event) =>
                onPremiumOnlyChange(event.target.checked)
              }
              className="size-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
            />
            <span className="sm:hidden">{labels.premiumOnly.replace(/^Faqat\s+/i, "")}</span>
            <span className="hidden sm:inline">{labels.premiumOnly}</span>
          </label>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="w-fit text-sm font-bold text-slate-500 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-slate-400 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-slate-900"
        >
          {labels.reset}
        </button>
      </div>
    </div>
  );
}
