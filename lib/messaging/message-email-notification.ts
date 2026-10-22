import { getDb } from "@/lib/db";
import { getSiteUrl, sendTransactionalEmail } from "@/lib/email/email-client";
import { validId } from "@/lib/messaging/messaging-repository";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char] ?? char);

/** Called only after a message has been committed. Delivery failure never rolls back chat messages. */
export async function notifyConversationRecipient(conversationId: string, senderId: string): Promise<void> {
  if (!validId(conversationId) || !validId(senderId)) return;
  const db = getDb();
  const recipient = await db.query<{
    user_id: string; email: string; preferred_locale: string | null;
    sender_name: string; listing_title: string;
  }>(`SELECT pu.id::text AS user_id, pu.email, up.preferred_locale,
      COALESCE(sender_profile.display_name, 'Vatandosh') AS sender_name,
      COALESCE(m.title, t.title, 'E’lon') AS listing_title
    FROM conversations c
    JOIN public_users pu ON pu.id = CASE WHEN c.starter_user_id=$2::bigint THEN c.owner_user_id ELSE c.starter_user_id END
    LEFT JOIN user_profiles up ON up.user_id=pu.id
    LEFT JOIN user_profiles sender_profile ON sender_profile.user_id=$2::bigint
    LEFT JOIN market_listings m ON m.id=c.market_listing_id
    LEFT JOIN travel_listings t ON t.id=c.travel_listing_id
    WHERE c.id=$1::bigint AND (c.starter_user_id=$2::bigint OR c.owner_user_id=$2::bigint)
      AND pu.account_status='active' AND NULLIF(BTRIM(pu.email), '') IS NOT NULL
      AND EXISTS (SELECT 1 FROM messages msg WHERE msg.conversation_id=c.id
        AND msg.sender_user_id=$2::bigint AND msg.read_at IS NULL)`, [conversationId, senderId]);
  const user = recipient.rows[0];
  if (!user) return;

  // Notify on each newly committed message; no ten-minute suppression.
  // Email is a separate delivery channel and must not affect chat persistence.

  const locale = user.preferred_locale === 'de' ? 'de' : 'uz';
  const de = locale === 'de';
  const subject = de ? 'Neue Nachricht – Vatandoshlar.de' : 'Yangi xabar – Vatandoshlar.de';
  const intro = de
    ? `${user.sender_name} hat Ihnen eine Nachricht zu „${user.listing_title}“ gesendet.`
    : `${user.sender_name} sizga “${user.listing_title}” e’loni bo‘yicha xabar yubordi.`;
  const action = de ? 'Nachricht ansehen' : 'Xabarni ko‘rish';
  try {
    const url = `${getSiteUrl()}/${locale}/account/messages?conversation=${encodeURIComponent(conversationId)}`;
    await sendTransactionalEmail({
      to: user.email,
      subject,
      text: `${intro}\n\n${action}: ${url}\n\nVatandoshlar.de`,
      html: `<!doctype html><html lang="${locale}"><body style="margin:0;padding:32px 16px;background:#f4f7f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a"><div style="max-width:600px;margin:auto;padding:32px;border:1px solid #e2e8f0;border-radius:18px;background:white"><p style="font-size:12px;font-weight:700;color:#047857">VATANDOSHLAR.DE</p><h1 style="font-size:25px">${escapeHtml(subject)}</h1><p style="font-size:16px;line-height:1.6">${escapeHtml(intro)}</p><a href="${escapeHtml(url)}" style="display:inline-block;margin-top:12px;padding:14px 22px;border-radius:10px;background:#047857;color:#fff;text-decoration:none;font-weight:700">${escapeHtml(action)}</a><p style="margin-top:28px;font-size:12px;color:#64748b">${de ? 'Automatische Benachrichtigung. Antworten Sie bitte auf der Website.' : 'Avtomatik bildirishnoma. Javobni sayt orqali yuboring.'}</p></div></body></html>`,
    });
  } catch (error) {
    console.error('Messaging email notification failed', error instanceof Error ? error.message : 'unknown error');
  }
}
