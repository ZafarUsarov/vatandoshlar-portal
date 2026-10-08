import { getDb } from "@/lib/db";
import type { MarketListingType } from "@/lib/market/market-repository";

export type OwnMarketListing = Readonly<{
  id: string;
  slug: string;
  title: string;
  listingType: MarketListingType;
  status: "draft" | "published" | "hidden" | "closed" | "removed";
  cityName: string;
  createdAt: string;
}>;

export async function createMarketDraft(input: {
  authorUserId: string;
  locationId: string;
  slug: string;
  listingType: MarketListingType;
  title: string;
  description: string;
  contentLanguage: "uz" | "de";
  priceAmount: string | null;
}): Promise<void> {
  const result = await getDb().query(
    `INSERT INTO market_listings (
      author_user_id, location_id, slug, listing_type, title,
      description, content_language, price_amount, currency, status
    )
    SELECT $1::bigint, l.id, $2, $3, $4, $5, $6, $7::numeric, 'EUR', 'draft'
    FROM locations l
    WHERE l.id = $8::bigint AND l.status = 'active'
      AND l.country_code = 'DE' AND l.location_type = 'city'
    RETURNING id`,
    [input.authorUserId, input.slug, input.listingType, input.title,
      input.description, input.contentLanguage, input.priceAmount, input.locationId],
  );
  if (result.rowCount !== 1) {
    throw new Error("Selected city is unavailable.");
  }
}

export async function getOwnMarketListings(userId: string): Promise<ReadonlyArray<OwnMarketListing>> {
  const result = await getDb().query<{
    id: string; slug: string; title: string; listing_type: MarketListingType;
    status: OwnMarketListing["status"]; city_name: string; created_at: Date | string;
  }>(
    `SELECT m.id::text, m.slug, m.title, m.listing_type, m.status,
            l.city_name, m.created_at
     FROM market_listings m
     JOIN locations l ON l.id = m.location_id
     WHERE m.author_user_id = $1::bigint
     ORDER BY m.created_at DESC, m.id DESC LIMIT 100`,
    [userId],
  );
  return result.rows.map((row) => ({
    id: row.id, slug: row.slug, title: row.title,
    listingType: row.listing_type, status: row.status,
    cityName: row.city_name,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  }));
}
