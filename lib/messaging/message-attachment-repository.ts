import { getDb } from "@/lib/db";
import { validId } from "@/lib/messaging/messaging-repository";

export async function attachmentAccess(userId: string, attachmentId: string) {
  if (!validId(userId) || !validId(attachmentId)) return null;
  const result = await getDb().query<{ storage_key: string; original_filename: string; mime_type: string; file_size: string }>(`
    SELECT a.storage_key, a.original_filename, a.mime_type, a.file_size::text
    FROM message_attachments a JOIN messages m ON m.id = a.message_id
    JOIN conversations c ON c.id = m.conversation_id
    WHERE a.id = $1::bigint AND (c.starter_user_id = $2::bigint OR c.owner_user_id = $2::bigint)
  `, [attachmentId, userId]);
  return result.rows[0] ?? null;
}
