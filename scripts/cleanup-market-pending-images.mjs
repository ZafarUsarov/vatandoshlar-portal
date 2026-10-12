/** Manual maintenance task. Dry-run by default; --apply deletes stale pending R2 objects and rows. */
import { Pool } from "pg";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const apply = process.argv.includes("--apply");
if (process.argv.some(arg => arg.startsWith("--") && arg !== "--apply")) {
  throw new Error("Supported option: --apply");
}
const { DATABASE_URL, R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
if (!DATABASE_URL || (apply && ![R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY].every(Boolean))) {
  throw new Error("Required database or R2 configuration is missing");
}
const pool = new Pool({ connectionString: DATABASE_URL, max: 1 });
const s3 = apply ? new S3Client({
  region: "auto", endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY }
}) : null;
let cleaned = 0;
try {
  if (!apply) {
    const { rows } = await pool.query(`SELECT count(*)::integer AS total FROM market_listing_images
      WHERE status = 'pending' AND created_at < NOW() - INTERVAL '15 minutes'`);
    console.log(`DRY RUN: ${rows[0].total} stale pending image(s); no changes made.`);
  } else {
    // Each row is locked until its R2 deletion and DB deletion finish. Confirm waits on
    // the lock, so it cannot mark a deleted object ready mid-cleanup.
    // 15-minute grace period exceeds the five-minute presigned PUT lifetime.
    for (let i = 0; i < 100; i++) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const { rows } = await client.query(`SELECT id::text AS id, storage_key FROM market_listing_images
          WHERE status = 'pending' AND created_at < NOW() - INTERVAL '15 minutes'
          ORDER BY created_at, id LIMIT 1 FOR UPDATE SKIP LOCKED`);
        if (!rows.length) { await client.query("COMMIT"); break; }
        const row = rows[0];
        await s3.send(new DeleteObjectCommand({ Bucket: R2_BUCKET_NAME, Key: row.storage_key }));
        await client.query("DELETE FROM market_listing_images WHERE id = $1::bigint AND status = 'pending'", [row.id]);
        await client.query("COMMIT");
        cleaned++;
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        throw error;
      } finally { client.release(); }
    }
    // Retain recent quota records only; no change to the active hourly window.
    await pool.query("DELETE FROM market_image_upload_rate_limits WHERE window_start < NOW() - INTERVAL '48 hours'");
    console.log(`APPLIED: ${cleaned} stale pending image(s) cleaned (max 100 per run).`);
  }
} catch (error) {
  console.error("Cleanup failed:", error instanceof Error ? error.message : "unknown error");
  process.exitCode = 1;
} finally {
  s3?.destroy();
  await pool.end();
}
