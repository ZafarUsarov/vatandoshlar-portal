import { getDb } from "@/lib/db";
import { validateMarketImageMetadata } from "@/lib/market/market-image-policy";

export type MarketImageRecord = Readonly<{
  id: string;
  listingId: string;
  storageKey: string;
  contentType: string;
  byteSize: number;
  position: number;
  status: "pending" | "ready";
}>;

type ImageRow = {
  id: string; listing_id: string; storage_key: string; content_type: string;
  byte_size: number; position: number; status: "pending" | "ready";
};
const select = `SELECT id::text, listing_id::text, storage_key, content_type, byte_size, position, status
                FROM market_listing_images`;
const map = (row: ImageRow): MarketImageRecord => ({
  id: row.id, listingId: row.listing_id, storageKey: row.storage_key,
  contentType: row.content_type, byteSize: row.byte_size, position: row.position, status: row.status,
});
const validId = (id: string) => /^[1-9]\d{0,18}$/.test(id);

/** Public metadata only: pending uploads are never returned. */
export async function getReadyMarketImagesForPublishedListing(listingId: string): Promise<ReadonlyArray<MarketImageRecord>> {
  if (!validId(listingId)) return [];
  const result = await getDb().query<ImageRow>(`${select}
    WHERE listing_id = $1::bigint AND status = 'ready'
      AND EXISTS (SELECT 1 FROM market_listings m WHERE m.id = listing_id AND m.status = 'published'
        AND (m.expires_at IS NULL OR m.expires_at > NOW()))
    ORDER BY position ASC`, [listingId]);
  return result.rows.map(map);
}

/** Owner-only metadata for editing draft or published listings. */
export async function getOwnEditableMarketImages(listingId: string, authorUserId: string): Promise<ReadonlyArray<MarketImageRecord>> {
  if (!validId(listingId) || !validId(authorUserId)) return [];
  const result = await getDb().query<ImageRow>(`${select}
    WHERE listing_id = $1::bigint AND EXISTS (
      SELECT 1 FROM market_listings m WHERE m.id = listing_id
        AND m.author_user_id = $2::bigint AND m.status IN ('draft', 'published'))
    ORDER BY position ASC`, [listingId, authorUserId]);
  return result.rows.map(map);
}

/**
 * Reserve metadata before issuing a signed PUT. The storage key must be a server-generated UUID path.
 * DB trigger enforces a hard 5-image limit even under concurrent requests.
 * Caller must delete pending metadata on presign failure; a scheduled orphan cleanup is needed.
 */
export async function reserveOwnMarketImage(input: {
  listingId: string; authorUserId: string; storageKey: string;
  contentType: string; byteSize: number;
}): Promise<MarketImageRecord | null> {
  if (!validId(input.listingId) || !validId(input.authorUserId)) return null;
  const metadata = validateMarketImageMetadata({ contentType: input.contentType, byteSize: input.byteSize });
  if (!metadata.ok) return null;
  if (!/^market\/[1-9]\d{0,18}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpg|png|webp)$/.test(input.storageKey)) return null;
  if (!input.storageKey.startsWith(`market/${input.listingId}/`)) return null;
  const result = await getDb().query<ImageRow>(`WITH owner AS (
      SELECT id FROM market_listings WHERE id = $1::bigint AND author_user_id = $2::bigint
        AND status IN ('draft', 'published')
    ), slot AS (
      SELECT s.position FROM generate_series(0, 4) AS s(position)
      WHERE NOT EXISTS (SELECT 1 FROM market_listing_images i WHERE i.listing_id = $1::bigint AND i.position = s.position)
      ORDER BY s.position LIMIT 1
    )
    INSERT INTO market_listing_images (listing_id, storage_key, content_type, byte_size, position)
    SELECT owner.id, $3, $4, $5, slot.position FROM owner CROSS JOIN slot
    RETURNING id::text, listing_id::text, storage_key, content_type, byte_size, position, status`,
  [input.listingId, input.authorUserId, input.storageKey, metadata.contentType, metadata.byteSize]);
  return result.rows[0] ? map(result.rows[0]) : null;
}

/** Mark ready only after server-side R2 HEAD + byte signature validation. */
export async function markOwnMarketImageReady(input: {
  imageId: string; listingId: string; authorUserId: string; storageKey: string;
}): Promise<boolean> {
  if (![input.imageId, input.listingId, input.authorUserId].every(validId)) return false;
  const result = await getDb().query(`UPDATE market_listing_images i SET status = 'ready', updated_at = NOW()
    WHERE i.id = $1::bigint AND i.listing_id = $2::bigint AND i.storage_key = $4
      AND i.status = 'pending' AND EXISTS (
        SELECT 1 FROM market_listings m WHERE m.id = i.listing_id
          AND m.author_user_id = $3::bigint AND m.status IN ('draft', 'published'))
    RETURNING i.id`, [input.imageId, input.listingId, input.authorUserId, input.storageKey]);
  return result.rowCount === 1;
}
