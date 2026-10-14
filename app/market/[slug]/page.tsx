import { marketCategoryLabels } from "@/lib/market/market-category";
import MarketImageGallery from "@/components/market/MarketImageGallery";
import MarketContactLinks from "@/components/market/MarketContactLinks";
import MarketShareButton from "@/components/market/MarketShareButton";
import Image from "next/image";
import MarketDetailIcon from "@/components/market/MarketDetailIcon";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getReadyMarketImagesForPublishedListing } from "@/lib/market/market-image-repository";
import { getPublishedMarketListingBySlug, getMarketSellerForPublishedListing, getRelatedMarketListings } from "@/lib/market/market-repository";

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
  const images = await getReadyMarketImagesForPublishedListing(item.id);
  const url = `https://vatandoshlar.de/${locale}/market/${item.slug}`;
  const price = item.listingType === "giveaway" ? (locale === "de" ? "Kostenlos" : "Bepul") : item.priceAmount === null ? "" : `${item.priceAmount} €`;
  const description = [price, item.cityName, item.description].filter(Boolean).join(" · ").slice(0, 190);
  const imageUrl = images[0] ? `https://vatandoshlar.de/api/market/og/${images[0].id}` : undefined;
  return {
    title: item.title, description,
    alternates: { canonical: url, languages: { uz: `/uz/market/${item.slug}`, de: `/de/market/${item.slug}` } },
    openGraph: { type: "website", url, siteName: "Vatandoshlar.de", title: `${item.title}${price ? ` — ${price}` : ""}`, description,
      ...(imageUrl ? { images: [{ url: imageUrl, alt: item.title }] } : {}) },
    twitter: { card: imageUrl ? "summary_large_image" : "summary", title: item.title, description,
      ...(imageUrl ? { images: [imageUrl] } : {}) },
  };
}
export default async function MarketDetailPage({ params }: Props) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const t = copy[locale];
  const item = await getPublishedMarketListingBySlug((await params).slug);
  if (!item) notFound();
  const [images, seller, related] = await Promise.all([
    getReadyMarketImagesForPublishedListing(item.id),
    getMarketSellerForPublishedListing(item.id),
    getRelatedMarketListings(item.id, item.category),
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
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{item.title}</h1>
      <p className="mt-3 inline-flex items-center gap-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400"><MarketDetailIcon name="tag" className="h-6 w-6" />{price}</p>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400"><MarketDetailIcon name="calendar" className="inline-block h-4 w-4 align-[-3px] text-emerald-600" /> {locale === "de" ? "Veröffentlicht am" : "Joylangan sana"}: {published}</p>
      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="[&>section]:mt-0">
            <MarketImageGallery images={images} title={item.title} locale={locale} />
          </div>
          <section className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
            <h2 className="flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="file" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Beschreibung" : "Tavsif"}</h2>
            <p className="mt-3 whitespace-pre-line break-words leading-8 text-slate-700 dark:text-slate-200">{item.description}</p>
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28" aria-label={locale === "de" ? "Anbieter und Aktionen" : "Sotuvchi va amallar"}>
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/50 p-5 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
            <h2 className="flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="user" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Anbieter" : "E’lon egasi"}</h2>
            <div className="mt-4 flex items-center gap-3"><div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{(seller?.displayName?.trim().slice(0, 1) || "S").toUpperCase()}</div><p className="font-semibold">{seller?.displayName ?? (locale === "de" ? "Privater Anbieter" : "Shaxsiy sotuvchi")}</p></div>
            {joined && <p className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><MarketDetailIcon name="calendar" className="h-4 w-4 text-emerald-700" />{locale === "de" ? "Mitglied seit" : "Ro‘yxatdan o‘tgan"}: {joined}</p>}
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><MarketDetailIcon name="pin" className="h-4 w-4 text-emerald-700" />{item.cityName}, {item.stateName}</p>
          </section>
          <div className="[&>section]:mt-0"><MarketContactLinks contact={item} title={item.title} locale={locale} /></div>
          <MarketShareButton locale={locale} title={item.title} />
        </aside>
      </div>
      {related.length > 0 && <section className="mt-14 border-t border-slate-200 pt-8 dark:border-slate-800">
        <h2 className="text-xl font-bold sm:text-2xl">{locale === "de" ? "Ähnliche Anzeigen" : "O‘xshash e’lonlar"}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map(other => <Link key={other.id} href={`/market/${other.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-md dark:border-slate-800">
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
              {other.coverImageId ? <Image unoptimized fill sizes="(max-width: 640px) 100vw, 280px" src={`/api/market/images/${other.coverImageId}`} alt={other.title} className="object-cover" /> : <span className="flex h-full items-center justify-center text-sm text-slate-500">{locale === "de" ? "Kein Bild" : "Rasm yo‘q"}</span>}
            </div>
            <div className="p-4"><h3 className="line-clamp-2 font-semibold group-hover:text-emerald-700">{other.title}</h3>
              <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-400">{other.listingType === "giveaway" ? t.free : other.priceAmount === null ? t.negotiable : new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ", { style: "currency", currency: "EUR" }).format(Number(other.priceAmount))}</p>
              <p className="mt-1 text-xs text-slate-500">{other.cityName}</p>
            </div>
          </Link>)}
        </div>
      </section>}
    </main>
    <Footer />
  </div>;
}
