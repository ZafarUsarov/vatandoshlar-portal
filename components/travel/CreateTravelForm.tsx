"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { createTravelDraftAction, type CreateTravelState } from "@/app/travel/new/actions";
import { TRAVEL_LISTING_KINDS, TRAVEL_TRANSPORT_MODES, type TravelListingKind } from "@/types/travel";
import { travelKinds, travelModes } from "@/lib/travel/travel-labels";
const initial: CreateTravelState = { error: null };
const field = "block w-full min-h-11 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
export default function CreateTravelForm({ locale }: { locale: "uz" | "de" }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createTravelDraftAction, initial);
  const [kind, setKind] = useState<TravelListingKind>("companion_request");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [timezone] = useState(() =>
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  );
  useEffect(() => { if (state.createdId) router.push("/travel/mine"); }, [state.createdId, router]);
  const isDe = locale === "de";
  const localIso = (v: string) => v && Number.isFinite(new Date(v).getTime()) ? new Date(v).toISOString() : "";
  return <form action={action} className="space-y-5 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 sm:p-7">
    <input type="hidden" name="locale" value={locale} />
    <input type="hidden" name="departureAt" value={localIso(departure)} />
    <input type="hidden" name="arrivalAt" value={localIso(arrival)} />
    <input type="hidden" name="departureTimezone" value={timezone} />
    <div><label htmlFor="travel-kind" className="mb-2 block font-semibold">{isDe ? "Anzeigenart" : "E’lon turi"}</label><select id="travel-kind" name="kind" value={kind} onChange={e => setKind(e.target.value as TravelListingKind)} className={field}>{TRAVEL_LISTING_KINDS.map(k => <option key={k} value={k}>{travelKinds[k][locale]}</option>)}</select></div>
    <div><label htmlFor="travel-title" className="mb-2 block font-semibold">{isDe ? "Titel" : "Sarlavha"}</label><input id="travel-title" name="title" minLength={5} maxLength={150} required className={field} /></div>
    <div><label htmlFor="travel-description" className="mb-2 block font-semibold">{isDe ? "Beschreibung" : "Tavsif"}</label><textarea id="travel-description" name="description" minLength={20} maxLength={5000} required rows={5} className={field} /></div>
    <div><label htmlFor="travel-mode" className="mb-2 block font-semibold">{isDe ? "Verkehrsmittel" : "Transport"}</label><select id="travel-mode" name="transportMode" defaultValue={kind.startsWith("ride_") ? "car" : "plane"} key={kind.startsWith("ride_") ? "ride" : "other"} className={field}>{TRAVEL_TRANSPORT_MODES.filter(m => !kind.startsWith("ride_") || m === "car").map(m => <option key={m} value={m}>{travelModes[m][locale]}</option>)}</select></div>
    <div className="grid gap-4 sm:grid-cols-2">{(["origin", "destination"] as const).map((side) => <div key={side} className="space-y-3"><h2 className="font-semibold">{side === "origin" ? (isDe ? "Von" : "Qayerdan") : (isDe ? "Nach" : "Qayerga")}</h2><label className="block text-sm">{isDe ? "Ländercode (z. B. UZ, DE)" : "Mamlakat kodi (masalan, UZ, DE)"}<input name={`${side}CountryCode`} defaultValue={side === "origin" ? "UZ" : "DE"} pattern="[A-Za-z]{2}" maxLength={2} required className={`${field} mt-1 uppercase`} /></label><label className="block text-sm">{isDe ? "Stadt" : "Shahar"}<input name={`${side}City`} maxLength={120} required className={`${field} mt-1`} /></label></div>)}</div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">{isDe ? "Abfahrt (Ortszeit Ihres Geräts)" : "Jo‘nash (qurilmangiz mahalliy vaqti)"}<input type="datetime-local" value={departure} onChange={e => setDeparture(e.target.value)} required className={`${field} mt-1`} /></label><label className="block text-sm">{isDe ? "Ankunft (optional, Gerätezeit)" : "Yetib kelish (ixtiyoriy, qurilma vaqti)"}<input type="datetime-local" value={arrival} onChange={e => setArrival(e.target.value)} className={`${field} mt-1`} /></label></div>
    <p className="text-xs text-slate-600 dark:text-slate-400">{isDe ? `Zeitzone Ihres Geräts: ${timezone}. Bitte rechnen Sie die Abfahrtszeit bei Reisen aus einer anderen Zeitzone um.` : `Qurilma vaqt mintaqasi: ${timezone}. Boshqa mamlakatdan jo‘nash vaqtini qurilmangiz vaqtiga moslab kiriting.`}</p>
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">{isDe ? "Flugnummer (optional)" : "Reys raqami (ixtiyoriy)"}<input name="flightNumber" maxLength={32} className={`${field} mt-1`} /></label><label className="block text-sm">{isDe ? "Freie Plätze (optional)" : "Bo‘sh o‘rinlar"}<input name="seatsAvailable" type="number" min={1} max={20} required={kind === "ride_offer"} className={`${field} mt-1`} /></label></div>
    <label className="block text-sm">{isDe ? "Zwischenstopps / Umstieg" : "Tranzit / oraliq bekatlar"}<textarea name="transitDetails" maxLength={1000} rows={2} className={`${field} mt-1`} /></label>
    {kind.startsWith("companion_") && <label className="block text-sm">{isDe ? "Welche Unterstützung wird benötigt oder angeboten?" : "Qanday yordam kerak yoki taklif qilinadi?"}<textarea name="assistanceDetails" required maxLength={2000} rows={3} className={`${field} mt-1`} /></label>}
    {kind.startsWith("parcel_") && <label className="block text-sm">{isDe ? "Sendungsdetails" : "Jo‘natma tafsilotlari"}<textarea name="parcelDetails" required maxLength={2000} rows={3} className={`${field} mt-1`} /></label>}
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">{isDe ? "Preis (optional)" : "Narx (ixtiyoriy)"}<input name="priceAmount" inputMode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" className={`${field} mt-1`} /></label><label className="block text-sm">{isDe ? "Währung (nur bei Preis)" : "Valyuta (faqat narx bo‘lsa)"}<input name="priceCurrency" placeholder="EUR" maxLength={3} pattern="[A-Za-z]{3}" className={`${field} mt-1 uppercase`} /></label></div>
    <p className="text-sm text-slate-600 dark:text-slate-300">{isDe ? "Bitte keine Passnummern, Buchungscodes oder privaten Kontaktdaten veröffentlichen." : "Pasport raqami, chipta kodi yoki shaxsiy maxfiy ma’lumotlarni e’longa yozmang."}</p>
    {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800 dark:bg-red-950 dark:text-red-200">{state.error}</p>}
    <button disabled={pending || !localIso(departure)} type="submit" className="min-h-11 rounded-xl bg-emerald-700 px-6 font-semibold text-white disabled:opacity-50">{pending ? (isDe ? "Speichern…" : "Saqlanmoqda…") : (isDe ? "Entwurf speichern" : "Qoralama saqlash")}</button>
  </form>;
}
