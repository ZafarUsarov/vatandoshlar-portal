import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getOwnTravelListings } from "@/lib/travel/travel-repository";
import { travelKinds } from "@/lib/travel/travel-labels";
import { changeTravelStatusAction, removeTravelListingAction } from "./actions";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safarlar | My listings", robots: { index: false, follow: false } };
export default async function MyTravelPage() {
 const locale = (await getLocale()) === "de" ? "de" : "uz";
 const context = await requirePublicUser(locale, "/travel/mine");
 const listings = await getOwnTravelListings(context.user.id);
 const de = locale === "de";
 return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8"><Link href="/travel" className="font-semibold text-emerald-700 dark:text-emerald-400">← {de ? "Reisen" : "Safarlar"}</Link><h1 className="mt-6 text-3xl font-bold">{de ? "Meine Reiseanzeigen" : "Mening safar e’lonlarim"}</h1><Link href="/travel/new" className="mt-6 inline-block rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white">{de ? "Neue Anzeige" : "Yangi e’lon"}</Link>{listings.length === 0 ? <p className="mt-8">{de ? "Noch keine Anzeigen." : "Hozircha e’lon yo‘q."}</p> : <ul className="mt-8 space-y-4">{listings.map(item => <li key={item.id} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"><p className="text-sm text-slate-600 dark:text-slate-300">{travelKinds[item.kind][locale]} · {item.status}</p><h2 className="mt-2 text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm">{item.originCity} → {item.destinationCity}</p><div className="mt-4 flex flex-wrap gap-3">{item.status === "published" && <Link href={`/travel/${item.slug}`} className="rounded-lg border border-slate-300 px-4 py-3 font-semibold dark:border-slate-700">{de ? "Ansehen" : "Ko‘rish"}</Link>}{(item.status === "draft" || item.status === "published") && <form action={changeTravelStatusAction}><input type="hidden" name="listingId" value={item.id}/><input type="hidden" name="operation" value={item.status === "draft" ? "publish" : "close"}/><button className="min-h-11 rounded-lg bg-emerald-700 px-4 font-semibold text-white">{item.status === "draft" ? (de ? "Veröffentlichen" : "Nashr qilish") : (de ? "Schließen" : "Yopish")}</button></form>}<details className="rounded-lg border border-red-200 dark:border-red-900"><summary className="cursor-pointer px-4 py-3 font-semibold text-red-700 dark:text-red-300">{de ? "Entfernen" : "O‘chirish"}</summary><form action={removeTravelListingAction} className="border-t border-red-200 p-4 dark:border-red-900"><p className="mb-3 text-sm">{de ? "Diese Anzeige wirklich entfernen?" : "E’lonni rostdan o‘chirasizmi?"}</p><input type="hidden" name="listingId" value={item.id}/><button className="min-h-11 rounded-lg border border-red-300 px-4 font-semibold text-red-700 dark:border-red-900 dark:text-red-300">{de ? "Ja, entfernen" : "Ha, o‘chirish"}</button></form></details></div></li>)}</ul>}</main><Footer /></div>;
}
