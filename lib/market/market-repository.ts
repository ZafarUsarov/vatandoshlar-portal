import { getDb } from "@/lib/db";

export type MarketListingType = "sell" | "buy" | "giveaway";
export type MarketListing = Readonly<{
  id: string;
  slug: string;
  listingType: MarketListingType;
  title: string;
  description: string;
  contentLanguage: "uz" | "de";
  priceAmount: string | null;
  currency: "EUR";
  publishedAt: string;
  locationId: string;
  cityName: string;
  stateName: string;
}>;

type ListingRow = {
  id: string;
  slug: string;
  listing_type: MarketListingType;
  title: string;
  description: string;
  content_language: "uz" | "de";
  price_amount: string | null;
  currency: "EUR";
  published_at: Date | string;
  location_id: string;
  city_name: string;
  state_name: string;
};

function mapListing(row: ListingRow): MarketListing {
  return {
    id: row.id,
    slug: row.slug,
    listingType: row.listing_type,
    title: row.title,
    description: row.description,
    contentLanguage: row.content_language,
    priceAmount: row.price_amount,
    currency: row.currency,
    publishedAt: row.published_at instanceof Date ? row.published_at.toISOString() : row.published_at,
    locationId: row.location_id,
    cityName: row.city_name,
    stateName: row.state_name,
  };
}

const select = `
  SELECT m.id::text, m.slug, m.listing_type, m.title, m.description,
         m.content_language, m.price_amount::text, m.currency,
         m.published_at, m.location_id::text, l.city_name, l.state_name
  FROM market_listings m
  JOIN locations l ON l.id = m.location_id
  WHERE m.status = 'published' AND m.published_at IS NOT NULL
    AND l.status = 'active' AND l.country_code = 'DE'
    AND l.location_type = 'city'
`;

export async function getPublishedMarketListings(filters: {
  type?: MarketListingType;
  locationId?: string;
} = {}): Promise<ReadonlyArray<MarketListing>> {
  const result = await getDb().query<ListingRow>(`
    ${select}
    AND ($1::text IS NULL OR m.listing_type = $1)
    AND ($2::bigint IS NULL OR m.location_id = $2::bigint)
    ORDER BY m.published_at DESC, m.id DESC
    LIMIT 60
  `, [filters.type ?? null, filters.locationId ?? null]);
  return result.rows.map(mapListing);
}

export async function getPublishedMarketListingBySlug(slug: string): Promise<MarketListing | null> {
  const result = await getDb().query<ListingRow>(`
    ${select} AND m.slug = $1 LIMIT 1
  `, [slug]);
  return result.rows[0] ? mapListing(result.rows[0]) : null;
}
