import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { findMarketImage, deleteOwnMarketImageRow } from "@/lib/market/market-image-access";
import { deleteMarketImageObject } from "@/lib/market/market-r2";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function DELETE(_request: Request, { params }: { params: Promise<{ listingId: string; imageId: string }> }) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { listingId, imageId } = await params;
  const image = await findMarketImage(imageId, user.user.id);
  if (!image || image.listingId !== listingId) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try { await deleteMarketImageObject(image.storageKey); }
  catch { return NextResponse.json({ error: "Storage unavailable" }, { status: 503 }); }
  const deleted = await deleteOwnMarketImageRow(imageId, listingId, user.user.id);
  return NextResponse.json({ ok: deleted }, { status: deleted ? 200 : 409 });
}
