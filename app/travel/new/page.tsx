import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateTravelForm from "@/components/travel/CreateTravelForm";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safarlar | New listing", robots: { index: false, follow: false } };
export default async function NewTravelPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
 const params = await searchParams;
 const initialCategory = params.service === "companion" || params.service === "parcel" ? params.service : "ride";
 const locale = (await getLocale()) === "de" ? "de" : "uz";
 await requirePublicUser(locale, "/travel/new");
 return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8"><Link href="/safar" className="font-semibold text-emerald-700 dark:text-emerald-400">← {locale === "de" ? "Reisen" : "Safarlar"}</Link><h1 className="mb-7 mt-6 text-3xl font-bold">{locale === "de" ? "Reiseanzeige erstellen" : "Safar e’loni yaratish"}</h1><CreateTravelForm locale={locale} initialCategory={initialCategory} /></main><Footer /></div>;
}
