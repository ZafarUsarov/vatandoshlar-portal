import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db";
import type { TravelListing, TravelListingKind, TravelTransportMode } from "@/types/travel";

export type TravelDraftInput = Readonly<{
  authorUserId: string;
  kind: TravelListingKind;
  contentLanguage: "uz" | "de";
  title: string;
  description: string;
  transportMode: TravelTransportMode;
  originCountryCode: string;
  originCity: string;
  destinationCountryCode: string;
  destinationCity: string;
  departureAt: string;
  departureTimezone: string;
  arrivalAt: string | null;
  flightNumber: string | null;
  transitDetails: string | null;
  seatsAvailable: number | null;
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
    description: String(row.description), transportMode: row.transport_mode as TravelTransportMode,
    originCountryCode: String(row.origin_country_code).trim(), originCity: String(row.origin_city),
    destinationCountryCode: String(row.destination_country_code).trim(), destinationCity: String(row.destination_city),
    departureAt: toIso(row.departure_at)!, departureTimezone: String(row.departure_timezone),
    arrivalAt: toIso(row.arrival_at), flightNumber: row.flight_number as string | null,
    transitDetails: row.transit_details as string | null, seatsAvailable: row.seats_available as number | null,
    assistanceDetails: row.assistance_details as string | null, parcelDetails: row.parcel_details as string | null,
    priceAmount: row.price_amount as string | null, priceCurrency: row.price_currency as string | null,
    publishedAt: toIso(row.published_at), expiresAt: toIso(row.expires_at),
    createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!,
  };
}
const columns = `id::text, author_user_id::text, slug, kind, status, content_language,
  title, description, transport_mode, origin_country_code, origin_city,
  destination_country_code, destination_city, departure_at, departure_timezone,
  arrival_at, flight_number, transit_details, seats_available, assistance_details,
  parcel_details, price_amount::text, price_currency, published_at, expires_at,
  created_at, updated_at`;

export async function createTravelDraft(input: TravelDraftInput): Promise<string> {
  const slug = `safar-${randomUUID()}`;
  const result = await getDb().query<{ id: string }>(`
    INSERT INTO travel_listings (author_user_id, slug, kind, content_language, title,
      description, transport_mode, origin_country_code, origin_city,
      destination_country_code, destination_city, departure_at, departure_timezone,
      arrival_at, flight_number, transit_details, seats_available, assistance_details,
      parcel_details, price_amount, price_currency)
    VALUES ($1::bigint,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::timestamptz,$13,
      $14::timestamptz,$15,$16,$17,$18,$19,$20::numeric,$21)
    RETURNING id::text`, [input.authorUserId, slug, input.kind, input.contentLanguage,
      input.title, input.description, input.transportMode, input.originCountryCode,
      input.originCity, input.destinationCountryCode, input.destinationCity,
      input.departureAt, input.departureTimezone, input.arrivalAt, input.flightNumber,
      input.transitDetails, input.seatsAvailable, input.assistanceDetails,
      input.parcelDetails, input.priceAmount, input.priceCurrency]);
  return result.rows[0].id;
}

export async function getOwnTravelListings(authorUserId: string): Promise<TravelListing[]> {
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE author_user_id=$1::bigint AND status <> 'removed' ORDER BY created_at DESC LIMIT 100`, [authorUserId]);
  return result.rows.map(mapTravel);
}

export async function getPublishedTravelListings(filters: Readonly<{
  kind?: TravelListingKind; originCountryCode?: string; destinationCountryCode?: string;
  departureFrom?: string; departureTo?: string; limit?: number;
}> = {}): Promise<TravelListing[]> {
  const limit = Math.min(Math.max(filters.limit ?? 30, 1), 50);
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE status='published' AND departure_at >= NOW()
      AND (expires_at IS NULL OR expires_at > NOW())
      AND ($1::text IS NULL OR kind=$1)
      AND ($2::text IS NULL OR origin_country_code=$2)
      AND ($3::text IS NULL OR destination_country_code=$3)
      AND ($4::timestamptz IS NULL OR departure_at >= $4::timestamptz)
      AND ($5::timestamptz IS NULL OR departure_at < $5::timestamptz)
    ORDER BY departure_at ASC, id ASC LIMIT $6`, [filters.kind ?? null,
      filters.originCountryCode ?? null, filters.destinationCountryCode ?? null,
      filters.departureFrom ?? null, filters.departureTo ?? null, limit]);
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
      AND ($4 <> 'published' OR departure_at > NOW())
    RETURNING id::text`, [input.listingId, input.authorUserId, input.from, input.to]);
  return result.rows.length > 0;
}

export async function removeOwnTravelListing(listingId: string, authorUserId: string): Promise<boolean> {
  const result = await getDb().query<{ id: string }>(`UPDATE travel_listings
    SET status='removed', updated_at=NOW()
    WHERE id=$1::bigint AND author_user_id=$2::bigint AND status <> 'removed'
    RETURNING id::text`, [listingId, authorUserId]);
  return result.rows.length > 0;
}

export async function getPublishedTravelBySlug(slug: string): Promise<TravelListing | null> {
  if (!/^safar-[a-f0-9-]{36}$/.test(slug)) return null;
  const result = await getDb().query<TravelRow>(`SELECT ${columns} FROM travel_listings
    WHERE slug=$1 AND status='published' AND departure_at >= NOW()
      AND (expires_at IS NULL OR expires_at > NOW()) LIMIT 1`, [slug]);
  return result.rows[0] ? mapTravel(result.rows[0]) : null;
}
