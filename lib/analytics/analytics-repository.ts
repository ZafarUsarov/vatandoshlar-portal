import { getDb } from "@/lib/db";

export type AnalyticsLocale =
  | "uz"
  | "de";

type RecordPageViewInput = Readonly<{
  countryCode: string | null;
  locale: AnalyticsLocale;
  path: string;
}>;

const COUNTRY_CODE_PATTERN =
  /^[A-Z]{2}$/;

const MAX_PATH_LENGTH =
  512;

function normalizeCountryCode(
  value: string | null,
): string {
  if (!value) {
    return "ZZ";
  }

  const normalized =
    value.trim().toUpperCase();

  return COUNTRY_CODE_PATTERN.test(
    normalized,
  )
    ? normalized
    : "ZZ";
}

function normalizePath(
  value: string,
): string | null {
  const trimmed =
    value.trim();

  if (
    trimmed.length === 0 ||
    trimmed.length > MAX_PATH_LENGTH ||
    !trimmed.startsWith("/")
  ) {
    return null;
  }

  const pathname =
    trimmed
      .split("?")[0]
      ?.split("#")[0]
      ?.trim();

  if (
    !pathname ||
    pathname.length === 0 ||
    pathname.length > MAX_PATH_LENGTH ||
    !pathname.startsWith("/")
  ) {
    return null;
  }

  return pathname;
}

export async function recordDailyPageView({
  countryCode,
  locale,
  path,
}: RecordPageViewInput): Promise<boolean> {
  const normalizedPath =
    normalizePath(path);

  if (!normalizedPath) {
    return false;
  }

  const normalizedCountryCode =
    normalizeCountryCode(
      countryCode,
    );

  await getDb().query(
    `
      INSERT INTO analytics_daily_page_views (
        day,
        country_code,
        locale,
        path,
        views,
        created_at,
        updated_at
      )
      VALUES (
        (
          NOW()
          AT TIME ZONE 'Europe/Berlin'
        )::date,
        $1,
        $2,
        $3,
        1,
        NOW(),
        NOW()
      )

      ON CONFLICT (
        day,
        country_code,
        locale,
        path
      )
      DO UPDATE
      SET
        views =
          analytics_daily_page_views.views
          + 1,
        updated_at = NOW()
    `,
    [
      normalizedCountryCode,
      locale,
      normalizedPath,
    ],
  );

  return true;
}
