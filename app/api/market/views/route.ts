import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { listingId, token } = body as Record<string, unknown>;
  if (typeof listingId !== "string" || !/^[1-9]\d{0,17}$/.test(listingId) ||
      typeof token !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token))
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  await getDb().query(`INSERT INTO market_listing_views (listing_id, visitor_token)
    SELECT m.id, $2::uuid FROM market_listings m JOIN locations l ON l.id = m.location_id
    WHERE m.id = $1::bigint AND m.status = 'published' AND m.published_at IS NOT NULL
      AND (m.expires_at IS NULL OR m.expires_at > NOW())
      AND l.status = 'active' AND l.country_code = 'DE' AND l.location_type = 'city'
    ON CONFLICT (listing_id, visitor_token) DO NOTHING`, [listingId, token]);
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
