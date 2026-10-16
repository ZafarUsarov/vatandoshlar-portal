import type { MarketCategory } from "@/lib/market/market-category";
import type { MarketContact } from "@/lib/market/market-contact";
import { getDb } from "@/lib/db";

export type MarketListingSort = "newest" | "oldest" | "price_asc" | "price_desc";
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
  priceType: "fixed" | "negotiable";
  currency: "EUR";
  publishedAt: string;
  locationId: string;
  cityName: string;
  stateName: string;
}> & MarketContact;

export type MarketListingWithCover = MarketListing & Readonly<{
  coverImageId: string | null;
  viewCount?: number;
  sellerRatingAverage?: number | null;
  sellerRatingCount?: number;
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
  price_type: "fixed" | "negotiable";
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
    priceType: row.price_type,
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
         m.content_language, m.price_amount::text, m.price_type, m.currency,
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
  sort?: MarketListingSort;
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

  const sort = filters.sort ?? "newest";
  const orderBy = {
    newest: "m.published_at DESC, m.id DESC",
    oldest: "m.published_at ASC, m.id ASC",
    price_asc: "m.price_amount ASC NULLS LAST, m.published_at DESC, m.id DESC",
    price_desc: "m.price_amount DESC NULLS LAST, m.published_at DESC, m.id DESC",
  }[sort] ?? "m.published_at DESC, m.id DESC";
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
           m.content_language, m.price_amount::text, m.price_type, m.currency,
           m.published_at, m.location_id::text, l.city_name, l.state_name,
           NULL::text AS contact_telegram, NULL::text AS contact_whatsapp,
           NULL::text AS contact_phone, NULL::text AS contact_email,
           (SELECT i.id::text
            FROM market_listing_images i
            WHERE i.listing_id = m.id AND i.status = 'ready'
            ORDER BY i.position ASC, i.id ASC
            LIMIT 1) AS cover_image_id,
           (SELECT COUNT(*)::text FROM market_listing_views v WHERE v.listing_id = m.id) AS view_count,
           (SELECT ROUND(AVG(r.rating)::numeric, 1)::text
            FROM market_seller_ratings r WHERE r.seller_user_id = m.author_user_id) AS seller_rating_average,
           (SELECT COUNT(*)::text
            FROM market_seller_ratings r WHERE r.seller_user_id = m.author_user_id) AS seller_rating_count
    FROM market_listings m
    JOIN locations l ON l.id = m.location_id
    WHERE m.status = 'published' AND m.published_at IS NOT NULL
    AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND l.status = 'active' AND l.country_code = 'DE'
      AND l.location_type = 'city'
  `;

  const result = await db.query<ListingRow & { cover_image_id: string | null; view_count: string; seller_rating_average: string | null; seller_rating_count: string }>(`
    ${selectWithCover}
    ${where}
    ORDER BY ${orderBy}
    LIMIT $5 OFFSET $6
  `, [...params, pageSize, (page - 1) * pageSize]);

  return {
    listings: result.rows.map(row => ({ ...mapListing(row), coverImageId: row.cover_image_id, viewCount: Number(row.view_count), sellerRatingAverage: row.seller_rating_average === null ? null : Number(row.seller_rating_average), sellerRatingCount: Number(row.seller_rating_count) })),
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


export type MarketSeller = Readonly<{ userId: string; displayName: string | null; joinedAt: string }>;

/** Only public profile data; never expose login email or private account fields. */
export async function getMarketSellerForPublishedListing(listingId: string): Promise<MarketSeller | null> {
  const result = await getDb().query<{ user_id: string; display_name: string | null; joined_at: Date | string }>(`
    SELECT u.id::text AS user_id, NULLIF(BTRIM(p.display_name), '') AS display_name, u.created_at AS joined_at
    FROM market_listings m
    JOIN public_users u ON u.id = m.author_user_id
    LEFT JOIN user_profiles p ON p.user_id = u.id
    WHERE m.id = $1::bigint AND m.status = 'published'
      AND m.published_at IS NOT NULL
      AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND u.account_status = 'active'
    LIMIT 1
  `, [listingId]);
  const row = result.rows[0];
  if (!row) return null;
  return { userId: row.user_id, displayName: row.display_name, joinedAt: row.joined_at instanceof Date ? row.joined_at.toISOString() : row.joined_at };
}

/** Related public listings, excluding the current item. */
export async function getRelatedMarketListings(listingId: string, category: MarketCategory, limit = 4): Promise<ReadonlyArray<MarketListingWithCover>> {
  const result = await getDb().query<ListingRow & { cover_image_id: string | null; view_count: string }>(`
    SELECT m.id::text, m.slug, m.listing_type, m.category, m.title, m.description,
           m.content_language, m.price_amount::text, m.price_type, m.currency, m.published_at,
           m.location_id::text, l.city_name, l.state_name,
           NULL::text AS contact_telegram, NULL::text AS contact_whatsapp,
           NULL::text AS contact_phone, NULL::text AS contact_email,
           (SELECT i.id::text FROM market_listing_images i WHERE i.listing_id = m.id AND i.status = 'ready'
            ORDER BY i.position, i.id LIMIT 1) AS cover_image_id,
           (SELECT COUNT(*)::text FROM market_listing_views v WHERE v.listing_id = m.id) AS view_count
    FROM market_listings m JOIN locations l ON l.id = m.location_id
    WHERE m.id <> $1::bigint AND m.category = $2 AND m.status = 'published'
      AND m.published_at IS NOT NULL AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND l.status = 'active' AND l.country_code = 'DE' AND l.location_type = 'city'
    ORDER BY m.published_at DESC, m.id DESC LIMIT $3
  `, [listingId, category, Math.min(8, Math.max(1, limit))]);
  return result.rows.map(row => ({ ...mapListing(row), coverImageId: row.cover_image_id, viewCount: Number(row.view_count) }));
}

/** Seller profile is intentionally restricted to active accounts and public listings. */
export async function getPublicMarketSeller(userId: string) {
  if (!/^[1-9]\d{0,17}$/.test(userId)) return null;
  const result = await getDb().query<{ user_id: string; display_name: string | null; joined_at: Date | string; total: string }>(`
    SELECT u.id::text AS user_id, NULLIF(BTRIM(p.display_name), '') AS display_name,
           u.created_at AS joined_at, COUNT(m.id)::text AS total
    FROM public_users u
    LEFT JOIN user_profiles p ON p.user_id = u.id
    JOIN market_listings m ON m.author_user_id = u.id AND m.status = 'published'
      AND m.published_at IS NOT NULL AND (m.expires_at IS NULL OR m.expires_at > NOW())
    JOIN locations l ON l.id = m.location_id AND l.status = 'active'
      AND l.country_code = 'DE' AND l.location_type = 'city'
    WHERE u.id = $1::bigint AND u.account_status = 'active'
    GROUP BY u.id, p.display_name
  `, [userId]);
  const row = result.rows[0];
  return row ? { userId: row.user_id, displayName: row.display_name,
    joinedAt: row.joined_at instanceof Date ? row.joined_at.toISOString() : row.joined_at,
    total: Number(row.total) } : null;
}

export async function getPublicMarketSellerListings(userId: string, page = 1) {
  const current = Math.min(10000, Math.max(1, Math.floor(page) || 1));
  const result = await getDb().query<ListingRow & { cover_image_id: string | null }>(`
    SELECT m.id::text, m.slug, m.listing_type, m.category, m.title, m.description,
      m.content_language, m.price_amount::text, m.price_type, m.currency, m.published_at,
      m.location_id::text, l.city_name, l.state_name,
      NULL::text AS contact_telegram, NULL::text AS contact_whatsapp,
      NULL::text AS contact_phone, NULL::text AS contact_email,
      (SELECT i.id::text FROM market_listing_images i WHERE i.listing_id = m.id
       AND i.status = 'ready' ORDER BY i.position, i.id LIMIT 1) AS cover_image_id
    FROM market_listings m JOIN public_users u ON u.id = m.author_user_id
    JOIN locations l ON l.id = m.location_id
    WHERE m.author_user_id = $1::bigint AND u.account_status = 'active'
      AND m.status = 'published' AND m.published_at IS NOT NULL
      AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND l.status = 'active' AND l.country_code = 'DE' AND l.location_type = 'city'
    ORDER BY m.published_at DESC, m.id DESC LIMIT 12 OFFSET $2
  `, [userId, (current - 1) * 12]);
  return result.rows.map(row => ({ ...mapListing(row), coverImageId: row.cover_image_id }));
}

export async function getMarketListingViewCount(listingId: string): Promise<number> {
  const result = await getDb().query<{ total: string }>(`
    SELECT COUNT(*)::text AS total FROM market_listing_views WHERE listing_id = $1::bigint
  `, [listingId]);
  return Number(result.rows[0]?.total ?? 0);
}
