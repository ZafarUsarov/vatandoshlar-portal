import { cache } from "react";

import { getDb } from "@/lib/db";

export type PublicSupporter = {
  name: string;
  totalEurCents: number;
  contributionCount: number;
};

export type PublicSupportSummary = {
  totalEurCents: number;
  contributionCount: number;
  publicSupporterCount: number;
  anonymousContributionCount: number;
  supporters: PublicSupporter[];
};

type PublicSupportStatsRow = {
  total_eur_cents: string | number;
  contribution_count: string | number;
  public_supporter_count: string | number;
  anonymous_contribution_count:
    | string
    | number;
};

type PublicSupporterRow = {
  supporter_name: string;
  total_eur_cents: string | number;
  contribution_count: string | number;
};

function hasDatabaseConfiguration(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function canSkipDatabaseDuringBuild(): boolean {
  return (
    !hasDatabaseConfiguration() &&
    process.env.CI === "true"
  );
}

function assertDatabaseAvailable(): void {
  if (
    hasDatabaseConfiguration() ||
    canSkipDatabaseDuringBuild()
  ) {
    return;
  }

  throw new Error(
    "DATABASE_URL is not configured for public Support runtime.",
  );
}

function toSafeInteger(
  value: string | number,
  fieldName: string,
): number {
  const parsed =
    typeof value === "number"
      ? value
      : Number.parseInt(value, 10);

  if (!Number.isSafeInteger(parsed)) {
    throw new Error(
      `Public support ${fieldName} is outside the safe integer range.`,
    );
  }

  return parsed;
}

function toPublicSupporter(
  row: PublicSupporterRow,
): PublicSupporter {
  return {
    name: row.supporter_name,
    totalEurCents: toSafeInteger(
      row.total_eur_cents,
      "total_eur_cents",
    ),
    contributionCount: toSafeInteger(
      row.contribution_count,
      "contribution_count",
    ),
  };
}

const loadPublicSupportSummary =
  cache(
    async (): Promise<PublicSupportSummary> => {
      assertDatabaseAvailable();

      if (canSkipDatabaseDuringBuild()) {
        return {
          totalEurCents: 0,
          contributionCount: 0,
          publicSupporterCount: 0,
          anonymousContributionCount: 0,
          supporters: [],
        };
      }

      const [statsResult, supportersResult] =
        await Promise.all([
          getDb().query<PublicSupportStatsRow>(
            `
              SELECT
                COALESCE(
                  SUM(amount_eur_cents),
                  0
                ) AS total_eur_cents,
                COUNT(*) AS contribution_count,
                COUNT(
                  DISTINCT CASE
                    WHEN
                      visibility = 'public'
                      AND supporter_name IS NOT NULL
                    THEN LOWER(
                      BTRIM(supporter_name)
                    )
                  END
                ) AS public_supporter_count,
                COUNT(*) FILTER (
                  WHERE visibility = 'anonymous'
                ) AS anonymous_contribution_count
              FROM support_contributions
              WHERE status = 'confirmed'
            `,
          ),
          getDb().query<PublicSupporterRow>(
            `
              SELECT
                MIN(
                  BTRIM(supporter_name)
                ) AS supporter_name,
                SUM(
                  amount_eur_cents
                ) AS total_eur_cents,
                COUNT(*) AS contribution_count
              FROM support_contributions
              WHERE
                status = 'confirmed'
                AND visibility = 'public'
                AND supporter_name IS NOT NULL
              GROUP BY LOWER(
                BTRIM(supporter_name)
              )
              ORDER BY
                SUM(
                  amount_eur_cents
                ) DESC,
                MIN(
                  contributed_at
                ) ASC,
                LOWER(
                  BTRIM(supporter_name)
                ) ASC
            `,
          ),
        ]);

      const stats = statsResult.rows[0];

      return {
        totalEurCents: stats
          ? toSafeInteger(
              stats.total_eur_cents,
              "total_eur_cents",
            )
          : 0,
        contributionCount: stats
          ? toSafeInteger(
              stats.contribution_count,
              "contribution_count",
            )
          : 0,
        publicSupporterCount: stats
          ? toSafeInteger(
              stats.public_supporter_count,
              "public_supporter_count",
            )
          : 0,
        anonymousContributionCount: stats
          ? toSafeInteger(
              stats.anonymous_contribution_count,
              "anonymous_contribution_count",
            )
          : 0,
        supporters:
          supportersResult.rows.map(
            toPublicSupporter,
          ),
      };
    },
  );

export async function getPublicSupportSummary(): Promise<PublicSupportSummary> {
  return loadPublicSupportSummary();
}
