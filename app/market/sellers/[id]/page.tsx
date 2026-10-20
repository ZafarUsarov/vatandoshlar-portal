import type { Metadata } from "next";
import { auth } from "@/auth";
import MarketSellerRatingForm from "@/components/market/MarketSellerRatingForm";
import { getMarketSellerRatingSummary, getMyMarketSellerRating } from "@/lib/market/market-seller-ratings";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import MarketDetailIcon from "@/components/market/MarketDetailIcon";
import PublicUserAvatar from "@/components/account/PublicUserAvatar";
import { getPublicMarketSeller, getPublicMarketSellerListings } from "@/lib/market/market-repository";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seller = await getPublicMarketSeller((await params).id);
  return { title: seller?.displayName ? `${seller.displayName} | Vatandosh Market` : "Market", robots: { index: false, follow: false } };
}
export default async function SellerMarketPage({ params, searchParams }: Props) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const id = (await params).id;
  const seller = await getPublicMarketSeller(id);
  if (!seller) notFound();
  const session = await auth();
  const viewerId = session?.user?.role === "user" ? session.user.id : undefined;
  const [ratingSummary, myRating] = await Promise.all([
    getMarketSellerRatingSummary(id),
    viewerId && viewerId !== id ? getMyMarketSellerRating(id, viewerId) : Promise.resolve(null),
  ]);
  const requested = Number((await searchParams).page ?? 1);
  const totalPages = Math.max(1, Math.ceil(seller.total / 12));
  const page = Number.isSafeInteger(requested) ? Math.max(1, Math.min(requested, totalPages)) : 1;
  const listings = await getPublicMarketSellerListings(id, page);
  const name = seller.displayName ?? (locale === "de" ? "Privater Anbieter" : "Shaxsiy sotuvchi");
  const joined = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(seller.joinedAt));
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header />
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8">
      <Link href="/market" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">← {locale === "de" ? "Zum Marktplatz" : "Barcha e’lonlar"}</Link>
      <section className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/60 p-6 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
        <div className="flex items-center gap-4"><PublicUserAvatar name={name} avatarUrl={seller.avatarUrl} size="lg" />
          <div><h1 className="text-2xl font-bold sm:text-3xl">{name}</h1><p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><MarketDetailIcon name="calendar" className="size-4 text-emerald-700" />{locale === "de" ? "Mitglied seit" : "Ro‘yxatdan o‘tgan"}: {joined}</p></div></div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-amber-500" aria-hidden="true">★</span>
          <span className="font-bold">{ratingSummary.average === null ? "—" : ratingSummary.average.toFixed(1)}</span>
          <span className="text-sm text-slate-600 dark:text-slate-300">({ratingSummary.count} {locale === "de" ? "Bewertungen" : "ta baho"})</span>
        </div>
        {viewerId && viewerId !== id
          ? <MarketSellerRatingForm sellerId={id} initialRating={myRating} locale={locale} />
          : <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{viewerId === id
              ? (locale === "de" ? "Sie können sich nicht selbst bewerten." : "O‘zingizga baho bera olmaysiz.")
              : (locale === "de" ? "Melden Sie sich an, um den Anbieter zu bewerten." : "Sotuvchini baholash uchun tizimga kiring.")}</p>}
        <p className="mt-5 font-semibold text-emerald-700 dark:text-emerald-400">{seller.total} {locale === "de" ? "aktive Anzeigen" : "ta faol e’lon"}</p>
      </section>
      <h2 className="mt-9 text-xl font-bold">{locale === "de" ? "Anzeigen dieses Anbieters" : "Sotuvchining e’lonlari"}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map(item => <Link key={item.id} href={`/market/${item.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md dark:border-slate-700">
          <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">{item.coverImageId ? <Image unoptimized fill sizes="(max-width: 640px) 100vw, 380px" src={`/api/market/images/${item.coverImageId}`} alt={item.title} className="object-cover" /> : <div className="flex h-full items-center justify-center text-slate-500">{locale === "de" ? "Kein Bild" : "Rasm yo‘q"}</div>}</div>
          <div className="p-4"><h3 className="line-clamp-2 font-bold group-hover:text-emerald-700">{item.title}</h3><p className="mt-2 font-semibold text-emerald-700 dark:text-emerald-400">{item.listingType === "giveaway" ? (locale === "de" ? "Kostenlos" : "Bepul") : item.priceAmount === null ? (locale === "de" ? "Preis auf Anfrage" : "Narx kelishiladi") : new Intl.NumberFormat(locale === "de" ? "de-DE" : "uz-UZ", { style: "currency", currency: "EUR" }).format(Number(item.priceAmount))}</p><p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><MarketDetailIcon name="pin" className="size-4" />{item.cityName}</p></div>
        </Link>)}
      </div>
      {totalPages > 1 && <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-5 text-sm font-semibold">
        {page > 1 && <Link href={`/market/sellers/${id}?page=${page - 1}`} className="rounded-full border px-5 py-2 hover:bg-emerald-50">← {locale === "de" ? "Zurück" : "Oldingi"}</Link>}
        <span>{page} / {totalPages}</span>
        {page < totalPages && <Link href={`/market/sellers/${id}?page=${page + 1}`} className="rounded-full border px-5 py-2 hover:bg-emerald-50">{locale === "de" ? "Weiter" : "Keyingi"} →</Link>}
      </nav>}
    </main><Footer /></div>;
}
