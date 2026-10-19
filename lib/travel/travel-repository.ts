import { parseParcelDetails, type ParcelDetails } from "@/lib/travel/parcel-details";
import { parseCompanionDetails, type CompanionDetails } from "@/lib/travel/companion-details";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/db";
import { deleteMarketImageObject } from "@/lib/market/market-r2";
import type { TravelListing, TravelListingKind, TravelTransportMode } from "@/types/travel";

export type TravelDraftInput = Readonly<{
  authorUserId: string;
  kind: TravelListingKind;
  contentLanguage: "uz" | "de";
  title: string;
  description: string;
  womenOnly: boolean;
  transportMode: TravelTransportMode;
  originCountryCode: string;
  originCity: string;
  originRegionCode?: string | null;
  destinationRegionCode?: string | null;
  destinationCountryCode: string;
  destinationCity: string;
  departureAt: string;
  departureTimezone: string;
  arrivalAt: string | null;
  flightNumber: string | null;
  transitDetails: string | null;
  seatsAvailable: number | null;
  passengerCount: number | null;
  companionDetails: CompanionDetails | null;
  parcelStructured: ParcelDetails | null;
  assistanceDetails: string | null;
  parcelDetails: string | null;
  priceAmount: string | null;
  priceCurrency: string | null;
}>;

type TravelRow = Record<string, unknown>;
function toIso(value: unknown): string | null {
  return value instanceof Date ? value.toISOString() : typeof value === "string" ? value : null;
}
function mapTravel(row: TravelRow): TravelListing {
  return {
    id: String(row.id), authorUserId: String(row.author_user_id), slug: String(row.slug),
    kind: row.kind as TravelListingKind, status: row.status as TravelListing["status"],
    contentLanguage: row.content_language as "uz" | "de", title: String(row.title),
    description: String(row.description), womenOnly: row.women_only === true, transportMode: row.transport_mode as TravelTransportMode,
    originCountryCode: String(row.origin_country_code).trim(), originCity: String(row.origin_city),
    originRegionCode: row.origin_region_code as string | null, destinationRegionCode: row.destination_region_code as string | null,
    destinationCountryCode: String(row.destination_country_code).trim(), destinationCity: String(row.destination_city),
    departureAt: toIso(row.departure_at)!, departureTimezone: String(row.departure_timezone),
    arrivalAt: toIso(row.arrival_at), flightNumber: row.flight_number as string | null,
    transitDetails: row.transit_details as string | null, seatsAvailable: row.seats_available as number | null,
    passengerCount: row.passenger_count as number | null, companionDetails: parseCompanionDetails(row.companion_details), parcelStructured: parseParcelDetails(row.parcel_structured),
    assistanceDetails: row.assistance_details as string | null, parcelDetails: row.parcel_details as string | null,
    priceAmount: row.price_amount as string | null, priceCurrency: row.price_currency as string | null,
    imageKey: row.image_key as string | null, imageThumbKey: row.image_thumb_key as string | null,
    publishedAt: toIso(row.published_at), expiresAt: toIso(row.expires_at),
    createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!,
  };
}
const columns = `id::text, author_user_id::text, slug, kind, status, content_language,
  title, description, women_only, transport_mode, origin_country_code, origin_city, origin_region_code, destination_region_code,
  destination_country_code, destination_city, departure_at, departure_timezone,
  arrival_at, flight_number, transit_details, seats_available, passenger_count, companion_details, parcel_structured, assistance_details,
  parcel_details, price_amount::text, price_currency, published_at, expires_at,
  image_key, image_thumb_key, created_at, updated_at`;

/** Human-readable, stable URL. Random suffix prevents collisions even for identical trips. */
function travelSlug(input: TravelDraftInput): string {
  const segment = (value: string) => value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ß/g, "ss").replace(/æ/g, "ae").replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36).replace(/-+$/g, "") || "shahar";
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: input.departureTimezone, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date(input.departureAt)).replace(/\D/g, "");
  const suffix = randomBytes(8).toString("hex");
  return `${segment(input.originCity)}-${segment(input.destinationCity)}-${localDate}-${suffix}`;
}

const validTravelSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 180;

