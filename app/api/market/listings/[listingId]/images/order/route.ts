import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { reorderOwnMarketImages } from "@/lib/market/market-image-order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ listingId: string }> }) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { listingId } = await params;
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!body || typeof body !== "object" || !Array.isArray((body as { imageIds?: unknown }).imageIds))
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const ids: unknown[] = (body as { imageIds: unknown[] }).imageIds;
  if (ids.some(id => typeof id !== "string")) return NextResponse.json({ error: "Invalid image IDs" }, { status: 400 });
  try {
    const result = await reorderOwnMarketImages({ listingId, authorUserId: user.user.id, imageIds: ids as string[] });
    if (result === "ok") return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    return NextResponse.json({ error: result }, { status: result === "invalid" ? 400 : result === "not_found" ? 404 : 409 });
  } catch {
    return NextResponse.json({ error: "Could not save image order" }, { status: 500 });
  }
}
