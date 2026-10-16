import { getDb } from "@/lib/db";

export type MarketModerationReport = {
  id: string; listingId: string; slug: string; title: string; description: string;
  listingStatus: "published" | "hidden" | "closed" | "removed" | "draft";
  reporterUserId: string; reason: "spam" | "abuse" | "misinformation" | "other";
  details: string | null; createdAt: string;
  reportStatus: "open" | "resolved"; resolvedAt: string | null;
};

export type MarketReportFilters = {
  status: "open" | "resolved" | "all";
  reason: "all" | MarketModerationReport["reason"];
};

export async function getMarketReports(filters: MarketReportFilters): Promise<MarketModerationReport[]> {
  const result = await getDb().query<{
    id: string; listing_id: string; slug: string; title: string; description: string;
    listing_status: MarketModerationReport["listingStatus"]; reporter_user_id: string;
    reason: MarketModerationReport["reason"]; details: string | null;
    report_status: MarketModerationReport["reportStatus"];
    created_at: Date | string; resolved_at: Date | string | null;
  }>(`SELECT r.id::text, m.id::text AS listing_id, m.slug, m.title, m.description,
          m.status AS listing_status, r.reporter_user_id::text, r.reason, r.details,
          r.status AS report_status, r.created_at, r.resolved_at
     FROM content_reports r JOIN market_listings m ON m.id = r.market_listing_id
     WHERE r.market_listing_id IS NOT NULL
       AND ($1::text = 'all' OR r.status = $1::text)
       AND ($2::text = 'all' OR r.reason = $2::text)
     ORDER BY r.created_at DESC, r.id DESC LIMIT 200`, [filters.status, filters.reason]);
  return result.rows.map(r => ({
    id: r.id, listingId: r.listing_id, slug: r.slug, title: r.title,
    description: r.description, listingStatus: r.listing_status,
    reporterUserId: r.reporter_user_id, reason: r.reason, details: r.details,
    reportStatus: r.report_status,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
    resolvedAt: r.resolved_at instanceof Date ? r.resolved_at.toISOString() : r.resolved_at,
  }));
}

export async function moderateMarketReport(input: {
  reportId: string; listingId: string; adminUserId: string; operation: "hide" | "restore" | "remove" | "dismiss";
}): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(input.reportId) || !/^[1-9]\d*$/.test(input.listingId) ||
      !/^[1-9]\d*$/.test(input.adminUserId)) return false;
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const found = await client.query<{ listing_status: string; can_restore: boolean; author_user_id: string }>(
      `SELECT m.status AS listing_status, m.author_user_id::text,
              (m.published_at IS NOT NULL AND (m.expires_at IS NULL OR m.expires_at > NOW())) AS can_restore
       FROM content_reports r
       JOIN market_listings m ON m.id = r.market_listing_id
       WHERE r.id = $1::bigint AND r.market_listing_id = $2::bigint AND r.status = 'open'
       FOR UPDATE OF r, m`, [input.reportId, input.listingId]);
    const status = found.rows[0]?.listing_status;
    const canRestore = found.rows[0]?.can_restore === true;
    if (!status) { await client.query("ROLLBACK"); return false; }
    if (input.operation === "hide" && status !== "published" ||
        input.operation === "restore" && (status !== "hidden" || !canRestore) ||
        input.operation === "remove" && !["published", "hidden"].includes(status)) {
      await client.query("ROLLBACK"); return false;
    }
    if (input.operation !== "dismiss") {
      const next = input.operation === "hide" ? "hidden" : input.operation === "restore" ? "published" : "removed";
      await client.query(
        `UPDATE market_listings SET status = $2, updated_at = NOW() WHERE id = $1::bigint`,
        [input.listingId, next]);
    }
    if (input.operation !== "hide") {
      await client.query(
        `UPDATE content_reports SET status = 'resolved', resolved_at = NOW()
         WHERE market_listing_id = $1::bigint AND status = 'open' AND ($2::text <> 'dismiss' OR id = $3::bigint)`,
        [input.listingId, input.operation, input.reportId]);
    }
    const nextStatus = input.operation === "dismiss" ? status :
      input.operation === "hide" ? "hidden" :
      input.operation === "restore" ? "published" : "removed";
    await client.query(
      `INSERT INTO market_moderation_audit
        (admin_user_id, market_listing_id, report_id, operation, previous_status, new_status)
       VALUES ($1::bigint, $2::bigint, $3::bigint, $4, $5, $6)`,
      [input.adminUserId, input.listingId, input.reportId, input.operation, status, nextStatus],
    );
    if (input.operation === "hide" || input.operation === "remove") {
      await client.query(
        `INSERT INTO notifications (user_id, market_listing_id, type)
         SELECT pu.id, $2::bigint, $3::text
         FROM public_users pu
         WHERE pu.id = $1::bigint AND pu.account_status = 'active'`,
        [found.rows[0].author_user_id, input.listingId,
          input.operation === "hide" ? "market_listing_hidden" : "market_listing_removed"],
      );
    }
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}
