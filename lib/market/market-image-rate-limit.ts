import { getDb } from "@/lib/db";

/** Atomic per-user fixed-window quota; safe across multiple Railway instances. */
export async function consumeMarketImageUploadQuota(userId: string): Promise<boolean> {
  if (!/^[1-9]\d{0,18}$/.test(userId)) return false;
  const result = await getDb().query<{ request_count: number }>(`
    INSERT INTO market_image_upload_rate_limits (user_id, window_start, request_count)
    VALUES ($1::bigint, date_trunc('hour', NOW()), 1)
    ON CONFLICT (user_id, window_start)
    DO UPDATE SET request_count = market_image_upload_rate_limits.request_count + 1
      WHERE market_image_upload_rate_limits.request_count < 20
    RETURNING request_count`, [userId]);
  return result.rowCount === 1;
}
