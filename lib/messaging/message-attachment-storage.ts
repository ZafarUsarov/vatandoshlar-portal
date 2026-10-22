import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

function r2() {
  const { R2_ACCOUNT_ID, R2_PRIVATE_BUCKET_NAME, R2_PRIVATE_ACCESS_KEY_ID, R2_PRIVATE_SECRET_ACCESS_KEY } = process.env;
  if (!R2_ACCOUNT_ID || !R2_PRIVATE_BUCKET_NAME || !R2_PRIVATE_ACCESS_KEY_ID || !R2_PRIVATE_SECRET_ACCESS_KEY) throw new Error("Private R2 storage not configured");
  return { bucket: R2_PRIVATE_BUCKET_NAME, client: new S3Client({ region: "auto", endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: R2_PRIVATE_ACCESS_KEY_ID, secretAccessKey: R2_PRIVATE_SECRET_ACCESS_KEY } }) };
}
export async function putAttachment(key: string, bytes: Uint8Array, mime: string) {
  const { client, bucket } = r2();
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: mime, ContentLength: bytes.length, CacheControl: "private, max-age=3600" }));
}
export async function deleteAttachment(key: string) {
  const { client, bucket } = r2();
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
export async function readAttachment(key: string) {
  const { client, bucket } = r2();
  const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return response.Body?.transformToByteArray();
}
