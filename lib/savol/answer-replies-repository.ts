import { getDb } from "@/lib/db";

export type AnswerReply = Readonly<{
  id: string;
  answerId: string;
  parentId: string | null;
  authorUserId: string;
  body: string;
  createdAt: string;
}>;

type ReplyRow = {
  id: string;
  answer_id: string;
  parent_reply_id: string | null;
  author_user_id: string;
  body: string;
  created_at: string | Date;
};

export async function getPublishedAnswerReplies(answerIds: ReadonlyArray<string>): Promise<Map<string, AnswerReply[]>> {
  const result = new Map<string, AnswerReply[]>();
  if (answerIds.length === 0) return result;
  const rows = await getDb().query<ReplyRow>(
    `SELECT id::text, answer_id::text, parent_reply_id::text, author_user_id::text, body, created_at
     FROM answer_replies
     WHERE answer_id = ANY($1::bigint[]) AND status = 'published'
     ORDER BY created_at ASC, id ASC`, [answerIds],
  );
  for (const row of rows.rows) {
    const reply = {
      id: row.id, answerId: row.answer_id, parentId: row.parent_reply_id, authorUserId: row.author_user_id,
      body: row.body, createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    };
    const list = result.get(row.answer_id) ?? [];
    list.push(reply);
    result.set(row.answer_id, list);
  }
  return result;
}

export async function createAnswerReply(input: { answerId: string; questionId: string; authorUserId: string; body: string; parentId?: string | null }): Promise<string | null> {
  const result = await getDb().query<{ id: string }>(
    `INSERT INTO answer_replies (answer_id, author_user_id, body, parent_reply_id)
     SELECT a.id, $3::bigint, $4, parent.id
     FROM answers a JOIN questions q ON q.id = a.question_id
     LEFT JOIN answer_replies parent ON parent.id = $5::bigint
       AND parent.answer_id = a.id AND parent.status = 'published'
     WHERE ($5::bigint IS NULL OR parent.id IS NOT NULL)
       AND a.id = $1::bigint AND a.question_id = $2::bigint
       AND a.status = 'published' AND q.status = 'published'
     RETURNING id::text`, [input.answerId, input.questionId, input.authorUserId, input.body, input.parentId ?? null],
  );
  return result.rows[0]?.id ?? null;
}
