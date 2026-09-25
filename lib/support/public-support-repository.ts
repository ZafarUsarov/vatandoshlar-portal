import { cache } from "react";

import { getDb } from "@/lib/db";

export type SupportCurrency = "EUR" | "UZS";

export type PublicSupportAmount = {
  amountMinor: number;
  currency: SupportCurrency;
};

export type PublicSupporter = {
  name: string;
  rankingEurCents: number;
  contributionCount: number;
  amounts: PublicSupportAmount[];
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
  anonymous_contribution_count: string | number;
};

type PublicSupporterRow = {
  supporter_name: string;
  ranking_eur_cents: string | number;
  contribution_count: string | number;
  amounts: unknown;
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

function normalizeCurrency(
  value: unknown,
): SupportCurrency {
  return value === "UZS" ? "UZS" : "EUR";
}

function toPublicAmounts(
  value: unknown,
): PublicSupportAmount[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (
      typeof item !== "object" ||
      item === null ||
      !("amountMinor" in item) ||
      !("currency" in item)
    ) {
      return [];
    }

    const rawAmount = item.amountMinor;
    if (
      typeof rawAmount !== "string" &&
      typeof rawAmount !== "number"
    ) {
      return [];
    }

    return [
      {
        amountMinor: toSafeInteger(
          rawAmount,
          "amount_minor",
        ),
        currency: normalizeCurrency(item.currency),
      },
    ];
  });
}

function toPublicSupporter(
  row: PublicSupporterRow,
): PublicSupporter {
  return {
    name: row.supporter_name,
    rankingEurCents: toSafeInteger(
      row.ranking_eur_cents,
      "ranking_eur_cents",
    ),
    contributionCount: toSafeInteger(
      row.contribution_count,
      "contribution_count",
    ),
    amounts: toPublicAmounts(row.amounts),
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
              WITH normalized_contributions AS (
                SELECT
                  CASE
                    WHEN visibility = 'anonymous'
                      THEN '__anonymous__'
                    ELSE LOWER(BTRIM(supporter_name))
                  END AS supporter_key,
                  CASE
                    WHEN visibility = 'anonymous'
                      THEN '__anonymous__'
                    ELSE BTRIM(supporter_name)
                  END AS supporter_name,
                  amount_minor,
                  currency,
                  amount_eur_cents,
                  contributed_at
                FROM support_contributions
                WHERE
                  status = 'confirmed'
                  AND (
                    visibility = 'anonymous'
                    OR (
                      visibility = 'public'
                      AND supporter_name IS NOT NULL
                      AND BTRIM(supporter_name) <> ''
                    )
                  )
              ),
              supporter_totals AS (
                SELECT
                  supporter_key,
                  MIN(supporter_name) AS supporter_name,
                  SUM(amount_eur_cents) AS ranking_eur_cents,
                  COUNT(*) AS contribution_count,
                  MIN(contributed_at) AS first_contributed_at
                FROM normalized_contributions
                GROUP BY supporter_key
              ),
              original_amounts AS (
                SELECT
                  supporter_key,
                  currency,
                  SUM(amount_minor) AS amount_minor
                FROM normalized_contributions
                GROUP BY supporter_key, currency
              )
              SELECT
                totals.supporter_name,
                totals.ranking_eur_cents,
                totals.contribution_count,
                COALESCE(
                  JSON_AGG(
                    JSON_BUILD_OBJECT(
                      'amountMinor',
                      amounts.amount_minor,
                      'currency',
                      amounts.currency
                    )
                    ORDER BY
                      CASE
                        WHEN amounts.currency = 'EUR'
                          THEN 0
                        ELSE 1
                      END,
                      amounts.currency
                  ) FILTER (
                    WHERE amounts.currency IS NOT NULL
                  ),
                  '[]'::json
                ) AS amounts
              FROM supporter_totals AS totals
              LEFT JOIN original_amounts AS amounts
                ON amounts.supporter_key =
                  totals.supporter_key
              GROUP BY
                totals.supporter_key,
                totals.supporter_name,
                totals.ranking_eur_cents,
                totals.contribution_count,
                totals.first_contributed_at
              ORDER BY
                totals.ranking_eur_cents DESC,
                totals.first_contributed_at ASC,
                totals.supporter_key ASC
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
