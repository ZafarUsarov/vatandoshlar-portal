import { localizeMarketListings } from "@/lib/market/market-translation";
import { marketCategories, marketCategoryLabels, isMarketCategory } from "@/lib/market/market-category";
import type { Metadata } from "next";
import MarketListingResults from "@/components/market/MarketListingResults";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketCityCombobox from "@/components/market/MarketCityCombobox";
import { Link } from "@/i18n/navigation";
import { getActiveCities } from "@/lib/locations/location-repository";
import { getPublishedMarketListings, type MarketListingSort, type MarketListingType } from "@/lib/market/market-repository";

export const dynamic = "force-dynamic";
type Locale = "uz" | "de";
const copy = {
  uz: {
    title: "Vatandosh Market", description: "Germaniyadagi vatandoshlar e’lonlari.",
    all: "Barcha turlar", typeLabel: "E’lon turi", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman",
    filter: "Filtrlash", create: "E’lon joylash", mine: "Mening e’lonlarim", empty: "Hozircha mos e’lonlar yo‘q.",
    open: "E’lonni ko‘rish", price: "Narx kelishiladi", free: "Bepul",
    search: "Qidiruv", searchPlaceholder: "E’lonlarni qidirish...", previous: "Oldingi",
    next: "Keyingi", page: "Sahifa", of: "/", results: "ta e’lon", reset: "Filtrlarni tozalash",
  },
  de: {
    title: "Vatandosh Market", description: "Anzeigen der usbekischen Community in Deutschland.",
    all: "Alle Arten", typeLabel: "Anzeigenart", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken",
    filter: "Filtern", create: "Anzeige aufgeben", mine: "Meine Anzeigen", empty: "Noch keine passenden Anzeigen.",
    open: "Anzeige ansehen", price: "Preis auf Anfrage", free: "Kostenlos",
    search: "Suche", searchPlaceholder: "Anzeigen durchsuchen...", previous: "Zurück",
    next: "Weiter", page: "Seite", of: "von", results: "Anzeigen", reset: "Filter zurücksetzen",
  },
} as const;
const types: MarketListingType[] = ["sell", "buy", "giveaway"];
function localeOf(value: string): Locale { return value === "de" ? "de" : "uz"; }
function Glyph({ name, className = "size-5" }: { name: "search" | "grid" | "list" | "filter" | "plus"; className?: string }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    list: <><path d="M4 6h16M4 12h11M4 18h7" /></>,
    filter: <><path d="M4 7h16M4 12h16M4 17h16" /><circle cx="9" cy="7" r="2" fill="white" /><circle cx="16" cy="12" r="2" fill="white" /><circle cx="11" cy="17" r="2" fill="white" /></>,
    plus: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}


export async function generateMetadata(): Promise<Metadata> {
  const locale = localeOf(await getLocale());
  return {
    title: copy[locale].title,
    description: copy[locale].description,
    alternates: {
      canonical: `/${locale}/market`,
      languages: { uz: "/uz/market", de: "/de/market" },
    },
  };
}

