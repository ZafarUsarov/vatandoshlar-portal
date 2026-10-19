"use server";
import { parcelCargoTypes, parcelPaymentTypes, type ParcelDetails } from "@/lib/travel/parcel-details";
import { companionHelp, companionRelationships, type CompanionDetails } from "@/lib/travel/companion-details";
import { readableTravelDescription } from "@/lib/travel/travel-description";


import { revalidatePath } from "next/cache";
import { replaceOwnTravelImage } from "@/lib/travel/travel-image";
import { requirePublicUser } from "@/lib/auth/user";
import { createTravelDraft, updateOwnTravelListing } from "@/lib/travel/travel-repository";
import { isTravelCountry, isTravelRegion, countryTimezone } from "@/lib/travel/travel-regions";
import { TRAVEL_LISTING_KINDS, TRAVEL_TRANSPORT_MODES } from "@/types/travel";
import type { TravelListingKind, TravelTransportMode } from "@/types/travel";

export type CreateTravelState = Readonly<{ error: string | null; createdId?: string }>;
const value = (data: FormData, key: string) => {
  const v = data.get(key);
  return typeof v === "string" ? v.trim() : "";
};
const optional = (v: string) => v || null;
const iso = (v: string): string | null => {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/.test(v)) return null;
  const time = Date.parse(v);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
};

export async function createTravelDraftAction(previous: CreateTravelState, data: FormData): Promise<CreateTravelState> {
  return saveTravelAction(previous, data, false);
}

export async function updateTravelListingAction(previous: CreateTravelState, data: FormData): Promise<CreateTravelState> {
  return saveTravelAction(previous, data, true);
}

