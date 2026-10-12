import { getDb } from "@/lib/db";

const validId = (id: string) => /^[1-9]\d{0,18}$/.test(id);

/** Atomically reorder ALL images (including pending) for an editable owned listing. */
export async function reorderOwnMarketImages(input: {
  listingId: string;
  authorUserId: string;
  imageIds: string[];
}): Promise<"ok" | "invalid" | "not_found" | "conflict"> {
  const { listingId, authorUserId, imageIds } = input;
  if (!validId(listingId) || !validId(authorUserId) || imageIds.length > 5 ||
      imageIds.some(id => !validId(id)) || new Set(imageIds).size !== imageIds.length) return "invalid";

  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const owner = await client.query(`SELECT id FROM market_listings
      WHERE id = $1::bigint AND author_user_id = $2::bigint
        AND status IN ('draft', 'published') FOR UPDATE`, [listingId, authorUserId]);
    if (owner.rowCount !== 1) { await client.query("ROLLBACK"); return "not_found"; }

    const rows = await client.query<{ id: string }>(`SELECT id::text FROM market_listing_images
      WHERE listing_id = $1::bigint ORDER BY position FOR UPDATE`, [listingId]);
    if (rows.rows.length !== imageIds.length ||
        rows.rows.some(row => !imageIds.includes(row.id))) {
      await client.query("ROLLBACK");
      return "conflict";
    }

    await client.query("SET CONSTRAINTS market_listing_images_position_unique DEFERRED");
    for (let position = 0; position < imageIds.length; position++) {
      await client.query(`UPDATE market_listing_images SET position = $1, updated_at = NOW()
        WHERE listing_id = $2::bigint AND id = $3::bigint`, [position, listingId, imageIds[position]]);
    }
    await client.query("COMMIT");
    return "ok";
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
