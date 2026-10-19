"use client";
import { parcelCargoLabels, parcelPaymentLabels, type ParcelDetails } from "@/lib/travel/parcel-details";
import { companionHelp, companionHelpLabels, companionRelationships, companionRelationshipLabels } from "@/lib/travel/companion-details";
import { readableTravelDescription } from "@/lib/travel/travel-description";


import { useActionState, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { createTravelDraftAction, updateTravelListingAction, type CreateTravelState } from "@/app/travel/new/actions";
import { TRAVEL_TRANSPORT_MODES, type TravelListingKind, type TravelListing } from "@/types/travel";
import { travelModes } from "@/lib/travel/travel-labels";
import { countryLabel, regionsForCountry, europeanTravelCountries, travelCountries, countryTimezone, type TravelCountry } from "@/lib/travel/travel-regions";

const inputClass = "block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
const selectClass = `${inputClass} appearance-none pr-12`;
const labelClass = "mb-3 block text-sm font-medium";
const categoryKinds: Record<string, [TravelListingKind, TravelListingKind]> = {
  ride: ["ride_offer", "ride_request"], companion: ["companion_request", "companion_offer"], parcel: ["parcel_request", "parcel_offer"],
};
const labels: Record<TravelListingKind, { uz: string; de: string }> = {
  ride_offer: { uz: "Mashinamda bo‘sh joy bor", de: "Ich biete eine Mitfahrt an" },
  ride_request: { uz: "Yo‘lovchi sifatida joy izlayapman", de: "Ich suche eine Mitfahrgelegenheit" },
  companion_request: { uz: "Hamroh izlayapman", de: "Ich suche eine Reisebegleitung" },
  companion_offer: { uz: "Hamroh bo‘la olaman", de: "Ich kann Reisende begleiten" },
  parcel_request: { uz: "Jo‘natma yubormoqchiman", de: "Ich möchte etwas versenden" },
  parcel_offer: { uz: "Jo‘natma olib ketishim mumkin", de: "Ich kann eine Sendung mitnehmen" },
};
function Chevron() { return <svg aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>; }
function LocalTimeToIso(v: string, zone: string): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) return "";
  try {
    const [date, time] = v.split("T");
    const [y, m, d] = date.split("-").map(Number);
    const [h, minute] = time.split(":").map(Number);
    const target = Date.UTC(y, m - 1, d, h, minute);
    const formatter = new Intl.DateTimeFormat("en-GB", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const matching: number[] = [];
    for (let offset = -14 * 60; offset <= 14 * 60; offset += 15) {
      const instant = target - offset * 60000;
      const parts = Object.fromEntries(formatter.formatToParts(new Date(instant)).map(p => [p.type, p.value]));
      if (`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}` === v) matching.push(instant);
    }
    return matching.length === 1 ? new Date(matching[0]).toISOString() : "";
  } catch { return ""; }
}

