import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getOwnTravelListingById } from "@/lib/travel/travel-repository";
import CreateTravelForm from "@/components/travel/CreateTravelForm";
import { deleteTravelImageAction } from "@/app/travel/mine/image-actions";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safarlar | Edit listing", robots: { index: false, follow: false } };
export default async function EditTravelPage({ params }: { params: Promise<{ id: string }> }) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/safar/mine");
  const { id } = await params;
  const listing = await getOwnTravelListingById(id, user.user.id);
  if (!listing) notFound();
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8"><Link href="/safar/mine" className="font-semibold text-emerald-700 dark:text-emerald-400">← {locale === "de" ? "Meine Anzeigen" : "Mening e’lonlarim"}</Link><h1 className="mb-7 mt-6 text-3xl font-bold">{locale === "de" ? "Anzeige bearbeiten" : "E’lonni tahrirlash"}</h1>{listing.imageKey && <div className="mb-5 space-y-3"><p className="text-sm font-semibold">{locale === "de" ? "Aktuelles Bild" : "Joriy rasm"}</p><img src={`/api/travel/images/${listing.id}`} alt={locale === "de" ? "Aktuelles Anzeigenbild" : "Joriy e’lon rasmi"} className="max-h-72 w-full rounded-xl object-contain" /><form action={deleteTravelImageAction}><input type="hidden" name="listingId" value={listing.id}/><input type="hidden" name="locale" value={locale}/><button type="submit" className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700 dark:text-red-300">{locale === "de" ? "Bild entfernen" : "Rasmni o‘chirish"}</button></form></div>}<CreateTravelForm locale={locale} listing={listing} /></main><Footer /></div>;
}
