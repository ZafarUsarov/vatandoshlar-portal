"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Link } from "../i18n/navigation";

type SearchCategory =
  | "all"
  | "news"
  | "services"
  | "jobs"
  | "telegram"
  | "events";

type SearchItemKey =
  | "officialNews"
  | "translationServices"
  | "legalServices"
  | "career"
  | "jobPlatforms"
  | "telegramGroups"
  | "events";

type SearchItem = {
  key: SearchItemKey;
  href: string;
  category: Exclude<SearchCategory, "all">;
  keywords: string[];
};

const searchItems: SearchItem[] = [
  {
    key: "officialNews",
    href: "/news",
    category: "news",
    keywords: [
      "yangilik",
      "nachrichten",
      "rasmiy",
      "offiziell",
      "bamf",
      "daad",
      "elchixona",
      "botschaft",
      "hujjat",
      "dokumente",
      "o‘qish",
      "studium",
      "ishlash",
      "arbeit",
    ],
  },
  {
    key: "translationServices",
    href: "/services",
    category: "services",
    keywords: [
      "tarjimon",
      "dolmetscher",
      "übersetzer",
      "til",
      "sprache",
      "hujjat",
      "dokument",
      "tarjima",
      "übersetzung",
      "notar",
      "tasdiqlash",
      "beglaubigung",
    ],
  },
  {
    key: "legalServices",
    href: "/services",
    category: "services",
    keywords: [
      "advokat",
      "anwalt",
      "huquq",
      "recht",
      "migratsiya",
      "migration",
      "maslahat",
      "beratung",
      "iste’molchi",
      "verbraucher",
      "yuridik",
      "juristisch",
    ],
  },
  {
    key: "career",
    href: "/jobs",
    category: "jobs",
    keywords: [
      "ish",
      "arbeit",
      "job",
      "minijob",
      "werkstudent",
      "praktikum",
      "ausbildung",
      "karyera",
      "karriere",
    ],
  },
  {
    key: "jobPlatforms",
    href: "/jobs#job-platforms",
    category: "jobs",
    keywords: [
      "ish sayti",
      "jobbörse",
      "jobsuche",
      "stepstone",
      "linkedin",
      "xing",
      "eures",
      "arbeitsagentur",
      "bundesagentur",
    ],
  },
  {
    key: "telegramGroups",
    href: "/telegram",
    category: "telegram",
    keywords: [
      "telegram",
      "guruh",
      "gruppe",
      "nrw",
      "baden",
      "schleswig",
      "bundesland",
      "hamjamiyat",
      "community",
    ],
  },
  {
    key: "events",
    href: "/events",
    category: "events",
    keywords: [
      "tadbir",
      "veranstaltung",
      "event",
      "uchrashuv",
      "treffen",
      "seminar",
      "konsert",
      "konzert",
      "networking",
      "madaniyat",
      "kultur",
    ],
  },
];

const categories: SearchCategory[] = [
  "all",
  "news",
  "services",
  "jobs",
  "telegram",
  "events",
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="m16 16 4.25 4.25" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
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

function getCategoryStyles(
  category: Exclude<SearchCategory, "all">,
) {
  switch (category) {
    case "news":
      return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "services":
      return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";
    case "jobs":
      return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
    case "telegram":
      return "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300";
    case "events":
      return "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300";
  }
}

export default function SearchSection() {
  const t = useTranslations("SearchSection");
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<SearchCategory>("all");

  const localizedItems = useMemo(
    () =>
      searchItems.map((item) => ({
        ...item,
        title: t(`items.${item.key}.title`),
        description: t(`items.${item.key}.description`),
      })),
    [t],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLocaleLowerCase(locale);

    return localizedItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" ||
        item.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        item.title,
        item.description,
        t(`categories.${item.category}`),
        ...item.keywords,
      ]
        .join(" ")
        .toLocaleLowerCase(locale);

      return searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, locale, localizedItems, searchQuery, t]);

  const showResults =
    searchQuery.trim().length > 0 || activeCategory !== "all";

  const resetSearch = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  const previewCards = [
    { key: "jobs", href: "/jobs" },
    { key: "services", href: "/services" },
    { key: "telegram", href: "/telegram" },
    { key: "events", href: "/events" },
  ] as const;

  return (
    <section
      id="search"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {t("badge")}
          </span>

          <h2 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {t("title")}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {t("description")}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </span>

                <label className="sr-only" htmlFor="portal-search">
                  {t("inputLabel")}
                </label>

                <input
                  id="portal-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder={t("placeholder")}
                  className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-emerald-400 dark:focus:bg-slate-950"
                />
              </div>

              <button
                type="button"
                className="inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-7 font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {t("searchButton")}
                <ArrowRightIcon />
              </button>
            </div>

            <div
              aria-label={t("categoryFilterLabel")}
              className="mt-5 flex flex-wrap justify-center gap-2"
              role="group"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                      isActive
                        ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                    }`}
                  >
                    {t(`categories.${category}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {showResults && (
            <div
              aria-live="polite"
              className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
            >
              <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                    {t("results.title")}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t("results.count", {
                      count: filteredItems.length,
                    })}
                  </p>
                </div>

                {(searchQuery || activeCategory !== "all") && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="w-fit text-sm font-semibold text-slate-500 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-slate-900"
                  >
                    {t("results.clearFilters")}
                  </button>
                )}
              </div>

              {filteredItems.length > 0 ? (
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="group flex flex-col gap-4 p-6 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 sm:flex-row sm:items-center dark:hover:bg-slate-800/70"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                            {item.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryStyles(
                              item.category,
                            )}`}
                          >
                            {t(`categories.${item.category}`)}
                          </span>
                        </div>

                        <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-500">
                        <ArrowRightIcon />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <SearchIcon />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                    {t("emptyState.title")}
                  </h3>

                  <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500 dark:text-slate-400">
                    {t("emptyState.description")}
                  </p>

                  <button
                    type="button"
                    onClick={resetSearch}
                    className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    {t("emptyState.clearSearch")}
                  </button>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {previewCards.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30 dark:focus-visible:ring-offset-slate-950"
                >
                  <h3 className="font-bold text-slate-950 dark:text-white">
                    {t(`preview.${item.key}.title`)}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {t(`preview.${item.key}.description`)}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:gap-3 dark:text-emerald-400">
                    {t("preview.open")}
                    <ArrowRightIcon />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
