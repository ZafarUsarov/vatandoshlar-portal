"use client";

import { useState } from "react";
import EventEditorialVisual from "./EventEditorialVisual";
import { Link } from "../../i18n/navigation";
import type { EventDiscoveryItem, EventCategoryKey, SupportedEventLocale } from "../../types/event";

type Props = Readonly<{ locale: SupportedEventLocale; upcoming: readonly EventDiscoveryItem[]; planning: readonly EventDiscoveryItem[]; past: readonly EventDiscoveryItem[] }>;
const primaryFilters = ["all", "culture", "community", "sport", "science", "education-career", "business"] as const;
const additionalFilters = ["children", "consular"] as const;
type EventFilter = (typeof primaryFilters)[number] | (typeof additionalFilters)[number];
const filterLabels = {
  all: ["Barçasi", "Alle"], culture: ["Madaniyat", "Kultur"],
  community: ["Hamjamiyat", "Gemeinschaft"], sport: ["Sport", "Sport"],
  science: ["Ilm-fan va texnologiya", "Wissenschaft & Technologie"], "education-career": ["Ta’lim va karyera", "Bildung & Karriere"],
  business: ["Tadbirkorlik", "Unternehmertum"], children: ["Bolalar", "Kinder"],
  consular: ["Konsullik", "Konsularisches"],
} satisfies Record<EventFilter, readonly [string, string]>;

function matchesFilter(key: EventCategoryKey, filter: EventFilter): boolean {
  if (filter === "all") return true;
  if (filter === "education-career") return key === "education" || key === "career";
  return key === filter;
}

