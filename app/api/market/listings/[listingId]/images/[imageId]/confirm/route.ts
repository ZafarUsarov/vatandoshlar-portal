import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { findMarketImage } from "@/lib/market/market-image-access";
import { markOwnMarketImageReady } from "@/lib/market/market-image-repository";
import { matchesMarketImageSignature, isMarketImageContentType } from "@/lib/market/market-image-policy";
import { verifyMarketImageObject } from "@/lib/market/market-r2";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(_request: Request, { params }: { params: Promise<{ listingId: string; imageId: string }> }) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { listingId, imageId } = await params;
  const image = await findMarketImage(imageId, user.user.id);
  if (!image || image.listingId !== listingId) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (image.status === "ready") return NextResponse.json({ ok: true });
  try {
    const object = await verifyMarketImageObject(image.storageKey);
    if (object.bytes !== image.byteSize || object.type !== image.contentType || !isMarketImageContentType(image.contentType) || !matchesMarketImageSignature(object.signature, image.contentType)) {
      return NextResponse.json({ error: "Uploaded file does not match image metadata" }, { status: 422 });
    }
    const ok = await markOwnMarketImageReady({ imageId, listingId, authorUserId: user.user.id, storageKey: image.storageKey });
    return NextResponse.json({ ok }, { status: ok ? 200 : 409 });
  } catch { return NextResponse.json({ error: "Upload not found or storage unavailable" }, { status: 503 }); }
}
