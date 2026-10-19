import { ArrowRight, MapPin, Route } from "lucide-react";
import type { TravelListing } from "@/types/travel";

/** transitDetails is legacy free text, not a validated ordered route. */
export default function TravelRouteSummary({ listing, locale, compact = false }: { listing: TravelListing; locale: "uz" | "de"; compact?: boolean }) {
  return <div className="min-w-0">
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-950 dark:text-white sm:text-base">
      <span className="inline-flex min-w-0 items-center gap-1"><MapPin aria-hidden="true" size={15} className="shrink-0 text-emerald-700" />{listing.originCity}</span>
      <ArrowRight aria-hidden="true" size={16} className="shrink-0 text-slate-400" />
      <span>{listing.destinationCity}</span>
    </div>
    {listing.kind.startsWith("companion_") && listing.companionDetails?.transitAirports.length ? <div className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400"><Route aria-hidden="true" size={14} className="shrink-0"/><span>{listing.companionDetails.transitAirports.join(" → ")} {locale === "de" ? "(Umstieg)" : "orqali"}</span></div> : null}
    {listing.transitDetails && !listing.companionDetails && <div className={`mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 ${compact ? "line-clamp-1" : ""}`}>
      <Route aria-hidden="true" size={14} className="mt-0.5 shrink-0" />
      <span className={compact ? "truncate" : "whitespace-pre-wrap break-words"}>{locale === "de" ? "Zwischenstopps / Hinweise: " : "Oraliq bekatlar / izoh: "}{listing.transitDetails}</span>
    </div>}
  </div>;
}