function EditorialCard({ event, locale, wide = false }: { event: EventDiscoveryItem; locale: SupportedEventLocale; wide?: boolean }) {
  const uz = locale === "uz";
  const planning = event.eventStatus === "planning";
  const date = !planning ? new Intl.DateTimeFormat(uz ? "uz-Latn-UZ" : "de-DE", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(event.startDate)) : null;
  return <article className={`flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-[var(--uzde-home-card)] ${wide ? "md:flex-row" : ""}`}>
    <div className={wide ? "relative overflow-hidden md:w-[30%] md:shrink-0 md:[&>svg]:absolute md:[&>svg]:inset-0 md:[&>svg]:h-full md:[&>svg]:aspect-auto" : "overflow-hidden [&>svg]:max-h-[180px]"}><EventEditorialVisual slug={event.slug} category={event.categoryKey} /></div>
    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium"><span className="text-teal-700 dark:text-[#55d6c5]">{event.categoryKey === "community" ? filterLabels.community[uz ? 0 : 1] : event.category}</span><span className="text-zinc-600 dark:text-zinc-400">{planning ? (uz ? "Rejalaştirilmoqda" : "In Planung") : event.format}</span></div>
    <h3 className="mt-3 text-xl font-semibold leading-tight"><Link href={`/events/${event.slug}`} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{event.title}</Link></h3>
    <p className="mt-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">{event.excerpt}</p>
    {!planning && <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
      <div><dt className="sr-only">{uz ? "Sana" : "Datum"}</dt><dd>{planning ? (uz ? "Sana keyinroq e’lon qilinadi" : "Termin folgt") : <time dateTime={event.startDate}>{date}{event.startTime ? ` · ${event.startTime.slice(0, 5)}${event.endTime ? ` – ${event.endTime.slice(0, 5)}` : ""}` : ""}</time>}</dd></div>
      <div><dt className="sr-only">{uz ? "Manzil" : "Ort"}</dt><dd>{planning ? (uz ? "Manzil tasdiqlanişi kutilmoqda" : "Ort folgt") : [event.city, event.venueName].filter(Boolean).join(" · ") || event.format}</dd></div>
      <div><dt className="sr-only">{uz ? "Taşkilotçi" : "Veranstalter"}</dt><dd>{event.organizerType === "vatandoshlar" ? "UzDe." : event.organizerName}</dd></div>
      {!planning && <div><dt className="sr-only">{uz ? "Narx" : "Preis"}</dt><dd>{event.priceLabel}</dd></div>}
    </dl>}
    <div className="mt-auto pt-4"><Link href={`/events/${event.slug}`} aria-label={`${uz ? "Batafsil" : "Details"}: ${event.title}`} className="block border-t border-slate-200 pt-4 text-sm font-semibold text-teal-700 hover:underline dark:border-zinc-800 dark:text-[#55d6c5]">{uz ? "Batafsil" : "Details"} <span aria-hidden="true">↗</span></Link></div>
    </div>
  </article>;
}

function PlannedEventCard({ event, locale }: { event: EventDiscoveryItem; locale: SupportedEventLocale }) {
  const uz = locale === "uz";
  const category = event.categoryKey === "community" ? filterLabels.community[uz ? 0 : 1] : event.category;
  return <Link href={`/events/${event.slug}`} className="relative flex min-h-14 sm:min-h-24 min-w-0 flex-col items-start justify-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 sm:rounded-xl sm:py-3 pr-9 text-left dark:bg-[var(--uzde-home-card)] transition-colors hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-800 dark:hover:border-[#55d6c5]">
    <span className="text-xs font-medium text-teal-700 dark:text-[#55d6c5]">{category}</span>
    <span className="text-sm font-semibold leading-snug">{event.title}</span><span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-base">↗</span>
  </Link>;
}

export default function EventsExplorer({ locale, upcoming, planning, past }: Props) {
  const uz = locale === "uz";
  const [category, setCategory] = useState<EventFilter>("all");
  const [planningOpen, setPlanningOpen] = useState(false);
  const groups = [{ id: "upcoming-events", title: uz ? "Yaqin tadbirlar" : "Kommende Veranstaltungen", items: upcoming }, { id: "planning-events", title: uz ? "Rejadagi tadbirlar" : "Geplante Veranstaltungen", items: planning }, ...(past.length ? [{ id: "past-events", title: uz ? "Ötgan tadbirlar" : "Vergangene Veranstaltungen", items: past }] : [])];
  const available = new Set([...upcoming, ...planning, ...past].map(e => e.categoryKey));
  const filters: EventFilter[] = [...primaryFilters, ...additionalFilters.filter(key => available.has(key))];
  return <div className="pt-5 pb-1 sm:py-10">
    <div role="group" aria-label={uz ? "Tadbir kategoriyalari" : "Veranstaltungskategorien"} className="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:justify-center gap-2 border-b border-slate-200 pb-5 dark:border-zinc-800">
      {filters.map(key => <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)} className={`min-h-11 shrink-0 rounded-lg border px-3 text-xs sm:px-4 sm:text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 ${category === key ? "border-teal-700 bg-teal-700 text-white dark:border-[#55d6c5] dark:bg-[#55d6c5] dark:text-[var(--uzde-page-bg)]" : "border-slate-200 hover:border-teal-700 dark:border-zinc-800 dark:hover:border-[#55d6c5]"}`}>{filterLabels[key][uz ? 0 : 1]}</button>)}
    </div>
    <div aria-live="polite" className="sr-only">{groups.reduce((n, group) => n + group.items.filter(e => matchesFilter(e.categoryKey, category)).length, 0)} {uz ? "tadbir" : "Veranstaltungen"}</div>
    {groups.map(group => { const items = group.items.filter(e => matchesFilter(e.categoryKey, category)); return <section key={group.id} id={group.id} className={`scroll-mt-28 border-b border-slate-200 last:border-b-0 ${group.id === "planning-events" ? "py-1 sm:py-5" : items.length ? "py-5 sm:py-8" : "py-3 sm:py-4"} dark:border-zinc-800`}>{group.id === "planning-events" ? <h2 className="text-lg font-semibold"><button type="button" aria-expanded={planningOpen} aria-controls="planned-event-content" onClick={() => setPlanningOpen(open => !open)} className="flex min-h-11 w-full items-center justify-between gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 sm:hidden"><span>{group.title}</span><span className="flex shrink-0 items-center gap-2 text-xs font-normal text-zinc-600 dark:text-zinc-400">{items.length} {uz ? "ta" : ""}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`size-5 ${planningOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg></span></button><span className="hidden sm:inline">{group.title}</span></h2> : <h2 className={!items.length ? "text-lg font-semibold" : "text-2xl font-semibold sm:text-3xl"}>{group.title}</h2>}{group.id === "planning-events" ? <div id="planned-event-content" className={planningOpen ? "block" : "hidden sm:block"}>{items.length ? <><div className="mt-2 grid gap-2 sm:mt-3 sm:grid-flow-col sm:auto-cols-[minmax(180px,30%)] sm:gap-3 sm:overflow-x-auto sm:p-1 lg:gap-5 lg:auto-cols-[calc((100%_-_3.75rem)/4)]">{items.map(event => <PlannedEventCard key={event.slug} event={event} locale={locale} />)}</div><p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{uz ? "Sana va manzillar tasdiqlangaç e’lon qilinadi." : "Termine und Orte werden nach Bestätigung bekannt gegeben."}</p></> : <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{category === "all" ? (uz ? "Hozirça bu bölimda tadbir yöq." : "Derzeit gibt es hier keine Veranstaltungen.") : (uz ? "Hozirça bu yönalişda tadbirlar yöq." : "Keine Veranstaltungen in dieser Kategorie.")}</p>}</div> : items.length ? <div className={`mt-5 grid grid-cols-1 gap-4 ${group.id === "upcoming-events" && items.length === 1 ? "" : group.id === "upcoming-events" && items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>{items.map(event => <EditorialCard key={`${event.eventStatus}-${event.slug}`} event={event} locale={locale} wide={group.id === "upcoming-events" && items.length === 1} />)}</div> : <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{category === "all" ? (uz ? "Hozirça bu bölimda tadbir yöq." : "Derzeit gibt es hier keine Veranstaltungen.") : (uz ? "Hozirça bu yönalişda tadbirlar yöq." : "Keine Veranstaltungen in dieser Kategorie.")}</p>}</section>; })}
  </div>;
}
