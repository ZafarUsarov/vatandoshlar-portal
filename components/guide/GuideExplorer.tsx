"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "../../i18n/navigation";
import ShareButton from "../shared/ShareButton";
import type { GuideCategory, SupportedGuideLocale } from "../../types/guide";

type ArticleLink = Readonly<{ slug: string; title: string }>;
type CategoryEntry = Readonly<{ category: GuideCategory; articles: ReadonlyArray<ArticleLink> }>;

type Props = Readonly<{ entries: ReadonlyArray<CategoryEntry>; locale: SupportedGuideLocale }>;

export default function GuideExplorer({ entries, locale }: Props) {
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const copy = locale === "uz"
    ? { search: "Maqola yoki mavzuni qidiring...", topics: "MAVZULAR", articles: "MAQOLALAR", eyebrow: "UZDE / QÖLLANMA", headline: "Germaniya böyiça qöllanmalar", intro: "Vizalar, hujjatlar, ta’lim, iş va kundalik hayot haqida kerakli ma’lumotlar.", empty: "Heç narsa topilmadi", noArticles: "Bu yönalişda hozirça maqola yöq", count: "ta qöllanma" }
    : { search: "Artikel oder Thema suchen...", topics: "THEMEN", articles: "ARTIKEL", eyebrow: "UZDE / RATGEBER", headline: "Ratgeber rund um Deutschland", intro: "Wichtige Informationen zu Visa, Dokumenten, Ausbildung, Arbeit und Alltag in Deutschland.", empty: "Keine Ergebnisse gefunden", noArticles: "In diesem Bereich sind noch keine Artikel veröffentlicht", count: "Ratgeber" };

  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const filtered = useMemo(() => entries.map((entry) => {
    if (!normalizedQuery) return entry;
    const categoryMatches = entry.category.title.toLocaleLowerCase(locale).includes(normalizedQuery);
    return { ...entry, articles: categoryMatches ? entry.articles : entry.articles.filter((article) => article.title.toLocaleLowerCase(locale).includes(normalizedQuery)) };
  }).filter((entry) => !normalizedQuery || entry.articles.length > 0 || entry.category.title.toLocaleLowerCase(locale).includes(normalizedQuery)), [entries, locale, normalizedQuery]);

  return (
    <>

      <nav className="guide-marquee hidden lg:block overflow-hidden border-y border-[#E3E5E5] bg-[#F0F1F0] py-2.5 text-[#4A5151] dark:border-[#30363A] dark:bg-[#1B2024] dark:text-zinc-300" aria-label={locale === "uz" ? "Qöllanma mavzulari" : "Ratgeberthemen"}>
        <div className="guide-marquee-track flex w-max items-center">
          {([0, 1] as const).map((cycle) => (
            <div key={cycle} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12" aria-hidden={cycle === 1}>
              {entries.map(({ category }) => (
                <Link
                  key={category.slug}
                  href={`/guide/${category.slug}`}
                  tabIndex={cycle === 1 ? -1 : undefined}
                  className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-[11px] font-medium tracking-[0.08em] transition-colors hover:text-[#008F78] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008F78] dark:hover:text-[#4DD6BA] sm:text-xs"
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-[#008F78] dark:bg-[#4DD6BA]" />
                  {category.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
      <style jsx>{`
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .guide-marquee-track { animation: guide-marquee-scroll 100s linear infinite; }
          .guide-marquee:hover .guide-marquee-track,
          .guide-marquee:focus-within .guide-marquee-track { animation-play-state: paused; }
        }
        @keyframes guide-marquee-scroll { to { transform: translateX(-50%); } }
      `}</style>
      <div className="mx-auto w-full max-w-[1600px] px-[clamp(16px,3.3vw,112px)] pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
      <header className="relative isolate mb-10 flex min-h-[440px] flex-col justify-end overflow-hidden rounded-2xl bg-[#121518] px-5 py-6 sm:mb-12 sm:min-h-[460px] sm:px-8 sm:py-8 lg:min-h-[470px] lg:flex-row lg:items-end lg:justify-start lg:px-14 lg:py-12">
        <div className="absolute inset-0 -z-20 overflow-hidden bg-[#121518]">
          <Image
            src="/images/guide/knowledge-editorial.webp"
            alt="Kitob javonlari va o‘qish kreslosi joylashgan sokin kutubxona interyeri"
            fill
            priority
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="object-cover object-[56%_center] sm:object-center"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent lg:bg-gradient-to-r lg:from-black/75 lg:via-black/45 lg:to-black/10" />
        <div className="relative w-full lg:max-w-4xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 sm:mb-4 sm:text-xs">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-3xl text-[clamp(28px,7.5vw,34px)] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[clamp(36px,5vw,80px)]">
            {copy.headline}
          </h1>
          <p className="mt-3 max-w-2xl text-[13px] leading-[1.5] text-white/90 sm:mt-4 sm:text-lg">
            {copy.intro}
          </p>
          <label className="relative mt-5 block max-w-3xl sm:mt-8">
            <span className="sr-only">{copy.search}</span>
            <Search
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#008F78] sm:left-5"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.search}
              className="h-11 w-full rounded-xl border border-white/80 bg-white pl-12 pr-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus-visible:border-[#008F78] focus-visible:ring-2 focus-visible:ring-[#008F78]/30 sm:h-14 sm:pl-14 sm:pr-5 sm:text-base"
            />
          </label>
        </div>
      </header>

      {filtered.length === 0 ? (
        <p role="status" className="rounded-xl border border-neutral-200 bg-white p-6 text-neutral-600 dark:border-slate-700 dark:bg-[#122B3B] dark:text-slate-300">
          {copy.empty}
        </p>
      ) : (
        <section aria-label={copy.topics}>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-slate-700">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-white sm:text-2xl">
              {copy.topics}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-neutral-500 dark:text-slate-400">
                {filtered.length}
              </span>
              <ShareButton title={copy.headline} locale={locale} variant="guide" iconOnly ariaLabel={locale === "uz" ? "Qöllanmani ulaşiş" : "Ratgeber teilen"} />
            </div>
          </div>

                          <div className="space-y-3 lg:hidden">
                            {filtered.map((entry, index) => {
                              const expanded = openCategory === entry.category.slug;
                              const panelId = `guide-mobile-panel-${entry.category.slug}`;
                              return (
                                <div key={entry.category.slug} className={`overflow-hidden rounded-2xl border transition-colors duration-200 motion-reduce:transition-none ${expanded ? "border-[#008F78] bg-[#F4FAF8] dark:border-[#4DD6BA] dark:bg-[#172A29]" : "border-[#D9DFDE] bg-white dark:border-[#303B40] dark:bg-[#181E22]"}`}>
                                  <h3>
                                    <button
                                      type="button"
                                      aria-expanded={expanded}
                                      aria-controls={panelId}
                                      onClick={() => setOpenCategory(expanded ? null : entry.category.slug)}
                                      className="flex min-h-[72px] w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#008F78] dark:focus-visible:outline-[#4DD6BA]"
                                    >
                                      <span className="shrink-0 text-xs font-medium tabular-nums tracking-wide text-neutral-500 dark:text-zinc-400">{String(index + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}</span>
                                      <span className="min-w-0 flex-1 break-words text-[15px] font-semibold leading-snug tracking-tight text-[#202020] dark:text-[#E7ECEE]">{entry.category.title}</span>
                                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`size-5 shrink-0 text-[#008F78] transition-transform duration-200 motion-reduce:transition-none dark:text-[#65CBB6] ${expanded ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                                    </button>
                                  </h3>
                                  <div id={panelId} aria-hidden={!expanded} className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="min-h-0 overflow-hidden">
                                      <div className="border-t border-[#D9DFDE] px-4 pb-2 pt-2 dark:border-[#303B40]">
                                        {entry.articles.length > 0 ? (
                                          <ol className="divide-y divide-[#D9DFDE] dark:divide-[#303B40]">
                                            {entry.articles.map((article, articleIndex) => (
                                              <li key={article.slug}>
                                                <Link
                                                  href={`/guide/${entry.category.slug}/${article.slug}`}
                                                  tabIndex={expanded ? undefined : -1}
                                                  className="flex min-h-[56px] items-center gap-3 py-3 text-sm font-medium text-[#202020] focus-visible:outline-2 focus-visible:outline-[#008F78] dark:text-[#E7ECEE] dark:focus-visible:outline-[#4DD6BA]"
                                                >
                                                  <span className="w-6 shrink-0 text-xs tabular-nums text-neutral-500 dark:text-zinc-400">{String(articleIndex + 1).padStart(2, "0")}</span>
                                                  <span className="min-w-0 flex-1 break-words leading-6">{article.title}</span>
                                                  <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-[#008F78] dark:text-[#65CBB6]" />
                                                </Link>
                                              </li>
                                            ))}
                                          </ol>
                                        ) : (
                                          <p className="py-4 text-sm text-neutral-600 dark:text-zinc-300">{copy.noArticles}</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
            <div className="hidden gap-4 lg:grid lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((entry, index) => (
              <article
                key={entry.category.slug}
                className="group flex min-h-40 flex-col overflow-hidden rounded-xl border border-[#E0E4E3] bg-white transition-[background-color,border-color] duration-200 hover:border-[#B9CAC5] hover:bg-[#FAFCFB] active:bg-[#F1F7F4] focus-within:border-[#008F78] dark:border-[#2A343A] dark:bg-[#181E22] dark:hover:border-[#40534F] dark:hover:bg-[#1C2528] dark:active:bg-[#202D2C] dark:focus-within:border-[#4DD6BA] motion-reduce:transition-none"
              >
                <Link
                  href={`/guide/${entry.category.slug}`}
                  className="flex w-full flex-1 flex-col p-5 text-left focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#008F78] dark:focus-visible:outline-[#4DD6BA]"
                  aria-label={entry.category.title}
                >
                  <span className="text-xs font-medium tracking-widest text-neutral-500 dark:text-[#91A0A6]">
                    {String(index + 1).padStart(2, "0")} / GUIDE
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-[#202020] dark:text-[#E7ECEE]">
                    {entry.category.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <span className="rounded-full bg-[#E7F7F1] px-3 py-1 text-xs font-semibold text-[#007F69] dark:bg-[#203B37] dark:text-[#9BDED0]">
                      {entry.category.articleCount} {copy.count}
                    </span>
                    <ArrowUpRight size={21} aria-hidden="true" className="text-[#008F78] transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-active:translate-x-0 dark:text-[#65CBB6] dark:group-hover:text-[#91E5D3] motion-reduce:transform-none motion-reduce:transition-none" />
                  </div>
                </Link>

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
      )}
      </div>
    </>
  );
}
