import { getDb } from "@/lib/db";

export async function getAnswerDownvoteCounts(answerIds: readonly string[]): Promise<Map<string, number>> {
  if (answerIds.length === 0) return new Map();
  const result = await getDb().query<{ answer_id: string; count: number }>(
    `SELECT answer_id::text, COUNT(*)::int AS count
     FROM answer_unhelpful_votes WHERE answer_id = ANY($1::bigint[]) GROUP BY answer_id`,
    [answerIds],
  );
  return new Map(result.rows.map((row) => [row.answer_id, row.count]));
}

export async function toggleAnswerVote(input: { answerId: string; userId: string; direction: "up" | "down" }): Promise<void> {
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    // Serialize concurrent votes by the same user on the same answer.
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1), hashtext($2))", [input.answerId, input.userId]);
    const target = input.direction === "up" ? "answer_helpful_votes" : "answer_unhelpful_votes";
    const opposite = input.direction === "up" ? "answer_unhelpful_votes" : "answer_helpful_votes";
    const removed = await client.query(
      `DELETE FROM ${target} WHERE answer_id = $1::bigint AND user_id = $2::bigint RETURNING answer_id`,
      [input.answerId, input.userId],
    );
    await client.query(`DELETE FROM ${opposite} WHERE answer_id = $1::bigint AND user_id = $2::bigint`, [input.answerId, input.userId]);
    if ((removed.rowCount ?? 0) === 0) {
      await client.query(`INSERT INTO ${target} (answer_id, user_id) VALUES ($1::bigint, $2::bigint) ON CONFLICT DO NOTHING`, [input.answerId, input.userId]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