export async function createTravelDraft(input: TravelDraftInput): Promise<string> {
  const slug = travelSlug(input);
  const result = await getDb().query<{ id: string }>(`
    INSERT INTO travel_listings (author_user_id, slug, kind, content_language, title,
      description, transport_mode, origin_country_code, origin_city,
      destination_country_code, destination_city, departure_at, departure_timezone,
      arrival_at, flight_number, transit_details, seats_available, assistance_details,
      parcel_details, price_amount, price_currency, origin_region_code, destination_region_code, women_only, expires_at, passenger_count, companion_details, parcel_structured)
    VALUES ($1::bigint,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::timestamptz,$13,
      $14::timestamptz,$15,$16,$17,$18,$19,$20::numeric,$21,$22,$23,$24,
      (($12::timestamptz AT TIME ZONE $13)::date + INTERVAL '1 day') AT TIME ZONE $13, $25, $26::jsonb, $27::jsonb)
    RETURNING id::text`, [input.authorUserId, slug, input.kind, input.contentLanguage,
      input.title, input.description, input.transportMode, input.originCountryCode,
      input.originCity, input.destinationCountryCode, input.destinationCity,
      input.departureAt, input.departureTimezone, input.arrivalAt, input.flightNumber,
      input.transitDetails, input.seatsAvailable, input.assistanceDetails,
      input.parcelDetails, input.priceAmount, input.priceCurrency, input.originRegionCode ?? null, input.destinationRegionCode ?? null, input.womenOnly, input.passengerCount, input.companionDetails ? JSON.stringify(input.companionDetails) : null, input.parcelStructured ? JSON.stringify(input.parcelStructured) : null]);
  return result.rows[0].id;
}

export async function getOwnTravelListings(authorUserId: string): Promise<TravelListing[]> {
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE author_user_id=$1::bigint AND status <> 'removed' ORDER BY created_at DESC LIMIT 100`, [authorUserId]);
  return result.rows.map(mapTravel);
}

export async function getPublishedTravelListings(filters: Readonly<{
  kind?: TravelListingKind; service?: "ride" | "companion" | "parcel"; originCountryCode?: string; destinationCountryCode?: string;
  originRegionCode?: string; destinationRegionCode?: string;
  departureFrom?: string; departureTo?: string; departureDate?: string; womenOnly?: boolean; cargoType?: string; paymentType?: string; limit?: number;
}> = {}): Promise<TravelListing[]> {
  const limit = Math.min(Math.max(filters.limit ?? 30, 1), 50);
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE status='published' AND expires_at > NOW()
      AND ($1::text IS NULL OR kind=$1)
      AND ($9::text IS NULL OR kind LIKE ($9::text || '_%'))
      AND ($2::text IS NULL OR origin_country_code=$2)
      AND ($3::text IS NULL OR destination_country_code=$3)
      AND ($7::text IS NULL OR origin_region_code=$7)
      AND ($8::text IS NULL OR destination_region_code=$8)
      AND ($4::timestamptz IS NULL OR departure_at >= $4::timestamptz)
      AND ($5::timestamptz IS NULL OR departure_at < $5::timestamptz)
      AND ($11::boolean IS NULL OR women_only=$11)
      AND ($10::date IS NULL OR (departure_at AT TIME ZONE departure_timezone)::date = $10::date)
      AND ($12::text IS NULL OR (kind LIKE 'parcel_%' AND parcel_structured->>'cargoType'=$12))
      AND ($13::text IS NULL OR (kind LIKE 'parcel_%' AND (parcel_structured->>'paymentType'=$13 OR (parcel_structured IS NULL AND CASE WHEN price_amount=0 THEN 'free' WHEN price_amount>0 THEN 'paid' ELSE 'negotiable' END=$13))))
    ORDER BY departure_at ASC, id ASC LIMIT $6`, [filters.kind ?? null,
      filters.originCountryCode ?? null, filters.destinationCountryCode ?? null,
      filters.departureFrom ?? null, filters.departureTo ?? null, limit,
      filters.originRegionCode ?? null, filters.destinationRegionCode ?? null, filters.service ?? null, filters.departureDate ?? null, filters.womenOnly ?? null, filters.cargoType ?? null, filters.paymentType ?? null]);
  return result.rows.map(mapTravel);
}

export async function changeOwnTravelStatus(input: Readonly<{
  listingId: string; authorUserId: string; from: "draft" | "published";
  to: "published" | "closed";
}>): Promise<boolean> {
  const result = await getDb().query<{ id: string }>(`UPDATE travel_listings
    SET status=$4, published_at=CASE WHEN $4='published' THEN COALESCE(published_at,NOW()) ELSE published_at END,
        updated_at=NOW()
    WHERE id=$1::bigint AND author_user_id=$2::bigint AND status=$3
      AND ($4 <> 'published' OR (departure_at > NOW() AND expires_at > NOW()))
    RETURNING id::text`, [input.listingId, input.authorUserId, input.from, input.to]);
  return result.rows.length > 0;
}

