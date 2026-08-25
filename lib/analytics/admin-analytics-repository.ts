import { getDb } from "@/lib/db";

type CountRow = Readonly<{
  value: string | number;
}>;

type CountryRow = Readonly<{
  country_code: string;
  views: string | number;
}>;

type LocaleRow = Readonly<{
  locale: "uz" | "de";
  views: string | number;
}>;

type PageRow = Readonly<{
  path: string;
  views: string | number;
}>;

type DailyRow = Readonly<{
  day: string | Date;
  views: string | number;
}>;

export type AnalyticsSummary = Readonly<{
  today: number;
  last7Days: number;
  last30Days: number;
  allTime: number;
}>;

export type AnalyticsCountryStat = Readonly<{
  countryCode: string;
  views: number;
}>;

export type AnalyticsLocaleStat = Readonly<{
  locale: "uz" | "de";
  views: number;
}>;

export type AnalyticsPageStat = Readonly<{
  path: string;
  views: number;
}>;

export type AnalyticsDailyStat = Readonly<{
  day: string;
  views: number;
}>;

export type AdminAnalyticsSnapshot = Readonly<{
  summary: AnalyticsSummary;
  countries: ReadonlyArray<AnalyticsCountryStat>;
  locales: ReadonlyArray<AnalyticsLocaleStat>;
  topPages: ReadonlyArray<AnalyticsPageStat>;
  daily: ReadonlyArray<AnalyticsDailyStat>;
}>;

const BERLIN_TODAY_SQL =
  "(NOW() AT TIME ZONE 'Europe/Berlin')::date";

function toNumber(
  value: string | number | null | undefined,
): number {
  const parsed = Number(value ?? 0);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
}

function toDateString(
  value: string | Date,
): string {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return value.toISOString().slice(0, 10);
}

async function getCount(
  whereSql = "",
): Promise<number> {
  const result = await getDb().query<CountRow>(
    `
      SELECT
        COALESCE(SUM(views), 0) AS value
      FROM analytics_daily_page_views
      ${whereSql}
    `,
  );

  return toNumber(
    result.rows[0]?.value,
  );
}

export async function getAdminAnalyticsSnapshot(): Promise<AdminAnalyticsSnapshot> {
  const [
    today,
    last7Days,
    last30Days,
    allTime,
    countriesResult,
    localesResult,
    topPagesResult,
    dailyResult,
  ] = await Promise.all([
    getCount(
      `WHERE day = ${BERLIN_TODAY_SQL}`,
    ),
    getCount(
      `WHERE day >= ${BERLIN_TODAY_SQL} - 6`,
    ),
    getCount(
      `WHERE day >= ${BERLIN_TODAY_SQL} - 29`,
    ),
    getCount(),
    getDb().query<CountryRow>(
      `
        SELECT
          country_code,
          SUM(views) AS views
        FROM analytics_daily_page_views
        WHERE
          day >= ${BERLIN_TODAY_SQL} - 29
        GROUP BY country_code
        ORDER BY
          SUM(views) DESC,
          country_code ASC
      `,
    ),
    getDb().query<LocaleRow>(
      `
        SELECT
          locale,
          SUM(views) AS views
        FROM analytics_daily_page_views
        WHERE
          day >= ${BERLIN_TODAY_SQL} - 29
        GROUP BY locale
        ORDER BY
          SUM(views) DESC,
          locale ASC
      `,
    ),
    getDb().query<PageRow>(
      `
        SELECT
          path,
          SUM(views) AS views
        FROM analytics_daily_page_views
        WHERE
          day >= ${BERLIN_TODAY_SQL} - 29
        GROUP BY path
        ORDER BY
          SUM(views) DESC,
          path ASC
        LIMIT 20
      `,
    ),
    getDb().query<DailyRow>(
      `
        SELECT
          day,
          SUM(views) AS views
        FROM analytics_daily_page_views
        WHERE
          day >= ${BERLIN_TODAY_SQL} - 29
        GROUP BY day
        ORDER BY day ASC
      `,
    ),
  ]);

  return {
    summary: {
      today,
      last7Days,
      last30Days,
      allTime,
    },
    countries:
      countriesResult.rows.map(
        (row) => ({
          countryCode:
            row.country_code,
          views:
            toNumber(row.views),
        }),
      ),
    locales:
      localesResult.rows.map(
        (row) => ({
          locale: row.locale,
          views:
            toNumber(row.views),
        }),
      ),
    topPages:
      topPagesResult.rows.map(
        (row) => ({
          path: row.path,
          views:
            toNumber(row.views),
        }),
      ),
    daily:
      dailyResult.rows.map(
        (row) => ({
          day:
            toDateString(row.day),
          views:
            toNumber(row.views),
        }),
      ),
  };
}
