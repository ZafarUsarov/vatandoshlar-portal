"use client";

import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";
import {
  useMemo,
  useState,
} from "react";

import {
  getSearchCategoryLabel,
  searchGlobalItems,
  type GlobalSearchItem,
  type SearchCategory,
  type SearchLocale,
} from "../data/searchIndex";
import { useGuideSearchItems } from "../hooks/useGuideSearchItems";

type SearchFilter =
  | "Barchasi"
  | SearchCategory;

const categories: ReadonlyArray<SearchFilter> = [
  "Barchasi",
  "Yangilik",
  "Xizmat",
  "Mutaxassis",
  "Ish",
  "Telegram",
  "Tadbir",
  "Qo‘llanma",
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="10.75"
        cy="10.75"
        r="6.75"
      />
      <path
        strokeLinecap="round"
        d="m16 16 4.25 4.25"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M14 7l5 5-5 5"
      />
    </svg>
  );
}

function getCategoryStyles(_category: SearchCategory) {
  return "border border-[#E5E5E5] bg-[#F4F4F3] text-[#55585D] dark:border-[#34383D] dark:bg-[#24272B] dark:text-[#C7C9CC]";
}

// Display-only conversion: internal category identifiers remain unchanged.
function toUzbekUiAlphabet(label: string): string {
  return label
    .replace(/([Oo])[‘’ʻʼ]/g, (_, letter: string) => letter === "O" ? "Ö" : "ö")
    .replace(/([Gg])[‘’ʻʼ]/g, (_, letter: string) => letter === "G" ? "Ğ" : "ğ")
    .replace(/Sh/g, "Ş")
    .replace(/sh/g, "ş")
    .replace(/Ch/g, "Ç")
    .replace(/ch/g, "ç");
}