export default async function MarketPage({ searchParams }: {
  searchParams: Promise<{ type?: string; category?: string; locationId?: string; city?: string; q?: string; page?: string; sort?: string }>;
}) {
  const locale = localeOf(await getLocale());
  const t = copy[locale];
  const params = await searchParams;
  const selectedCategory = typeof params.category === "string" && isMarketCategory(params.category) ? params.category : undefined;
  const selectedType = types.find(type => type === params.type);
  const sort: MarketListingSort = params.sort === "oldest" || params.sort === "price_asc" || params.sort === "price_desc" ? params.sort : "newest";
  const requestedLocationId = typeof params.locationId === "string" && /^[1-9]\d{0,18}$/.test(params.locationId)
    ? params.locationId : undefined;
  const legacyCity = typeof params.city === "string" ? params.city : undefined;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const requestedPage = typeof params.page === "string" && /^[1-9]\d{0,4}$/.test(params.page)
    ? Number(params.page) : 1;

  const cities = (await getActiveCities()).filter(city => city.countryCode === "DE");
  const selectedCity = requestedLocationId
    ? cities.find(city => city.id === requestedLocationId)
    : cities.find(city => city.slug === legacyCity);

  const result = await getPublishedMarketListings({
    type: selectedType,
    category: selectedCategory,
    locationId: selectedCity?.id,
    query,
    page: requestedPage,
    sort,
  });
  const { total, page, totalPages } = result;
  const listings = await localizeMarketListings(result.listings, locale);
  const pageHref = (target: number) => {
    const search = new URLSearchParams();
    if (selectedCategory) search.set("category", selectedCategory);
    if (selectedType) search.set("type", selectedType);
    if (selectedCity) search.set("locationId", selectedCity.id);
    if (query) search.set("q", query);
    search.set("page", String(target));
    if (sort !== "newest") search.set("sort", sort);
    return `/market?${search.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold">{t.title}</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
          <Link href="/market/mine" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900">{t.mine}</Link>
          <Link href="/market/new" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold !text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
            <Glyph name="plus" className="mr-2 size-5" />{t.create}
          </Link>
          </div>
        </div>

        {/* Mobile: search stays visible; secondary filters are collapsible. */}
        <form className="mt-8 space-y-4 sm:hidden" method="get">
          <label className="flex flex-col gap-2 text-sm">
            {t.search}
            <span className="relative block">
              <Glyph name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
              <input name="q" type="search" maxLength={100} defaultValue={query} placeholder={t.searchPlaceholder}
                className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white py-2 pl-12 pr-4 text-slate-950 placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </span>
          </label>
          <details className="group rounded-2xl border border-slate-200 dark:border-slate-700" open={Boolean(selectedCity || selectedCategory || selectedType)}>
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2"><Glyph name="filter" />{locale === "de" ? "Weitere Filter" : "Filtrlar"}</span>
              <span aria-hidden="true" className="text-slate-500 transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="space-y-4 border-t border-slate-200 p-4 dark:border-slate-700">
              <div className="relative min-w-0 [&_input[role=combobox]]:min-h-12 [&_input[role=combobox]]:rounded-2xl [&_input[role=combobox]]:pl-11">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-[42px] z-10 size-5 text-slate-500"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                <MarketCityCombobox initialId={selectedCity?.id ?? ""} locale={locale} disabled={false} />
              </div>
              <label className="flex flex-col gap-2 text-sm">
                {locale === "de" ? "Kategorie" : "Kategoriya"}
                <select name="category" defaultValue={selectedCategory ?? ""} className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                  <option value="">{locale === "de" ? "Alle Kategorien" : "Barcha kategoriyalar"}</option>
                  {marketCategories.map(category => <option key={category} value={category}>{marketCategoryLabels[locale][category]}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                {t.typeLabel}
                <select name="type" defaultValue={selectedType ?? ""} className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                  <option value="">{t.all}</option>
                  {types.map(type => <option key={type} value={type}>{t[type]}</option>)}
                </select>
              </label>
            </div>
          </details>
          <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 font-semibold !text-white hover:bg-emerald-800">
            <Glyph name="filter" />{t.filter}
          </button>
        </form>

        <form className="mt-10 hidden sm:grid grid-cols-1 items-end gap-4 text-sm sm:grid-cols-2 xl:grid-cols-12" method="get">
          <label className="flex min-w-0 flex-col gap-2 text-sm xl:col-span-4">
            {t.search}
            <span className="relative block">
              <Glyph name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
              <input name="q" type="search" maxLength={100} defaultValue={query} placeholder={t.searchPlaceholder}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-slate-300 bg-white py-2 pl-12 pr-4 text-sm text-slate-950 placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </span>
          </label>
          <div className="min-w-0 xl:col-span-4 [&_input[role=combobox]]:min-h-12 [&_input[role=combobox]]:rounded-2xl [&_input[role=combobox]]:pl-11 [&_input[role=combobox]]:text-sm">
            <div className="relative">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-[42px] z-10 size-5 text-slate-500"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
            <MarketCityCombobox initialId={selectedCity?.id ?? ""} locale={locale} disabled={false} />
            </div>
          </div>
          <label className="order-4 flex min-w-0 flex-col gap-2 text-sm xl:col-span-3">
            {t.typeLabel}
            <span className="relative block">
              <Glyph name="list" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
              <select name="type" defaultValue={selectedType ?? ""} className="min-h-12 w-full appearance-none rounded-2xl border border-slate-300 bg-white py-2 pl-10 pr-8 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                <option value="">{t.all}</option>
                {types.map(type => <option key={type} value={type}>{t[type]}</option>)}
              </select>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600 dark:text-slate-300">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </label>
          <label className="order-3 flex min-w-0 flex-col gap-2 text-sm xl:col-span-4">
            {locale === "de" ? "Kategorie" : "Kategoriya"}
            <span className="relative block">
              <Glyph name="grid" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
              <select name="category" defaultValue={selectedCategory ?? ""} className="min-h-12 w-full appearance-none rounded-2xl border border-slate-300 bg-white py-2 pl-10 pr-8 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                <option value="">{locale === "de" ? "Alle Kategorien" : "Barcha kategoriyalar"}</option>
                {marketCategories.map(category => <option key={category} value={category}>{marketCategoryLabels[locale][category]}</option>)}
              </select>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600 dark:text-slate-300">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </label>
          <button type="submit" className="order-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 font-semibold !text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:col-span-2 xl:col-span-2 xl:w-full">
            <Glyph name="filter" />{t.filter}
          </button>
          {/* Client-side listing controls are mounted here on desktop only. */}
          <div id="market-desktop-toolbar" className="hidden min-w-0 xl:order-6 xl:col-span-7 xl:flex xl:items-end xl:justify-end" />
        </form>

        {listings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 p-8 text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <p>{t.empty}</p>
            {(query || selectedType || selectedCategory || selectedCity) && (
              <Link href="/market" className="mt-4 inline-block font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-400">{t.reset}</Link>
            )}
          </div>
        ) : (
          <>
            <MarketListingResults
              listings={listings}
              locale={locale}
              total={total}
              resultsLabel={t.results}
              openLabel={t.open}
              freeLabel={t.free}
              priceLabel={t.price}
              typeLabels={{ sell: t.sell, buy: t.buy, giveaway: t.giveaway }}
              categoryLabels={marketCategoryLabels[locale]}
              initialSort={sort}
            />
          </>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">{t.previous}</Link>
            ) : <span className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 px-4 text-slate-400 dark:border-slate-800">{t.previous}</span>}
            <span className="text-sm" aria-live="polite">{t.page} {page} {t.of} {totalPages}</span>
            {page < totalPages ? (
              <Link href={pageHref(page + 1)} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">{t.next}</Link>
            ) : <span className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 px-4 text-slate-400 dark:border-slate-800">{t.next}</span>}
          </nav>
        )}
      </main>
      <Footer />
    </div>
  );
}
