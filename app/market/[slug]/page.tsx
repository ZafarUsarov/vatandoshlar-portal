import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getPublishedMarketListingBySlug } from "@/lib/market/market-repository";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
const copy = {
  uz: { back: "Barcha e’lonlar", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman", free: "Bepul", negotiable: "Narx kelishiladi" },
  de: { back: "Alle Anzeigen", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken", free: "Kostenlos", negotiable: "Preis auf Anfrage" },
} as const;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const item = await getPublishedMarketListingBySlug((await params).slug);
  if (!item) return { title: "Market", robots: { index: false, follow: false } };
  return { title: item.title, description: item.description.slice(0, 160), alternates: { canonical: `/${locale}/market/${item.slug}`, languages: { uz: `/uz/market/${item.slug}`, de: `/de/market/${item.slug}` } } };
}
export default async function MarketDetailPage({ params }: Props) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const t = copy[locale];
  const item = await getPublishedMarketListingBySlug((await params).slug);
  if (!item) notFound();
  const price = item.listingType === "giveaway" ? t.free : item.priceAmount === null ? t.negotiable : new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ", { style: "currency", currency: "EUR" }).format(Number(item.priceAmount));
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8"><Link href="/market" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">← {t.back}</Link><p className="mt-10 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t[item.listingType]} · {item.cityName}, {item.stateName}</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">{item.title}</h1><p className="mt-5 text-xl font-semibold">{price}</p><p className="mt-8 whitespace-pre-line break-words leading-8 text-slate-700 dark:text-slate-200">{item.description}</p></main><Footer /></div>;
}