export default function SearchSection() {
  const currentLocale =
    useLocale();

  const t =
    useTranslations(
      "SearchSection",
    );

  const locale: SearchLocale =
    currentLocale === "de"
      ? "de"
      : "uz";

  const guideSearchItems =
    useGuideSearchItems(
      locale,
    );

  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState("");

  const [
    activeCategory,
    setActiveCategory,
  ] =
    useState<SearchFilter>(
      "Barchasi",
    );

  const filteredItems =
    useMemo<
      ReadonlyArray<GlobalSearchItem>
    >(() => {
      const category =
        activeCategory ===
        "Barchasi"
          ? undefined
          : activeCategory;

      return searchGlobalItems(
        searchQuery,
        locale,
        category,
        guideSearchItems,
      );
    }, [
      activeCategory,
      guideSearchItems,
      locale,
      searchQuery,
    ]);

  const showResults =
    searchQuery.trim().length >
      0 ||
    activeCategory !==
      "Barchasi";

  const previewItems = [
    {
      title:
        t(
          "preview.jobs.title",
        ),
      description:
        t(
          "preview.jobs.description",
        ),
      href:
        `/${locale}/jobs`,
    },
    {
      title:
        t(
          "preview.services.title",
        ),
      description:
        t(
          "preview.services.description",
        ),
      href:
        `/${locale}/services`,
    },
    {
      title:
        t(
          "preview.telegram.title",
        ),
      description:
        t(
          "preview.telegram.description",
        ),
      href:
        `/${locale}/telegram`,
    },
    {
      title:
        t(
          "preview.guide.title",
        ),
      description:
        t(
          "preview.guide.description",
        ),
      href:
        `/${locale}/guide`,
    },
  ] as const;

  return (
    <section
      id="search"
      className="relative border-b border-[#DADADA] bg-[#F7F7F7] py-10 sm:py-14 lg:py-16 dark:border-slate-800 dark:bg-[var(--uzde-home-surface)]"
    >
      <div className="relative w-full px-[clamp(16px,3.5vw,96px)] text-center">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="mx-auto flex w-full min-w-0 flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#686868] dark:text-slate-400">
              {t("badge")}
            </span>

            <h2 className={`mx-auto mt-5 w-full min-w-0 text-center text-[clamp(1.35rem,3.2vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.01em] [word-spacing:0.08em] text-[#202020] dark:text-white uppercase ${locale === "de" ? "text-balance" : "xl:whitespace-nowrap"}`}>
              {t("title")}
            </h2>

            <p className="mx-auto mt-5 w-full max-w-[700px] text-center text-base leading-7 text-[#686868] sm:text-lg dark:text-slate-400">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="mt-7 w-full sm:mt-10">
          <div className="relative rounded-[24px] border border-[#E5E5E5] bg-white p-3 sm:p-5 dark:border-[#30343A] dark:bg-[#191C21]">
            <div className="relative">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>

              <input
                type="search"
                value={
                  searchQuery
                }
                onChange={(
                  event,
                ) =>
                  setSearchQuery(
                    event.target
                      .value,
                  )
                }
                aria-label={t(
                  "inputLabel",
                )}
                placeholder={t(
                  "placeholder",
                )}
                className="h-14 w-full rounded-xl border border-[#DADADA] bg-white pl-14 pr-5 text-base text-[#202020] outline-none transition placeholder:text-slate-400 focus-visible:!outline-none focus-visible:border-[#009D84] sm:h-16 dark:border-[#34383D] dark:bg-[#111419] dark:text-white dark:focus:border-[#009D84]"
              />
            </div>

            <div
              className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-5 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
              aria-label={t(
                "categoryFilterLabel",
              )}
            >
              {categories.map(
                (category) => {
                  const isActive =
                    activeCategory ===
                    category;

                  return (
                    <button
                      key={
                        category
                      }
                      type="button"
                      onClick={() =>
                        setActiveCategory(
                          category,
                        )
                      }
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border border-[#202020] bg-[#202020] text-white dark:border-[#F5F5F5] dark:bg-[#F5F5F5] dark:text-[#111419]"
                          : "border border-[#E5E5E5] bg-[#F7F7F7] text-[#686868] hover:border-[#B8BABD] hover:bg-[#EFEFEF] hover:text-[#202020] dark:border-[#34383D] dark:bg-[#24272B] dark:text-[#C7C9CC] dark:hover:border-[#575C62] dark:hover:bg-[#30343A] dark:hover:text-white"
                      }`}
                    >
                      {category ===
                      "Barchasi"
                        ? t(
                            "categories.all",
                          )
                        : locale === "uz"
                          ? toUzbekUiAlphabet(getSearchCategoryLabel(category, locale))
                          : getSearchCategoryLabel(category, locale)}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {showResults && (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-white dark:border-[#30343A] dark:bg-[#191C21]">
              <div className="flex flex-col gap-3 border-b border-[#E5E5E5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#30343A]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                    {t(
                      "results.title",
                    )}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t(
                      "results.count",
                      {
                        count:
                          filteredItems.length,
                      },
                    )}
                  </p>
                </div>

                {(searchQuery ||
                  activeCategory !==
                    "Barchasi") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery(
                        "",
                      );
                      setActiveCategory(
                        "Barchasi",
                      );
                    }}
                    className="w-fit text-sm font-semibold text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {t(
                      "results.clearFilters",
                    )}
                  </button>
                )}
              </div>

              {filteredItems.length >
              0 ? (
                <div className="divide-y divide-[#E5E5E5] dark:divide-[#30343A]">
                  {filteredItems.map(
                    (item) => (
                      <Link
                        key={
                          item.id
                        }
                        href={
                          item.href
                        }
                        className="group flex flex-col gap-4 p-6 transition hover:bg-[#F7F7F7] sm:flex-row sm:items-center dark:hover:bg-[#24272B]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                              {
                                item.title
                              }
                            </h3>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyles(
                                item.category,
                              )}`}
                            >
                              {locale === "uz"
                                ? toUzbekUiAlphabet(getSearchCategoryLabel(item.category, locale))
                                : getSearchCategoryLabel(item.category, locale)}
                            </span>
                          </div>

                          <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E5E5] bg-transparent text-[#686868] transition-transform duration-200 group-hover:translate-x-1 group-hover:border-[#009D84] group-hover:text-[#009D84] dark:border-[#34383D] dark:text-[#A9ADB2] dark:group-hover:border-[#009D84] dark:group-hover:text-[#18C5A5]">
                          <ArrowRightIcon />
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-[#F7F7F7] text-[#686868] dark:border-[#34383D] dark:bg-[#24272B] dark:text-[#A9ADB2]">
                    <SearchIcon />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                    {t(
                      "emptyState.title",
                    )}
                  </h3>

                  <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500 dark:text-slate-400">
                    {t(
                      "emptyState.description",
                    )}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery(
                        "",
                      );
                      setActiveCategory(
                        "Barchasi",
                      );
                    }}
                    className="mt-6 rounded-xl bg-[#202020] px-5 py-3 font-semibold text-white transition hover:bg-[#404040] dark:bg-[#F5F5F5] dark:text-[#111419] dark:hover:bg-[#D8D8D8]"
                  >
                    {t(
                      "emptyState.clearSearch",
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
              {previewItems.map(
                (item) => (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className="group rounded-[20px] border border-[#E5E5E5] bg-white p-5 transition-colors duration-200 hover:border-[#B8BABD] hover:bg-[#FAFAFA] dark:border-[#30343A] dark:bg-[#191C21] dark:hover:border-[#575C62] dark:hover:bg-[#202328]"
                  >
                    <h3 className="font-bold text-slate-950 dark:text-white">
                      {
                        item.title
                      }
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {
                        item.description
                      }
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition group-hover:gap-3 dark:text-emerald-400">
                      {t(
                        "preview.open",
                      )}
                      <ArrowRightIcon />
                    </span>
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