async function saveTravelAction(
  _previous: CreateTravelState, data: FormData, editing: boolean,
): Promise<CreateTravelState> {
  const locale = value(data, "locale") === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/safar/new");
  const kind = value(data, "kind");
  const mode = value(data, "transportMode");
  const womenOnlyRaw = value(data, "womenOnly");
  if (womenOnlyRaw !== "" && womenOnlyRaw !== "on") return { error: locale === "de" ? "Ungültige Auswahl." : "Tanlov noto‘g‘ri." };
  const womenOnly = womenOnlyRaw === "on" && (kind.startsWith("ride_") || kind.startsWith("companion_"));
  const userTitle = value(data, "title");
  const userDescription = value(data, "description");
  const originCountryCode = value(data, "originCountryCode").toUpperCase();
  const destinationCountryCode = value(data, "destinationCountryCode").toUpperCase();
  const originRegionCode = value(data, "originRegionCode");
  const destinationRegionCode = value(data, "destinationRegionCode");
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
  const passengerRaw = value(data, "passengerCount");
  const travelerRelationship = value(data, "travelerRelationship");
  const companion = kind.startsWith("companion_");
  const flightType = value(data, "flightType");
  const originAirport = value(data, "originAirport");
  const destinationAirport = value(data, "destinationAirport");
  const airline = value(data, "airline");
  const departureTimeKnown = value(data, "departureTimeKnown") === "1";
  const transitAirports = data.getAll("transitAirports").filter((x): x is string => typeof x === "string").map(x => x.trim());
  const helpTypes = data.getAll("helpTypes").filter((x): x is string => typeof x === "string");
  const parcel = kind.startsWith("parcel_");
  const cargoType = value(data, "cargoType");
  const paymentType = value(data, "paymentType");
  const flexibleDateRaw = value(data, "flexibleDate");
  const weightRaw = value(data, "weightKg");
  const dimensions = value(data, "dimensions");
  const handover = value(data, "handover");
  const priceMode = value(data, "priceMode");
  const priceRaw = parcel ? (paymentType === "free" ? "0" : paymentType === "negotiable" ? "" : value(data, "priceAmount")) : priceMode === "free" ? "0" : value(data, "priceAmount");
  const priceCurrency = value(data, "priceCurrency").toUpperCase();
  const fail = (uz: string, de: string) => ({ error: locale === "de" ? de : uz });
  if (!TRAVEL_LISTING_KINDS.includes(kind as TravelListingKind)) return fail("E’lon turi noto‘g‘ri.", "Ungültige Anzeigenart.");
  if (!TRAVEL_TRANSPORT_MODES.includes(mode as TravelTransportMode)) return fail("Transport turi noto‘g‘ri.", "Ungültiges Verkehrsmittel.");
  if (userTitle.length > 150 || userDescription.length > 5000)
    return fail("Matn juda uzun.", "Der Text ist zu lang.");
  if (!/^[A-Z]{2}$/.test(originCountryCode) || !/^[A-Z]{2}$/.test(destinationCountryCode) ||
      !originCity || originCity.length > 120 || !destinationCity || destinationCity.length > 120)
    return fail("Yo‘nalish ma’lumotlarini tekshiring.", "Bitte überprüfen Sie die Reiseroute.");
  if (!isTravelCountry(originCountryCode) || !isTravelCountry(destinationCountryCode))
    return fail("Mamlakatni ro‘yxatdan tanlang.", "Bitte wählen Sie ein Land aus der Liste.");
  if (kind.startsWith("ride_") && (originCountryCode === "UZ" || destinationCountryCode === "UZ"))
    return fail("Safar bo‘limi Yevropa shaharlari orasidagi avtomobil qatnovi uchun.", "Mitfahrten sind für Fahrten innerhalb Europas vorgesehen.");
  if ((originRegionCode && !isTravelRegion(originCountryCode, originRegionCode)) ||
      (destinationRegionCode && !isTravelRegion(destinationCountryCode, destinationRegionCode)))
    return fail("Hududni tanlangan mamlakatga moslang.", "Bitte wählen Sie eine gültige Region.");
  if (departureTimezone !== countryTimezone(originCountryCode))
    return fail("Jo‘nash vaqt mintaqasi mamlakatga mos emas.", "Die Zeitzone passt nicht zum Abfahrtsland.");
  if (!departureAt || Date.parse(departureAt) <= Date.now() || (arrivalRaw && !arrivalAt) ||
      (arrivalAt && Date.parse(arrivalAt) < Date.parse(departureAt)))
    return fail("Safar sanasi kelajakda bo‘lishi kerak.", "Das Reisedatum muss in der Zukunft liegen.");
  try { new Intl.DateTimeFormat("en", { timeZone: departureTimezone }); }
  catch { return fail("Vaqt mintaqasi noto‘g‘ri.", "Ungültige Zeitzone."); }
  const seats = seatsRaw ? Number(seatsRaw) : null;
  if (seatsRaw && (!Number.isInteger(seats) || seats === null || seats < 1 || seats > 20))
    return fail("O‘rinlar soni 1–20 oralig‘ida bo‘lsin.", "Sitzplätze müssen zwischen 1 und 20 liegen.");
  if (passengerRaw && (!/^[1-9]\d?$/.test(passengerRaw) || Number(passengerRaw) > 20))
    return fail("Yo‘lovchilar sonini tekshiring.", "Bitte prüfen Sie die Personenzahl.");
  if (kind === "ride_request" && !passengerRaw)
    return fail("Necha kishi uchun joy kerakligini kiriting.", "Bitte geben Sie die Personenzahl an.");
  if (companion) {
    if (mode !== "plane") return fail("Hamroh faqat aviaparvozlar uchun.", "Begleitung ist nur für Flugreisen vorgesehen.");
    if (kind === "companion_request" && !companionRelationships.includes(travelerRelationship as typeof companionRelationships[number]))
      return fail("Kim uchun hamroh kerakligini tanlang.", "Bitte wählen Sie, wer Begleitung benötigt.");
    if (flightType !== "direct" && flightType !== "transit") return fail("Parvoz turini tanlang.", "Bitte Flugart wählen.");
    if (transitAirports.length > 5 || transitAirports.some(x => x.length > 120) || (flightType === "transit" && (!transitAirports.length || transitAirports.some(x => !x))))
      return fail("Tranzit aeroportlarini tekshiring (ko‘pi bilan 5 ta).", "Bitte Transitflughäfen prüfen (maximal 5).");
    if (originAirport.length > 120 || destinationAirport.length > 120 || airline.length > 120)
      return fail("Aeroport yoki aviakompaniya nomi juda uzun.", "Flughafen oder Fluggesellschaft zu lang.");
    if (!helpTypes.length || helpTypes.length > companionHelp.length || helpTypes.some(x => !companionHelp.includes(x as typeof companionHelp[number])) || new Set(helpTypes).size !== helpTypes.length)
      return fail("Kamida bitta yordam turini tanlang.", "Bitte mindestens eine Hilfeart wählen.");
  }
  if (parcel && (!parcelCargoTypes.includes(cargoType as ParcelDetails["cargoType"]) || !parcelPaymentTypes.includes(paymentType as ParcelDetails["paymentType"])))
    return fail("Yuk va to‘lov turini tanlang.", "Bitte Sendungs- und Zahlungsart auswählen.");
  if (parcel && (userDescription.length > 500 || dimensions.length > 120 || handover.length > 200 || (flexibleDateRaw !== "" && flexibleDateRaw !== "on") || (weightRaw !== "" && (!/^\d{1,5}(?:\.\d{1,2})?$/.test(weightRaw) || Number(weightRaw) <= 0))))
    return fail("Jo‘natma maydonlarini tekshiring (izoh 500 belgigacha).", "Bitte Sendungsangaben prüfen (Beschreibung maximal 500 Zeichen).");
  if (parcel && parcelDetails.length < 5)
    return fail("Jo‘natma haqida ma’lumot kiriting.", "Bitte beschreiben Sie die Sendung.");
  if (kind.startsWith("ride_") && mode !== "car")
    return fail("Avtomobil safarini tanlang.", "Bitte wählen Sie Auto.");
  if (kind === "ride_offer" && seats === null)
    return fail("Bo‘sh o‘rinlar sonini kiriting.", "Bitte geben Sie die Anzahl freier Plätze ein.");
  if (flightNumber.length > 32 || transitDetails.length > 1000 || assistanceDetails.length > 2000 || parcelDetails.length > 2000)
    return fail("Qo‘shimcha ma’lumot juda uzun.", "Zusätzliche Angaben sind zu lang.");
  if (!parcel && priceMode !== "free" && priceMode !== "paid")
    return fail("Narx turini tanlang.", "Bitte wählen Sie eine Preisart.");
  if ((!parcel && priceMode === "paid" || parcel && paymentType === "paid" && Boolean(priceRaw)) && (!priceRaw || !/^\d{1,10}(?:\.\d{1,2})?$/.test(priceRaw) || Number(priceRaw) <= 0))
    return fail("Narxni 0 dan katta qilib kiriting.", "Bitte einen Preis größer als 0 eingeben.");
  if (!parcel && priceMode === "free" && value(data, "priceAmount") !== "0")
    return fail("Bepul narx ma’lumoti noto‘g‘ri.", "Ungültige kostenlose Preisangabe.");
  if ((!parcel && priceCurrency !== "EUR") || (parcel && !["EUR", "USD", "UZS"].includes(priceCurrency)))
    return fail("Narx valyutasi noto‘g‘ri.", "Ungültige Preiswährung.");
  const kindTitles: Record<TravelListingKind, [string, string]> = {
    ride_offer: ["Mashinamda bo‘sh joy bor", "Freie Plätze im Auto"],
    ride_request: ["Yo‘lovchi sifatida joy izlayapman", "Mitfahrgelegenheit gesucht"],
    companion_request: ["Yaqinimga hamroh izlayapman", "Reisebegleitung gesucht"],
    companion_offer: ["Hamroh bo‘lishim mumkin", "Reisebegleitung angeboten"],
    parcel_request: ["Jo‘natma yubormoqchiman", "Sendung gesucht"],
    parcel_offer: ["Jo‘natma olib ketishim mumkin", "Sendungsmitnahme angeboten"],
  };
  const title = userTitle || `${kindTitles[kind as TravelListingKind][locale === "de" ? 1 : 0]}: ${originCity} → ${destinationCity}`.slice(0, 150);
  // The route, departure, passenger count and service-specific fields are stored
  // separately. Never duplicate them in the public free-text description.
  // Clean legacy prefixes when an older listing is edited and resubmitted.
  const description = readableTravelDescription(userDescription, originCity, destinationCity) ||
    (locale === "de" ? "Keine zusätzlichen Hinweise angegeben." : "Qo‘shimcha izoh kiritilmagan.");
  if (title.length < 5) return fail("E’lon ma’lumotlari yetarli emas.", "Unvollständige Angaben.");
  const incomingImage = data.get("travelImage");
  if (incomingImage instanceof File && incomingImage.size > 30 * 1024 * 1024)
    return fail("Rasm 30 MB dan oshmasligi kerak.", "Das Bild darf höchstens 30 MB groß sein.");
  const listingId = value(data, "listingId");
  if (editing && !/^[1-9]\d*$/.test(listingId)) return fail("E’lon topilmadi.", "Anzeige nicht gefunden.");
  let createdId: string;
  try {
    const payload = {
    authorUserId: user.user.id, kind: kind as TravelListingKind,
    contentLanguage: locale as "uz" | "de", title, description, womenOnly, transportMode: mode as TravelTransportMode,
    originCountryCode, originRegionCode: optional(originRegionCode), originCity, destinationCountryCode, destinationRegionCode: optional(destinationRegionCode), destinationCity,
    departureAt, departureTimezone, arrivalAt, flightNumber: optional(flightNumber),
    transitDetails: optional(transitDetails), seatsAvailable: kind === "ride_offer" ? seats : null,
    passengerCount: kind === "ride_request" ? Number(passengerRaw) : null,
    assistanceDetails: companion ? helpTypes.join(", ") : optional(assistanceDetails), parcelDetails: optional(parcelDetails),
    parcelStructured: parcel ? { cargoType: cargoType as ParcelDetails["cargoType"], paymentType: paymentType as ParcelDetails["paymentType"], flexibleDate: flexibleDateRaw === "on", weightKg: weightRaw ? Number(weightRaw) : null, dimensions: optional(dimensions), handover: optional(handover) } : null,
    companionDetails: companion ? {
      relationship: kind === "companion_request" ? travelerRelationship as CompanionDetails["relationship"] : null,
      originAirport: optional(originAirport), destinationAirport: optional(destinationAirport),
      flightType: flightType as CompanionDetails["flightType"],
      transitAirports: flightType === "transit" ? transitAirports : [],
      departureTimeKnown, arrivalAt, airline: optional(airline), helpTypes: helpTypes as CompanionDetails["helpTypes"],
    } : null,
    priceAmount: optional(priceRaw), priceCurrency: priceRaw ? priceCurrency : null,
    };
    if (editing) {
      const updated = await updateOwnTravelListing(listingId, user.user.id, payload);
      if (!updated) return fail("E’lon topilmadi yoki uni tahrirlab bo‘lmaydi.", "Anzeige nicht gefunden oder nicht bearbeitbar.");
      createdId = listingId;
    } else {
      createdId = await createTravelDraft(payload);
    }
  } catch (error) {
    console.error("Travel draft creation failed", error);
    return fail("E’lonni saqlab bo‘lmadi. Qayta urinib ko‘ring.", "Die Anzeige konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.");
  }
  const photo = data.get("travelImage");
  if (photo instanceof File && photo.size > 0) {
    try { await replaceOwnTravelImage(createdId, user.user.id, photo); }
    catch (error) {
      console.error("Travel image upload failed", error);
      return { error: locale === "de" ? "Anzeige gespeichert, aber das Bild konnte nicht verarbeitet werden. Prüfen Sie das Bildformat (HEIC-Unterstützung ist serverabhängig) und bearbeiten Sie die Anzeige erneut." : "E’lon saqlandi, ammo rasm yuklanmadi. Rasm formatini tekshirib, e’lonni qayta tahrirlang (HEIC serverga bog‘liq).", createdId: undefined };
    }
  }
  revalidatePath(`/${locale}/safar`);
  revalidatePath(`/${locale}/travel`);
  revalidatePath(`/${locale}/travel/mine`);
  revalidatePath(`/${locale}/safar/mine`);
  return { error: null, createdId };
}
