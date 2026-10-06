import { getDb } from "@/lib/db";

import type {
  Answer,
  Question,
  QuestionCategory,
  QuestionTag,
  SavolContentLanguage,
  SavolContentStatus,
  SavolTaxonomyStatus,
} from "@/types/savol";

type QuestionCategoryRow = {
  id: string;
  key: string;
  label_uz: string;
  label_de: string;
  sort_order: number;
  status: string;
};

type QuestionTagRow = {
  id: string;
  key: string;
  label_uz: string;
  label_de: string;
  status: string;
};

type QuestionRow = {
  id: string;
  author_user_id: string;
  category_id: string;
  location_id: string | null;
  slug: string;
  title: string;
  body: string;
  content_language: string;
  status: string;
  created_at: string | Date;
  updated_at: string | Date;
};

type AnswerRow = {
  id: string;
  question_id: string;
  author_user_id: string;
  body: string;
  status: string;
  created_at: string | Date;
  updated_at: string | Date;
};

export type CreateQuestionInput = Readonly<{
  authorUserId: string;
  categoryId: string;
  locationId: string | null;
  slug: string;
  title: string;
  body: string;
  contentLanguage: SavolContentLanguage;
  tagIds: ReadonlyArray<string>;
}>;

export type CreateAnswerInput = Readonly<{
  questionId: string;
  authorUserId: string;
  body: string;
}>;

function toDateTimeString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

function normalizeContentLanguage(value: string): SavolContentLanguage {
  return value === "de" ? "de" : "uz";
}

function normalizeContentStatus(value: string): SavolContentStatus {
  if (value === "hidden" || value === "removed") {
    return value;
  }

  return "published";
}

function normalizeTaxonomyStatus(value: string): SavolTaxonomyStatus {
  return value === "inactive" ? "inactive" : "active";
}

function toQuestionCategory(row: QuestionCategoryRow): QuestionCategory {
  return {
    id: row.id,
    key: row.key,
    labelUz: row.label_uz,
    labelDe: row.label_de,
    sortOrder: row.sort_order,
    status: normalizeTaxonomyStatus(row.status),
  };
}

function toQuestionTag(row: QuestionTagRow): QuestionTag {
  return {
    id: row.id,
    key: row.key,
    labelUz: row.label_uz,
    labelDe: row.label_de,
    status: normalizeTaxonomyStatus(row.status),
  };
}

function toQuestion(row: QuestionRow): Question {
  return {
    id: row.id,
    authorUserId: row.author_user_id,
    categoryId: row.category_id,
    locationId: row.location_id,
    slug: row.slug,
    title: row.title,
    body: row.body,
    contentLanguage: normalizeContentLanguage(row.content_language),
    status: normalizeContentStatus(row.status),
    createdAt: toDateTimeString(row.created_at),
    updatedAt: toDateTimeString(row.updated_at),
  };
}

function toAnswer(row: AnswerRow): Answer {
  return {
    id: row.id,
    questionId: row.question_id,
    authorUserId: row.author_user_id,
    body: row.body,
    status: normalizeContentStatus(row.status),
    createdAt: toDateTimeString(row.created_at),
    updatedAt: toDateTimeString(row.updated_at),
  };
}

const questionSelect = `
  SELECT
    id::text,
    author_user_id::text,
    category_id::text,
    location_id::text,
    slug,
    title,
    body,
    content_language,
    status,
    created_at,
    updated_at
  FROM questions
`;

const answerSelect = `
  SELECT
    id::text,
    question_id::text,
    author_user_id::text,
    body,
    status,
    created_at,
    updated_at
  FROM answers
`;

export async function getActiveQuestionCategories(): Promise<
  ReadonlyArray<QuestionCategory>
> {
  const result = await getDb().query<QuestionCategoryRow>(
    `
      SELECT
        id::text,
        key,
        label_uz,
        label_de,
        sort_order,
        status
      FROM question_categories
      WHERE status = 'active'
      ORDER BY sort_order ASC, id ASC
    `,
  );

  return result.rows.map(toQuestionCategory);
}

export async function getActiveQuestionTags(): Promise<
  ReadonlyArray<QuestionTag>
> {
  const result = await getDb().query<QuestionTagRow>(
    `
      SELECT
        id::text,
        key,
        label_uz,
        label_de,
        status
      FROM question_tags
      WHERE status = 'active'
      ORDER BY key ASC, id ASC
    `,
  );

  return result.rows.map(toQuestionTag);
}

export async function getPublishedQuestions(
  limit = 30,
): Promise<ReadonlyArray<Question>> {
  const safeLimit = Math.max(1, Math.min(limit, 100));

  const result = await getDb().query<QuestionRow>(
    `
      ${questionSelect}
      WHERE status = 'published'
      ORDER BY created_at DESC, id DESC
      LIMIT $1
    `,
    [safeLimit],
  );

  return result.rows.map(toQuestion);
}

export async function getPublishedQuestionBySlug(
  slug: string,
): Promise<Question | null> {
  const result = await getDb().query<QuestionRow>(
    `
      ${questionSelect}
      WHERE slug = $1
        AND status = 'published'
      LIMIT 1
    `,
    [slug],
  );

  const row = result.rows[0];
  return row ? toQuestion(row) : null;
}

