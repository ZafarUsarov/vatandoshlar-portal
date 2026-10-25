import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Suggestion = { id: string; city: string; state: string; stateCode: string; postalCode: string | null };

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 80);
  if (q.length < 2) return NextResponse.json({ suggestions: [] });
  const numeric = /^\d{1,5}$/.test(q);
  try {
    const result = await getDb().query<{
      id: string; city: string; state: string; state_code: string; postal_code: string | null;
    }>(`
      SELECT l.id::text AS id, l.city_name AS city, l.state_name AS state,
             l.state_code,
             MIN(lpc.postal_code)::text AS postal_code
      FROM locations l
      LEFT JOIN location_postal_codes lpc ON lpc.location_id = l.id AND lpc.country_code = 'DE'
      WHERE l.location_type = 'city' AND l.status = 'active' AND l.country_code = 'DE'
        AND (($2::boolean AND lpc.postal_code LIKE $1 || '%')
          OR (NOT $2::boolean AND l.city_name ILIKE $1 || '%'))
      GROUP BY l.id, l.city_name, l.state_name, l.state_code
      ORDER BY l.city_name, l.state_name, l.id
      LIMIT 20
    `, [q, numeric]);
    const suggestions: Suggestion[] = result.rows.map(r => ({
      id: r.id, city: r.city, state: r.state, stateCode: r.state_code,
      postalCode: r.postal_code,
    }));
    return NextResponse.json({ suggestions }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("places city suggestions:", error);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
