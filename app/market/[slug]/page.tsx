import { formatMarketLocation, formatMarketPrice, marketPriceCaption } from "@/lib/market/market-display";
import { localizeMarketListings } from "@/lib/market/market-translation";
import { getMarketSellerRatingSummary } from "@/lib/market/market-seller-ratings";
import { marketCategoryLabels } from "@/lib/market/market-category";
import MarketViewTracker from "@/components/market/MarketViewTracker";
import MarketImageGallery from "@/components/market/MarketImageGallery";
import MarketContactLinks from "@/components/market/MarketContactLinks";
import MarketShareButton from "@/components/market/MarketShareButton";
import MarketReportForm from "@/components/market/MarketReportForm";
import Image from "next/image";
import MarketDetailIcon from "@/components/market/MarketDetailIcon";
import PublicUserAvatar from "@/components/account/PublicUserAvatar";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getReadyMarketImagesForPublishedListing } from "@/lib/market/market-image-repository";
import { getPublishedMarketListingBySlug, getMarketSellerForPublishedListing, getRelatedMarketListings, getMarketListingViewCount } from "@/lib/market/market-repository";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }>; searchParams?: Promise<{ original?: string }> };
const copy = {
  uz: { back: "Barcha e’lonlar", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman", free: "Bepul", negotiable: "Narx kelishiladi" },
  de: { back: "Alle Anzeigen", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken", free: "Kostenlos", negotiable: "Preis auf Anfrage" },
} as const;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const original = await getPublishedMarketListingBySlug((await params).slug);
  const item = original ? (await localizeMarketListings([original], locale))[0] : null;
  if (!item) return { title: "Market", robots: { index: false, follow: false } };
  const images = await getReadyMarketImagesForPublishedListing(item.id);
  const url = `https://vatandoshlar.de/${locale}/market/${item.slug}`;
  const price = formatMarketPrice(item, locale);
  const description = [price, item.cityName, item.description].filter(Boolean).join(" · ").slice(0, 190);
  const imageUrl = images[0] ? `https://vatandoshlar.de/api/market/og/${images[0].id}` : undefined;
  return {
    title: item.title, description,
    alternates: { canonical: url, languages: { uz: `/uz/market/${item.slug}`, de: `/de/market/${item.slug}` } },
    openGraph: { type: "website", url, siteName: "UzDe", title: `${item.title}${price ? ` — ${price}` : ""}`, description,
      ...(imageUrl ? { images: [{ url: imageUrl, alt: item.title }] } : {}) },
    twitter: { card: imageUrl ? "summary_large_image" : "summary", title: item.title, description,
      ...(imageUrl ? { images: [imageUrl] } : {}) },
  };
}
export default async function MarketDetailPage({ params, searchParams }: Props) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const t = copy[locale];
  const original = await getPublishedMarketListingBySlug((await params).slug);
  const localized = original ? (await localizeMarketListings([original], locale))[0] : null;
  if (!original || !localized) notFound();
  const translated = original.contentLanguage !== locale && (localized.title !== original.title || localized.description !== original.description);
  const showOriginal = (await searchParams)?.original === "1";
  const item = translated && showOriginal ? original : localized;
  const [images, seller, relatedOriginal, views] = await Promise.all([
    getReadyMarketImagesForPublishedListing(item.id),
    getMarketSellerForPublishedListing(item.id),
    getRelatedMarketListings(item.id, item.category),
    getMarketListingViewCount(item.id),
  ]);
  const currentUser = await getCurrentPublicUser();
  const isOwnListing = Boolean(seller && currentUser?.user.id === seller.userId);
  const sellerRating = seller ? await getMarketSellerRatingSummary(seller.userId) : null;
  const dateFormat = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "uz-UZ", { day: "numeric", month: "long", year: "numeric" });
  const published = dateFormat.format(new Date(item.publishedAt));
  const joined = seller ? dateFormat.format(new Date(seller.joinedAt)) : null;
  const related = await localizeMarketListings(relatedOriginal, locale);
  const price = formatMarketPrice(item, locale);
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <Header />
    <MarketViewTracker listingId={item.id} />
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8">
      <Link href="/market" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">← {t.back}</Link>
      <p className="mt-7 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{marketCategoryLabels[locale][item.category]} · {t[item.listingType]} · {formatMarketLocation(item.cityName, item.stateName)}</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{item.title}</h1>
      {item.status === "reserved" && <p className="mt-3 inline-flex rounded-lg bg-amber-100 px-3 py-2 text-sm font-bold text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">{locale === "de" ? "Reserviert" : "Band qilingan"}</p>}
      {translated && <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-slate-600 dark:text-slate-300">{showOriginal
          ? (locale === "de" ? "Originaltext" : "Asl matn")
          : (locale === "de" ? "Automatisch übersetzt" : "Avtomatik tarjima")}</span>
        <Link href={showOriginal ? `/market/${item.slug}` : `/market/${item.slug}?original=1`}
          className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800 dark:text-emerald-400">
          {showOriginal
            ? (locale === "de" ? "Übersetzung anzeigen" : "Tarjimani ko‘rsatish")
            : (locale === "de" ? "Original anzeigen" : "Asl matnni ko‘rsatish")}
        </Link>
      </div>}
      <p className="mt-3 inline-flex items-center gap-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400"><MarketDetailIcon name="tag" className="h-6 w-6" /><span>{marketPriceCaption(item, locale) && <span className="block text-sm font-medium text-slate-600 dark:text-slate-300">{marketPriceCaption(item, locale)}</span>}{price}</span></p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="inline-flex items-center gap-2"><MarketDetailIcon name="calendar" className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />{locale === "de" ? "Veröffentlicht am" : "Joylangan sana"}: {published}</span>
        <span className="inline-flex items-center gap-2"><MarketDetailIcon name="pin" className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />{formatMarketLocation(item.cityName, item.stateName)}</span>
        <span className="inline-flex items-center gap-2"><MarketDetailIcon name="eye" className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />{views.toLocaleString(locale === "de" ? "de-DE" : "uz-UZ")} {locale === "de" ? "Aufrufe" : "marta ko‘rilgan"}</span>
      </div>
      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="[&>section]:mt-0">
            <MarketImageGallery images={images} title={item.title} locale={locale} />
          </div>
          <section className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
            <h2 className="flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="file" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Beschreibung" : "Tavsif"}</h2>
            <p className="mt-3 whitespace-pre-line break-words leading-normal text-slate-700 dark:text-slate-200">{item.description}</p>
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28" aria-label={locale === "de" ? "Anbieter und Aktionen" : "Sotuvchi va amallar"}>
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/50 p-5 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
            <h2 className="flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="user" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Anbieter" : "E’lon egasi"}</h2>
            {seller ? <Link href={`/market/sellers/${seller.userId}`} className="mt-4 flex items-center gap-3 rounded-xl transition hover:bg-emerald-50 dark:hover:bg-slate-800" aria-label={locale === "de" ? "Alle Anzeigen dieses Anbieters" : "Sotuvchining barcha e’lonlari"}><PublicUserAvatar name={seller.displayName} avatarUrl={seller.avatarUrl} size="md" /><p className="font-semibold">{seller?.displayName ?? (locale === "de" ? "Privater Anbieter" : "Shaxsiy sotuvchi")}</p><span className="ml-auto text-emerald-700">→</span></Link> : <div className="mt-4 text-sm text-slate-500">{locale === "de" ? "Anbieter nicht verfügbar" : "Sotuvchi ma’lumoti mavjud emas"}</div>}
            {seller && sellerRating && <div className="mt-3 flex items-center gap-2 text-sm" aria-label={locale === "de" ? "Anbieterbewertung" : "Sotuvchi reytingi"}>
              <span className="text-amber-500" aria-hidden="true">★</span>
              {sellerRating.average === null
                ? <span className="text-slate-600 dark:text-slate-300">{locale === "de" ? "Noch keine Bewertungen" : "Hali baholanmagan"}</span>
                : <>
                  <span className="font-semibold text-slate-900 dark:text-white">{sellerRating.average.toFixed(1)} / 5</span>
                  <span className="text-slate-600 dark:text-slate-300">({sellerRating.count} {locale === "de" ? "Bewertungen" : "ta baho"})</span>
                </>}
            </div>}
            {joined && <p className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><MarketDetailIcon name="calendar" className="h-4 w-4 text-emerald-700" />{locale === "de" ? "Mitglied seit" : "Ro‘yxatdan o‘tgan"}: {joined}</p>}
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><MarketDetailIcon name="pin" className="h-4 w-4 text-emerald-700" />{formatMarketLocation(item.cityName, item.stateName)}</p>
          </section>
          {isOwnListing ? (
            <Link href={`/market/${item.id}/edit`} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">
              {locale === "de" ? "Anzeige bearbeiten" : "E’lonni tahrirlash"}
            </Link>
          ) : (
            item.status === "reserved" ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{locale === "de" ? "Diese Anzeige ist derzeit reserviert." : "Bu e’lon hozir band qilingan."}</p> : <div className="[&>section]:mt-0"><MarketContactLinks contact={item} title={item.title} locale={locale} messaging={seller ? { listingId: item.id } : undefined} /></div>
          )}
          <MarketShareButton locale={locale} title={item.title} />
          <MarketReportForm locale={locale} slug={item.slug} listingId={item.id} />
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
              <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-400">{marketPriceCaption(other, locale) ? `${marketPriceCaption(other, locale)}: ` : ""}{formatMarketPrice(other, locale)}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1"><MarketDetailIcon name="pin" className="h-4 w-4 text-emerald-700" />{other.cityName}</span>
                <span className="inline-flex items-center gap-1" title={locale === "de" ? "Aufrufe" : "Ko‘rishlar"}><MarketDetailIcon name="eye" className="h-4 w-4 text-sky-600" />{other.viewCount ?? 0}</span>
              </div>
            </div>
          </Link>)}
        </div>
      </section>}
    </main>
    <Footer />
  </div>;
}
