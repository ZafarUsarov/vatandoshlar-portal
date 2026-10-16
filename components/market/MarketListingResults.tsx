"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { formatMarketPrice, marketPriceCaption } from "@/lib/market/market-display";
import type { MarketListingSort, MarketListingType, MarketListingWithCover } from "@/lib/market/market-repository";
import type { MarketCategory } from "@/lib/market/market-category";

type Locale = "uz" | "de";
type Props = {
  listings: ReadonlyArray<MarketListingWithCover>;
  locale: Locale;
  total: number;
  resultsLabel: string;
  openLabel: string;
  freeLabel: string;
  priceLabel: string;
  typeLabels: Record<MarketListingType, string>;
  categoryLabels: Record<MarketCategory, string>;
  initialSort: MarketListingSort;
};

const favoritesKey = "vatandosh-market-favorites-v1";
const changeEvent = "vatandosh-market-favorites-changed";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}
function getSnapshot() { return window.localStorage.getItem(favoritesKey) ?? "[]"; }
function getServerSnapshot() { return "[]"; }
function Icon({ name, filled = false }: { name: "heart" | "grid" | "list" | "pin" | "tag" | "eye" | "star" | "arrow"; filled?: boolean }) {
  const paths = {
    heart: <path d="M20.8 8.5c0 4.3-8.8 10.2-8.8 10.2S3.2 12.8 3.2 8.5a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h1M3 12h1M3 18h1"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    tag: <><path d="M3 4h9l9 9-8 8-10-10V4Z"/><circle cx="8" cy="9" r="1"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    star: <path d="m12 2 3.1 6.3 7 .9-5.1 5 .9 7-5.9-3.3-5.9 3.3.9-7-5.1-5 7-.9L12 2Z"/>,
    arrow: <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0">{paths[name]}</svg>;
}
export default function MarketListingResults({ listings, locale, total, resultsLabel, openLabel, typeLabels, categoryLabels, initialSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favorites = useMemo(() => {
    try {
      const values: unknown = JSON.parse(saved);
      return new Set(Array.isArray(values) ? values.filter((value): value is string => typeof value === "string") : []);
    } catch { return new Set<string>(); }
  }, [saved]);
  const visible = onlyFavorites ? listings.filter(item => favorites.has(item.id)) : listings;
  function toggleFavorite(id: string) {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id); else next.add(id);
    try {
      window.localStorage.setItem(favoritesKey, JSON.stringify([...next]));
      window.dispatchEvent(new Event(changeEvent));
    } catch { /* Storage can be blocked by browser privacy settings. */ }
  }
  function setSort(value: MarketListingSort) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "newest") next.delete("sort"); else next.set("sort", value);
    next.delete("page");
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ""}`);
  }
  return <>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-600 dark:text-slate-300">{total} {resultsLabel}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites(v => !v)}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium leading-none transition-colors ${onlyFavorites ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-white" : "border-slate-200 dark:border-slate-700"}`}>
          <Icon name="heart" filled={onlyFavorites} />{locale === "de" ? "Merkliste" : "Sevimlilar"}
        </button>
        <label className="sr-only" htmlFor="market-sort">{locale === "de" ? "Sortierung" : "Saralash"}</label>
        <select id="market-sort" value={initialSort} onChange={event => setSort(event.target.value as MarketListingSort)}
          className="h-11 max-w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium leading-none text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
          <option value="newest">{locale === "de" ? "Neueste zuerst" : "Eng yangilari"}</option>
          <option value="oldest">{locale === "de" ? "Älteste zuerst" : "Eng eskilari"}</option>
          <option value="price_asc">{locale === "de" ? "Preis aufsteigend" : "Narx: arzonidan"}</option>
          <option value="price_desc">{locale === "de" ? "Preis absteigend" : "Narx: qimmatidan"}</option>
        </select>
        <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          <button type="button" aria-label={locale === "de" ? "Kachelansicht" : "Kartochka ko‘rinishi"} aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`flex min-h-11 min-w-11 items-center justify-center ${view === "grid" ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-800 dark:text-white" : ""}`}><Icon name="grid"/></button>
          <button type="button" aria-label={locale === "de" ? "Listenansicht" : "Ro‘yxat ko‘rinishi"} aria-pressed={view === "list"} onClick={() => setView("list")} className={`flex min-h-11 min-w-11 items-center justify-center ${view === "list" ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-800 dark:text-white" : ""}`}><Icon name="list"/></button>
        </div>
      </div>
    </div>
    {visible.length === 0 && <p className="mt-6 rounded-xl border border-slate-200 p-5 text-sm dark:border-slate-700">{locale === "de" ? "Keine gespeicherten Anzeigen auf dieser Seite." : "Ushbu sahifada saqlangan e’lonlar yo‘q."}</p>}
    <div className={view === "grid" ? "mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "mt-4 flex flex-col gap-4"}>
      {visible.map(item => {
        const href = `/${locale}/market/${item.slug}`;
        const selected = favorites.has(item.id);
        return <article key={item.id} className={`group relative flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${view === "grid" ? "w-full max-w-[340px] flex-col" : "w-full flex-row"}`}>
          <a href={href} className={`relative block shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 ${view === "grid" ? "aspect-[16/10] w-full" : "w-28 self-stretch sm:w-48"}`} aria-label={item.title}>
            {item.coverImageId ? <Image unoptimized fill sizes={view === "grid" ? "(max-width: 640px) 100vw, 340px" : "192px"} src={`/api/market/images/${item.coverImageId}`} alt={item.title} className="object-cover"/> : <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-slate-500">{locale === "de" ? "Kein Bild" : "Rasm mavjud emas"}</span>}
          </a>
          <button type="button" aria-label={selected ? (locale === "de" ? "Aus Merkliste entfernen" : "Sevimlilardan olib tashlash") : (locale === "de" ? "Zur Merkliste hinzufügen" : "Sevimlilarga qo‘shish")} aria-pressed={selected} onClick={() => toggleFavorite(item.id)}
            className={`absolute z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-emerald-600 dark:bg-slate-950 ${view === "grid" ? "right-3 top-3" : "left-2 top-2"} ${selected ? "text-rose-600" : "text-slate-800 dark:text-white"}`}><Icon name="heart" filled={selected}/></button>
          <div className={`flex min-w-0 flex-1 flex-col ${view === "grid" ? "p-5" : "p-3 sm:p-5"}`}>
            <p className="line-clamp-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{categoryLabels[item.category]} · {typeLabels[item.listingType]} · {item.cityName}</p>
            <h2 className="mt-2 line-clamp-2 text-lg font-bold sm:text-xl">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1 font-bold"><Icon name="tag"/>{marketPriceCaption(item, locale) ? `${marketPriceCaption(item, locale)}: ` : ""}{formatMarketPrice(item, locale)}</span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300"><Icon name="pin"/>{item.cityName}</span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300" title={locale === "de" ? "Aufrufe" : "Ko‘rishlar"} aria-label={`${locale === "de" ? "Aufrufe" : "Ko‘rishlar"}: ${item.viewCount ?? 0}`}><Icon name="eye"/>{new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ").format(item.viewCount ?? 0)}</span>
              {(item.sellerRatingCount ?? 0) > 0 && item.sellerRatingAverage !== null && item.sellerRatingAverage !== undefined && (
                <span className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400"
                  title={locale === "de" ? "Anbieterbewertung" : "Sotuvchi reytingi"}
                  aria-label={`${locale === "de" ? "Anbieterbewertung" : "Sotuvchi reytingi"}: ${item.sellerRatingAverage.toFixed(1)} / 5, ${item.sellerRatingCount} ${locale === "de" ? "Bewertungen" : "ta baho"}`}>
                  <Icon name="star" filled />
                  {item.sellerRatingAverage.toFixed(1)} <span className="text-slate-500 dark:text-slate-400">({item.sellerRatingCount})</span>
                </span>
              )}
            </div>
            <a href={href} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-100 px-3 text-center text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-emerald-800 dark:text-white dark:hover:bg-emerald-700">{openLabel}<Icon name="arrow"/></a>
          </div>
        </article>;
      })}
    </div>
  </>;
}
