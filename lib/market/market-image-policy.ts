/** Shared server-side policy for Market image uploads. */
export const MARKET_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const MARKET_IMAGE_MAX_COUNT = 5;
export const MARKET_IMAGE_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export type MarketImageContentType = (typeof MARKET_IMAGE_CONTENT_TYPES)[number];

export function isMarketImageContentType(value: string): value is MarketImageContentType {
  return (MARKET_IMAGE_CONTENT_TYPES as readonly string[]).includes(value);
}

export function validateMarketImageMetadata(input: { contentType: string; byteSize: number }):
  { ok: true; contentType: MarketImageContentType; byteSize: number } | { ok: false; reason: "type" | "size" } {
  if (!isMarketImageContentType(input.contentType)) return { ok: false, reason: "type" };
  if (!Number.isSafeInteger(input.byteSize) || input.byteSize < 1 || input.byteSize > MARKET_IMAGE_MAX_BYTES) {
    return { ok: false, reason: "size" };
  }
  return { ok: true, contentType: input.contentType, byteSize: input.byteSize };
}

/** Magic-byte check must also be applied to bytes fetched from R2 before marking an upload ready. */
export function matchesMarketImageSignature(bytes: Uint8Array, contentType: MarketImageContentType): boolean {
  if (contentType === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (contentType === "image/png") return bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((n, i) => bytes[i] === n);
  return bytes.length >= 12 && String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP";
}
