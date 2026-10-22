import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { attachmentAccess } from "@/lib/messaging/message-attachment-repository";
import { readAttachment } from "@/lib/messaging/message-attachment-storage";

export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string; attachmentId: string }> }) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, attachmentId } = await params;
  if (!/^[1-9]\d{0,17}$/.test(id) || !/^[1-9]\d{0,17}$/.test(attachmentId)) return NextResponse.json({error:"Not found"},{status:404});
  // The URL conversation id must match the attachment's parent conversation.
  const { getDb } = await import("@/lib/db");
  const access = await attachmentAccess(user.user.id, attachmentId);
  if (!access) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const match = await getDb().query(`SELECT 1 FROM message_attachments a JOIN messages m ON m.id=a.message_id WHERE a.id=$1::bigint AND m.conversation_id=$2::bigint`, [attachmentId, /^\d+$/.test(id) ? id : "0"]);
  if (!match.rowCount) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const bytes = await readAttachment(access.storage_key);
  if (!bytes) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const safeName = access.original_filename.replace(/["\\\r\n]/g, "_");
  return new Response(Buffer.from(bytes), { headers: {
    "Content-Type": access.mime_type,
    "Content-Disposition": `${access.mime_type.startsWith("image/") ? "inline" : "attachment"}; filename="${safeName}"`,
    "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox",
  } });
}
