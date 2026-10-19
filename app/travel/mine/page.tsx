import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getOwnTravelListings } from "@/lib/travel/travel-repository";
import { travelKinds } from "@/lib/travel/travel-labels";
import TravelListingActions from "@/components/travel/TravelListingActions";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safarlar | My listings", robots: { index: false, follow: false } };
export default async function MyTravelPage() {
 const locale = (await getLocale()) === "de" ? "de" : "uz";
 const context = await requirePublicUser(locale, "/travel/mine");
 const listings = await getOwnTravelListings(context.user.id);
 const de = locale === "de";
 return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8"><Link href="/safar" className="font-semibold text-emerald-700 dark:text-emerald-400">← {de ? "Reisen" : "Safarlar"}</Link><h1 className="mt-6 text-3xl font-bold">{de ? "Meine Reiseanzeigen" : "Mening safar e’lonlarim"}</h1><Link href="/safar/new" className="mt-6 inline-block rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white">{de ? "Neue Anzeige" : "Yangi e’lon"}</Link>{listings.length === 0 ? <p className="mt-8">{de ? "Noch keine Anzeigen." : "Hozircha e’lon yo‘q."}</p> : <ul className="mt-8 space-y-4">{listings.map(item => <li key={item.id} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"><p className="text-sm text-slate-600 dark:text-slate-300">{travelKinds[item.kind][locale]} · {({ draft: de ? "Entwurf" : "Qoralama", published: de ? "Veröffentlicht" : "Joylangan", closed: de ? "Geschlossen" : "Yopilgan", hidden: de ? "Ausgeblendet" : "Yashirilgan", removed: de ? "Entfernt" : "O‘chirilgan" } as Record<string,string>)[item.status]}</p><h2 className="mt-2 text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm">{item.originCity} → {item.destinationCity}</p><div className="mt-4 flex flex-wrap gap-3">{item.status === "published" && <Link href={`/safar/${item.slug}`} className="rounded-lg border border-slate-300 px-4 py-3 font-semibold dark:border-slate-700">{de ? "Ansehen" : "Ko‘rish"}</Link>}<TravelListingActions id={item.id} slug={item.slug} status={item.status} locale={locale} /></div></li>)}</ul>}</main><Footer /></div>;
}
