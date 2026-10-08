import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getOwnMarketListings } from "@/lib/market/market-contribution-repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Market | My listings", robots: { index: false, follow: false } };
export default async function MyMarketPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/market/mine");
  const listings = await getOwnMarketListings(context.user.id);
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8"><h1 className="text-3xl font-bold">{locale === "de" ? "Meine Anzeigen" : "Mening e’lonlarim"}</h1><Link href="/market/new" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800">{locale === "de" ? "Neue Anzeige" : "Yangi e’lon"}</Link>{listings.length === 0 ? <p className="mt-8 rounded-xl border border-slate-200 p-6 dark:border-slate-800">{locale === "de" ? "Sie haben noch keine Anzeigen." : "Hozircha e’lonlaringiz yo‘q."}</p> : <ul className="mt-8 space-y-4">{listings.map(item => <li key={item.id} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"><h2 className="font-semibold">{item.title}</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.cityName} · {item.status}</p></li>)}</ul>}</main><Footer /></div>;
}