export async function removeOwnTravelListing(listingId: string, authorUserId: string): Promise<boolean> {
  const result = await getDb().query<{ id: string; image_key: string | null; image_thumb_key: string | null }>(`
    WITH prior AS (SELECT id,image_key,image_thumb_key FROM travel_listings
      WHERE id=$1::bigint AND author_user_id=$2::bigint AND status <> 'removed'),
    updated AS (UPDATE travel_listings SET status='removed',image_key=NULL,image_thumb_key=NULL,updated_at=NOW()
      WHERE id IN (SELECT id FROM prior) RETURNING id)
    SELECT updated.id::text,prior.image_key,prior.image_thumb_key FROM updated JOIN prior ON prior.id=updated.id`, [listingId, authorUserId]);
  for (const key of [result.rows[0]?.image_key, result.rows[0]?.image_thumb_key]) {
    if (key) await deleteMarketImageObject(key).catch(error => console.error("Travel removed image cleanup failed", error));
  }
  return result.rows.length > 0;
}

export async function getPublishedTravelBySlug(slug: string): Promise<TravelListing | null> {
  if (!validTravelSlug(slug)) return null;
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE slug=$1 AND status='published' AND expires_at > NOW() LIMIT 1`, [slug]);
  return result.rows[0] ? mapTravel(result.rows[0]) : null;
}

/** Expired published listings are not searchable, but their old URLs can show a clear status. */
export async function getExpiredPublishedTravelBySlug(slug: string): Promise<boolean> {
  if (!validTravelSlug(slug)) return false;
  const result = await getDb().query<{ id: string }>(`
    SELECT id::text FROM travel_listings
    WHERE slug=$1 AND status='published' AND expires_at <= NOW() LIMIT 1`, [slug]);
  return result.rows.length > 0;
}

/** Owner-only update. Closed/removed listings cannot be edited. Published listings stay
 * published only while their new departure is still in the future. */
export async function getOwnTravelListingById(listingId: string, authorUserId: string): Promise<TravelListing | null> {
  if (!/^[1-9]\d*$/.test(listingId)) return null;
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE id=$1::bigint AND author_user_id=$2::bigint AND status IN ('draft','published') LIMIT 1`,
    [listingId, authorUserId]);
  return result.rows[0] ? mapTravel(result.rows[0]) : null;
}

export async function updateOwnTravelListing(listingId: string, authorUserId: string, input: TravelDraftInput): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(listingId)) return false;
  const result = await getDb().query<{ id: string }>(`UPDATE travel_listings SET
    kind=$3, content_language=$4, title=$5, description=$6, transport_mode=$7,
    origin_country_code=$8, origin_city=$9, destination_country_code=$10,
    destination_city=$11, departure_at=$12::timestamptz, departure_timezone=$13,
    arrival_at=$14::timestamptz, flight_number=$15, transit_details=$16,
    seats_available=$17, passenger_count=$25, companion_details=$26::jsonb, parcel_structured=$27::jsonb, assistance_details=$18, parcel_details=$19,
    price_amount=$20::numeric, price_currency=$21,
    origin_region_code=$22, destination_region_code=$23, women_only=$24,
    expires_at=(($12::timestamptz AT TIME ZONE $13)::date + INTERVAL '1 day') AT TIME ZONE $13,
    updated_at=NOW()
    WHERE id=$1::bigint AND author_user_id=$2::bigint AND status IN ('draft','published')
      AND $12::timestamptz > NOW()
    RETURNING id::text`, [listingId, authorUserId, input.kind, input.contentLanguage,
      input.title, input.description, input.transportMode, input.originCountryCode,
      input.originCity, input.destinationCountryCode, input.destinationCity,
      input.departureAt, input.departureTimezone, input.arrivalAt, input.flightNumber,
      input.transitDetails, input.seatsAvailable, input.assistanceDetails,
      input.parcelDetails, input.priceAmount, input.priceCurrency,
      input.originRegionCode ?? null, input.destinationRegionCode ?? null, input.womenOnly, input.passengerCount, input.companionDetails ? JSON.stringify(input.companionDetails) : null, input.parcelStructured ? JSON.stringify(input.parcelStructured) : null]);
  return result.rows.length > 0;
}
