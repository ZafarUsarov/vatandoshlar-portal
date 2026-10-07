import { getDb } from "@/lib/db";
import type { SavolContentStatus } from "@/types/savol";

export type SavolReportReason =
  | "spam"
  | "abuse"
  | "misinformation"
  | "other";

export type SavolReportTarget =
  | "question"
  | "answer";

export type SavolModerationReport = Readonly<{
  id: string;
  reporterUserId: string;
  targetType: SavolReportTarget;
  targetId: string;
  questionSlug: string;
  questionTitle: string;
  contentBody: string;
  contentStatus: SavolContentStatus;
  reason: SavolReportReason;
  details: string | null;
  createdAt: string;
}>;

type ReportRow = {
  id: string;
  reporter_user_id: string;
  target_type: SavolReportTarget;
  target_id: string;
  question_slug: string;
  question_title: string;
  content_body: string;
  content_status: SavolContentStatus;
  reason: SavolReportReason;
  details: string | null;
  created_at: string | Date;
};

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

export async function createContentReport(
  input: Readonly<{
    reporterUserId: string;
    targetType: SavolReportTarget;
    targetId: string;
    reason: SavolReportReason;
    details: string | null;
  }>,
): Promise<"created" | "duplicate"> {
  const targetColumn =
    input.targetType === "question"
      ? "question_id"
      : "answer_id";

  const result = await getDb().query(
    `
      INSERT INTO content_reports (
        reporter_user_id,
        ${targetColumn},
        reason,
        details
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
      RETURNING id
    `,
    [
      input.reporterUserId,
      input.targetId,
      input.reason,
      input.details,
    ],
  );

  return (result.rowCount ?? 0) > 0
    ? "created"
    : "duplicate";
}

export async function getOpenSavolReports(
  limit = 100,
): Promise<
  ReadonlyArray<SavolModerationReport>
> {
  const safeLimit = Math.max(
    1,
    Math.min(limit, 200),
  );

  const result =
    await getDb().query<ReportRow>(
      `
        SELECT *
        FROM (
          SELECT
            cr.id::text,
            cr.reporter_user_id::text,
            'question'::text AS target_type,
            q.id::text AS target_id,
            q.slug AS question_slug,
            q.title AS question_title,
            q.body AS content_body,
            q.status AS content_status,
            cr.reason,
            cr.details,
            cr.created_at
          FROM content_reports cr
          JOIN questions q
            ON q.id = cr.question_id
          WHERE cr.status = 'open'
            AND cr.question_id IS NOT NULL

          UNION ALL

          SELECT
            cr.id::text,
            cr.reporter_user_id::text,
            'answer'::text AS target_type,
            a.id::text AS target_id,
            q.slug AS question_slug,
            q.title AS question_title,
            a.body AS content_body,
            a.status AS content_status,
            cr.reason,
            cr.details,
            cr.created_at
          FROM content_reports cr
          JOIN answers a
            ON a.id = cr.answer_id
          JOIN questions q
            ON q.id = a.question_id
          WHERE cr.status = 'open'
            AND cr.answer_id IS NOT NULL
        ) reports
        ORDER BY created_at ASC, id ASC
        LIMIT $1
      `,
      [safeLimit],
    );

  return result.rows.map((row) => ({
    id: row.id,
    reporterUserId:
      row.reporter_user_id,
    targetType:
      row.target_type,
    targetId:
      row.target_id,
    questionSlug:
      row.question_slug,
    questionTitle:
      row.question_title,
    contentBody:
      row.content_body,
    contentStatus:
      row.content_status,
    reason:
      row.reason,
    details:
      row.details,
    createdAt:
      toDateTimeString(
        row.created_at,
      ),
  }));
}

export async function moderateSavolReport(
  input: Readonly<{
    reportId: string;
    targetType: SavolReportTarget;
    targetId: string;
    contentStatus: SavolContentStatus;
  }>,
): Promise<boolean> {
  const client =
    await getDb().connect();

  try {
    await client.query("BEGIN");

    const targetColumn =
      input.targetType === "question"
        ? "question_id"
        : "answer_id";

    const reportResult =
      await client.query<{
        exists: boolean;
      }>(
        `
          SELECT EXISTS (
            SELECT 1
            FROM content_reports
            WHERE id = $1
              AND status = 'open'
              AND ${targetColumn} = $2
          ) AS exists
        `,
        [
          input.reportId,
          input.targetId,
        ],
      );

    if (
      !reportResult.rows[0]?.exists
    ) {
      await client.query(
        "ROLLBACK",
      );

      return false;
    }

    const table =
      input.targetType === "question"
        ? "questions"
        : "answers";

    await client.query(
      `
        UPDATE ${table}
        SET
          status = $1,
          updated_at = NOW()
        WHERE id = $2
      `,
      [
        input.contentStatus,
        input.targetId,
      ],
    );

    /*
     * Moderation lifecycle:
     *
     * hidden:
     *   Content is temporarily hidden while the report remains open.
     *   This allows the moderator to restore or permanently remove it.
     *
     * published:
     *   Moderator restores/approves the content.
     *   The report is resolved.
     *
     * removed:
     *   Moderator permanently removes the content.
     *   The report is resolved.
     */
    if (
      input.contentStatus !==
      "hidden"
    ) {
      await client.query(
        `
          UPDATE content_reports
          SET
            status = 'resolved',
            resolved_at = NOW()
          WHERE status = 'open'
            AND ${targetColumn} = $1
        `,
        [input.targetId],
      );
    }

    await client.query("COMMIT");

    return true;
  } catch (error) {
    try {
      await client.query(
        "ROLLBACK",
      );
    } catch {
      // Preserve the original database error.
    }

    throw error;
  } finally {
    client.release();
  }
}