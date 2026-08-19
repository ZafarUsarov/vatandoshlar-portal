import type { PoolClient } from "pg";

import { getDb } from "@/lib/db";

export type ViewableContentType =
  | "news"
  | "guide";

type RecordContentViewInput = Readonly<{
  contentType: ViewableContentType;
  contentId: string;
  visitorKey: string;
}>;

type DedupRow = {
  should_count: boolean;
};

const DEDUP_WINDOW =
  "24 hours";

function isValidContentId(
  contentId: string,
): boolean {
  return (
    contentId.length > 0 &&
    contentId.length <= 128
  );
}

function isValidVisitorKey(
  visitorKey: string,
): boolean {
  return (
    visitorKey.length >= 32 &&
    visitorKey.length <= 128
  );
}

async function isPublishedContent(
  client: PoolClient,
  contentType: ViewableContentType,
  contentId: string,
): Promise<boolean> {
  if (contentType === "news") {
    const result =
      await client.query<{ exists: boolean }>(
        `
          SELECT EXISTS (
            SELECT 1
            FROM news_articles
            WHERE
              id::text = $1
              AND status = 'published'
          ) AS exists
        `,
        [contentId],
      );

    return result.rows[0]?.exists === true;
  }

  const result =
    await client.query<{ exists: boolean }>(
      `
        SELECT EXISTS (
          SELECT 1
          FROM guide_articles
          WHERE
            id::text = $1
            AND status = 'published'
        ) AS exists
      `,
      [contentId],
    );

  return result.rows[0]?.exists === true;
}

async function claimViewWindow(
  client: PoolClient,
  contentType: ViewableContentType,
  contentId: string,
  visitorKey: string,
): Promise<boolean> {
  const result =
    await client.query<DedupRow>(
      `
        INSERT INTO content_view_dedup (
          content_type,
          content_id,
          visitor_key,
          viewed_at
        )
        VALUES (
          $1,
          $2,
          $3,
          NOW()
        )

        ON CONFLICT (
          content_type,
          content_id,
          visitor_key
        )
        DO UPDATE
        SET
          viewed_at = NOW()
        WHERE
          content_view_dedup.viewed_at
            <= NOW() - $4::interval

        RETURNING TRUE AS should_count
      `,
      [
        contentType,
        contentId,
        visitorKey,
        DEDUP_WINDOW,
      ],
    );

  return result.rows.length > 0;
}

async function incrementViewCount(
  client: PoolClient,
  contentType: ViewableContentType,
  contentId: string,
): Promise<void> {
  if (contentType === "news") {
    await client.query(
      `
        UPDATE news_articles
        SET
          view_count = view_count + 1
        WHERE
          id::text = $1
          AND status = 'published'
      `,
      [contentId],
    );

    return;
  }

  await client.query(
    `
      UPDATE guide_articles
      SET
        view_count = view_count + 1
      WHERE
        id::text = $1
        AND status = 'published'
    `,
    [contentId],
  );
}

export async function recordContentView({
  contentType,
  contentId,
  visitorKey,
}: RecordContentViewInput): Promise<boolean> {
  if (
    !isValidContentId(contentId) ||
    !isValidVisitorKey(visitorKey)
  ) {
    return false;
  }

  const client =
    await getDb().connect();

  try {
    await client.query("BEGIN");

    const published =
      await isPublishedContent(
        client,
        contentType,
        contentId,
      );

    if (!published) {
      await client.query("ROLLBACK");

      return false;
    }

    const shouldCount =
      await claimViewWindow(
        client,
        contentType,
        contentId,
        visitorKey,
      );

    if (!shouldCount) {
      await client.query("COMMIT");

      return false;
    }

    await incrementViewCount(
      client,
      contentType,
      contentId,
    );

    await client.query("COMMIT");

    return true;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // Preserve the original database error.
    }

    throw error;
  } finally {
    client.release();
  }
}
