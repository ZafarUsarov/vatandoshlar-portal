import { getDb } from "@/lib/db";

export type AdminNewsStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminNewsArticleSummary = {
  id: string;
  slug: string;
  titleUz: string;
  titleDe: string;
  status: AdminNewsStatus;
  featured: boolean;
  verifiedAt: string;
  updatedAt: string;
};

type AdminNewsArticleRow = {
  id: string;
  slug: string;
  title_uz: string;
  title_de: string;
  status: string;
  featured: boolean;
  verified_at: string | Date;
  updated_at: string | Date;
};

function normalizeStatus(
  status: string,
): AdminNewsStatus {
  if (
    status === "published" ||
    status === "archived"
  ) {
    return status;
  }

  return "draft";
}

function toDateString(
  value: string | Date,
): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function toAdminNewsArticleSummary(
  row: AdminNewsArticleRow,
): AdminNewsArticleSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleUz: row.title_uz,
    titleDe: row.title_de,
    status: normalizeStatus(row.status),
    featured: row.featured,
    verifiedAt: toDateString(
      row.verified_at,
    ),
    updatedAt: toDateString(
      row.updated_at,
    ),
  };
}

export async function getAdminNewsArticles(): Promise<
  AdminNewsArticleSummary[]
> {
  const result =
    await getDb().query<AdminNewsArticleRow>(
      `
        SELECT
          id::text,
          slug,
          title_uz,
          title_de,
          status,
          featured,
          verified_at,
          updated_at
        FROM news_articles
        ORDER BY
          updated_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toAdminNewsArticleSummary,
  );
}
