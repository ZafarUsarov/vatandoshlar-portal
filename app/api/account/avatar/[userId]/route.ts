import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getMarketImageObject } from "@/lib/market/market-r2";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  if (!/^[1-9]\d{0,17}$/.test(userId)) {
    return new Response(null, { status: 404 });
  }

  const result = await getDb().query<{ avatar_url: string | null }>(
    `SELECT p.avatar_url
     FROM user_profiles p
     JOIN public_users u ON u.id = p.user_id
     WHERE p.user_id = $1 AND u.account_status = 'active'`,
    [userId],
  );
  const url = result.rows[0]?.avatar_url;
  const prefix = `/api/account/avatar/${userId}?v=`;
  if (!url?.startsWith(prefix)) {
    return new Response(null, { status: 404 });
  }

  const filename = url.slice(prefix.length);
  if (!/^[0-9a-f-]{36}\.(jpg|png|webp)$/.test(filename)) {
    return new Response(null, { status: 404 });
  }

  const key = `avatars/${userId}/${filename}`;
  try {
    const bytes = await getMarketImageObject(key);
    if (!bytes) return new Response(null, { status: 404 });
    const type = filename.endsWith(".png") ? "image/png"
      : filename.endsWith(".webp") ? "image/webp" : "image/jpeg";
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=60",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image unavailable" }, { status: 503 });
  }
}
