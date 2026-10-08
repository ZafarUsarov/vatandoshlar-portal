import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
type Row = { id: string; city_name: string; state_name: string; postal_code: string | null };

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim();
  const id = (request.nextUrl.searchParams.get("id") ?? "").trim();
  if (!id && (q.length < 1 || q.length > 100)) return NextResponse.json({ results: [] });
  if (id && !/^[1-9]\d{0,18}$/.test(id)) return NextResponse.json({ results: [] }, { status: 400 });
  try {
    const result = await getDb().query<Row>(`
      SELECT l.id::text, l.city_name, l.state_name,
        (SELECT MIN(p.postal_code) FROM location_postal_codes p WHERE p.location_id = l.id
          AND ($2::text = '' OR p.postal_code LIKE $2 || '%')) AS postal_code
      FROM locations l
      WHERE l.country_code = 'DE' AND l.location_type = 'city' AND l.status = 'active'
        AND (($3::text <> '' AND l.id::text = $3)
          OR ($3::text = '' AND (l.city_name ILIKE $1 || '%' OR EXISTS (
            SELECT 1 FROM location_postal_codes p WHERE p.location_id = l.id AND p.postal_code LIKE $2 || '%'
          ) AND $2 <> '')))
      ORDER BY CASE WHEN l.city_name ILIKE $1 || '%' THEN 0 ELSE 1 END,
        l.city_name ASC, l.state_name ASC, l.id ASC
      LIMIT 12
    `, [id ? "" : q.replace(/[\\%_]/g, "\\$&"), !id && /^\d{1,5}$/.test(q) ? q : "", id]);
    return NextResponse.json({ results: result.rows.map(row => ({ id: row.id, cityName: row.city_name, stateName: row.state_name, postalCode: row.postal_code })) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Location search unavailable" }, { status: 503 });
  }
}
