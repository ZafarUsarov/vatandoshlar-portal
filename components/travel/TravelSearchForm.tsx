"use client";

import { useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { TRAVEL_LISTING_KINDS, type TravelListingKind } from "@/types/travel";
import { travelKinds } from "@/lib/travel/travel-labels";
import {
  countryLabel,
  travelCountries,
  regionsForCountry,
  type TravelCountry,
} from "@/lib/travel/travel-regions";

type Props = {
  locale: "uz" | "de";
  service: "ride" | "companion" | "parcel";
  kind?: TravelListingKind;
  from?: TravelCountry;
  to?: TravelCountry;
  fromRegion?: string;
  toRegion?: string;
  date?: string;
  womenOnly?: boolean;
  cargoType?: string; paymentType?: string;
};

const inputClass =
  "block min-h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export default function TravelSearchForm({
  locale,
  service,
  kind,
  from = "UZ",
  to = "DE",
  fromRegion = "",
  toRegion = "",
  date = "",
  womenOnly = false,
  cargoType = "", paymentType = "",
}: Props) {
  const pathname = usePathname();
  const [origin, setOrigin] = useState<TravelCountry>(from);
  const [destination, setDestination] = useState<TravelCountry>(to);
  const [originRegion, setOriginRegion] = useState(fromRegion);
  const [destinationRegion, setDestinationRegion] = useState(toRegion);
  const de = locale === "de";

  const swapDirection = () => {
    setOrigin(destination);
    setDestination(origin);
    setOriginRegion(destinationRegion);
    setDestinationRegion(originRegion);
  };

  const selectArrow = (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  const countryField = (
    name: "from" | "to",
    country: TravelCountry,
    setCountry: (value: TravelCountry) => void,
    setRegion: (value: string) => void,
  ) => (
    <label className="relative block min-w-0 text-sm font-semibold">
      <span className="pointer-events-none absolute left-3 top-1.5 z-10 text-[11px] font-medium text-slate-500 dark:text-slate-400 sm:static sm:block sm:text-sm sm:font-semibold sm:text-inherit">
        {name === "from" ? (de ? "Von" : "Qayerdan") : (de ? "Nach" : "Qayerga")}
      </span>
      <span className="relative block sm:mt-2">
        <select
          name={name}
          value={country}
          onChange={(event) => {
            setCountry(event.target.value as TravelCountry);
            setRegion("");
          }}
          className={`${inputClass} h-[52px] rounded-xl pt-[19px] pb-[4px] pl-3 text-sm font-semibold sm:h-auto sm:py-2`}
        >
          {travelCountries.map((code) => (
            <option key={code} value={code}>{countryLabel(code, locale)}</option>
          ))}
        </select>
        {selectArrow}
      </span>
    </label>
  );

  const regionField = (
    name: "from" | "to",
    country: TravelCountry,
    region: string,
    setRegion: (value: string) => void,
  ) => (
    <label className="block min-w-0 text-sm font-medium text-slate-600 dark:text-slate-300">
      <span className="block">{de ? "Region (optional)" : "Hudud (ixtiyoriy)"}</span>
      <span className="relative mt-2 block">
      <select
        name={`${name}Region`}
        value={region}
        onChange={(event) => setRegion(event.target.value)}
        className={inputClass}
      >
        <option value="">{de ? "Alle Regionen" : "Barcha hududlar"}</option>
        {regionsForCountry(country).map((item) => (
          <option key={item.code} value={item.code}>{item[locale]}</option>
        ))}
      </select>
      {selectArrow}
      </span>
    </label>
  );

  return (
    <form action={pathname} method="get" className="mt-4 min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:mt-5 sm:p-4">
      <input type="hidden" name="service" value={service} />
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-2 sm:grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)_minmax(0,0.7fr)_auto] sm:items-end">
        {countryField("from", origin, setOrigin, setOriginRegion)}
        <div className="flex min-w-0 justify-center py-0 sm:w-auto">
          <button type="button" aria-label={de ? "Richtung tauschen" : "Yo‘nalishni almashtirish"} onClick={swapDirection} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 border border-slate-200 bg-slate-50 text-lg hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">⇄</button>
        </div>
        {countryField("to", destination, setDestination, setDestinationRegion)}
        <label className="block w-full min-w-0 max-w-full text-sm font-semibold">
          <span className="block">{de ? "Datum" : "Sana"}</span>
          <span className="relative mt-2 block h-11 w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
            <input
              type="date"
              name="date"
              defaultValue={date}
              style={{ minWidth: 0, maxWidth: "100%", boxSizing: "border-box" }}
              className="absolute inset-0 block h-full w-full min-w-0 max-w-full appearance-none bg-transparent py-2 pl-3 pr-11 text-sm text-slate-950 dark:text-white"
            />
            <CalendarDays aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          </span>
        </label>
        <button type="submit" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white hover:bg-emerald-800 sm:w-auto"><Search aria-hidden="true" className="h-4 w-4 sm:hidden" />{de ? "Suchen" : "Qidirish"}</button>
      </div>
      <details className="group mt-3 border-t border-slate-100 pt-3 dark:border-slate-800" open={Boolean(kind || fromRegion || toRegion || womenOnly || cargoType || paymentType)}>
        <summary className="cursor-pointer text-sm font-semibold text-slate-600 dark:text-slate-300">{de ? "Weitere Filter" : "Qo‘shimcha filtrlar"}</summary>
        <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-3">
          {regionField("from", origin, originRegion, setOriginRegion)}
          {regionField("to", destination, destinationRegion, setDestinationRegion)}
          <label className="block min-w-0 text-sm font-medium text-slate-600 dark:text-slate-300"><span className="block">{de ? "Anzeigenart" : "E’lon turi"}</span><span className="relative mt-2 block"><select name="kind" defaultValue={kind ?? ""} className={inputClass}><option value="">{de ? "Alle Anzeigen" : "Barcha e’lonlar"}</option>{TRAVEL_LISTING_KINDS.filter((listingKind) => listingKind.startsWith(`${service}_`)).map((listingKind) => <option key={listingKind} value={listingKind}>{travelKinds[listingKind][locale]}</option>)}</select>{selectArrow}</span></label>
        </div>
        {service === "parcel" && <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">{de ? "Sendungsart" : "Yuk turi"}<select name="cargoType" defaultValue={cargoType} className={`${inputClass} mt-2`}><option value="">{de ? "Alle" : "Barchasi"}</option><option value="parcel">{de ? "Paket" : "Yuk"}</option><option value="documents">{de ? "Dokumente" : "Hujjat"}</option><option value="both">{de ? "Beides" : "Ikkalasi"}</option></select></label><label className="text-sm font-medium">{de ? "Zahlungsart" : "To‘lov turi"}<select name="paymentType" defaultValue={paymentType} className={`${inputClass} mt-2`}><option value="">{de ? "Alle" : "Barchasi"}</option><option value="paid">{de ? "Kostenpflichtig" : "To‘lovli"}</option><option value="free">{de ? "Kostenlos" : "Bepul"}</option><option value="negotiable">{de ? "Verhandelbar" : "Kelishiladi"}</option></select></label></div>}
        {service !== "parcel" && <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><input type="checkbox" name="womenOnly" value="1" defaultChecked={womenOnly} className="h-4 w-4 accent-emerald-700" />{de ? "Nur für Frauen" : "Faqat ayollar uchun"}</label>}
        <div className="mt-3 flex justify-end"><a href={`${pathname}?service=${service}`} className="text-xs font-semibold text-slate-500 underline-offset-4 hover:underline">{de ? "Zurücksetzen" : "Tozalash"}</a></div>
      </details>
    </form>
  );
}
