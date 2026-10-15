import type { MarketCategory } from "@/lib/market/market-category";
import { getDb } from "@/lib/db";
import type { MarketContact } from "@/lib/market/market-contact";
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
  category: MarketCategory;
  title: string;
  description: string;
  contentLanguage: "uz" | "de";
  priceAmount: string | null;
  contact: MarketContact;
}): Promise<string> {
  const result = await getDb().query<{ id: string }>(
    `INSERT INTO market_listings (
      author_user_id, location_id, slug, listing_type, title,
      description, content_language, price_amount, currency, status,
      contact_telegram, contact_whatsapp, contact_phone, contact_email, category
    )
    SELECT $1::bigint, l.id, $2, $3, $4, $5, $6, $7::numeric, 'EUR', 'draft', $9, $10, $11, $12, $13
    FROM locations l
    WHERE l.id = $8::bigint AND l.status = 'active'
      AND l.country_code = 'DE' AND l.location_type = 'city'
    RETURNING id::text`,
    [input.authorUserId, input.slug, input.listingType, input.title,
      input.description, input.contentLanguage, input.priceAmount, input.locationId,
      input.contact.telegram || null, input.contact.whatsapp || null, input.contact.phone || null, input.contact.email || null, input.category],
  );
  if (result.rowCount !== 1) {
    throw new Error("Selected city is unavailable.");
  }
  return result.rows[0].id;
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
         published_at = CASE WHEN $4 = 'published' THEN NOW() ELSE published_at END,
         expires_at = CASE
           WHEN $4 = 'published' THEN NOW() + CASE
             WHEN m.plan_type = 'pro' THEN INTERVAL '60 days'
             ELSE INTERVAL '21 days'
           END
           ELSE m.expires_at
         END
     WHERE m.id = $1::bigint AND m.author_user_id = $2::bigint
       AND m.status = $3
       AND (m.contact_telegram IS NOT NULL OR m.contact_whatsapp IS NOT NULL
         OR m.contact_phone IS NOT NULL OR m.contact_email IS NOT NULL OR $4 <> 'published')
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
  id: string; listingType: MarketListingType; category: MarketCategory; locationId: string;
  title: string; description: string; priceAmount: string;
  contentLanguage: "uz" | "de";
  status: "draft" | "published";
}> & MarketContact;

export async function getEditableOwnMarketListing(id: string, userId: string): Promise<EditableMarketListing | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const result = await getDb().query<{
    id: string; listing_type: MarketListingType; category: MarketCategory; location_id: string;
    title: string; description: string; price_amount: string | null;
    content_language: "uz" | "de";
    status: "draft" | "published";
    contact_telegram: string | null; contact_whatsapp: string | null; contact_phone: string | null; contact_email: string | null;
  }>(`SELECT id::text, listing_type, category, location_id::text, title, description,
            price_amount::text, content_language, status, contact_telegram, contact_whatsapp, contact_phone, contact_email FROM market_listings
      WHERE id = $1::bigint AND author_user_id = $2::bigint
        AND status IN ('draft', 'published')`, [id, userId]);
  const row = result.rows[0];
  return row ? { id: row.id, listingType: row.listing_type, category: row.category,
    locationId: row.location_id, title: row.title, description: row.description,
    priceAmount: row.price_amount ?? "", contentLanguage: row.content_language, status: row.status,
    telegram: row.contact_telegram ?? "", whatsapp: row.contact_whatsapp ?? "",
    phone: row.contact_phone ?? "", email: row.contact_email ?? "" } : null;
}

export async function updateOwnMarketListing(input: {
  id: string; authorUserId: string; listingType: MarketListingType; category: MarketCategory;
  locationId: string; title: string; description: string; priceAmount: string | null;
  contentLanguage: "uz" | "de";
  contact: MarketContact;
}): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(input.id) || !/^[1-9]\d*$/.test(input.authorUserId) ||
      !/^[1-9]\d*$/.test(input.locationId) || !["uz", "de"].includes(input.contentLanguage)) return false;

  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const original = await client.query<{
      title: string; description: string; content_language: "uz" | "de";
    }>(`SELECT title, description, content_language FROM market_listings
       WHERE id = $1::bigint AND author_user_id = $2::bigint
         AND status IN ('draft', 'published') FOR UPDATE`, [input.id, input.authorUserId]);
    if (original.rowCount !== 1) {
      await client.query("ROLLBACK");
      return false;
    }

    const previous = original.rows[0];
    const contentChanged = previous.title !== input.title ||
      previous.description !== input.description ||
      previous.content_language !== input.contentLanguage;

    const result = await client.query(`UPDATE market_listings m
      SET listing_type = $3, location_id = $4::bigint, title = $5,
          description = $6, price_amount = $7::numeric,
          contact_telegram = $8, contact_whatsapp = $9, contact_phone = $10,
          contact_email = $11, category = $12, content_language = $13,
          updated_at = NOW()
      WHERE m.id = $1::bigint AND m.author_user_id = $2::bigint
        AND m.status IN ('draft', 'published')
        AND EXISTS (SELECT 1 FROM locations l WHERE l.id = $4::bigint
          AND l.country_code = 'DE' AND l.location_type = 'city' AND l.status = 'active')
      RETURNING m.id`, [input.id, input.authorUserId, input.listingType,
        input.locationId, input.title, input.description, input.priceAmount,
        input.contact.telegram || null, input.contact.whatsapp || null,
        input.contact.phone || null, input.contact.email || null,
        input.category, input.contentLanguage]);
    if (result.rowCount !== 1) {
      await client.query("ROLLBACK");
      return false;
    }

    if (contentChanged) {
      await client.query(`UPDATE market_listing_translations
        SET status = 'pending', title = NULL, description = NULL,
            source_updated_at = NULL, translated_at = NULL,
            error_message = NULL, updated_at = NOW()
        WHERE listing_id = $1::bigint`, [input.id]);
    }

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Soft-delete a listing owned by the authenticated user.
 * The row is retained for auditability and to preserve dependent records.
 */
export async function removeOwnMarketListing(input: {
  listingId: string;
  authorUserId: string;
}): Promise<boolean> {
  if (!/^[1-9]\\d*$/.test(input.listingId) || !/^[1-9]\\d*$/.test(input.authorUserId)) return false;

  const result = await getDb().query(
    `UPDATE market_listings
     SET status = 'removed', updated_at = NOW()
     WHERE id = $1::bigint
       AND author_user_id = $2::bigint
       AND status IN ('draft', 'published', 'closed')
     RETURNING id`,
    [input.listingId, input.authorUserId],
  );
  return result.rowCount === 1;
}
