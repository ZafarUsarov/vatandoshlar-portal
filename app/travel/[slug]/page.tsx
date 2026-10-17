import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getPublishedTravelBySlug } from "@/lib/travel/travel-repository";
import { travelKinds, travelModes } from "@/lib/travel/travel-labels";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safarlar | E’lon" };
export default async function TravelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
 const locale = (await getLocale()) === "de" ? "de" : "uz";
 const { slug } = await params;
 const item = await getPublishedTravelBySlug(slug);
 if (!item) notFound();
 const de = locale === "de";
 return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8"><Link href="/travel" className="font-semibold text-emerald-700 dark:text-emerald-400">← {de ? "Reisen" : "Safarlar"}</Link><p className="mt-8 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{travelKinds[item.kind][locale]} · {travelModes[item.transportMode][locale]}</p><h1 className="mt-3 text-3xl font-bold">{item.title}</h1><div className="mt-6 space-y-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800"><p><strong>{de ? "Route:" : "Yo‘nalish:"}</strong> {item.originCity} ({item.originCountryCode}) → {item.destinationCity} ({item.destinationCountryCode})</p><p><strong>{de ? "Abfahrt:" : "Jo‘nash:"}</strong> {new Date(item.departureAt).toLocaleString(de ? "de-DE" : "uz-UZ", { timeZone: item.departureTimezone, dateStyle: "full", timeStyle: "short" })} ({item.departureTimezone})</p>{item.flightNumber && <p><strong>{de ? "Flug:" : "Reys:"}</strong> {item.flightNumber}</p>}{item.transitDetails && <p className="whitespace-pre-wrap"><strong>{de ? "Umstieg:" : "Tranzit:"}</strong> {item.transitDetails}</p>}{item.seatsAvailable != null && <p><strong>{de ? "Plätze:" : "O‘rinlar:"}</strong> {item.seatsAvailable}</p>}{item.assistanceDetails && <p className="whitespace-pre-wrap"><strong>{de ? "Unterstützung:" : "Yordam:"}</strong> {item.assistanceDetails}</p>}{item.parcelDetails && <p className="whitespace-pre-wrap"><strong>{de ? "Sendung:" : "Jo‘natma:"}</strong> {item.parcelDetails}</p>}{item.priceAmount && <p><strong>{de ? "Preis:" : "Narx:"}</strong> {item.priceAmount} {item.priceCurrency}</p>}</div><h2 className="mt-8 font-semibold">{de ? "Beschreibung" : "Tavsif"}</h2><p className="mt-3 whitespace-pre-wrap break-words leading-7">{item.description}</p><p className="mt-8 rounded-xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">{de ? "Direkte Kontaktaufnahme ist in dieser Version noch nicht verfügbar. Teilen Sie keine sensiblen Reisedokumente öffentlich." : "Ushbu versiyada muallif bilan bog‘lanish hali mavjud emas. Maxfiy sayohat hujjatlarini ommaga ulashmang."}</p></main><Footer /></div>;
}
