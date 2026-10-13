import type { MarketCategory } from "@/lib/market/market-category";
import type { MarketContact } from "@/lib/market/market-contact";
import { getDb } from "@/lib/db";

export type MarketListingType = "sell" | "buy" | "giveaway";
export type MarketListing = Readonly<{
  id: string;
  slug: string;
  listingType: MarketListingType;
  category: MarketCategory;
  title: string;
  description: string;
  contentLanguage: "uz" | "de";
  priceAmount: string | null;
  currency: "EUR";
  publishedAt: string;
  locationId: string;
  cityName: string;
  stateName: string;
}> & MarketContact;

export type MarketListingWithCover = MarketListing & Readonly<{
  coverImageId: string | null;
}>;

export type MarketListingPage = Readonly<{
  listings: ReadonlyArray<MarketListingWithCover>;
  total: number;
  page: number;
  totalPages: number;
}>;

type ListingRow = {
  id: string;
  slug: string;
  listing_type: MarketListingType;
  category: MarketCategory;
  title: string;
  description: string;
  content_language: "uz" | "de";
  price_amount: string | null;
  currency: "EUR";
  published_at: Date | string;
  location_id: string;
  city_name: string;
  state_name: string;
  contact_telegram: string | null; contact_whatsapp: string | null; contact_phone: string | null; contact_email: string | null;
};

function mapListing(row: ListingRow): MarketListing {
  return {
    id: row.id,
    slug: row.slug,
    listingType: row.listing_type,
    category: row.category,
    title: row.title,
    description: row.description,
    contentLanguage: row.content_language,
    priceAmount: row.price_amount,
    currency: row.currency,
    publishedAt: row.published_at instanceof Date ? row.published_at.toISOString() : row.published_at,
    locationId: row.location_id,
    cityName: row.city_name,
    stateName: row.state_name,
    telegram: row.contact_telegram ?? "", whatsapp: row.contact_whatsapp ?? "",
    phone: row.contact_phone ?? "", email: row.contact_email ?? "",
  };
}

const select = `
  SELECT m.id::text, m.slug, m.listing_type, m.category, m.title, m.description,
         m.content_language, m.price_amount::text, m.currency,
         m.published_at, m.location_id::text, l.city_name, l.state_name,
         m.contact_telegram, m.contact_whatsapp, m.contact_phone, m.contact_email
  FROM market_listings m
  JOIN locations l ON l.id = m.location_id
  WHERE m.status = 'published' AND m.published_at IS NOT NULL
    AND (m.expires_at IS NULL OR m.expires_at > NOW())
    AND l.status = 'active' AND l.country_code = 'DE'
    AND l.location_type = 'city'
`;

/** Public market catalogue: keyword search, cover image and 12 listings per page. */
export async function getPublishedMarketListings(filters: {
  type?: MarketListingType;
  category?: MarketCategory;
  locationId?: string;
  query?: string;
  page?: number;
} = {}): Promise<MarketListingPage> {
  const pageSize = 12;
  const requestedPage = typeof filters.page === "number" && Number.isSafeInteger(filters.page) && filters.page > 0
    ? Math.min(filters.page, 10000)
    : 1;
  const query = filters.query?.trim().slice(0, 100) || null;
  const params = [filters.type ?? null, filters.locationId ?? null, query, filters.category ?? null];

  const where = `
    AND ($1::text IS NULL OR m.listing_type = $1)
    AND ($2::bigint IS NULL OR m.location_id = $2::bigint)
    AND ($3::text IS NULL OR m.title ILIKE '%' || $3 || '%' OR m.description ILIKE '%' || $3 || '%')
    AND ($4::text IS NULL OR m.category = $4)
  `;

  const db = getDb();
  const countResult = await db.query<{ total: string }>(`
    SELECT COUNT(*)::text AS total
    FROM market_listings m
    JOIN locations l ON l.id = m.location_id
    WHERE m.status = 'published' AND m.published_at IS NOT NULL
    AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND l.status = 'active' AND l.country_code = 'DE'
      AND l.location_type = 'city'
      ${where}
  `, params);

  const total = Number(countResult.rows[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const selectWithCover = `
    SELECT m.id::text, m.slug, m.listing_type, m.category, m.title, m.description,
           m.content_language, m.price_amount::text, m.currency,
           m.published_at, m.location_id::text, l.city_name, l.state_name,
           NULL::text AS contact_telegram, NULL::text AS contact_whatsapp,
           NULL::text AS contact_phone, NULL::text AS contact_email,
           (SELECT i.id::text
            FROM market_listing_images i
            WHERE i.listing_id = m.id AND i.status = 'ready'
            ORDER BY i.position ASC, i.id ASC
            LIMIT 1) AS cover_image_id
    FROM market_listings m
    JOIN locations l ON l.id = m.location_id
    WHERE m.status = 'published' AND m.published_at IS NOT NULL
    AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND l.status = 'active' AND l.country_code = 'DE'
      AND l.location_type = 'city'
  `;

  const result = await db.query<ListingRow & { cover_image_id: string | null }>(`
    ${selectWithCover}
    ${where}
    ORDER BY m.published_at DESC, m.id DESC
    LIMIT $5 OFFSET $6
  `, [...params, pageSize, (page - 1) * pageSize]);

  return {
    listings: result.rows.map(row => ({ ...mapListing(row), coverImageId: row.cover_image_id })),
    total,
    page,
    totalPages,
  };
}

export async function getPublishedMarketListingBySlug(slug: string): Promise<MarketListing | null> {
  const result = await getDb().query<ListingRow>(`
    ${select} AND m.slug = $1 LIMIT 1
  `, [slug]);
  return result.rows[0] ? mapListing(result.rows[0]) : null;
}
