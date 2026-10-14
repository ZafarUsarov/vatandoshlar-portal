import { NextResponse } from "next/server";
import { findMarketImage } from "@/lib/market/market-image-access";
import { getMarketImageObject } from "@/lib/market/market-r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ imageId: string }> }) {
  const image = await findMarketImage((await params).imageId);
  if (!image || image.status !== "ready") return new NextResponse(null, { status: 404 });
  try {
    const bytes = await getMarketImageObject(image.storageKey);
    if (!bytes) return new NextResponse(null, { status: 404 });
    return new NextResponse(Buffer.from(bytes), {
      headers: { "Content-Type": image.contentType, "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=300, s-maxage=3600", "X-Content-Type-Options": "nosniff" },
    });
  } catch { return new NextResponse(null, { status: 503 }); }
}
