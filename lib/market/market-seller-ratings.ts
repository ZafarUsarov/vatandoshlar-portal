import { getDb } from "@/lib/db";

const validId = (value: string) => /^[1-9]\d{0,17}$/.test(value);

export async function getMarketSellerRatingSummary(sellerId: string) {
  if (!validId(sellerId)) return { average: null as number | null, count: 0 };
  const result = await getDb().query<{ average: string | null; count: string }>(
    `SELECT ROUND(AVG(rating)::numeric, 1)::text AS average, COUNT(*)::text AS count
     FROM market_seller_ratings WHERE seller_user_id = $1::bigint`,
    [sellerId],
  );
  return { average: result.rows[0]?.average === null || !result.rows[0] ? null : Number(result.rows[0].average), count: Number(result.rows[0]?.count ?? 0) };
}

export async function getMyMarketSellerRating(sellerId: string, raterId: string): Promise<number | null> {
  if (!validId(sellerId) || !validId(raterId)) return null;
  const result = await getDb().query<{ rating: number }>(
    `SELECT rating FROM market_seller_ratings
     WHERE seller_user_id = $1::bigint AND rater_user_id = $2::bigint`,
    [sellerId, raterId],
  );
  return result.rows[0]?.rating ?? null;
}

export async function saveMarketSellerRating(sellerId: string, raterId: string, rating: number): Promise<boolean> {
  if (!validId(sellerId) || !validId(raterId) || sellerId === raterId ||
      !Number.isInteger(rating) || rating < 1 || rating > 5) return false;

  const result = await getDb().query(
    `INSERT INTO market_seller_ratings (seller_user_id, rater_user_id, rating)
     SELECT seller.id, rater.id, $3::smallint
     FROM public_users seller
     JOIN public_users rater ON rater.id = $2::bigint AND rater.account_status = 'active'
     WHERE seller.id = $1::bigint AND seller.account_status = 'active'
       AND seller.id <> rater.id
       AND EXISTS (
         SELECT 1 FROM market_listings m WHERE m.author_user_id = seller.id
           AND m.status = 'published' AND m.published_at IS NOT NULL
           AND (m.expires_at IS NULL OR m.expires_at > NOW())
       )
     ON CONFLICT (seller_user_id, rater_user_id)
     DO UPDATE SET rating = EXCLUDED.rating, updated_at = NOW()
     RETURNING seller_user_id`,
    [sellerId, raterId, rating],
  );
  return result.rowCount === 1;
}
