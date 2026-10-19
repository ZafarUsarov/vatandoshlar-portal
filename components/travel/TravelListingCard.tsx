import { parcelCargoLabels, parcelPaymentLabels } from "@/lib/travel/parcel-details";
import { ArrowRight, CalendarDays, CarFront, Weight, CheckCircle2, ChevronRight, Clock3, Package, Plane, Route, UserRound, UsersRound, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TravelListing } from "@/types/travel";
import type { TravelAuthorProfile } from "@/lib/travel/travel-author-profiles";
import { companionHelpLabels } from "@/lib/travel/companion-details";
import { readableTravelDescription } from "@/lib/travel/travel-description";
import { travelKinds } from "@/lib/travel/travel-labels";

export default function TravelListingCard({ listing, locale, author }: { listing: TravelListing; locale: "uz" | "de"; author?: TravelAuthorProfile }) {
  const de = locale === "de";
  const companion = listing.kind.startsWith("companion_");
  const ride = listing.kind.startsWith("ride_");
  const date = new Date(listing.departureAt);
  const dateText = date.toLocaleDateString(de ? "de-DE" : "uz-UZ", { timeZone: listing.departureTimezone, day: "numeric", month: "long", year: "numeric" });
  const timeText = date.toLocaleTimeString(de ? "de-DE" : "uz-UZ", { timeZone: listing.departureTimezone, hour: "2-digit", minute: "2-digit" });
  const knownTime = !companion || !listing.companionDetails || listing.companionDetails.departureTimeKnown;
  const description = readableTravelDescription(listing.description, listing.originCity, listing.destinationCity);
  const isFree = listing.priceAmount !== null && Number(listing.priceAmount) === 0;
  const price = listing.priceAmount !== null && !isFree ? new Intl.NumberFormat(de ? "de-DE" : "uz-UZ", { maximumFractionDigits: 2 }).format(Number(listing.priceAmount)) : null;
  const priceText = isFree ? (de ? "Kostenlos" : "Bepul") : price !== null ? `${price} ${listing.priceCurrency ?? ""}` : null;
  const parcel = !companion && !ride;
  const parcelMeta = parcel ? listing.parcelStructured : null;
  const help = companion ? listing.companionDetails?.helpTypes ?? [] : [];
  const name = author?.displayName || (de ? "Mitglied" : "Foydalanuvchi");
  const Icon = companion ? Plane : ride ? CarFront : Package;
  const kindLabel = companion ? listing.kind === "companion_request" ? (de ? "Begleitung gesucht" : "Hamroh izlayapman") : (de ? "Begleitung angeboten" : "Hamroh bo‘la olaman") : travelKinds[listing.kind][locale];
  const transit = companion && listing.companionDetails?.flightType === "transit";
  const transitStops = companion ? listing.companionDetails?.transitAirports ?? [] : [];
  return (
    <li className="min-w-0">
      <Link href={`/safar/${listing.slug}`} className="group block min-w-0 overflow-hidden rounded-2xl border-2 border-slate-300 bg-white p-3.5 shadow-[0_3px_14px_rgba(15,23,42,0.055)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(15,23,42,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-600 sm:p-4">
        <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-[80px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)_minmax(145px,190px)_110px] lg:items-center lg:gap-4">
          <div className="hidden sm:block">
            {!companion && listing.imageThumbKey ? <img src={`/api/travel/images/${listing.id}?size=thumb`} alt="" loading="lazy" className="h-20 w-20 rounded-xl object-cover lg:h-[88px] lg:w-[88px]" /> : <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 lg:h-[88px] lg:w-[88px]"><Icon size={30} strokeWidth={1.7} aria-hidden="true" /></div>}
          </div>
          <div className="min-w-0 space-y-1.5">
            <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
              <h3 className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[17px] leading-snug font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-lg"><span className="break-words">{listing.originCity}</span><ArrowRight size={17} className="shrink-0 text-slate-400" aria-hidden="true"/><span className="break-words">{listing.destinationCity}</span></h3>
              <span className="self-start whitespace-normal text-base font-extrabold text-emerald-700 dark:text-emerald-400 sm:self-auto sm:whitespace-nowrap sm:text-sm lg:hidden">{parcelMeta?.paymentType === "negotiable" ? (de ? "Preis verhandelbar" : "Narx kelishiladi") : priceText ?? (de ? "Preis auf Anfrage" : "Narx kelishiladi")}</span>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{kindLabel}</span>
              {companion && <span className="inline-flex min-w-0 items-center gap-1 text-slate-600 dark:text-slate-300"><Route size={13} className="shrink-0" aria-hidden="true"/>{transit ? transitStops.length ? `${transitStops.join(" → ")} · ${de ? "Umstieg" : "Tranzit"}` : (de ? "Mit Umstieg" : "Tranzit orqali") : (de ? "Direktflug" : "To‘g‘ridan-to‘g‘ri")}</span>}
              {!companion && !parcel && listing.transitDetails && <span className="min-w-0 max-w-full truncate text-slate-500 dark:text-slate-400">{listing.transitDetails}</span>}
              {listing.womenOnly && <span className="rounded-full bg-rose-50 px-2 py-0.5 font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300">{de ? "Nur für Frauen" : "Faqat ayollar uchun"}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300"><span className="inline-flex items-center gap-1"><CalendarDays size={13} aria-hidden="true"/>{dateText}</span>{knownTime && <span className="inline-flex items-center gap-1"><Clock3 size={13} aria-hidden="true"/>{timeText}</span>}{ride && listing.seatsAvailable !== null && <span>{listing.seatsAvailable} {de ? "freie Plätze" : "bo‘sh o‘rin"}</span>}</div>
            {help.length > 0 && <div className="flex min-w-0 flex-wrap items-center gap-1.5">{help.slice(0,2).map(type => <span key={type} className="inline-flex max-w-full items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"><CheckCircle2 size={12} className="shrink-0" aria-hidden="true"/><span className="truncate">{companionHelpLabels[type][locale]}</span></span>)}{help.length > 2 && <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">+{help.length - 2} {de ? "weitere" : "xizmat"}</span>}</div>}
            {parcel && parcelMeta && <div className="flex flex-wrap gap-1.5 text-xs"><span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">{parcelCargoLabels[parcelMeta.cargoType][locale]}</span><span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{parcelPaymentLabels[parcelMeta.paymentType][locale]}</span>{parcelMeta.weightKg !== null && <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Weight size={12} aria-hidden="true"/>{parcelMeta.weightKg} kg</span>}{parcelMeta.flexibleDate && <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">{de ? "Flexibles Datum" : "Taxminiy sana"}</span>}</div>}

            {(description || (parcel && listing.parcelDetails)) && <p className="line-clamp-2 break-words text-xs leading-5 text-slate-500 dark:text-slate-400">{parcel ? [listing.parcelDetails, description].filter(Boolean).filter((v,i,a) => a.indexOf(v) === i).join(" · ") : description}</p>}
          </div>
          <div className="flex min-w-0 items-center gap-2.5 border-t border-slate-100 pt-3 dark:border-slate-800 sm:col-start-2 lg:col-auto lg:border-0 lg:pt-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">{author?.avatarUrl ? <img src={author.avatarUrl} alt="" loading="lazy" className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : <UserRound size={19} aria-hidden="true"/>}</div>
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{name}</p>{author?.ratingAverage !== null && author?.ratingAverage !== undefined && (author.ratingCount ?? 0) > 0 ? <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><Star size={12} className="text-amber-500" fill="currentColor" aria-hidden="true"/>{author.ratingAverage.toFixed(1)} ({author.ratingCount})</p> : <p className="text-xs text-slate-500 dark:text-slate-400">{de ? "Noch nicht bewertet" : "Hali baholanmagan"}</p>}</div>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-semibold transition-colors group-hover:bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:text-emerald-300 lg:hidden">{de ? "Details" : "Batafsil"}<ChevronRight size={14} aria-hidden="true"/></span>
          </div>
          <div className="hidden min-w-0 text-right lg:block"><p className="whitespace-nowrap text-base font-bold text-emerald-700 dark:text-emerald-400">{parcelMeta?.paymentType === "negotiable" ? (de ? "Preis verhandelbar" : "Narx kelishiladi") : priceText ?? (de ? "Preis auf Anfrage" : "Narx kelishiladi")}</p><span className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-semibold transition-colors group-hover:bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:text-emerald-300">{de ? "Details" : "Batafsil"}<ChevronRight size={14} aria-hidden="true"/></span></div>
        </div>
      </Link>
    </li>
  );
}
