"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  getSearchCategoryLabel,
  searchGlobalItems,
  type GlobalSearchItem,
  type SearchCategory,
  type SearchLocale,
} from "../data/searchIndex";

type HeaderSearchModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

const popularSearches: Readonly<
  Record<SearchLocale, ReadonlyArray<string>>
> = {
  uz: [
    "Minijob",
    "Werkstudent",
    "Tarjimon",
    "Telegram",
    "Ausbildung",
    "Praktikum",
  ],
  de: [
    "Minijob",
    "Werkstudent",
    "Übersetzer",
    "Telegram",
    "Ausbildung",
    "Praktikum",
  ],
};

const modalCopy = {
  uz: {
    close: "Qidiruv oynasini yopish",
    label: "Portal bo‘ylab qidirish",
    placeholder:
      "Minijob, Werkstudent, tarjimon yoki tadbir...",
    keyboardHint:
      "Natijani tanlash uchun ↑ ↓ va Enter tugmalaridan foydalaning",
    popular: "Mashhur qidiruvlar",
    recent: "Oxirgi qidiruvlar",
    clear: "Tozalash",
    searchResults: "Qidiruv natijalari",
    quickLinks: "Tezkor havolalar",
    resultsFor: (query: string) =>
      `“${query}” uchun natijalar`,
    resultCount: (count: number) =>
      `${count} ta natija`,
    noResultsTitle: "Natija topilmadi",
    noResultsDescription:
      "Boshqa kalit so‘z bilan qidiring. Masalan: Minijob, Werkstudent, tarjimon, Telegram yoki tadbir.",
    clearSearch: "Qidiruvni tozalash",
    footer: "Portal ma’lumotlari bo‘yicha qidiruv",
    select: "Tanlash",
    closeShort: "Yopish",
  },
  de: {
    close: "Suchfenster schließen",
    label: "Im Portal suchen",
    placeholder:
      "Minijob, Werkstudent, Übersetzer oder Veranstaltung...",
    keyboardHint:
      "Mit ↑ ↓ navigieren und mit Enter auswählen",
    popular: "Beliebte Suchanfragen",
    recent: "Letzte Suchanfragen",
    clear: "Löschen",
    searchResults: "Suchergebnisse",
    quickLinks: "Schnellzugriff",
    resultsFor: (query: string) =>
      `Ergebnisse für „${query}“`,
    resultCount: (count: number) =>
      `${count} Ergebnisse`,
    noResultsTitle: "Keine Ergebnisse gefunden",
    noResultsDescription:
      "Versuchen Sie einen anderen Suchbegriff, zum Beispiel Minijob, Werkstudent, Übersetzer, Telegram oder Veranstaltung.",
    clearSearch: "Suche löschen",
    footer: "Suche in den Portalinhalten",
    select: "Auswählen",
    closeShort: "Schließen",
  },
} as const;

function Icon({
  children,
  className = "h-5 w-5",
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SearchIcon() {
  return (
    <Icon>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path
        strokeLinecap="round"
        d="m16 16 4.25 4.25"
      />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon className="h-6 w-6">
      <path
        strokeLinecap="round"
        d="m5 5 14 14M19 5 5 19"
      />
    </Icon>
  );
}

function ArrowRightIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M14 7l5 5-5 5"
      />
    </Icon>
  );
}

function HomeIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3 10.75 9-7 9 7"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 9.25V20h13.5V9.25"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.25 20v-6.25h5.5V20"
      />
    </Icon>
  );
}

function NewsIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 4.75h11.5A2.5 2.5 0 0 1 19 7.25V19H7.5A2.5 2.5 0 0 1 5 16.5V4.75Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 9h7M8.5 12.5h7M8.5 16h4"
      />
    </Icon>
  );
}

function ServicesIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 6.25a4.5 4.5 0 0 0-5.9 5.9L3.5 17a2.12 2.12 0 0 0 3 3l4.85-4.85a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z"
      />
    </Icon>
  );
}

function JobsIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7.75h16A2.25 2.25 0 0 1 22.25 10v8A2.25 2.25 0 0 1 20 20.25H4A2.25 2.25 0 0 1 1.75 18v-8A2.25 2.25 0 0 1 4 7.75Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 7.75V6A2.25 2.25 0 0 1 10.5 3.75h3A2.25 2.25 0 0 1 15.75 6v1.75"
      />
    </Icon>
  );
}

function TelegramIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.75 11 15.5-6.25c.7-.28 1.38.38 1.1 1.08l-5.5 14c-.25.64-1.1.74-1.5.18l-3.25-4.5-3.75 2.25.5-5.25L17 7.5"
      />
    </Icon>
  );
}

function EventsIcon() {
  return (
    <Icon>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 4.75h14A2.25 2.25 0 0 1 21.25 7v12A2.25 2.25 0 0 1 19 21.25H5A2.25 2.25 0 0 1 2.75 19V7A2.25 2.25 0 0 1 5 4.75Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 2.75v4M16.5 2.75v4M2.75 9.25h18.5"
      />
    </Icon>
  );
}

function getCategoryIcon(category: SearchCategory) {
  switch (category) {
    case "Yangilik":
      return <NewsIcon />;
    case "Xizmat":
      return <ServicesIcon />;
    case "Ish":
    case "Ish platformasi":
      return <JobsIcon />;
    case "Telegram":
      return <TelegramIcon />;
    case "Tadbir":
      return <EventsIcon />;
    case "Sahifa":
    default:
      return <HomeIcon />;
  }
}

