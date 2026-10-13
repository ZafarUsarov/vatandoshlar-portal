import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { findMarketImage } from "@/lib/market/market-image-access";
import { putMarketImageObject } from "@/lib/market/market-r2";
import { validateMarketImageMetadata } from "@/lib/market/market-image-policy";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function PUT(request: Request, { params }: { params: Promise<{ listingId: string; imageId: string }> }) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { listingId, imageId } = await params;
  if (!/^[1-9]\d{0,18}$/.test(listingId) || !/^[1-9]\d{0,18}$/.test(imageId)) return NextResponse.json({ error: "Invalid image" }, { status: 400 });
  const image = await findMarketImage(imageId, user.user.id);
  if (!image || image.listingId !== listingId || image.status !== "pending") return NextResponse.json({ error: "Image not available" }, { status: 404 });
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > 5 * 1024 * 1024) return NextResponse.json({ error: "Image too large" }, { status: 413 });
  if (!request.body) return NextResponse.json({ error: "Empty upload" }, { status: 400 });
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 5 * 1024 * 1024) {
        await reader.cancel();
        return NextResponse.json({ error: "Image too large" }, { status: 413 });
      }
      chunks.push(value);
    }
  } catch { return NextResponse.json({ error: "Invalid upload" }, { status: 400 }); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const metadata = validateMarketImageMetadata({ contentType: request.headers.get("content-type") ?? "", byteSize: bytes.byteLength });
  if (!metadata.ok || metadata.byteSize !== image.byteSize || metadata.contentType !== image.contentType)
    return NextResponse.json({ error: "Image metadata mismatch" }, { status: 400 });
  try { await putMarketImageObject(image.storageKey, image.contentType, bytes); }
  catch { return NextResponse.json({ error: "Storage upload failed" }, { status: 503 }); }
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
