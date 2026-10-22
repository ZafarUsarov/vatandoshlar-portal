import { getDb } from "@/lib/db";

export type ListingKind = "market" | "travel";
export const validId = (value: string) => /^[1-9]\d{0,17}$/.test(value);

export async function startConversation(userId: string, kind: ListingKind, listingId: string) {
  if (!validId(userId) || !validId(listingId)) return null;
  const db = getDb();
  const table = kind === "market" ? "market_listings" : "travel_listings";
  const column = kind === "market" ? "market_listing_id" : "travel_listing_id";
  const result = await db.query<{ id: string }>(`
    INSERT INTO conversations (${column}, starter_user_id, owner_user_id)
    SELECT l.id, $1::bigint, l.author_user_id FROM ${table} l
    JOIN public_users u ON u.id = l.author_user_id AND u.account_status = 'active'
    WHERE l.id = $2::bigint AND l.status = 'published' AND l.author_user_id <> $1::bigint
    ON CONFLICT (${column}, starter_user_id) WHERE ${column} IS NOT NULL
    DO UPDATE SET updated_at = conversations.updated_at
    RETURNING id::text
  `, [userId, listingId]);
  return result.rows[0]?.id ?? null;
}

export async function listConversations(userId: string) {
  const result = await getDb().query<{
    id: string; title: string; other_name: string; last_message: string | null; updated_at: Date;
    unread_count: string; kind: ListingKind; listing_slug: string | null; listing_price: string | null; listing_currency: string | null; image_url: string | null;
  }>(`SELECT c.id::text, COALESCE(m.title, t.title, 'E’lon') AS title,
    COALESCE(p.display_name, 'Vatandosh') AS other_name,
    CASE WHEN c.market_listing_id IS NOT NULL THEN 'market' ELSE 'travel' END AS kind,
    COALESCE(m.slug, t.slug) AS listing_slug,
    COALESCE(m.price_amount, t.price_amount)::text AS listing_price,
    COALESCE(m.currency, t.price_currency, 'EUR') AS listing_currency,
    CASE WHEN c.market_listing_id IS NOT NULL THEN
      (SELECT '/api/market/images/' || i.id::text FROM market_listing_images i
       WHERE i.listing_id=m.id AND i.status='ready' ORDER BY i.position,i.id LIMIT 1)
    WHEN t.image_thumb_key IS NOT NULL OR t.image_key IS NOT NULL THEN '/api/travel/images/' || t.id::text || '?size=thumb'
    ELSE NULL END AS image_url,
    (SELECT body FROM messages x WHERE x.conversation_id=c.id ORDER BY id DESC LIMIT 1) AS last_message,
    c.updated_at,
    (SELECT count(*)::text FROM messages x WHERE x.conversation_id=c.id AND x.sender_user_id <> $1::bigint AND x.read_at IS NULL) AS unread_count
    FROM conversations c
    LEFT JOIN market_listings m ON m.id=c.market_listing_id
    LEFT JOIN travel_listings t ON t.id=c.travel_listing_id
    LEFT JOIN user_profiles p ON p.user_id=CASE WHEN c.starter_user_id=$1::bigint THEN c.owner_user_id ELSE c.starter_user_id END
    WHERE c.starter_user_id=$1::bigint OR c.owner_user_id=$1::bigint
    ORDER BY c.updated_at DESC LIMIT 100`, [userId]);
  return result.rows;
}

export async function getConversationMessages(userId: string, conversationId: string) {
  if (!validId(conversationId)) return null;
  const db = getDb();
  const access = await db.query(`SELECT id FROM conversations WHERE id=$1::bigint AND (starter_user_id=$2::bigint OR owner_user_id=$2::bigint)`, [conversationId,userId]);
  if (!access.rowCount) return null;
  const result = await db.query<{id:string; sender_user_id:string; body:string; created_at:Date; read_at:Date|null}>(`
    SELECT id::text, sender_user_id::text, body, created_at, read_at
    FROM (SELECT * FROM messages WHERE conversation_id=$1::bigint ORDER BY id DESC LIMIT 100) recent ORDER BY recent.id ASC`,[conversationId]);
  const ids = result.rows.map(row => row.id);
  if (!ids.length) return [];
  const files = await db.query<{id:string;message_id:string;original_filename:string;mime_type:string;file_size:string}>(`SELECT id::text, message_id::text, original_filename, mime_type, file_size::text FROM message_attachments WHERE message_id=ANY($1::bigint[]) ORDER BY id`, [ids]);
  return result.rows.map(row => ({...row, attachments: files.rows.filter(f => f.message_id === row.id)}));
}

export async function sendMessage(userId: string, conversationId: string, body: string) {
  if (!validId(conversationId) || body.trim().length < 1 || body.trim().length > 2000) return false;
  const db=getDb(); const client=await db.connect();
  try {
    await client.query('BEGIN');
    const inserted=await client.query(`INSERT INTO messages(conversation_id,sender_user_id,body)
      SELECT id,$2::bigint,$3 FROM conversations WHERE id=$1::bigint
      AND (starter_user_id=$2::bigint OR owner_user_id=$2::bigint)
      RETURNING id`,[conversationId,userId,body.trim()]);
    if (!inserted.rowCount) { await client.query('ROLLBACK'); return false; }
    await client.query('UPDATE conversations SET updated_at=NOW() WHERE id=$1::bigint',[conversationId]);
    await client.query('COMMIT'); return true;
  } catch(e) {await client.query('ROLLBACK');throw e;} finally {client.release();}
}

export async function markRead(userId:string, conversationId:string) {
  if (!validId(conversationId)) return false;
  const result=await getDb().query(`UPDATE messages SET read_at=NOW() WHERE conversation_id=$1::bigint
    AND sender_user_id<>$2::bigint AND read_at IS NULL AND EXISTS
    (SELECT 1 FROM conversations c WHERE c.id=$1::bigint AND (c.starter_user_id=$2::bigint OR c.owner_user_id=$2::bigint))`,[conversationId,userId]);
  return result.rowCount !== null;
}

/** Count unread incoming messages across every conversation the user participates in. */
export async function countUnreadMessages(userId: string): Promise<number> {
  if (!validId(userId)) return 0;
  const result = await getDb().query<{ unread_count: string }>(`
    SELECT COUNT(*)::text AS unread_count
    FROM messages msg
    JOIN conversations c ON c.id = msg.conversation_id
    WHERE msg.read_at IS NULL
      AND msg.sender_user_id <> $1::bigint
      AND (c.starter_user_id = $1::bigint OR c.owner_user_id = $1::bigint)
  `, [userId]);
  return Number(result.rows[0]?.unread_count ?? 0);
}
