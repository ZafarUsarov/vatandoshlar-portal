import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// User-initiated reverse lookup only. Never call this endpoint for autocomplete.
export async function GET(request: NextRequest) {
  const lat = Number(request.nextUrl.searchParams.get("lat"));
  const lon = Number(request.nextUrl.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180 || !request.nextUrl.searchParams.has("lat") || !request.nextUrl.searchParams.has("lon")) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }
  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("zoom", "10");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    const response = await fetch(url, { headers: { "User-Agent": "VatandoshlarMarket/1.0 (https://vatandoshlar.de)", "Accept-Language": "de" }, signal: AbortSignal.timeout(7000), next: { revalidate: 3600 } });
    if (!response.ok) return NextResponse.json({ error: "Lookup unavailable" }, { status: 503 });
    const data: { address?: Record<string, string> } = await response.json();
    const a = data.address ?? {};
    if (a.country_code !== "de") return NextResponse.json({ error: "Outside Germany" }, { status: 422 });
    return NextResponse.json({ city: a.city ?? a.town ?? a.village ?? a.municipality ?? "", state: a.state ?? "" }, { headers: { "Cache-Control": "private, max-age=0", "X-Data-Attribution": "OpenStreetMap contributors" } });
  } catch { return NextResponse.json({ error: "Lookup unavailable" }, { status: 503 }); }
}
