import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getActiveCities } from "@/lib/locations/location-repository";
import { getPublishedMarketListings, type MarketListingType } from "@/lib/market/market-repository";

export const dynamic = "force-dynamic";
type Locale = "uz" | "de";
const copy = {
  uz: { title: "Vatandosh Market", description: "Germaniyadagi vatandoshlar e’lonlari.", all: "Barcha turlar", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman", city: "Barcha shaharlar", filter: "Filtrlash", empty: "Hozircha mos e’lonlar yo‘q.", open: "E’lonni ko‘rish", price: "Narx kelishiladi", free: "Bepul" },
  de: { title: "Vatandosh Market", description: "Anzeigen der usbekischen Community in Deutschland.", all: "Alle Arten", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken", city: "Alle Städte", filter: "Filtern", empty: "Noch keine passenden Anzeigen.", open: "Anzeige ansehen", price: "Preis auf Anfrage", free: "Kostenlos" },
} as const;
const types: MarketListingType[] = ["sell", "buy", "giveaway"];
function localeOf(value: string): Locale { return value === "de" ? "de" : "uz"; }
export async function generateMetadata(): Promise<Metadata> {
  const locale = localeOf(await getLocale());
  return { title: copy[locale].title, description: copy[locale].description, alternates: { canonical: `/${locale}/market`, languages: { uz: "/uz/market", de: "/de/market" } } };
}
export default async function MarketPage({ searchParams }: { searchParams: Promise<{ type?: string; city?: string }> }) {
  const locale = localeOf(await getLocale());
  const t = copy[locale];
  const params = await searchParams;
  const selectedType = types.find((type) => type === params.type);
  const cities = (await getActiveCities()).filter((city) => city.countryCode === "DE");
  const selectedCity = cities.find((city) => city.slug === params.city);
  const listings = await getPublishedMarketListings({ type: selectedType, locationId: selectedCity?.id });
  const formatPrice = (amount: string | null, type: MarketListingType) => type === "giveaway" ? t.free : amount === null ? t.price : new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ", { style: "currency", currency: "EUR" }).format(Number(amount));
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8"><h1 className="text-4xl font-bold">{t.title}</h1><p className="mt-4 text-slate-600 dark:text-slate-300">{t.description}</p>
    <form className="mt-10 flex flex-wrap items-end gap-3" method="get">
      <label className="flex min-w-40 flex-col gap-2 text-sm">{t.all}<select name="type" defaultValue={selectedType ?? ""} className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option value="">{t.all}</option>{types.map(type => <option key={type} value={type}>{t[type]}</option>)}</select></label>
      <label className="flex min-w-48 flex-col gap-2 text-sm">{t.city}<select name="city" defaultValue={selectedCity?.slug ?? ""} className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option value="">{t.city}</option>{cities.map(city => <option key={city.id} value={city.slug}>{city.cityName} — {city.stateName}</option>)}</select></label>
      <button type="submit" className="min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">{t.filter}</button>
    </form>
    {listings.length === 0 ? <div className="mt-10 rounded-2xl border border-slate-200 p-8 text-slate-600 dark:border-slate-800 dark:text-slate-300">{t.empty}</div> : <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{listings.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t[item.listingType]} · {item.cityName}</p><h2 className="mt-3 text-xl font-bold">{item.title}</h2><p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{item.description}</p><p className="mt-4 font-semibold">{formatPrice(item.priceAmount, item.listingType)}</p><Link href={`/market/${item.slug}`} className="mt-5 inline-block font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-2 dark:text-emerald-400">{t.open}</Link></article>)}</div>}
  </main><Footer /></div>;
}
