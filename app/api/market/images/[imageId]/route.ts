import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { findMarketImage } from "@/lib/market/market-image-access";
import { signMarketImageGet } from "@/lib/market/market-r2";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ imageId: string }> }) {
  const { imageId } = await params;
  const publicImage = await findMarketImage(imageId);
  const image = publicImage ?? await (async () => { const user = await getCurrentPublicUser(); return user ? findMarketImage(imageId, user.user.id) : null; })();
  if (!image || image.status !== "ready") return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const url = await signMarketImageGet(image.storageKey);
    return NextResponse.redirect(url, { status: 307, headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
  } catch { return NextResponse.json({ error: "Storage unavailable" }, { status: 503 }); }
}
