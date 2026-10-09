import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditMarketForm from "@/components/market/EditMarketForm";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getEditableOwnMarketListing } from "@/lib/market/market-contribution-repository";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Market | Edit listing", robots: { index: false, follow: false } };
export default async function EditMarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/market/mine");
  const { slug: id } = await params;
  const listing = await getEditableOwnMarketListing(id, context.user.id);
  if (!listing) notFound();
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8"><Link href="/market/mine" className="font-semibold text-emerald-700 dark:text-emerald-400">← {locale === "de" ? "Meine Anzeigen" : "Mening e’lonlarim"}</Link><h1 className="mb-7 mt-6 text-3xl font-bold">{locale === "de" ? "Anzeige bearbeiten" : "E’lonni tahrirlash"}</h1><EditMarketForm locale={locale} listing={listing} /></main><Footer /></div>;
}
