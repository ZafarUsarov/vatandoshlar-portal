import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { getMarketImageObject } from "@/lib/market/market-r2";
export const runtime = "nodejs";
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[1-9]\d{0,18}$/.test(id)) return new NextResponse(null,{status:404});
  const result = await getDb().query<{ image_key: string|null; image_thumb_key: string|null; author_user_id: string; status: string; expires_at: Date }>(`SELECT image_key,image_thumb_key,author_user_id::text,status,expires_at FROM travel_listings WHERE id=$1::bigint AND status IN ('draft','published')`,[id]);
  const row = result.rows[0];
  if (!row) return new NextResponse(null,{status:404});
  const isPublic = row.status === "published" && new Date(row.expires_at).getTime() > Date.now();
  if (!isPublic) {
    const current = await getCurrentPublicUser();
    if (!current || current.user.id !== row.author_user_id) return new NextResponse(null,{status:404});
  }
  const key = request.nextUrl.searchParams.get("size") === "thumb" ? row?.image_thumb_key : row?.image_key;
  if (!key || !/^travel\/[a-f0-9-]+(?:-thumb)?\.webp$/.test(key)) return new NextResponse(null,{status:404});
  try {
    const bytes = await getMarketImageObject(key);
    if (!bytes) return new NextResponse(null,{status:404});
    return new NextResponse(Buffer.from(bytes),{headers:{"Content-Type":"image/webp","Cache-Control":isPublic ? "public, max-age=300" : "private, no-store","X-Content-Type-Options":"nosniff"}});
  } catch { return new NextResponse(null,{status:404}); }
}
