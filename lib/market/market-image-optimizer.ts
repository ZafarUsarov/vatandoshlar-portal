import "server-only";

import sharp from "sharp";
import heicConvert from "heic-convert";

export const MARKET_ORIGINAL_MAX_BYTES = 30 * 1024 * 1024;
export const MARKET_OPTIMIZED_MAX_BYTES = 5 * 1024 * 1024;

export type MarketOriginalFormat = "jpeg" | "png" | "webp" | "heif";

function detectFormat(bytes: Buffer): MarketOriginalFormat | null {
  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) return "jpeg";

  if (
    bytes.length >= 8 &&
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      .equals(bytes.subarray(0, 8))
  ) return "png";

  if (
    bytes.length >= 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  ) return "webp";

  if (
    bytes.length >= 12 &&
    bytes.toString("ascii", 4, 8) === "ftyp" &&
    ["heic", "heix", "hevc", "hevx", "mif1", "msf1"]
      .includes(bytes.toString("ascii", 8, 12))
  ) return "heif";

  return null;
}

export async function optimizeMarketImage(
  bytes: Buffer
): Promise<Buffer> {
  if (
    bytes.length < 1 ||
    bytes.length > MARKET_ORIGINAL_MAX_BYTES
  ) {
    throw new Error("image_size");
  }

  const format = detectFormat(bytes);

  if (!format) {
    throw new Error("image_type");
  }

  try {
    const source = format === "heif"
      ? Buffer.from(await heicConvert({
          buffer: bytes,
          format: "JPEG",
          quality: 1,
        }))
      : bytes;

    const metadata = await sharp(source, {
      failOn: "error",
      limitInputPixels: 60_000_000,
    }).metadata();

    if (metadata.format !== (format === "heif" ? "jpeg" : format)) {
      throw new Error("image_format_mismatch");
    }

    const optimized = await sharp(source, {
      failOn: "error",
      limitInputPixels: 60_000_000,
    })
      .rotate()
      .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 78,
        effort: 4,
      })
      .toBuffer();

    if (
      optimized.length < 1 ||
      optimized.length > MARKET_OPTIMIZED_MAX_BYTES
    ) {
      throw new Error("optimized_image_size");
    }

    return optimized;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "optimized_image_size"
    ) {
      throw error;
    }

    throw new Error(
      format === "heif" ? "heif_unavailable" : "image_invalid"
    );
  }
}