export async function getPublishedAnswersForQuestion(
  questionId: string,
): Promise<ReadonlyArray<Answer>> {
  const result = await getDb().query<AnswerRow>(
    `
      ${answerSelect}
      WHERE question_id = $1
        AND status = 'published'
      ORDER BY created_at ASC, id ASC
    `,
    [questionId],
  );

  return result.rows.map(toAnswer);
}

export async function createQuestion(
  input: CreateQuestionInput,
): Promise<Question> {
  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    const questionResult = await client.query<QuestionRow>(
      `
        INSERT INTO questions (
          author_user_id,
          category_id,
          location_id,
          slug,
          title,
          body,
          content_language
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id::text,
          author_user_id::text,
          category_id::text,
          location_id::text,
          slug,
          title,
          body,
          content_language,
          status,
          created_at,
          updated_at
      `,
      [
        input.authorUserId,
        input.categoryId,
        input.locationId,
        input.slug,
        input.title,
        input.body,
        input.contentLanguage,
      ],
    );

    const question = questionResult.rows[0];

    if (!question) {
      throw new Error("Question insert did not return a row.");
    }

    for (const tagId of [...new Set(input.tagIds)]) {
      await client.query(
        `
          INSERT INTO question_tag_assignments (question_id, tag_id)
          VALUES ($1, $2)
          ON CONFLICT (question_id, tag_id) DO NOTHING
        `,
        [question.id, tagId],
      );
    }

    await client.query("COMMIT");
    return toQuestion(question);
  } catch (error) {
    try { await client.query("ROLLBACK"); } catch {}
    throw error;
  } finally {
    client.release();
  }
}

export async function createAnswer(
  input: CreateAnswerInput,
): Promise<Answer> {
  const result = await getDb().query<AnswerRow>(
    `
      INSERT INTO answers (
        question_id,
        author_user_id,
        body
      )
      VALUES ($1, $2, $3)
      RETURNING
        id::text,
        question_id::text,
        author_user_id::text,
        body,
        status,
        created_at,
        updated_at
    `,
    [
      input.questionId,
      input.authorUserId,
      input.body,
    ],
  );

  const answer = result.rows[0];

  if (!answer) {
    throw new Error("Answer insert did not return a row.");
  }

  return toAnswer(answer);
}

export async function getAnswerHelpfulCounts(
  answerIds: ReadonlyArray<string>,
): Promise<ReadonlyMap<string, number>> {
  const uniqueAnswerIds = [...new Set(answerIds)];

  if (uniqueAnswerIds.length === 0) {
    return new Map();
  }

  const result = await getDb().query<{
    answer_id: string;
    helpful_count: number;
  }>(
    `
      SELECT
        answer_id::text,
        COUNT(*)::int AS helpful_count
      FROM answer_helpful_votes
      WHERE answer_id = ANY($1::bigint[])
      GROUP BY answer_id
    `,
    [uniqueAnswerIds],
  );

  return new Map(
    result.rows.map((row) => [row.answer_id, row.helpful_count] as const),
  );
}

export async function hasUserMarkedAnswerHelpful(
  answerId: string,
  userId: string,
): Promise<boolean> {
  const result = await getDb().query<{ exists: boolean }>(
    `
      SELECT EXISTS (
        SELECT 1
        FROM answer_helpful_votes
        WHERE answer_id = $1
          AND user_id = $2
      ) AS exists
    `,
    [answerId, userId],
  );

  return result.rows[0]?.exists ?? false;
}

export async function toggleAnswerHelpfulVote(
  answerId: string,
  userId: string,
): Promise<boolean> {
  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    const deleted = await client.query(
      `
        DELETE FROM answer_helpful_votes
        WHERE answer_id = $1
          AND user_id = $2
        RETURNING answer_id
      `,
      [answerId, userId],
    );

    if ((deleted.rowCount ?? 0) > 0) {
      await client.query("COMMIT");
      return false;
    }

    await client.query(
      `
        INSERT INTO answer_helpful_votes (answer_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (answer_id, user_id) DO NOTHING
      `,
      [answerId, userId],
    );

    await client.query("COMMIT");
    return true;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {}
    throw error;
  } finally {
    client.release();
  }
}

export async function getQuestionFollowCount(
  questionId: string,
): Promise<number> {
  const result = await getDb().query<{ follow_count: number }>(
    `
      SELECT COUNT(*)::int AS follow_count
      FROM question_follows
      WHERE question_id = $1
    `,
    [questionId],
  );

  return result.rows[0]?.follow_count ?? 0;
}

export async function isQuestionFollowedByUser(
  questionId: string,
  userId: string,
): Promise<boolean> {
  const result = await getDb().query<{ exists: boolean }>(
    `
      SELECT EXISTS (
        SELECT 1
        FROM question_follows
        WHERE question_id = $1
          AND user_id = $2
      ) AS exists
    `,
    [questionId, userId],
  );

  return result.rows[0]?.exists ?? false;
}

export async function toggleQuestionFollow(
  questionId: string,
  userId: string,
): Promise<boolean> {
  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    const deleted = await client.query(
      `
        DELETE FROM question_follows
        WHERE question_id = $1
          AND user_id = $2
        RETURNING question_id
      `,
      [questionId, userId],
    );

    if ((deleted.rowCount ?? 0) > 0) {
      await client.query("COMMIT");
      return false;
    }

    await client.query(
      `
        INSERT INTO question_follows (question_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (question_id, user_id) DO NOTHING
      `,
      [questionId, userId],
    );

    await client.query("COMMIT");
    return true;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {}
    throw error;
  } finally {
    client.release();
  }
}
