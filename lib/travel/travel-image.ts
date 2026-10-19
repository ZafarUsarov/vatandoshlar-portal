import "server-only";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { getDb } from "@/lib/db";
import { putMarketImageObject, deleteMarketImageObject } from "@/lib/market/market-r2";

export const MAX_TRAVEL_IMAGE_BYTES = 30 * 1024 * 1024;
const validId = (value: string) => /^[1-9]\d{0,18}$/.test(value);

function detect(bytes: Buffer): "jpeg" | "png" | "webp" | "heif" | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (bytes.length >= 8 && Buffer.from([137,80,78,71,13,10,26,10]).equals(bytes.subarray(0,8))) return "png";
  if (bytes.length >= 12 && bytes.toString("ascii",0,4) === "RIFF" && bytes.toString("ascii",8,12) === "WEBP") return "webp";
  if (bytes.length >= 12 && bytes.toString("ascii",4,8) === "ftyp" && ["heic","heix","hevc","hevx","mif1","msf1"].includes(bytes.toString("ascii",8,12))) return "heif";
  return null;
}

/** R2 objects are uploaded first; a row lock serializes replacements and deletion. */
export async function replaceOwnTravelImage(listingId: string, userId: string, file: File): Promise<void> {
  if (!validId(listingId) || !validId(userId)) throw new Error("invalid_owner");
  if (file.size < 1 || file.size > MAX_TRAVEL_IMAGE_BYTES) throw new Error("image_size");
  const bytes = Buffer.from(await file.arrayBuffer());
  const format = detect(bytes);
  if (!format) throw new Error("image_type");
  let full: Buffer;
  let thumb: Buffer;
  try {
    const image = sharp(bytes, { failOn: "error", limitInputPixels: 60_000_000 });
    const metadata = await image.metadata();
    if (metadata.format !== format) throw new Error("mismatch");
    // Re-encoding without withMetadata() strips EXIF/GPS; rotate() applies orientation.
    full = await sharp(bytes, { failOn: "error", limitInputPixels: 60_000_000 }).rotate().resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality: 78, effort: 4 }).toBuffer();
    thumb = await sharp(bytes, { failOn: "error", limitInputPixels: 60_000_000 }).rotate().resize({ width: 480, height: 360, fit: "cover", withoutEnlargement: true }).webp({ quality: 72, effort: 4 }).toBuffer();
  } catch { throw new Error(format === "heif" ? "heif_unavailable" : "image_invalid"); }
  // Reject unauthorized requests before consuming R2 storage.
  const owned = await getDb().query(`SELECT id FROM travel_listings WHERE id=$1::bigint AND author_user_id=$2::bigint AND status IN ('draft','published')`, [listingId, userId]);
  if (!owned.rowCount) throw new Error("not_owner");
  const key = `travel/${randomUUID()}.webp`;
  const thumbKey = `travel/${randomUUID()}-thumb.webp`;
  let committed = false;
  let previous: { image_key: string | null; image_thumb_key: string | null } | null = null;
  try {
    await putMarketImageObject(key, "image/webp", full);
    await putMarketImageObject(thumbKey, "image/webp", thumb);
    const client = await getDb().connect();
    try {
      await client.query("BEGIN");
      const locked = await client.query<{image_key:string|null;image_thumb_key:string|null}>(
        `SELECT image_key,image_thumb_key FROM travel_listings WHERE id=$1::bigint AND author_user_id=$2::bigint AND status IN ('draft','published') FOR UPDATE`, [listingId,userId]);
      if (!locked.rowCount) throw new Error("not_owner");
      previous = locked.rows[0];
      await client.query(`UPDATE travel_listings SET image_key=$3,image_thumb_key=$4,updated_at=NOW() WHERE id=$1::bigint AND author_user_id=$2::bigint`, [listingId,userId,key,thumbKey]);
      await client.query("COMMIT");
      committed = true;
    } catch (error) { await client.query("ROLLBACK"); throw error; }
    finally { client.release(); }
  } finally {
    if (!committed) {
      for (const orphan of [key,thumbKey]) await deleteMarketImageObject(orphan).catch(error => console.error("Travel upload rollback cleanup failed",error));
    }
  }
  if (previous) for (const oldKey of [previous.image_key,previous.image_thumb_key]) {
    if (oldKey && oldKey.startsWith("travel/")) await deleteMarketImageObject(oldKey).catch(error => console.error("Travel replaced image cleanup failed",error));
  }
}

export async function deleteOwnTravelImage(listingId: string, userId: string): Promise<boolean> {
  if (!validId(listingId) || !validId(userId)) return false;
  const client = await getDb().connect();
  let previous: {image_key:string|null;image_thumb_key:string|null} | null = null;
  try {
    await client.query("BEGIN");
    const locked = await client.query<{image_key:string|null;image_thumb_key:string|null}>(
      `SELECT image_key,image_thumb_key FROM travel_listings WHERE id=$1::bigint AND author_user_id=$2::bigint AND status IN ('draft','published') FOR UPDATE`,[listingId,userId]);
    if (!locked.rowCount) { await client.query("ROLLBACK"); return false; }
    previous = locked.rows[0];
    await client.query(`UPDATE travel_listings SET image_key=NULL,image_thumb_key=NULL,updated_at=NOW() WHERE id=$1::bigint AND author_user_id=$2::bigint`,[listingId,userId]);
    await client.query("COMMIT");
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
  if (previous) for (const key of [previous.image_key,previous.image_thumb_key]) {
    if (key && key.startsWith("travel/")) await deleteMarketImageObject(key).catch(error => console.error("Travel image cleanup failed",error));
  }
  return true;
}
