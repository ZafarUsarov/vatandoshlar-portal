import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketCityCombobox from "@/components/market/MarketCityCombobox";
import { Link } from "@/i18n/navigation";
import { getActiveCities } from "@/lib/locations/location-repository";
import { getPublishedMarketListings, type MarketListingType } from "@/lib/market/market-repository";

export const dynamic = "force-dynamic";
type Locale = "uz" | "de";
const copy = {
  uz: {
    title: "Vatandosh Market", description: "Germaniyadagi vatandoshlar e’lonlari.",
    all: "Barcha turlar", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman",
    filter: "Filtrlash", create: "E’lon joylash", empty: "Hozircha mos e’lonlar yo‘q.",
    open: "E’lonni ko‘rish", price: "Narx kelishiladi", free: "Bepul",
    search: "Qidiruv", searchPlaceholder: "E’lonlarni qidirish...", previous: "Oldingi",
    next: "Keyingi", page: "Sahifa", of: "/", results: "ta e’lon",
  },
  de: {
    title: "Vatandosh Market", description: "Anzeigen der usbekischen Community in Deutschland.",
    all: "Alle Arten", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken",
    filter: "Filtern", create: "Anzeige aufgeben", empty: "Noch keine passenden Anzeigen.",
    open: "Anzeige ansehen", price: "Preis auf Anfrage", free: "Kostenlos",
    search: "Suche", searchPlaceholder: "Anzeigen durchsuchen...", previous: "Zurück",
    next: "Weiter", page: "Seite", of: "von", results: "Anzeigen",
  },
} as const;
const types: MarketListingType[] = ["sell", "buy", "giveaway"];
function localeOf(value: string): Locale { return value === "de" ? "de" : "uz"; }

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
  searchParams: Promise<{ type?: string; locationId?: string; city?: string; q?: string; page?: string }>;
}) {
  const locale = localeOf(await getLocale());
  const t = copy[locale];
  const params = await searchParams;
  const selectedType = types.find(type => type === params.type);
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
    locationId: selectedCity?.id,
    query,
    page: requestedPage,
  });
  const { listings, total, page, totalPages } = result;

  const pageHref = (target: number) => {
    const search = new URLSearchParams();
    if (selectedType) search.set("type", selectedType);
    if (selectedCity) search.set("locationId", selectedCity.id);
    if (query) search.set("q", query);
    search.set("page", String(target));
    return `/market?${search.toString()}`;
  };

  const formatPrice = (amount: string | null, type: MarketListingType) =>
    type === "giveaway" ? t.free : amount === null ? t.price
      : new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ", {
          style: "currency", currency: "EUR",
        }).format(Number(amount));

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold">{t.title}</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t.description}</p>
          </div>
          <Link href="/market/new" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
            {t.create}
          </Link>
        </div>

        <form className="mt-10 flex flex-wrap items-end gap-3" method="get">
          <label className="flex w-full min-w-0 flex-col gap-2 text-sm sm:min-w-48 sm:flex-1">
            {t.search}
            <input name="q" type="search" maxLength={100} defaultValue={query} placeholder={t.searchPlaceholder}
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-950 placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-2 text-sm sm:flex-none">
            {t.all}
            <span className="relative block">
              <select name="type" defaultValue={selectedType ?? ""} className="min-h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-2 pl-3 pr-11 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                <option value="">{t.all}</option>
                {types.map(type => <option key={type} value={type}>{t[type]}</option>)}
              </select>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600 dark:text-slate-300">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </label>
          <div className="w-full min-w-0 flex-1 sm:min-w-64">
            <MarketCityCombobox initialId={selectedCity?.id ?? ""} locale={locale} disabled={false} />
          </div>
          <button type="submit" className="min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
            {t.filter}
          </button>
        </form>

        {listings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 p-8 text-slate-600 dark:border-slate-800 dark:text-slate-300">{t.empty}</div>
        ) : (
          <>
            <p className="mt-8 text-sm text-slate-600 dark:text-slate-300">{total} {t.results}</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map(item => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                  {item.coverImageId && (
                    <Link href={`/market/${item.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
                      <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900">
                        <Image unoptimized fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          src={`/api/market/images/${item.coverImageId}`} alt={item.title} className="object-cover" />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t[item.listingType]} · {item.cityName}</p>
                    <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
                    <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                    <p className="mt-4 font-semibold">{formatPrice(item.priceAmount, item.listingType)}</p>
                    <Link href={`/market/${item.slug}`} className="mt-5 inline-block font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-2 dark:text-emerald-400">{t.open}</Link>
                  </div>
                </article>
              ))}
            </div>
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
