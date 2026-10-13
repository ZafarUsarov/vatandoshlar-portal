import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { reserveOwnMarketImage } from "@/lib/market/market-image-repository";
import { validateMarketImageMetadata } from "@/lib/market/market-image-policy";
import { consumeMarketImageUploadQuota } from "@/lib/market/market-image-rate-limit";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request, { params }: { params: Promise<{ listingId: string }> }) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { listingId } = await params;
  if (!/^[1-9]\d{0,18}$/.test(listingId)) return NextResponse.json({ error: "Invalid listing" }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const data = body as Record<string, unknown>;
  const policy = validateMarketImageMetadata({ contentType: typeof data.contentType === "string" ? data.contentType : "", byteSize: typeof data.byteSize === "number" ? data.byteSize : NaN });
  if (!policy.ok) return NextResponse.json({ error: "Invalid image format or size" }, { status: 400 });
  // Consume quota before allocating a DB slot or issuing a presigned URL.
  try {
    if (!await consumeMarketImageUploadQuota(user.user.id)) {
      return NextResponse.json({ error: "Too many image upload requests. Try again next hour." },
        { status: 429, headers: { "Retry-After": "3600", "Cache-Control": "no-store" } });
    }
  } catch {
    return NextResponse.json({ error: "Upload temporarily unavailable" }, { status: 503 });
  }
  const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[policy.contentType];
  const key = `market/${listingId}/${randomUUID()}.${extension}`;
  let image;
  try { image = await reserveOwnMarketImage({ listingId, authorUserId: user.user.id, storageKey: key, contentType: policy.contentType, byteSize: policy.byteSize }); }
  catch { return NextResponse.json({ error: "Image limit or slot conflict" }, { status: 409 }); }
  if (!image) return NextResponse.json({ error: "Listing not editable or image limit reached" }, { status: 403 });
  return NextResponse.json({ imageId: image.id }, { headers: { "Cache-Control": "no-store" } });
}
