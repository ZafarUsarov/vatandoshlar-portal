"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

import {
  getSearchCategoryLabel,
  searchGlobalItems,
  type GlobalSearchItem,
  type SearchCategory,
  type SearchLocale,
} from "../data/searchIndex";

type SearchFilter = "Barchasi" | SearchCategory;

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
      <circle cx="10.75" cy="10.75" r="6.75" />
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

function getCategoryStyles(category: SearchCategory) {
  switch (category) {
    case "Yangilik":
      return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";

    case "Xizmat":
      return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";

    case "Mutaxassis":
      return "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-300";

    case "Ish":
      return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";

    case "Telegram":
      return "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300";

    case "Tadbir":
      return "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300";

    case "Qo‘llanma":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300";

    case "Ish platformasi":
      return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300";

    case "Sahifa":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

export default function SearchSection() {
  const currentLocale = useLocale();
  const locale: SearchLocale =
    currentLocale === "de" ? "de" : "uz";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<SearchFilter>("Barchasi");

  const filteredItems = useMemo<ReadonlyArray<GlobalSearchItem>>(() => {
    const category =
      activeCategory === "Barchasi"
        ? undefined
        : activeCategory;

    return searchGlobalItems(
      searchQuery,
      locale,
      category,
    );
  }, [activeCategory, locale, searchQuery]);

  const showResults =
    searchQuery.trim().length > 0 || activeCategory !== "Barchasi";

  return (
    <section
      id="search"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            Global qidiruv
          </span>

          <h2 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Kerakli ma’lumotni bir necha soniyada toping
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {locale === "de"
              ? "Finden Sie Guide-Artikel, Fachkräfte, Jobs, Dienstleistungen, Nachrichten, Telegram-Gruppen und Veranstaltungen über eine Suche."
              : "Qo‘llanma maqolalari, mutaxassislar, ish, xizmat, yangilik, Telegram guruhi va tadbirlarni bitta qidiruv orqali toping."}
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

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={
                    locale === "de"
                      ? "Zum Beispiel: Anmeldung, Steuer-ID, Ausbildung..."
                      : "Masalan: Anmeldung, Steuer-ID, Ausbildung..."
                  }
                  className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-emerald-400 dark:focus:bg-slate-950"
                />
              </div>

              <button
                type="button"
                className="inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-7 font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25"
              >
                Qidirish
                <ArrowRightIcon />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                    }`}
                  >
                    {category === "Barchasi"
                      ? locale === "de"
                        ? "Alle"
                        : "Barchasi"
                      : getSearchCategoryLabel(category, locale)}
                  </button>
                );
              })}
            </div>
          </div>

          {showResults && (
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
              <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                    Natijalar
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {filteredItems.length} ta mos ma’lumot topildi
                  </p>
                </div>

                {(searchQuery || activeCategory !== "Barchasi") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("Barchasi");
                    }}
                    className="w-fit text-sm font-semibold text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    Filtrlarni tozalash
                  </button>
                )}
              </div>

              {filteredItems.length > 0 ? (
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex flex-col gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center dark:hover:bg-slate-800/70"
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
                            {getSearchCategoryLabel(item.category, locale)}
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
                    Mos ma’lumot topilmadi
                  </h3>

                  <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500 dark:text-slate-400">
                    Boshqa kalit so‘z yoki boshqa bo‘limni tanlab qayta
                    qidiring.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("Barchasi");
                    }}
                    className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Qidiruvni tozalash
                  </button>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Ish qidirish",
                  description: "Minijob, Ausbildung va professional ishlar",
                  href: `/${locale}/jobs`,
                },
                {
                  title: "Xizmat topish",
                  description: "Tarjima, huquq, tibbiyot va boshqa xizmatlar",
                  href: `/${locale}/services`,
                },
                {
                  title: "Telegram guruhlari",
                  description: "Bundeslandlar bo‘yicha faol hamjamiyatlar",
                  href: `/${locale}/telegram`,
                },
                {
                  title:
                    locale === "de"
                      ? "Deutschland Guide"
                      : "Germaniya qo‘llanmasi",
                  description:
                    locale === "de"
                      ? "Visa, Anmeldung, Ausbildung und Alltag"
                      : "Viza, Anmeldung, Ausbildung va kundalik hayot",
                  href: `/${locale}/guide`,
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30"
                >
                  <h3 className="font-bold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:gap-3 dark:text-emerald-400">
                    Ochish
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