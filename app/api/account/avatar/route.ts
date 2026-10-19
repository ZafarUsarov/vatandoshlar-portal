import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { getDb } from "@/lib/db";
import {
  putMarketImageObject,
  deleteMarketImageObject,
} from "@/lib/market/market-r2";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function validSignature(bytes: Uint8Array, type: string) {
  if (type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 255 &&
      bytes[1] === 216 && bytes[2] === 255;
  }
  if (type === "image/png") {
    return bytes.length >= 8 &&
      [137,80,78,71,13,10,26,10].every((n, i) => bytes[i] === n);
  }
  if (type === "image/webp") {
    return bytes.length >= 12 &&
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  }
  return false;
}

export async function POST(request: Request) {
  const context = await getCurrentPublicUser();
  if (!context || context.user.status !== "active") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sizeHeader = Number(request.headers.get("content-length"));
  if (sizeHeader > MAX_BYTES + 65536) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const file = data.get("avatar");
  if (!(file instanceof File) || !TYPES[file.type] ||
      file.size === 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Invalid image" }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!validSignature(bytes, file.type)) {
    return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
  }

  const key = `avatars/${context.user.id}/${randomUUID()}.${TYPES[file.type]}`;
  const avatarUrl = `/api/account/avatar/${context.user.id}?v=${key.split("/").pop()}`;
  const oldUrl = context.profile?.avatarUrl;

  try {
    await putMarketImageObject(key, file.type, bytes);
    await getDb().query(
      `INSERT INTO user_profiles (user_id, avatar_url)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET avatar_url = EXCLUDED.avatar_url, updated_at = NOW()`,
      [context.user.id, avatarUrl],
    );
  } catch {
    try { await deleteMarketImageObject(key); } catch {}
    return NextResponse.json({ error: "Upload failed" }, { status: 503 });
  }

  if (oldUrl?.startsWith(`/api/account/avatar/${context.user.id}?v=`)) {
    const filename = oldUrl.split("?v=")[1];
    if (/^[0-9a-f-]{36}\\.(jpg|png|webp)$/.test(filename)) {
      try {
        await deleteMarketImageObject(`avatars/${context.user.id}/${filename}`);
      } catch {
        // Orphan cleanup can be handled separately.
      }
    }
  }

  return NextResponse.json({ avatarUrl });
}