function getCategoryStyles(category: SearchCategory) {
  switch (category) {
    case "Yangilik":
      return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "Xizmat":
      return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";
    case "Ish":
      return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
    case "Ish platformasi":
      return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300";
    case "Telegram":
      return "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300";
    case "Tadbir":
      return "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300";
    case "Sahifa":
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function getStorageKey(locale: SearchLocale): string {
  return `vatandoshlar-recent-searches-${locale}`;
}

function readRecentSearches(
  locale: SearchLocale,
): string[] {
  try {
    const storedValue = window.localStorage.getItem(
      getStorageKey(locale),
    );

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(
        (item): item is string =>
          typeof item === "string",
      )
      .slice(0, 5);
  } catch {
    return [];
  }
}

export default function HeaderSearchModal({
  isOpen,
  onClose,
}: HeaderSearchModalProps) {
  const currentLocale = useLocale();
  const locale: SearchLocale =
    currentLocale === "de" ? "de" : "uz";
  const copy = modalCopy[locale];
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<
    string[]
  >([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () =>
      searchGlobalItems(searchQuery, locale).slice(0, 10),
    [locale, searchQuery],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const stateTimer = window.setTimeout(() => {
      setRecentSearches(readRecentSearches(locale));
      setActiveIndex(0);
    }, 0);

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 80);

    return () => {
      window.clearTimeout(stateTimer);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, locale]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex(0);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchQuery]);

  const saveRecentSearch = (value: string) => {
    const cleanedValue = value.trim();

    if (!cleanedValue) {
      return;
    }

    const comparisonLocale =
      locale === "uz" ? "uz" : "de";

    const nextRecentSearches = [
      cleanedValue,
      ...recentSearches.filter(
        (item) =>
          item.toLocaleLowerCase(comparisonLocale) !==
          cleanedValue.toLocaleLowerCase(comparisonLocale),
      ),
    ].slice(0, 5);

    setRecentSearches(nextRecentSearches);

    window.localStorage.setItem(
      getStorageKey(locale),
      JSON.stringify(nextRecentSearches),
    );
  };

  const openResult = (item: GlobalSearchItem) => {
    saveRecentSearch(searchQuery || item.title);
    onClose();
    setSearchQuery("");
    router.push(item.href);
  };

  const handleKeyboard = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        Math.min(
          currentIndex + 1,
          Math.max(results.length - 1, 0),
        ),
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        Math.max(currentIndex - 1, 0),
      );
    }

    if (
      event.key === "Enter" &&
      results[activeIndex]
    ) {
      event.preventDefault();
      openResult(results[activeIndex]);
    }

    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleSuggestedSearch = (value: string) => {
    setSearchQuery(value);

    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 20);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    window.localStorage.removeItem(
      getStorageKey(locale),
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-slate-950/65 px-4 pb-10 pt-24 backdrop-blur-md sm:pt-28"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label={copy.close}
      />

      <div className="relative w-full max-w-3xl animate-scale-in overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-black/30 dark:border-slate-700 dark:bg-slate-900">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />

        <div className="flex items-center gap-3 border-b border-slate-200 p-4 pt-5 sm:p-5 sm:pt-6 dark:border-slate-700">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <SearchIcon />
          </span>

          <div className="min-w-0 flex-1">
            <label
              id="global-search-title"
              htmlFor="global-search-input"
              className="sr-only"
            >
              {copy.label}
            </label>

            <input
              id="global-search-input"
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              onKeyDown={handleKeyboard}
              placeholder={copy.placeholder}
              autoComplete="off"
              className="w-full bg-transparent text-base font-semibold text-slate-950 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white"
            />

            <p className="mt-1 hidden text-xs text-slate-400 sm:block">
              {copy.keyboardHint}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={copy.close}
          >
            <CloseIcon />
          </button>
        </div>

        {!searchQuery && (
          <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-700">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {copy.popular}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {popularSearches[locale].map(
                  (popularSearch) => (
                    <button
                      key={popularSearch}
                      type="button"
                      onClick={() =>
                        handleSuggestedSearch(
                          popularSearch,
                        )
                      }
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                    >
                      {popularSearch}
                    </button>
                  ),
                )}
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    {copy.recent}
                  </p>

                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs font-semibold text-slate-400 transition hover:text-rose-600"
                  >
                    {copy.clear}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {recentSearches.map((recentSearch) => (
                    <button
                      key={recentSearch}
                      type="button"
                      onClick={() =>
                        handleSuggestedSearch(recentSearch)
                      }
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                    >
                      {recentSearch}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="max-h-[58vh] overflow-y-auto p-3 sm:p-4">
          <div className="flex items-center justify-between px-2 pb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {searchQuery
                  ? copy.searchResults
                  : copy.quickLinks}
              </p>

              {searchQuery && (
                <p className="mt-1 text-xs text-slate-400">
                  {copy.resultsFor(searchQuery)}
                </p>
              )}
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              {copy.resultCount(results.length)}
            </span>
          </div>

          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() =>
                      setActiveIndex(index)
                    }
                    onClick={() => {
                      saveRecentSearch(
                        searchQuery || item.title,
                      );
                      onClose();
                      setSearchQuery("");
                    }}
                    className={`group flex items-center gap-4 rounded-2xl border p-4 transition ${
                      isActive
                        ? "border-emerald-200 bg-emerald-50/80 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-emerald-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {getCategoryIcon(item.category)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-950 dark:text-white">
                          {item.title}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getCategoryStyles(
                            item.category,
                          )}`}
                        >
                          {item.badge ??
                            getSearchCategoryLabel(
                              item.category,
                              locale,
                            )}
                        </span>
                      </span>

                      <span className="mt-1 block text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {item.description}
                      </span>
                    </span>

                    <span
                      className={`shrink-0 transition ${
                        isActive
                          ? "translate-x-1 text-emerald-600 dark:text-emerald-400"
                          : "text-slate-300 group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-slate-600"
                      }`}
                    >
                      <ArrowRightIcon />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <SearchIcon />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                {copy.noResultsTitle}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                {copy.noResultsDescription}
              </p>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                {copy.clearSearch}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-950/50">
          <span>{copy.footer}</span>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 sm:flex">
              <kbd className="rounded-md border border-slate-200 bg-white px-2 py-1 font-semibold dark:border-slate-700 dark:bg-slate-800">
                ↑
              </kbd>

              <kbd className="rounded-md border border-slate-200 bg-white px-2 py-1 font-semibold dark:border-slate-700 dark:bg-slate-800">
                ↓
              </kbd>

              {copy.select}
            </span>

            <span className="flex items-center gap-1">
              <kbd className="rounded-md border border-slate-200 bg-white px-2 py-1 font-semibold dark:border-slate-700 dark:bg-slate-800">
                Esc
              </kbd>

              {copy.closeShort}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
