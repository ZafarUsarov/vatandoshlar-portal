"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { Link } from "../../i18n/navigation";
import ShareButton from "../shared/ShareButton";
import type { GuideCategory, SupportedGuideLocale } from "../../types/guide";

type ArticleLink = Readonly<{ slug: string; title: string }>;
type CategoryEntry = Readonly<{ category: GuideCategory; articles: ReadonlyArray<ArticleLink> }>;

type Props = Readonly<{ entries: ReadonlyArray<CategoryEntry>; locale: SupportedGuideLocale }>;

export default function GuideExplorer({ entries, locale }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const copy = locale === "uz"
    ? { search: "Maqola yoki mavzuni qidiring...", topics: "MAVZULAR", articles: "MAQOLALAR", eyebrow: "UZDE / QO‘LLANMA", headline: "Germaniya bo‘yicha qo‘llanmalar", intro: "Vizalar, hujjatlar, ta’lim, ish va kundalik hayot haqida kerakli ma’lumotlar.", empty: "Hech narsa topilmadi", noArticles: "Bu yo‘nalishda hozircha maqola yo‘q", count: "ta qo‘llanma" }
    : { search: "Artikel oder Thema suchen...", topics: "THEMEN", articles: "ARTIKEL", eyebrow: "UZDE / RATGEBER", headline: "Ratgeber rund um Deutschland", intro: "Wichtige Informationen zu Visa, Dokumenten, Ausbildung, Arbeit und Alltag in Deutschland.", empty: "Keine Ergebnisse gefunden", noArticles: "In diesem Bereich sind noch keine Artikel veröffentlicht", count: "Ratgeber" };

  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const filtered = useMemo(() => entries.map((entry) => {
    if (!normalizedQuery) return entry;
    const categoryMatches = entry.category.title.toLocaleLowerCase(locale).includes(normalizedQuery);
    return { ...entry, articles: categoryMatches ? entry.articles : entry.articles.filter((article) => article.title.toLocaleLowerCase(locale).includes(normalizedQuery)) };
  }).filter((entry) => !normalizedQuery || entry.articles.length > 0 || entry.category.title.toLocaleLowerCase(locale).includes(normalizedQuery)), [entries, locale, normalizedQuery]);

  const current = filtered.find(({ category }) => category.slug === selected);
  const showCatalog = selected === null || !current || normalizedQuery.length > 0;
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-12 xl:px-10 2xl:px-12">
      <header className="mb-10 max-w-5xl sm:mb-12">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#008F78] dark:text-[#4DD6BA]">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl font-bold tracking-[-0.035em] text-neutral-950 dark:text-white sm:text-5xl lg:text-6xl">
          {copy.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-slate-300 sm:text-lg">
          {copy.intro}
        </p>
        <label className="relative mt-8 block max-w-3xl">
          <span className="sr-only">{copy.search}</span>
          <Search
            size={20}
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#008F78] dark:text-[#4DD6BA]"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
            className="h-14 w-full rounded-xl border border-neutral-200 bg-white pl-14 pr-5 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus-visible:border-[#008F78] focus-visible:ring-2 focus-visible:ring-[#008F78]/20 dark:border-slate-700 dark:bg-[#122B3B] dark:text-white dark:placeholder:text-slate-400"
          />
        </label>
      </header>

      {filtered.length === 0 ? (
        <p role="status" className="rounded-xl border border-neutral-200 bg-white p-6 text-neutral-600 dark:border-slate-700 dark:bg-[#122B3B] dark:text-slate-300">
          {copy.empty}
        </p>
      ) : showCatalog ? (
        <section aria-label={copy.topics}>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-slate-700">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-white sm:text-2xl">
              {copy.topics}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-neutral-500 dark:text-slate-400">
                {filtered.length}
              </span>
              <ShareButton title={copy.headline} locale={locale} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((entry, index) => (
              <article
                key={entry.category.slug}
                className="group flex min-h-36 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-[#008F78]/50 dark:border-slate-700 dark:bg-[#122B3B] dark:hover:border-[#4DD6BA]/50"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelected(entry.category.slug);
                    setQuery("");
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  className="flex w-full flex-1 flex-col p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#008F78]"
                  aria-label={entry.category.title}
                >
                  <span className="text-xs font-medium tracking-widest text-neutral-400 dark:text-slate-400">
                    {String(index + 1).padStart(2, "0")} / GUIDE
                  </span>
                  <h3 className="mt-3 text-base font-bold leading-snug tracking-tight text-neutral-950 dark:text-white">
                    {entry.category.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <span className="rounded-full bg-[#E7F7F1] px-3 py-1 text-xs font-semibold text-[#007F69] dark:bg-[#174C47] dark:text-[#7CE5CF]">
                      {entry.category.articleCount} {copy.count}
                    </span>
                    <ArrowUpRight size={21} aria-hidden="true" className="text-[#008F78] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#4DD6BA]" />
                  </div>
                </button>

                {normalizedQuery && entry.articles.length > 0 && (
                  <div className="border-t border-neutral-200 dark:border-slate-700">
                    {entry.articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/guide/${entry.category.slug}/${article.slug}`}
                        className="flex items-center justify-between gap-2 px-5 py-3 text-sm text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-[#008F78] dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <span className="min-w-0 break-words">{article.title}</span>
                        <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-[#008F78]" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="w-full">
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#008F78] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008F78] dark:text-[#4DD6BA]"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            {copy.topics}
          </button>

          <div className="mb-8 border-b border-neutral-200 pb-6 dark:border-slate-700">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              {current.category.title}
            </h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-slate-400">
              {current.articles.length} {copy.count}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {current.articles.length > 0 ? current.articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/guide/${current.category.slug}/${article.slug}`}
                className="group flex min-h-20 items-center gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-colors hover:border-[#008F78]/50 focus-visible:outline-2 focus-visible:outline-[#008F78] dark:border-slate-700 dark:bg-[#122B3B]"
              >
                <span aria-hidden="true" className="text-xs tabular-nums text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold text-[#173B4B] dark:text-[#E7F3F5]">
                  {article.title}
                </span>
                <ArrowUpRight size={17} aria-hidden="true" className="shrink-0 text-[#008F78]" />
              </Link>
            )) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">{copy.noArticles}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
