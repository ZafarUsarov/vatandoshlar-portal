import { S3Client, PutObjectCommand, HeadObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function config() {
  const { R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
  if (!R2_ACCOUNT_ID || !R2_BUCKET_NAME || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) throw new Error("R2 is not configured");
  return { bucket: R2_BUCKET_NAME, client: new S3Client({ region: "auto", endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY } }) };
}
export async function putMarketImageObject(key: string, type: string, data: Uint8Array) {
  const { bucket, client } = config();
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: data, ContentType: type, ContentLength: data.byteLength }));
}
export async function signMarketImagePut(key: string, type: string, bytes: number) {
  const { bucket, client } = config();
  return getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: type, ContentLength: bytes }), { expiresIn: 300 });
}
export async function verifyMarketImageObject(key: string) {
  const { bucket, client } = config();
  const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
  const range = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key, Range: "bytes=0-15" }));
  const signature = await range.Body?.transformToByteArray();
  return { bytes: head.ContentLength, type: head.ContentType, signature: signature ?? new Uint8Array() };
}
export async function signMarketImageGet(key: string) {
  const { bucket, client } = config();
  return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 60 });
}
export async function deleteMarketImageObject(key: string) {
  const { bucket, client } = config();
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

/** Read public listing images for crawler-friendly Open Graph responses. */
export async function getMarketImageObject(key: string) {
  const { bucket, client } = config();
  const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return result.Body?.transformToByteArray();
}
