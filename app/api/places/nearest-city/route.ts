import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  const latRaw = request.nextUrl.searchParams.get("lat");
  const lonRaw = request.nextUrl.searchParams.get("lon");
  const lat = Number(latRaw);
  const lon = Number(lonRaw);
  if (latRaw === null || lonRaw === null || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180)
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  try {
    const result = await getDb().query<{ id: string; city: string; state: string }>(`
      SELECT id::text AS id, city_name AS city, state_name AS state
      FROM locations
      WHERE country_code = 'DE' AND location_type = 'city' AND status = 'active'
        AND latitude IS NOT NULL AND longitude IS NOT NULL
      ORDER BY POWER(latitude::double precision - $1, 2)
        + POWER((longitude::double precision - $2) * COS(RADIANS($1)), 2)
      LIMIT 1
    `, [lat, lon]);
    if (!result.rows[0]?.city) return NextResponse.json({ error: "City not found" }, { status: 404 });
    return NextResponse.json(result.rows[0], { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Location unavailable" }, { status: 503 });
  }
}
