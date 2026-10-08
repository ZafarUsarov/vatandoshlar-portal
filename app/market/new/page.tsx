import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateMarketForm from "@/components/market/CreateMarketForm";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Market | New listing", robots: { index: false, follow: false } };
export default async function NewMarketPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requirePublicUser(locale, "/market/new");
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8"><Link href="/market" className="font-semibold text-emerald-700 dark:text-emerald-400">← Market</Link><h1 className="mb-7 mt-6 text-3xl font-bold">{locale === "de" ? "Anzeige erstellen" : "E’lon yaratish"}</h1><CreateMarketForm locale={locale} /></main><Footer /></div>;
}
