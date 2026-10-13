import { getDb } from "@/lib/db";
import type { MarketImageRecord } from "@/lib/market/market-image-repository";

type Row = { id: string; listing_id: string; storage_key: string; content_type: string; byte_size: number; position: number; status: "pending" | "ready" };
const idOk = (id: string) => /^[1-9]\d{0,18}$/.test(id);
const toRecord = (r: Row): MarketImageRecord => ({ id: r.id, listingId: r.listing_id, storageKey: r.storage_key, contentType: r.content_type, byteSize: r.byte_size, position: r.position, status: r.status });
export async function findMarketImage(imageId: string, userId?: string) {
  if (!idOk(imageId)) return null;
  const result = await getDb().query<Row>(`SELECT i.id::text, i.listing_id::text, i.storage_key, i.content_type, i.byte_size, i.position, i.status
    FROM market_listing_images i JOIN market_listings m ON m.id = i.listing_id
    WHERE i.id = $1::bigint AND ($2::text IS NULL AND i.status = 'ready' AND m.status = 'published'
      AND (m.expires_at IS NULL OR m.expires_at > NOW())
      OR $2::text IS NOT NULL AND m.author_user_id::text = $2 AND m.status IN ('draft','published'))`, [imageId, userId ?? null]);
  return result.rows[0] ? toRecord(result.rows[0]) : null;
}
export async function deleteOwnMarketImageRow(imageId: string, listingId: string, userId: string) {
  if (![imageId, listingId, userId].every(idOk)) return false;
  const result = await getDb().query(`DELETE FROM market_listing_images i WHERE i.id = $1::bigint AND i.listing_id = $2::bigint
    AND EXISTS (SELECT 1 FROM market_listings m WHERE m.id = i.listing_id AND m.author_user_id = $3::bigint AND m.status IN ('draft','published')) RETURNING i.id`, [imageId, listingId, userId]);
  return result.rowCount === 1;
}
