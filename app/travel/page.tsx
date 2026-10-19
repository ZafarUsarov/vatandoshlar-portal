import TravelListingCard from "@/components/travel/TravelListingCard";
import { getTravelAuthorProfiles } from "@/lib/travel/travel-author-profiles";
import type { Metadata } from "next";
import { CarFront, UsersRound, Package, Plus, ClipboardList } from "lucide-react";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getPublishedTravelListings } from "@/lib/travel/travel-repository";
import { TRAVEL_LISTING_KINDS, type TravelListingKind } from "@/types/travel";
import TravelSearchForm from "@/components/travel/TravelSearchForm";
import { isTravelRegion, isTravelCountry, type TravelCountry } from "@/lib/travel/travel-regions";
type TravelService = "ride" | "companion" | "parcel";
const serviceCards = [
 { id: "ride", icon: CarFront, uz: "Safar", de: "Mitfahrt", uzDesc: "Shaharlararo avtomobil safarlari", deDesc: "Fahrten zwischen Städten" },
 { id: "companion", icon: UsersRound, uz: "Hamroh", de: "Reisebegleitung", uzDesc: "Safarda hamroh topish yoki yordam berish", deDesc: "Begleitung und Hilfe auf Reisen" },
 { id: "parcel", icon: Package, uz: "Jo‘natmalar", de: "Sendungen", uzDesc: "Jo‘natma yuborish yoki olib ketish", deDesc: "Sendungen mitgeben oder mitnehmen" },
] as const;
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Vatandosh Safarlar" };
export default async function TravelPage({ searchParams }: { searchParams: Promise<{ kind?: string; service?: string; from?: string; to?: string; fromRegion?: string; toRegion?: string; date?: string; womenOnly?: string; cargoType?: string; paymentType?: string }> }) {
 const locale = (await getLocale()) === "de" ? "de" : "uz";
 const params = await searchParams;
 const service: TravelService = params.service === "companion" || params.service === "parcel" ? params.service : "ride";
 const requestedKind = TRAVEL_LISTING_KINDS.includes(params.kind as TravelListingKind) ? params.kind as TravelListingKind : undefined;
 const kind = requestedKind?.startsWith(service === "ride" ? "ride_" : service === "companion" ? "companion_" : "parcel_") ? requestedKind : undefined;
 const code = (v?: string) => v && /^[A-Za-z]{2}$/.test(v) ? v.toUpperCase() : undefined;
 const from = code(params.from), to = code(params.to);
 const fromRegion = from && params.fromRegion && isTravelRegion(from, params.fromRegion) ? params.fromRegion : undefined;
 const toRegion = to && params.toRegion && isTravelRegion(to, params.toRegion) ? params.toRegion : undefined;
 const date = params.date && /^\d{4}-\d{2}-\d{2}$/.test(params.date) && !Number.isNaN(Date.parse(`${params.date}T00:00:00Z`)) ? params.date : undefined;
 const womenOnly = service !== "parcel" && params.womenOnly === "1";
 const cargoType = service === "parcel" && ["parcel","documents","both"].includes(params.cargoType ?? "") ? params.cargoType : undefined;
 const paymentType = service === "parcel" && ["paid","free","negotiable"].includes(params.paymentType ?? "") ? params.paymentType : undefined;
 const listings = await getPublishedTravelListings({ service, kind, cargoType, paymentType, womenOnly: womenOnly ? true : undefined, originCountryCode: from, destinationCountryCode: to, originRegionCode: fromRegion, destinationRegionCode: toRegion, departureDate: date });
 const authorProfiles = await getTravelAuthorProfiles(listings.map(item => item.authorUserId));
 const de = locale === "de";
 return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header />
 <main className="mx-auto w-full max-w-7xl min-w-0 px-3 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
 <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-start sm:gap-4">
 <div><h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">{de ? "Vatandosh Reisen" : "Vatandosh Safarlar"}</h1><p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 sm:text-base">{de ? "Mitfahrten, Begleitung und Sendungen – einfach und zuverlässig." : "Safar, hamroh va jo‘natmalar — tez, qulay va ishonchli."}</p></div>
 <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:flex-wrap"><Link href={`/safar/new?service=${service}`} className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-2 text-xs font-bold sm:gap-2 sm:px-5 sm:text-sm text-white shadow-sm transition-colors hover:bg-emerald-800"><Plus size={19} aria-hidden="true" />{de ? "Anzeige aufgeben" : "E’lon joylash"}</Link><Link href="/safar/mine" className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-2 text-xs font-semibold sm:gap-2 sm:px-4 sm:text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"><ClipboardList size={17} aria-hidden="true" />{de ? "Meine Anzeigen" : "Mening e’lonlarim"}</Link></div>
 </div>
 <nav className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-2" aria-label={de ? "Anzeigenkategorie" : "E’lonlar bo‘limi"}>
 {serviceCards.map(card => { const active = service === card.id; const Icon = card.icon; return <Link key={card.id} href={`/safar?service=${card.id}`} aria-current={active ? "page" : undefined} className={`group flex min-h-[66px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center sm:min-h-[76px] sm:flex-row sm:justify-start sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${active ? "border-emerald-400 bg-emerald-50 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-100" : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${active ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Icon aria-hidden="true" size={16} /></span><span className="min-w-0"><span className="block text-[11px] font-bold leading-tight sm:text-sm">{de ? card.de : card.uz}</span><span className="mt-0.5 hidden text-xs leading-4 text-slate-500 dark:text-slate-400 sm:block">{de ? card.deDesc : card.uzDesc}</span></span></Link>; })}
 </nav>
 <TravelSearchForm locale={locale} service={service} kind={kind} from={(from && isTravelCountry(from) ? from : "DE") as TravelCountry} to={(to && isTravelCountry(to) ? to : "BE") as TravelCountry} fromRegion={fromRegion} toRegion={toRegion} date={date} womenOnly={womenOnly} cargoType={cargoType} paymentType={paymentType} />
 <div className="mt-5 flex min-w-0 items-center justify-between gap-2 sm:mt-7"><p className="text-sm text-slate-600 dark:text-slate-300">{de ? "Gefundene Anzeigen:" : "Topilgan e’lonlar:"} <strong className="text-slate-950 dark:text-white">{listings.length}</strong></p><span className="max-w-[48%] text-right text-[11px] leading-4 text-slate-500 dark:text-slate-400 sm:max-w-none sm:text-xs">{de ? "Nach Abfahrt sortiert" : "Jo‘nash vaqti bo‘yicha"}</span></div>
 {listings.length === 0 ? <p className="mt-4 rounded-2xl border border-slate-200 p-6 text-sm dark:border-slate-800">{de ? "Keine passenden Anzeigen." : "Hozircha mos e’lonlar yo‘q."}</p> : <ul className="mt-3 grid min-w-0 gap-3 sm:mt-4 sm:gap-2.5">{listings.map(item => <TravelListingCard key={item.id} listing={item} locale={locale} author={authorProfiles[item.authorUserId]} />)}</ul>}
 </main><Footer /></div>;
}
