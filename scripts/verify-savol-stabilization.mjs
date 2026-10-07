import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
});

const client = await pool.connect();

const expectedTables = [
  "answer_helpful_votes",
  "answers",
  "content_reports",
  "notifications",
  "question_categories",
  "question_follows",
  "question_tags",
  "questions",
];

const expectedIndexes = [
  "answer_helpful_votes_user_idx",
  "content_reports_unique_question_reporter_idx",
  "content_reports_unique_answer_reporter_idx",
  "content_reports_status_created_idx",
  "content_reports_question_idx",
  "content_reports_answer_idx",
  "notifications_savol_new_answer_user_idx",
  "notifications_user_created_idx",
  "notifications_user_unread_idx",
  "question_follows_user_idx",
];

try {
  const tableResult = await client.query(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY($1::text[])
      ORDER BY table_name
    `,
    [expectedTables],
  );

  const indexResult = await client.query(
    `
      SELECT indexname
      FROM pg_indexes
      WHERE schemaname = 'public'
        AND indexname = ANY($1::text[])
      ORDER BY indexname
    `,
    [expectedIndexes],
  );

  const duplicateHelpfulResult = await client.query(`
    SELECT answer_id::text, user_id::text, COUNT(*)::int AS count
    FROM answer_helpful_votes
    GROUP BY answer_id, user_id
    HAVING COUNT(*) > 1
  `);

  const duplicateFollowResult = await client.query(`
    SELECT question_id::text, user_id::text, COUNT(*)::int AS count
    FROM question_follows
    GROUP BY question_id, user_id
    HAVING COUNT(*) > 1
  `);

  const selfNotificationResult = await client.query(`
    SELECT n.id::text
    FROM notifications n
    WHERE n.actor_user_id IS NOT NULL
      AND n.actor_user_id = n.user_id
  `);

  const orphanAnswerResult = await client.query(`
    SELECT a.id::text
    FROM answers a
    LEFT JOIN questions q ON q.id = a.question_id
    WHERE q.id IS NULL
  `);

  const orphanFollowResult = await client.query(`
    SELECT f.question_id::text, f.user_id::text
    FROM question_follows f
    LEFT JOIN questions q ON q.id = f.question_id
    LEFT JOIN public_users u ON u.id = f.user_id
    WHERE q.id IS NULL OR u.id IS NULL
  `);

  const orphanHelpfulResult = await client.query(`
    SELECT v.answer_id::text, v.user_id::text
    FROM answer_helpful_votes v
    LEFT JOIN answers a ON a.id = v.answer_id
    LEFT JOIN public_users u ON u.id = v.user_id
    WHERE a.id IS NULL OR u.id IS NULL
  `);

  const orphanNotificationResult = await client.query(`
    SELECT n.id::text
    FROM notifications n
    LEFT JOIN public_users recipient ON recipient.id = n.user_id
    LEFT JOIN public_users actor ON actor.id = n.actor_user_id
    LEFT JOIN questions q ON q.id = n.question_id
    LEFT JOIN answers a ON a.id = n.answer_id
    WHERE recipient.id IS NULL
       OR (n.actor_user_id IS NOT NULL AND actor.id IS NULL)
       OR (n.question_id IS NOT NULL AND q.id IS NULL)
       OR (n.answer_id IS NOT NULL AND a.id IS NULL)
  `);

  const invalidQuestionStatusResult = await client.query(`
    SELECT id::text, status
    FROM questions
    WHERE status NOT IN ('published', 'hidden', 'removed')
  `);

  const invalidAnswerStatusResult = await client.query(`
    SELECT id::text, status
    FROM answers
    WHERE status NOT IN ('published', 'hidden', 'removed')
  `);

  const invalidReportStatusResult = await client.query(`
    SELECT id::text, status
    FROM content_reports
    WHERE status NOT IN ('open', 'resolved')
  `);

  const countsResult = await client.query(`
    SELECT
      (SELECT COUNT(*)::int FROM questions) AS questions,
      (SELECT COUNT(*)::int FROM answers) AS answers,
      (SELECT COUNT(*)::int FROM question_follows) AS follows,
      (SELECT COUNT(*)::int FROM answer_helpful_votes) AS helpful_votes,
      (SELECT COUNT(*)::int FROM content_reports) AS reports,
      (SELECT COUNT(*)::int FROM notifications) AS notifications
  `);

  const errors = [];
  const presentTables = new Set(tableResult.rows.map((row) => row.table_name));
  const presentIndexes = new Set(indexResult.rows.map((row) => row.indexname));

  for (const table of expectedTables) {
    if (!presentTables.has(table)) errors.push(`Missing Savol table: ${table}.`);
  }

  for (const index of expectedIndexes) {
    if (!presentIndexes.has(index)) errors.push(`Missing Savol index: ${index}.`);
  }

  if (duplicateHelpfulResult.rows.length > 0) errors.push(`Found ${duplicateHelpfulResult.rows.length} duplicate helpful vote pair(s).`);
  if (duplicateFollowResult.rows.length > 0) errors.push(`Found ${duplicateFollowResult.rows.length} duplicate question follow pair(s).`);
  if (selfNotificationResult.rows.length > 0) errors.push(`Found ${selfNotificationResult.rows.length} self-notification(s).`);
  if (orphanAnswerResult.rows.length > 0) errors.push(`Found ${orphanAnswerResult.rows.length} orphan answer(s).`);
  if (orphanFollowResult.rows.length > 0) errors.push(`Found ${orphanFollowResult.rows.length} orphan question follow(s).`);
  if (orphanHelpfulResult.rows.length > 0) errors.push(`Found ${orphanHelpfulResult.rows.length} orphan helpful vote(s).`);
  if (orphanNotificationResult.rows.length > 0) errors.push(`Found ${orphanNotificationResult.rows.length} orphan notification(s).`);
  if (invalidQuestionStatusResult.rows.length > 0) errors.push(`Found ${invalidQuestionStatusResult.rows.length} question(s) with unsupported status.`);
  if (invalidAnswerStatusResult.rows.length > 0) errors.push(`Found ${invalidAnswerStatusResult.rows.length} answer(s) with unsupported status.`);
  if (invalidReportStatusResult.rows.length > 0) errors.push(`Found ${invalidReportStatusResult.rows.length} report(s) with unsupported status.`);

  const counts = countsResult.rows[0] ?? {};

  console.log("");
  console.log("Savol stabilization verification");
  console.log("--------------------------------");
  console.log(`Questions: ${counts.questions ?? 0}`);
  console.log(`Answers: ${counts.answers ?? 0}`);
  console.log(`Follows: ${counts.follows ?? 0}`);
  console.log(`Helpful votes: ${counts.helpful_votes ?? 0}`);
  console.log(`Reports: ${counts.reports ?? 0}`);
  console.log(`Notifications: ${counts.notifications ?? 0}`);

  if (errors.length > 0) {
    console.error("");
    for (const error of errors) console.error(`ERROR: ${error}`);
    throw new Error("Savol stabilization verification failed.");
  }

  console.log("");
  console.log("Schema/index coverage: PASS");
  console.log("Helpful/follow uniqueness: PASS");
  console.log("Referential integrity: PASS");
  console.log("Lifecycle status integrity: PASS");
  console.log("Self-notification protection: PASS");
  console.log("");
  console.log("Verification PASSED.");
} finally {
  client.release();
  await pool.end();
}
