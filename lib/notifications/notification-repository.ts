import { getDb } from "@/lib/db";
import type { Notification, NotificationRecipient } from "@/types/notification";

function toIso(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

export async function createNewAnswerNotifications(input: Readonly<{
  questionId: string;
  answerId: string;
  actorUserId: string;
}>): Promise<ReadonlyArray<NotificationRecipient>> {
  const result = await getDb().query<{
    user_id: string;
    email: string;
    preferred_locale: string | null;
  }>(
    `
      WITH recipients AS (
        SELECT q.author_user_id AS user_id
        FROM questions q
        WHERE q.id = $1
        UNION
        SELECT qf.user_id
        FROM question_follows qf
        WHERE qf.question_id = $1
      ), inserted AS (
        INSERT INTO notifications (
          user_id,
          actor_user_id,
          question_id,
          answer_id,
          type
        )
        SELECT
          recipients.user_id,
          $3,
          $1,
          $2,
          'savol_new_answer'
        FROM recipients
        JOIN public_users pu ON pu.id = recipients.user_id
        WHERE recipients.user_id <> $3
          AND pu.account_status = 'active'
        ON CONFLICT DO NOTHING
        RETURNING user_id
      )
      SELECT
        pu.id::text AS user_id,
        pu.email,
        up.preferred_locale
      FROM inserted i
      JOIN public_users pu ON pu.id = i.user_id
      LEFT JOIN user_profiles up ON up.user_id = pu.id
    `,
    [input.questionId, input.answerId, input.actorUserId],
  );

  return result.rows.map((row) => ({
    userId: row.user_id,
    email: row.email,
    locale: row.preferred_locale === "de" ? "de" : "uz",
  }));
}

export async function createAnswerReplyNotification(input: Readonly<{
  questionId: string;
  answerId: string;
  replyId: string;
  actorUserId: string;
}>): Promise<NotificationRecipient | null> {
  const result = await getDb().query<{
    user_id: string;
    email: string;
    preferred_locale: string | null;
  }>(`WITH inserted AS (
      INSERT INTO notifications (user_id, actor_user_id, question_id, answer_id, reply_id, type)
      SELECT a.author_user_id, $4::bigint, $1::bigint, a.id, r.id, 'savol_answer_reply'
      FROM answers a
      JOIN answer_replies r ON r.answer_id = a.id
      JOIN questions q ON q.id = a.question_id
      JOIN public_users pu ON pu.id = a.author_user_id
      WHERE a.id = $2::bigint AND a.question_id = $1::bigint
        AND r.id = $3::bigint AND r.author_user_id = $4::bigint
        AND a.author_user_id <> $4::bigint
        AND a.status = 'published' AND r.status = 'published' AND q.status = 'published'
        AND pu.account_status = 'active'
      ON CONFLICT DO NOTHING RETURNING user_id
    )
    SELECT pu.id::text AS user_id, pu.email, up.preferred_locale
    FROM inserted i JOIN public_users pu ON pu.id = i.user_id
    LEFT JOIN user_profiles up ON up.user_id = pu.id`,
    [input.questionId, input.answerId, input.replyId, input.actorUserId]);
  const recipient = result.rows[0];
  return recipient ? {userId: recipient.user_id, email: recipient.email, locale: recipient.preferred_locale === 'de' ? 'de' : 'uz'} : null;
}

export async function getNotificationsForUser(
  userId: string,
  limit = 50,
): Promise<ReadonlyArray<Notification>> {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const result = await getDb().query<{
    id: string;
    type: Notification["type"];
    question_id: string | null;
    question_slug: string | null;
    question_title: string | null;
    answer_id: string | null;
    actor_display_name: string | null;
    market_listing_id: string | null;
    market_listing_slug: string | null;
    market_listing_title: string | null;
    read_at: string | Date | null;
    created_at: string | Date;
  }>(
    `
      SELECT
        n.id::text,
        n.type,
        n.question_id::text,
        q.slug AS question_slug,
        q.title AS question_title,
        n.answer_id::text,
        n.market_listing_id::text,
        m.slug AS market_listing_slug,
        m.title AS market_listing_title,
        actor_profile.display_name AS actor_display_name,
        n.read_at,
        n.created_at
      FROM notifications n
      LEFT JOIN questions q ON q.id = n.question_id
      LEFT JOIN market_listings m ON m.id = n.market_listing_id
      LEFT JOIN user_profiles actor_profile ON actor_profile.user_id = n.actor_user_id
      WHERE n.user_id = $1
      ORDER BY n.created_at DESC, n.id DESC
      LIMIT $2
    `,
    [userId, safeLimit],
  );

  return result.rows.map((row) => ({
    id: row.id,
    type: row.type,
    questionId: row.question_id,
    questionSlug: row.question_slug,
    questionTitle: row.question_title,
    answerId: row.answer_id,
    actorDisplayName: row.actor_display_name,
    marketListingId: row.market_listing_id,
    marketListingSlug: row.market_listing_slug,
    marketListingTitle: row.market_listing_title,
    readAt: row.read_at === null ? null : toIso(row.read_at),
    createdAt: toIso(row.created_at),
  }));
}

export async function markNotificationRead(
  notificationId: string,
  userId: string,
): Promise<void> {
  await getDb().query(
    `UPDATE notifications SET read_at = COALESCE(read_at, NOW()) WHERE id = $1 AND user_id = $2`,
    [notificationId, userId],
  );
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await getDb().query(
    `UPDATE notifications SET read_at = NOW() WHERE user_id = $1 AND read_at IS NULL`,
    [userId],
  );
}
