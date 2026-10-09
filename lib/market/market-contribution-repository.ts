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

export async function changeOwnMarketListingStatus(input: {
  listingId: string;
  authorUserId: string;
  from: "draft" | "published";
  to: "published" | "closed";
}): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(input.listingId) || !/^[1-9]\d*$/.test(input.authorUserId)) return false;
  if (!((input.from === "draft" && input.to === "published") ||
    (input.from === "published" && input.to === "closed"))) return false;
  const result = await getDb().query(
    `UPDATE market_listings m
     SET status = $4, updated_at = NOW(),
         published_at = CASE WHEN $4 = 'published' THEN NOW() ELSE published_at END
     WHERE m.id = $1::bigint AND m.author_user_id = $2::bigint
       AND m.status = $3
       AND EXISTS (
         SELECT 1 FROM locations l WHERE l.id = m.location_id
           AND l.status = 'active' AND l.country_code = 'DE'
           AND l.location_type = 'city'
       )
     RETURNING m.id`,
    [input.listingId, input.authorUserId, input.from, input.to],
  );
  return result.rowCount === 1;
}

export type EditableMarketListing = Readonly<{
  id: string; listingType: MarketListingType; locationId: string;
  title: string; description: string; priceAmount: string;
  status: "draft" | "published";
}>;

export async function getEditableOwnMarketListing(id: string, userId: string): Promise<EditableMarketListing | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const result = await getDb().query<{
    id: string; listing_type: MarketListingType; location_id: string;
    title: string; description: string; price_amount: string | null;
    status: "draft" | "published";
  }>(`SELECT id::text, listing_type, location_id::text, title, description,
            price_amount::text, status FROM market_listings
      WHERE id = $1::bigint AND author_user_id = $2::bigint
        AND status IN ('draft', 'published')`, [id, userId]);
  const row = result.rows[0];
  return row ? { id: row.id, listingType: row.listing_type,
    locationId: row.location_id, title: row.title, description: row.description,
    priceAmount: row.price_amount ?? "", status: row.status } : null;
}

export async function updateOwnMarketListing(input: {
  id: string; authorUserId: string; listingType: MarketListingType;
  locationId: string; title: string; description: string; priceAmount: string | null;
}): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(input.id) || !/^[1-9]\d*$/.test(input.locationId)) return false;
  const result = await getDb().query(`UPDATE market_listings m
    SET listing_type = $3, location_id = $4::bigint, title = $5,
        description = $6, price_amount = $7::numeric, updated_at = NOW()
    WHERE m.id = $1::bigint AND m.author_user_id = $2::bigint
      AND m.status IN ('draft', 'published')
      AND EXISTS (SELECT 1 FROM locations l WHERE l.id = $4::bigint
        AND l.country_code = 'DE' AND l.location_type = 'city' AND l.status = 'active')
    RETURNING m.id`, [input.id, input.authorUserId, input.listingType,
      input.locationId, input.title, input.description, input.priceAmount]);
  return result.rowCount === 1;
}
