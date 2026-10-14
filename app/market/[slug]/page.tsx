import { marketCategoryLabels } from "@/lib/market/market-category";
import MarketImageGallery from "@/components/market/MarketImageGallery";
import MarketContactLinks from "@/components/market/MarketContactLinks";
import MarketShareButton from "@/components/market/MarketShareButton";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getReadyMarketImagesForPublishedListing } from "@/lib/market/market-image-repository";
import { getPublishedMarketListingBySlug, getMarketSellerForPublishedListing } from "@/lib/market/market-repository";

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
  const [images, seller] = await Promise.all([
    getReadyMarketImagesForPublishedListing(item.id),
    getMarketSellerForPublishedListing(item.id),
  ]);
  const dateFormat = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "uz-UZ", { day: "numeric", month: "long", year: "numeric" });
  const published = dateFormat.format(new Date(item.publishedAt));
  const joined = seller ? dateFormat.format(new Date(seller.joinedAt)) : null;
  const price = item.listingType === "giveaway" ? t.free : item.priceAmount === null ? t.negotiable : new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ", { style: "currency", currency: "EUR" }).format(Number(item.priceAmount));
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <Header />
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8">
      <Link href="/market" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">← {t.back}</Link>
      <p className="mt-7 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{marketCategoryLabels[locale][item.category]} · {t[item.listingType]} · {item.cityName}, {item.stateName}</p>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl font-bold sm:text-4xl">{item.title}</h1>
        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{price}</p>
      </div>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{locale === "de" ? "Veröffentlicht am" : "Joylangan sana"}: {published}</p>
      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="[&>section]:mt-0">
            <MarketImageGallery images={images} title={item.title} locale={locale} />
          </div>
          <section className="mt-7 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="text-lg font-bold">{locale === "de" ? "Beschreibung" : "Tavsif"}</h2>
            <p className="mt-3 whitespace-pre-line break-words leading-8 text-slate-700 dark:text-slate-200">{item.description}</p>
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28" aria-label={locale === "de" ? "Anbieter und Aktionen" : "Sotuvchi va amallar"}>
          <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-bold">{locale === "de" ? "Anbieter" : "E’lon egasi"}</h2>
            <p className="mt-3 font-semibold">{seller?.displayName ?? (locale === "de" ? "Privater Anbieter" : "Shaxsiy sotuvchi")}</p>
            {joined && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{locale === "de" ? "Mitglied seit" : "Ro‘yxatdan o‘tgan"}: {joined}</p>}
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{item.cityName}, {item.stateName}</p>
          </section>
          <div className="[&>section]:mt-0"><MarketContactLinks contact={item} title={item.title} locale={locale} /></div>
          <MarketShareButton locale={locale} title={item.title} />
        </aside>
      </div>
    </main>
    <Footer />
  </div>;
}