function localDateTime(iso: string | null, zone: string): string {
  if (!iso) return "";
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(iso)).map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}
export default function CreateTravelForm({ locale, listing, initialCategory = "ride" }: { locale: "uz" | "de"; listing?: TravelListing; initialCategory?: "ride" | "companion" | "parcel" }) {
  const router = useRouter();
  const [attempted, setAttempted] = useState(false);
  const [originCity, setOriginCity] = useState(listing?.originCity ?? "");
  const [destinationCity, setDestinationCity] = useState(listing?.destinationCity ?? "");
  const [state, action, pending] = useActionState(listing ? updateTravelListingAction : createTravelDraftAction, { error: null } as CreateTravelState);
  const [category, setCategory] = useState(listing ? listing.kind.split("_")[0] : initialCategory);
  const [kind, setKind] = useState<TravelListingKind>(listing?.kind ?? categoryKinds[initialCategory][0]);
  const [womenOnly, setWomenOnly] = useState(listing?.womenOnly ?? false);
  const [rideScope, setRideScope] = useState<"domestic" | "international">(!listing || (listing.kind.startsWith("ride_") && listing.originCountryCode === "DE" && listing.destinationCountryCode === "DE") ? "domestic" : "international");
  const [originCountry, setOriginCountry] = useState<TravelCountry>((listing?.originCountryCode ?? (initialCategory === "ride" ? "DE" : "UZ")) as TravelCountry);
  const [destinationCountry, setDestinationCountry] = useState<TravelCountry>((listing?.destinationCountryCode ?? "DE") as TravelCountry);
  const [originRegion, setOriginRegion] = useState(listing?.originRegionCode ?? "");
  const [destinationRegion, setDestinationRegion] = useState(listing?.destinationRegionCode ?? "");
  const [departure, setDeparture] = useState(listing ? (listing.kind.startsWith("companion_") && listing.companionDetails && !listing.companionDetails.departureTimeKnown ? localDateTime(listing.departureAt, listing.departureTimezone).slice(0,10) : localDateTime(listing.departureAt, listing.departureTimezone)) : "");
  const [arrival, setArrival] = useState(listing ? localDateTime(listing.arrivalAt, listing.departureTimezone) : "");
  const [showOptional, setShowOptional] = useState(Boolean(listing?.flightNumber || listing?.transitDetails || (listing && listing.transportMode !== "car" && listing.transportMode !== "plane")));
  const [price, setPrice] = useState(listing?.priceAmount && Number(listing.priceAmount) > 0 ? listing.priceAmount : "");
  const [priceMode, setPriceMode] = useState<"paid" | "free">(listing?.priceAmount !== null && listing?.priceAmount !== undefined && Number(listing?.priceAmount) === 0 ? "free" : "paid");
  const [traveler, setTraveler] = useState(listing?.companionDetails?.relationship ?? "self");
  const [flightType, setFlightType] = useState<"direct" | "transit">(listing?.companionDetails?.flightType ?? "direct");
  const [transitAirports, setTransitAirports] = useState<string[]>(listing?.companionDetails?.transitAirports?.length ? listing.companionDetails.transitAirports : [""]);
  const [originAirport, setOriginAirport] = useState(listing?.companionDetails?.originAirport ?? "");
  const [destinationAirport, setDestinationAirport] = useState(listing?.companionDetails?.destinationAirport ?? "");
  const [airline, setAirline] = useState(listing?.companionDetails?.airline ?? "");
  const [helpTypes, setHelpTypes] = useState<string[]>(listing?.companionDetails?.helpTypes ?? []);
  const [departureTimeKnown, setDepartureTimeKnown] = useState(listing?.companionDetails?.departureTimeKnown ?? Boolean(listing && listing.kind.startsWith("companion_")));
  const [assistance, setAssistance] = useState(listing?.assistanceDetails ?? "");
  const [parcelInfo, setParcelInfo] = useState(listing?.parcelDetails ?? "");
  const [cargoType, setCargoType] = useState<ParcelDetails["cargoType"]>(listing?.parcelStructured?.cargoType ?? "parcel");
  const [parcelCurrency, setParcelCurrency] = useState(listing?.priceCurrency ?? "EUR");
  const [parcelPayment, setParcelPayment] = useState<ParcelDetails["paymentType"]>(listing?.parcelStructured?.paymentType ?? (listing?.priceAmount === null ? "negotiable" : Number(listing?.priceAmount) === 0 ? "free" : "paid"));
  const [flexibleDate, setFlexibleDate] = useState(listing?.parcelStructured?.flexibleDate ?? false);
  const [weightKg, setWeightKg] = useState(listing?.parcelStructured?.weightKg?.toString() ?? "");
  const [dimensions, setDimensions] = useState(listing?.parcelStructured?.dimensions ?? "");
  const [handover, setHandover] = useState(listing?.parcelStructured?.handover ?? "");
  const [seats, setSeats] = useState(String(listing?.seatsAvailable ?? 1));
  const [passengers, setPassengers] = useState(String(listing?.passengerCount ?? 1));
  const [note, setNote] = useState(listing ? readableTravelDescription(listing.description, listing.originCity, listing.destinationCity) : "");
  const isDe = locale === "de";
  const timezone = countryTimezone(originCountry);
  const companionDeparture = (category === "companion" || category === "parcel") && departure && !departure.includes("T") ? `${departure}T12:00` : departure;
  const departureIso = LocalTimeToIso(companionDeparture, timezone);
  const arrivalIso = arrival ? LocalTimeToIso(arrival, timezone) : "";
  useEffect(() => { if (state.createdId) router.push("/safar/mine"); }, [state.createdId, router]);
  const switchCategory = (value: string) => { setCategory(value); setKind(categoryKinds[value][0]); setRideScope("domestic"); setOriginCountry(value === "ride" ? "DE" : "UZ"); setDestinationCountry("DE"); setOriginRegion(""); setDestinationRegion(""); setArrival(""); setDeparture(""); };
  const switchRideScope = (scope: "domestic" | "international") => { setRideScope(scope); setOriginCountry("DE"); setDestinationCountry("DE"); setOriginRegion(""); setDestinationRegion(""); setArrival(""); };
  const text = (uz: string, de: string) => isDe ? de : uz;
  const invalidClass = "border-red-600 ring-1 ring-red-600 focus-visible:outline-red-600 dark:border-red-500";
  const invalid = (condition: boolean) => attempted && condition ? invalidClass : "";
  const fieldError = (condition: boolean, uz: string, de: string) => attempted && condition ? <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">{text(uz, de)}</p> : null;
  const invalidDeparture = !departure || !departureIso || (Boolean(departureIso) && Date.parse(departureIso) <= Date.now());
  const invalidArrival = Boolean(arrival && (!arrivalIso || (departureIso && arrivalIso && Date.parse(arrivalIso) < Date.parse(departureIso))));
  const companionInvalid = category === "companion" && (helpTypes.length === 0 || (flightType === "transit" && (transitAirports.length === 0 || transitAirports.some(x => !x.trim()))));
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setAttempted(true);
    const form = event.currentTarget;
    // Native constraint validation covers all required inputs, including hidden optional sections.
    // Do not submit when a visible validation issue is detected.
    if (invalidDeparture || invalidArrival || companionInvalid || (category !== "parcel" && priceMode === "paid" && (!price || !/^\d{1,10}(?:\.\d{1,2})?$/.test(price) || Number(price) <= 0)) || !form.checkValidity()) {
      event.preventDefault();
      const firstInvalid = form.querySelector<HTMLElement>(":invalid");
      firstInvalid?.focus();
    }
  };
  const select = (id: string, name: string, value: string, onChange: (value: string) => void, options: {value: string; label: string}[]) => <div className="relative"><select id={id} name={name} value={value} onChange={e => onChange(e.target.value)} className={selectClass}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select><Chevron /></div>;
  return <form action={action} onSubmit={onSubmit} onInvalidCapture={() => setAttempted(true)} className="space-y-7 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 sm:p-7">
    {listing && <input type="hidden" name="listingId" value={listing.id} />}
    <input type="hidden" name="locale" value={locale} />
    <input type="hidden" name="kind" value={kind} />
    <input type="hidden" name="womenOnly" value={category !== "parcel" && womenOnly ? "on" : ""} />
    <input type="hidden" name="departureAt" value={departureIso} />
    {category === "companion" && <input type="hidden" name="departureTimeKnown" value={departureTimeKnown ? "1" : "0"} />}
    <input type="hidden" name="arrivalAt" value={arrivalIso} />
    <input type="hidden" name="departureTimezone" value={timezone} />
    <input type="hidden" name="priceMode" value={priceMode} />
    {category === "parcel" && <><input type="hidden" name="cargoType" value={cargoType}/><input type="hidden" name="paymentType" value={parcelPayment}/><input type="hidden" name="flexibleDate" value={flexibleDate ? "on" : ""}/><input type="hidden" name="weightKg" value={weightKg}/><input type="hidden" name="dimensions" value={dimensions}/><input type="hidden" name="handover" value={handover}/></>}
    <input type="hidden" name="priceCurrency" value={category === "parcel" ? parcelCurrency : "EUR"} />
    {(category === "parcel" ? parcelPayment === "free" : priceMode === "free") && <input type="hidden" name="priceAmount" value="0" />}
    <input type="hidden" name="title" value="" />
    {kind !== "companion_request" && <input type="hidden" name="travelerRelationship" value="" />}
    <input type="hidden" name="assistanceDetails" value={category === "companion" ? assistance : ""} />
    <input type="hidden" name="parcelDetails" value={category === "parcel" ? parcelInfo : ""} />
    <input type="hidden" name="seatsAvailable" value={kind === "ride_offer" ? seats : ""} />
    <input type="hidden" name="passengerCount" value={kind === "ride_request" ? passengers : ""} />
    {(category !== "ride" || !showOptional) && <input type="hidden" name="transportMode" value={category === "ride" ? "car" : "plane"} />}
    <section className="space-y-4"><h2 className="font-semibold">{text("Qanday yordam kerak?", "Was möchten Sie anbieten oder suchen?")}</h2>
      <div className="grid gap-2 sm:grid-cols-3">{(["ride", "companion", "parcel"] as const).map(c => <button key={c} type="button" aria-pressed={category === c} onClick={() => switchCategory(c)} className={`min-h-12 rounded-xl border px-3 py-2 text-sm font-semibold ${category === c ? "border-emerald-700 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100" : "border-slate-300 dark:border-slate-700"}`}>{c === "ride" ? text("Safar", "Mitfahrt") : c === "companion" ? text("Hamroh", "Reisebegleitung") : text("Jo‘natma", "Sendung")}</button>)}</div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{category === "ride" ? text("Germaniya va Yevropada avtomobilda shaharlararo qatnov uchun.", "Für Fahrgemeinschaften zwischen Städten in Deutschland und Europa.") : category === "companion" ? text("Masalan, birinchi marta uchayotgan ota-onangizga yo‘lda ko‘maklashadigan hamroh toping.", "Finden Sie eine Begleitung, etwa für Eltern auf ihrer ersten Flugreise.") : text("Buyum yuborish yoki safarda olib ketishga yordam berish uchun.", "Zum Versenden oder Mitnehmen von Gegenständen.")}</p>
      <div><label className={labelClass} htmlFor="travel-purpose">{text("Maqsadingiz", "Was möchten Sie tun?")}</label>{select("travel-purpose", "purposeDisplay", kind, v => setKind(v as TravelListingKind), categoryKinds[category].map(k => ({ value: k, label: labels[k][locale] })))}</div>
      {category !== "parcel" && <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-sm dark:border-rose-900 dark:bg-rose-950/20"><input type="checkbox" checked={womenOnly} onChange={event => setWomenOnly(event.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-700" /><span><strong className="block">{text("Faqat ayollar uchun", "Nur für Frauen")}</strong><span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">{text("Ushbu safar yoki hamroh e’loni faqat ayollar uchun mo‘ljallangan.", "Diese Mitfahrt oder Begleitung richtet sich nur an Frauen.")}</span></span></label>}
    </section>
    <section className="space-y-4"><h2 className="font-semibold">{category === "companion" ? text("Parvoz yo‘nalishi", "Flugroute") : text("Qayerdan — qayerga?", "Von wo nach wo?")}</h2>
      {category === "ride" && <fieldset className="space-y-3"><legend className="text-sm font-medium">{text("Qatnov yo‘nalishi", "Fahrtgebiet")}</legend>
        <div className="grid gap-2 sm:grid-cols-2">{(["domestic", "international"] as const).map(scope => <button key={scope} type="button" aria-pressed={rideScope === scope} onClick={() => switchRideScope(scope)} className={`min-h-12 rounded-xl border px-3 py-2 text-sm font-semibold ${rideScope === scope ? "border-emerald-700 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100" : "border-slate-300 dark:border-slate-700"}`}>{scope === "domestic" ? text("Germaniya ichida", "Innerhalb Deutschlands") : text("Davlatlararo", "Grenzüberschreitend")}</button>)}</div>
        <p className="text-xs text-slate-600 dark:text-slate-300">{rideScope === "domestic" ? text("Masalan, Schleswig-Holstein → Nordrhein-Westfalen (Münster).", "Zum Beispiel Schleswig-Holstein → Nordrhein-Westfalen (Münster).") : text("Masalan, Germaniya → Belgiya. Ikkala mamlakatni tanlang.", "Zum Beispiel Deutschland → Belgien. Wählen Sie beide Länder.")}</p>
      </fieldset>}
      <div className="grid gap-5 sm:grid-cols-2">{(["origin", "destination"] as const).map(side => {
        const origin = side === "origin";
        const country = origin ? originCountry : destinationCountry;
        const region = origin ? originRegion : destinationRegion;
        return <div key={side} className="space-y-4"><h3 className="text-sm font-semibold">{origin ? text("Qayerdan", "Von") : text("Qayerga", "Nach")}</h3>
          {category === "ride" && rideScope === "domestic" ? <input type="hidden" name={`${side}CountryCode`} value="DE" /> : <div><label htmlFor={`${side}-country`} className={labelClass}>{text("Mamlakat", "Land")}</label>{select(`${side}-country`, `${side}CountryCode`, country, v => { if (origin) { setOriginCountry(v as TravelCountry); setOriginRegion(""); } else { setDestinationCountry(v as TravelCountry); setDestinationRegion(""); } }, (category === "ride" ? europeanTravelCountries : travelCountries).map(c => ({value:c,label:countryLabel(c,locale)})))}</div>}
          {category !== "companion" && <div><label htmlFor={`${side}-region`} className={labelClass}>{country === "DE" ? text("Federal yer (Bundesland)", "Bundesland") : text("Hudud", "Region")}</label><div key={`${side}-${country}-region`}>{select(`${side}-region`, `${side}RegionCode`, region, v => origin ? setOriginRegion(v) : setDestinationRegion(v), [{value:"",label:text("Hududni tanlang", "Region wählen")}, ...regionsForCountry(country).map(r => ({value:r.code,label:r[locale]}))])}</div></div>}
          <div><label htmlFor={`${side}-city`} className={labelClass}>{category === "companion" ? text("Shahar", "Stadt") : text("Shahar", "Stadt")}</label><input id={`${side}-city`} name={`${side}City`} value={origin ? originCity : destinationCity} onChange={e => origin ? setOriginCity(e.target.value) : setDestinationCity(e.target.value)} required maxLength={120} placeholder={category === "companion" ? (country === "UZ" ? text("Masalan, Samarqand", "z. B. Samarkand") : country === "DE" ? text("Masalan, Frankfurt", "z. B. Frankfurt") : text("Masalan, Istanbul", "z. B. Istanbul")) : origin ? text("Masalan, Kiel", "z. B. Kiel") : country === "DE" ? text("Masalan, Münster", "z. B. Münster") : text("Masalan, Bryussel", "z. B. Brüssel")} className={`${inputClass} ${invalid(!(origin ? originCity : destinationCity).trim())}`} aria-invalid={attempted && !(origin ? originCity : destinationCity).trim()} />{fieldError(!(origin ? originCity : destinationCity).trim(), "Shaharni kiriting.", "Bitte Stadt eingeben.")}</div>
          {category === "companion" && <div><label className={labelClass} htmlFor={`${side}-airport`}>{text("Aeroport (ixtiyoriy)", "Flughafen (optional)")}</label><input id={`${side}-airport`} name={origin ? "originAirport" : "destinationAirport"} maxLength={120} value={origin ? originAirport : destinationAirport} onChange={e => origin ? setOriginAirport(e.target.value) : setDestinationAirport(e.target.value)} className={inputClass} /></div>}
        </div>;
      })}</div>
      {category === "companion" && <div className="space-y-4"><div><label className={labelClass} htmlFor="flight-type">{text("Parvoz turi", "Flugart")}</label>{select("flight-type", "flightType", flightType, v => setFlightType(v as "direct" | "transit"), [{value:"direct",label:text("To‘g‘ridan-to‘g‘ri", "Direktflug")},{value:"transit",label:text("Tranzit orqali", "Mit Umstieg")}])}</div>
        {flightType === "transit" && <div className="space-y-3"><p className={labelClass}>{text("Tranzit aeroportlari *", "Transitflughäfen *")}</p>{transitAirports.map((airport,i) => <div key={i} className="flex gap-2"><input name="transitAirports" required maxLength={120} value={airport} onChange={e => setTransitAirports(items => items.map((x,j) => i === j ? e.target.value : x))} placeholder={text("Masalan, Istanbul", "z. B. Istanbul")} className={`${inputClass} ${invalid(!airport.trim())}`} />{transitAirports.length > 1 && <button type="button" className="rounded-lg border px-3 text-sm" onClick={() => setTransitAirports(items => items.filter((_,j) => i !== j))}>{text("O‘chirish", "Entfernen")}</button>}</div>)}{transitAirports.length < 5 && <button type="button" className="text-sm font-semibold text-emerald-700" onClick={() => setTransitAirports(items => [...items,""])}>{text("+ Tranzit aeroporti qo‘shish", "+ Transitflughafen hinzufügen")}</button>}{fieldError(transitAirports.some(x => !x.trim()),"Tranzit aeroportini kiriting.","Bitte Transitflughafen eingeben.")}</div>}
      </div>}
    </section>
    <section className="space-y-4"><h2 className="font-semibold">{category === "companion" ? text("Parvoz ma’lumotlari", "Flugdaten") : text("Safar vaqti", "Reisezeit")}</h2>
      <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="travel-departure" className={labelClass}>{category === "companion" ? text("Uchish sanasi *", "Abflugdatum *") : text("Jo‘nash sanasi va vaqti", "Abfahrt: Datum und Uhrzeit")}</label><input id="travel-departure" type={(category === "companion" && !departureTimeKnown) || category === "parcel" ? "date" : "datetime-local"} value={(category === "companion" && !departureTimeKnown) || category === "parcel" ? departure.slice(0,10) : departure} onChange={e => setDeparture(e.target.value)} required className={`${inputClass} ${invalid(invalidDeparture)}`} aria-invalid={attempted && invalidDeparture} />{fieldError(invalidDeparture, "Kelajakdagi jo‘nash vaqtini kiriting.", "Bitte zukünftige Abfahrtszeit eingeben.")}</div>
      <div><label htmlFor="travel-arrival" className={labelClass}>{text("Yetib kelish (ixtiyoriy)", "Ankunft (optional)")}</label><input id="travel-arrival" type="datetime-local" value={arrival} onChange={e => setArrival(e.target.value)} className={`${inputClass} ${invalid(invalidArrival)}`} aria-invalid={attempted && invalidArrival} />{fieldError(invalidArrival, "Yetib kelish vaqtini tekshiring.", "Bitte Ankunftszeit prüfen.")}</div></div>
      {category === "companion" && <div className="space-y-3"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={departureTimeKnown} onChange={e => {setDepartureTimeKnown(e.target.checked);setDeparture(old => e.target.checked ? `${old.slice(0,10)}T12:00` : old.slice(0,10));}} />{text("Uchish vaqtini ham kiritaman (ixtiyoriy)", "Abflugzeit angeben (optional)")}</label><div><label className={labelClass} htmlFor="travel-airline">{text("Aviakompaniya (ixtiyoriy)", "Fluggesellschaft (optional)")}</label><input id="travel-airline" name="airline" value={airline} onChange={e => setAirline(e.target.value)} maxLength={120} className={inputClass} /></div><div><label className={labelClass} htmlFor="travel-companion-flight">{text("Reys raqami (ixtiyoriy)", "Flugnummer (optional)")}</label><input id="travel-companion-flight" name="flightNumber" defaultValue={listing?.flightNumber ?? ""} maxLength={32} className={inputClass} /></div></div>}
      <p className="text-xs text-slate-500">{text(`Jo‘nash vaqti ${countryLabel(originCountry, "uz")} mahalliy vaqti bo‘yicha olinadi.`, `Abfahrtszeit in der Ortszeit von ${countryLabel(originCountry, "de")}.`)}</p>
      {((departure && !departureIso) || (arrival && !arrivalIso)) && <p role="alert" className="text-sm text-red-700">{text("Sana yoki vaqtni tekshiring.", "Bitte Datum und Uhrzeit prüfen.")}</p>}
    </section>
    <section className="space-y-4"><h2 className="font-semibold">{text("Kerakli ma’lumotlar", "Wichtige Angaben")}</h2>
      {kind === "ride_offer" && <div><label htmlFor="travel-seats" className={labelClass}>{text("Mashinada nechta bo‘sh joy bor?", "Wie viele Plätze sind frei?")}</label><input id="travel-seats" type="number" min={1} max={20} required value={seats} onChange={e => setSeats(e.target.value)} className={`${inputClass} ${invalid(!Number.isInteger(Number(seats)) || Number(seats) < 1 || Number(seats) > 20)}`} />{fieldError(!Number.isInteger(Number(seats)) || Number(seats) < 1 || Number(seats) > 20, "1–20 oralig‘ida kiriting.", "Bitte 1–20 eingeben.")}</div>}
      {kind === "ride_request" && <div><label htmlFor="travel-passengers" className={labelClass}>{text("Necha kishi uchun joy kerak?", "Für wie viele Personen suchen Sie Plätze?")}</label><input id="travel-passengers" type="number" min={1} max={20} required value={passengers} onChange={e => setPassengers(e.target.value)} className={`${inputClass} ${invalid(!Number.isInteger(Number(passengers)) || Number(passengers) < 1 || Number(passengers) > 20)}`} />{fieldError(!Number.isInteger(Number(passengers)) || Number(passengers) < 1 || Number(passengers) > 20, "1–20 oralig‘ida kiriting.", "Bitte 1–20 eingeben.")}</div>}
      {category === "companion" && <div className="space-y-4">
        {kind === "companion_request" && <div><label htmlFor="travel-traveler" className={labelClass}>{text("Kim uchun hamroh kerak?", "Wer benötigt Begleitung?")}</label>{select("travel-traveler", "travelerRelationship", traveler, (value) => setTraveler(value as typeof traveler), companionRelationships.map(x => ({value:x,label:companionRelationshipLabels[x][locale]})))}</div>}
        <fieldset className="space-y-2"><legend className={labelClass}>{kind === "companion_request" ? text("Qanday yordam kerak? *", "Welche Hilfe wird benötigt? *") : text("Qanday yordam bera olasiz? *", "Welche Hilfe bieten Sie an? *")}</legend><div className={`grid gap-2 rounded-xl ${invalid(helpTypes.length === 0)}`}>{companionHelp.map(x => <label key={x} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700"><input type="checkbox" name="helpTypes" value={x} checked={helpTypes.includes(x)} onChange={e => setHelpTypes(items => e.target.checked ? [...items,x] : items.filter(v => v !== x))} className="h-4 w-4 accent-emerald-700" />{companionHelpLabels[x][locale]}</label>)}</div>{fieldError(helpTypes.length === 0,"Kamida bitta yordam turini tanlang.","Bitte mindestens eine Hilfeart auswählen.")}</fieldset>
      </div>}
      {category === "parcel" && <div className="space-y-4">
        <div><label className={labelClass} htmlFor="parcel-cargo">{text("Yuk turi *", "Sendungsart *")}</label>{select("parcel-cargo","cargoTypeDisplay",cargoType,v=>setCargoType(v as ParcelDetails["cargoType"]),Object.entries(parcelCargoLabels).map(([value, labels])=>({value,label:labels[locale]})))}</div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={flexibleDate} onChange={e=>setFlexibleDate(e.target.checked)} />{text("Sana taxminiy / moslashuvchan", "Datum ungefähr / flexibel")}</label>
        <div><label className={labelClass} htmlFor="parcel-payment">{text("To‘lov turi *", "Zahlungsart *")}</label>{select("parcel-payment","paymentTypeDisplay",parcelPayment,v=>setParcelPayment(v as ParcelDetails["paymentType"]),Object.entries(parcelPaymentLabels).map(([value, labels])=>({value,label:labels[locale]})))}</div>
        {parcelPayment === "paid" && <div><label htmlFor="parcel-price" className={labelClass}>{text("Narx (EUR, ixtiyoriy)", "Preis (EUR, optional)")}</label><input id="parcel-price" name="priceAmount" value={price} onChange={e=>setPrice(e.target.value)} inputMode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" placeholder="25.00" className={inputClass}/><label className="mt-2 block text-sm">{text("Valyuta", "Währung")}<select value={parcelCurrency} onChange={e=>setParcelCurrency(e.target.value)} className={`${selectClass} mt-1`}>{["EUR","USD","UZS"].map(c=><option key={c} value={c}>{c}</option>)}</select></label><p className="mt-1 text-xs text-slate-500">{text("Narx kiritilmasa, kelishiladi deb ko‘rsatiladi.","Ohne Preisangabe erscheint Preis auf Anfrage.")}</p></div>}
        <div><label htmlFor="travel-parcel" className={labelClass}>{kind === "parcel_request" ? text("Nima yubormoqchisiz? *", "Was möchten Sie versenden? *") : text("Qanday jo‘natmalarni olib keta olasiz? *", "Welche Sendungen können Sie mitnehmen? *")}</label><textarea id="travel-parcel" required minLength={5} maxLength={2000} rows={2} value={parcelInfo} onChange={e=>setParcelInfo(e.target.value)} className={inputClass}/></div>
        <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass} htmlFor="parcel-weight">{text("Og‘irlik (kg, ixtiyoriy)", "Gewicht (kg, optional)")}</label><input id="parcel-weight" value={weightKg} onChange={e=>setWeightKg(e.target.value)} inputMode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" className={inputClass}/></div><div><label className={labelClass} htmlFor="parcel-dimensions">{text("O‘lcham (ixtiyoriy)", "Maße (optional)")}</label><input id="parcel-dimensions" value={dimensions} onChange={e=>setDimensions(e.target.value)} maxLength={120} className={inputClass}/></div></div>
        <div><label className={labelClass} htmlFor="parcel-handover">{text("Qabul qilish / topshirish usuli (ixtiyoriy)", "Übergabeart (optional)")}</label><input id="parcel-handover" value={handover} onChange={e=>setHandover(e.target.value)} maxLength={200} className={inputClass}/></div>
        <p className="text-xs text-slate-500">{text("Taqiqlangan buyumlar va shaxsiy hujjat raqamlarini e’londa joylashtirmang.","Keine verbotenen Gegenstände oder persönlichen Dokumentennummern veröffentlichen.")}</p>
      </div>}
      {category !== "parcel" && <div className="space-y-3">
        <span className={labelClass}>{text("Narx turi (majburiy)", "Preisart (Pflichtfeld)")}</span>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm"><input type="radio" name="priceModeDisplay" value="paid" checked={priceMode === "paid"} onChange={() => setPriceMode("paid")} className="accent-emerald-700" />{text("Pullik", "Kostenpflichtig")}</label>
          <label className="flex items-center gap-2 text-sm"><input type="radio" name="priceModeDisplay" value="free" checked={priceMode === "free"} onChange={() => setPriceMode("free")} className="accent-emerald-700" />{text("Bepul (tekin)", "Kostenlos")}</label>
        </div>
        {priceMode === "paid" && <div><label htmlFor="travel-price" className={labelClass}>{text("Narx (EUR) *", "Preis (EUR) *")}</label><input id="travel-price" name="priceAmount" value={price} onChange={e => setPrice(e.target.value)} inputMode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" required placeholder="Masalan, 25.00" className={`${inputClass} ${invalid(!price || !/^\d{1,10}(?:\.\d{1,2})?$/.test(price) || Number(price) <= 0)}`} aria-invalid={attempted && (!price || !/^\d{1,10}(?:\.\d{1,2})?$/.test(price) || Number(price) <= 0)} />{fieldError(!price || !/^\d{1,10}(?:\.\d{1,2})?$/.test(price) || Number(price) <= 0, "Narxni 0 dan katta qilib kiriting.", "Bitte einen Preis größer als 0 eingeben.")}</div>}
      </div>}
      <div><label htmlFor="travel-description" className={labelClass}>{category === "parcel" ? text("Qisqa izoh (500 belgigacha)", "Kurze Beschreibung (max. 500 Zeichen)") : text("Izoh (ixtiyoriy)", "Anmerkung (optional)")}</label><textarea id="travel-description" name="description" maxLength={category === "parcel" ? 500 : 5000} rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder={text("Boshqalar bilishi kerak bo‘lgan qo‘shimcha ma’lumot", "Zusätzliche Hinweise für andere")} className={inputClass} /></div>
    </section>
    {category === "ride" && <section className="space-y-4"><button type="button" onClick={() => setShowOptional(v => !v)} aria-expanded={showOptional} className="text-sm font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{showOptional ? text("Qo‘shimcha maydonlarni yopish", "Weitere Angaben ausblenden") : text("Qo‘shimcha ma’lumot kiritish (ixtiyoriy)", "Weitere Angaben (optional)")}</button>
      <div className={showOptional ? "space-y-4" : "hidden"}>
        <div><label htmlFor="travel-mode" className={labelClass}>{text("Transport", "Verkehrsmittel")}</label><div className="relative"><select id="travel-mode" name="transportMode" defaultValue={listing?.transportMode ?? (category === "ride" ? "car" : "plane")} key={category} className={selectClass}>{TRAVEL_TRANSPORT_MODES.filter(m => category !== "ride" || m === "car").map(m => <option key={m} value={m}>{travelModes[m][locale]}</option>)}</select><Chevron /></div></div>
        <div><label htmlFor="travel-transit" className={labelClass}>{text("Tranzit / oraliq bekatlar", "Umstieg / Zwischenstopps")}</label><textarea id="travel-transit" name="transitDetails" defaultValue={listing?.transitDetails ?? ""} maxLength={1000} rows={2} className={inputClass} /></div>
      </div>
    </section>}
    <p className="text-xs text-slate-500">{text("Pasport raqami, chipta kodi yoki maxfiy ma’lumotlarni yozmang.", "Keine Passnummern, Buchungscodes oder vertraulichen Daten angeben.")}</p>
    {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">{state.error}</p>}
    <section className="space-y-2"><label htmlFor="travel-image" className="block text-sm font-semibold">{text("E’lon rasmi (ixtiyoriy, 1 ta, 30 MB gacha)", "Anzeigenbild (optional, 1 Bild, bis 30 MB)")}</label><input id="travel-image" name="travelImage" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" className="block w-full rounded-xl border border-slate-300 p-3 text-sm dark:border-slate-700" /><p className="text-xs text-slate-500">{text("JPEG, PNG, WebP yoki HEIC. Rasm serverda WebP formatiga o‘tkaziladi.", "JPEG, PNG, WebP oder HEIC. Das Bild wird serverseitig in WebP umgewandelt.")}</p></section>
    <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-emerald-700 px-6 font-semibold text-white disabled:opacity-50">{pending ? text("Saqlanmoqda…", "Speichern…") : listing ? text("O‘zgarishlarni saqlash", "Änderungen speichern") : text("E’lonni saqlash", "Anzeige speichern")}</button>
  </form>;
}
