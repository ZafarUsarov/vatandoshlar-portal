"use server";

import { revalidatePath } from "next/cache";
import { requirePublicUser } from "@/lib/auth/user";
import { createTravelDraft } from "@/lib/travel/travel-repository";
import { TRAVEL_LISTING_KINDS, TRAVEL_TRANSPORT_MODES } from "@/types/travel";
import type { TravelListingKind, TravelTransportMode } from "@/types/travel";

export type CreateTravelState = Readonly<{ error: string | null; createdId?: string }>;
const value = (data: FormData, key: string) => {
  const v = data.get(key);
  return typeof v === "string" ? v.trim() : "";
};
const optional = (v: string) => v || null;
const iso = (v: string): string | null => {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/.test(v)) return null;
  const time = Date.parse(v);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
};

export async function createTravelDraftAction(
  _previous: CreateTravelState, data: FormData,
): Promise<CreateTravelState> {
  const locale = value(data, "locale") === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/travel/new");
  const kind = value(data, "kind");
  const mode = value(data, "transportMode");
  const title = value(data, "title");
  const description = value(data, "description");
  const originCountryCode = value(data, "originCountryCode").toUpperCase();
  const destinationCountryCode = value(data, "destinationCountryCode").toUpperCase();
  const originCity = value(data, "originCity");
  const destinationCity = value(data, "destinationCity");
  const departureAt = iso(value(data, "departureAt"));
  const arrivalRaw = value(data, "arrivalAt");
  const arrivalAt = arrivalRaw ? iso(arrivalRaw) : null;
  const departureTimezone = value(data, "departureTimezone");
  const flightNumber = value(data, "flightNumber");
  const transitDetails = value(data, "transitDetails");
  const assistanceDetails = value(data, "assistanceDetails");
  const parcelDetails = value(data, "parcelDetails");
  const seatsRaw = value(data, "seatsAvailable");
  const priceRaw = value(data, "priceAmount");
  const priceCurrency = value(data, "priceCurrency").toUpperCase();
  const fail = (uz: string, de: string) => ({ error: locale === "de" ? de : uz });
  if (!TRAVEL_LISTING_KINDS.includes(kind as TravelListingKind)) return fail("E’lon turi noto‘g‘ri.", "Ungültige Anzeigenart.");
  if (!TRAVEL_TRANSPORT_MODES.includes(mode as TravelTransportMode)) return fail("Transport turi noto‘g‘ri.", "Ungültiges Verkehrsmittel.");
  if (title.length < 5 || title.length > 150 || description.length < 20 || description.length > 5000)
    return fail("Sarlavha yoki tavsif uzunligi noto‘g‘ri.", "Ungültige Titel- oder Beschreibungslänge.");
  if (!/^[A-Z]{2}$/.test(originCountryCode) || !/^[A-Z]{2}$/.test(destinationCountryCode) ||
      !originCity || originCity.length > 120 || !destinationCity || destinationCity.length > 120)
    return fail("Yo‘nalish ma’lumotlarini tekshiring.", "Bitte überprüfen Sie die Reiseroute.");
  if (!departureAt || Date.parse(departureAt) <= Date.now() || (arrivalRaw && !arrivalAt) ||
      (arrivalAt && Date.parse(arrivalAt) < Date.parse(departureAt)))
    return fail("Safar sanasi kelajakda bo‘lishi kerak.", "Das Reisedatum muss in der Zukunft liegen.");
  try { new Intl.DateTimeFormat("en", { timeZone: departureTimezone }); }
  catch { return fail("Vaqt mintaqasi noto‘g‘ri.", "Ungültige Zeitzone."); }
  const seats = seatsRaw ? Number(seatsRaw) : null;
  if (seatsRaw && (!Number.isInteger(seats) || seats === null || seats < 1 || seats > 20))
    return fail("O‘rinlar soni 1–20 oralig‘ida bo‘lsin.", "Sitzplätze müssen zwischen 1 und 20 liegen.");
  if (kind.startsWith("companion_") && !assistanceDetails)
    return fail("Qanday yordam kerakligini yozing.", "Bitte beschreiben Sie die benötigte Hilfe.");
  if (kind.startsWith("parcel_") && !parcelDetails)
    return fail("Jo‘natma haqida ma’lumot kiriting.", "Bitte beschreiben Sie die Sendung.");
  if (kind.startsWith("ride_") && mode !== "car")
    return fail("Avtomobil safarini tanlang.", "Bitte wählen Sie Auto.");
  if (kind === "ride_offer" && seats === null)
    return fail("Bo‘sh o‘rinlar sonini kiriting.", "Bitte geben Sie die Anzahl freier Plätze ein.");
  if (flightNumber.length > 32 || transitDetails.length > 1000 || assistanceDetails.length > 2000 || parcelDetails.length > 2000)
    return fail("Qo‘shimcha ma’lumot juda uzun.", "Zusätzliche Angaben sind zu lang.");
  if (priceRaw && (!/^\d{1,10}(?:\.\d{1,2})?$/.test(priceRaw) || !/^[A-Z]{3}$/.test(priceCurrency)))
    return fail("Narx formati noto‘g‘ri.", "Ungültiges Preisformat.");
  if (!priceRaw && priceCurrency) return fail("Narxni ham kiriting.", "Bitte geben Sie auch den Preis ein.");
  const createdId = await createTravelDraft({
    authorUserId: user.user.id, kind: kind as TravelListingKind,
    contentLanguage: locale, title, description, transportMode: mode as TravelTransportMode,
    originCountryCode, originCity, destinationCountryCode, destinationCity,
    departureAt, departureTimezone, arrivalAt, flightNumber: optional(flightNumber),
    transitDetails: optional(transitDetails), seatsAvailable: seats,
    assistanceDetails: optional(assistanceDetails), parcelDetails: optional(parcelDetails),
    priceAmount: optional(priceRaw), priceCurrency: priceRaw ? priceCurrency : null,
  });
  revalidatePath(`/${locale}/travel/mine`);
  return { error: null, createdId };
}
