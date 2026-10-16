import { getDb } from "@/lib/db";

export type MarketReportReason = "spam" | "abuse" | "misinformation" | "other";

export async function createMarketReport(input: {
  reporterUserId: string;
  listingId: string;
  slug: string;
  reason: MarketReportReason;
  details: string | null;
}): Promise<"created" | "duplicate" | "unavailable" | "own"> {
  const result = await getDb().query<{ outcome: string }>(
    `WITH eligible AS (
       SELECT m.id, m.author_user_id
       FROM market_listings m
       WHERE m.id = $2::bigint AND m.slug = $3 AND m.status = 'published'
         AND m.published_at IS NOT NULL
         AND (m.expires_at IS NULL OR m.expires_at > NOW())
     ), inserted AS (
       INSERT INTO content_reports (reporter_user_id, market_listing_id, reason, details)
       SELECT $1::bigint, e.id, $4, $5 FROM eligible e
       WHERE e.author_user_id <> $1::bigint
       ON CONFLICT DO NOTHING
       RETURNING id
     )
     SELECT CASE
       WHEN NOT EXISTS (SELECT 1 FROM eligible) THEN 'unavailable'
       WHEN EXISTS (SELECT 1 FROM eligible WHERE author_user_id = $1::bigint) THEN 'own'
       WHEN EXISTS (SELECT 1 FROM inserted) THEN 'created'
       ELSE 'duplicate'
     END AS outcome`,
    [input.reporterUserId, input.listingId, input.slug, input.reason, input.details],
  );
  return result.rows[0]?.outcome as "created" | "duplicate" | "unavailable" | "own";
}
