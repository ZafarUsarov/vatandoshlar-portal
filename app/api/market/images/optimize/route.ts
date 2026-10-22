import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import {
  MARKET_ORIGINAL_MAX_BYTES,
  optimizeMarketImage,
} from "@/lib/market/market-image-optimizer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getCurrentPublicUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const declared = request.headers.get("content-length");

  if (declared !== null && Number(declared) > MARKET_ORIGINAL_MAX_BYTES) {
    return NextResponse.json(
      { error: "Image too large" },
      { status: 413 }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      { error: "Empty image" },
      { status: 400 }
    );
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      length += value.byteLength;

      if (length > MARKET_ORIGINAL_MAX_BYTES) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Image too large" },
          { status: 413 }
        );
      }

      chunks.push(value);
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid upload" },
      { status: 400 }
    );
  }

  const bytes = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));

  try {
    const optimized = await optimizeMarketImage(bytes);

    return new NextResponse(new Uint8Array(optimized), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(optimized.byteLength),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "image_invalid";

    const status =
      reason === "image_size" || reason === "optimized_image_size"
        ? 413
        : reason === "heif_unavailable"
          ? 422
          : 400;

    return NextResponse.json({ error: reason }, { status });
  }
}
