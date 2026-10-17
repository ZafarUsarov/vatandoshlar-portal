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
  const [timezone, setTimezone] = useState("Asia/Tashkent");
  useEffect(() => { if (state.createdId) router.push("/travel/mine"); }, [state.createdId, router]);
  const isDe = locale === "de";
  // Convert wall-clock time at the departure location into a UTC instant.
  // Reject nonexistent or ambiguous DST times rather than silently shifting them.
  const localIso = (v: string): string => {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) return "";
    try {
      const [date, time] = v.split("T");
      const [y, mo, d] = date.split("-").map(Number);
      const [h, mi] = time.split(":").map(Number);
      const target = Date.UTC(y, mo - 1, d, h, mi);
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      });
      const wall = (ms: number) => {
        const parts = Object.fromEntries(fmt.formatToParts(new Date(ms)).map(p => [p.type, p.value]));
        return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
      };
      const matches: number[] = [];
      // IANA timezone offsets are minute-based; 15-minute increments cover historic quarter-hour offsets.
      for (let offset = -14 * 60; offset <= 14 * 60; offset += 15) {
        const candidate = target - offset * 60_000;
        if (wall(candidate) === v) matches.push(candidate);
      }
      return matches.length === 1 ? new Date(matches[0]).toISOString() : "";
    } catch { return ""; }
  };
  const departureIso = localIso(departure);
  const arrivalIso = arrival ? localIso(arrival) : "";
  return <form action={action} className="space-y-5 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 sm:p-7">
    <input type="hidden" name="locale" value={locale} />
    <input type="hidden" name="departureAt" value={departureIso} />
    <input type="hidden" name="arrivalAt" value={arrivalIso} />
    <input type="hidden" name="departureTimezone" value={timezone} />
    <div><label htmlFor="travel-kind" className="mb-2 block font-semibold">{isDe ? "Anzeigenart" : "E’lon turi"}</label><select id="travel-kind" name="kind" value={kind} onChange={e => setKind(e.target.value as TravelListingKind)} className={field}>{TRAVEL_LISTING_KINDS.map(k => <option key={k} value={k}>{travelKinds[k][locale]}</option>)}</select></div>
    <div><label htmlFor="travel-title" className="mb-2 block font-semibold">{isDe ? "Titel" : "Sarlavha"}</label><input id="travel-title" name="title" minLength={5} maxLength={150} required className={field} /></div>
    <div><label htmlFor="travel-description" className="mb-2 block font-semibold">{isDe ? "Beschreibung" : "Tavsif"}</label><textarea id="travel-description" name="description" minLength={20} maxLength={5000} required rows={5} className={field} /></div>
    <div><label htmlFor="travel-mode" className="mb-2 block font-semibold">{isDe ? "Verkehrsmittel" : "Transport"}</label><select id="travel-mode" name="transportMode" defaultValue={kind.startsWith("ride_") ? "car" : "plane"} key={kind.startsWith("ride_") ? "ride" : "other"} className={field}>{TRAVEL_TRANSPORT_MODES.filter(m => !kind.startsWith("ride_") || m === "car").map(m => <option key={m} value={m}>{travelModes[m][locale]}</option>)}</select></div>
    <div className="grid gap-4 sm:grid-cols-2">{(["origin", "destination"] as const).map((side) => <div key={side} className="space-y-3"><h2 className="font-semibold">{side === "origin" ? (isDe ? "Von" : "Qayerdan") : (isDe ? "Nach" : "Qayerga")}</h2><label className="block text-sm">{isDe ? "Ländercode (z. B. UZ, DE)" : "Mamlakat kodi (masalan, UZ, DE)"}<input name={`${side}CountryCode`} defaultValue={side === "origin" ? "UZ" : "DE"} pattern="[A-Za-z]{2}" maxLength={2} required className={`${field} mt-1 uppercase`} /></label><label className="block text-sm">{isDe ? "Stadt" : "Shahar"}<input name={`${side}City`} maxLength={120} required className={`${field} mt-1`} /></label></div>)}</div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">{isDe ? "Abfahrt (Ortszeit des Abfahrtsorts)" : "Jo‘nash (jo‘nash joyining mahalliy vaqti)"}<input type="datetime-local" value={departure} onChange={e => setDeparture(e.target.value)} required className={`${field} mt-1`} /></label><label className="block text-sm">{isDe ? "Ankunft (optional, in der gewählten Zeitzone)" : "Yetib kelish (ixtiyoriy, tanlangan vaqt mintaqasida)"}<input type="datetime-local" value={arrival} onChange={e => setArrival(e.target.value)} className={`${field} mt-1`} /></label></div>
    <label className="block text-sm">{isDe ? "Zeitzone des Abfahrtsorts (IANA)" : "Jo‘nash joyining vaqt mintaqasi (IANA)"}<input name="departureTimezoneChoice" list="travel-timezones" value={timezone} onChange={e => setTimezone(e.target.value)} required className={`${field} mt-1`} /><datalist id="travel-timezones"><option value="Asia/Tashkent"/><option value="Europe/Berlin"/><option value="Europe/Istanbul"/><option value="UTC"/></datalist></label>
    <p className="text-xs text-slate-600 dark:text-slate-400">{isDe ? "Bitte die Zeitzone des Abfahrtsorts wählen. Die optionale Ankunftszeit wird ebenfalls in dieser Zeitzone eingegeben. Nicht existente oder doppelte Zeiten bei Zeitumstellungen sind nicht zulässig." : "Jo‘nash joyining vaqt mintaqasini tanlang. Yetib kelish vaqti ham shu mintaqada kiritiladi. Yozgi/qishki vaqt almashuvidagi noaniq vaqtlar qabul qilinmaydi."}</p>
    {((departure && !departureIso) || (arrival && !arrivalIso)) && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{isDe ? "Ungültige oder mehrdeutige Ortszeit/Zeitzone." : "Mahalliy vaqt yoki vaqt mintaqasi noto‘g‘ri/noaniq."}</p>}
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">{isDe ? "Flugnummer (optional)" : "Reys raqami (ixtiyoriy)"}<input name="flightNumber" maxLength={32} className={`${field} mt-1`} /></label><label className="block text-sm">{isDe ? "Freie Plätze (optional)" : "Bo‘sh o‘rinlar"}<input name="seatsAvailable" type="number" min={1} max={20} required={kind === "ride_offer"} className={`${field} mt-1`} /></label></div>
    <label className="block text-sm">{isDe ? "Zwischenstopps / Umstieg" : "Tranzit / oraliq bekatlar"}<textarea name="transitDetails" maxLength={1000} rows={2} className={`${field} mt-1`} /></label>
    {kind.startsWith("companion_") && <label className="block text-sm">{isDe ? "Welche Unterstützung wird benötigt oder angeboten?" : "Qanday yordam kerak yoki taklif qilinadi?"}<textarea name="assistanceDetails" required maxLength={2000} rows={3} className={`${field} mt-1`} /></label>}
    {kind.startsWith("parcel_") && <label className="block text-sm">{isDe ? "Sendungsdetails" : "Jo‘natma tafsilotlari"}<textarea name="parcelDetails" required maxLength={2000} rows={3} className={`${field} mt-1`} /></label>}
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">{isDe ? "Preis (optional)" : "Narx (ixtiyoriy)"}<input name="priceAmount" inputMode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" className={`${field} mt-1`} /></label><label className="block text-sm">{isDe ? "Währung (nur bei Preis)" : "Valyuta (faqat narx bo‘lsa)"}<input name="priceCurrency" placeholder="EUR" maxLength={3} pattern="[A-Za-z]{3}" className={`${field} mt-1 uppercase`} /></label></div>
    <p className="text-sm text-slate-600 dark:text-slate-300">{isDe ? "Bitte keine Passnummern, Buchungscodes oder privaten Kontaktdaten veröffentlichen." : "Pasport raqami, chipta kodi yoki shaxsiy maxfiy ma’lumotlarni e’longa yozmang."}</p>
    {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800 dark:bg-red-950 dark:text-red-200">{state.error}</p>}
    <button disabled={pending || !departureIso || Boolean(arrival && !arrivalIso)} type="submit" className="min-h-11 rounded-xl bg-emerald-700 px-6 font-semibold text-white disabled:opacity-50">{pending ? (isDe ? "Speichern…" : "Saqlanmoqda…") : (isDe ? "Entwurf speichern" : "Qoralama saqlash")}</button>
  </form>;
}
