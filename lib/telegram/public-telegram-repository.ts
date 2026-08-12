import { getDb } from "@/lib/db";

import type {
  SupportedTelegramLocale,
  TelegramGroup,
  TelegramGroupStatus,
} from "@/types/telegram";

type PublicTelegramGroupRow = {
  bundesland: string;
  short_name: string;

  custom_name_uz: string | null;
  custom_name_de: string | null;

  custom_description_uz: string | null;
  custom_description_de: string | null;

  href: string | null;

  button_type: string;
  group_status: string;
};

function hasDatabaseConfiguration(): boolean {
  return Boolean(
    process.env.DATABASE_URL,
  );
}

function canSkipDatabaseDuringCi(): boolean {
  return (
    process.env.CI === "true" &&
    !hasDatabaseConfiguration()
  );
}

function assertDatabaseAvailable(): void {
  if (
    hasDatabaseConfiguration() ||
    canSkipDatabaseDuringCi()
  ) {
    return;
  }

  throw new Error(
    "DATABASE_URL is not configured for public Telegram runtime.",
  );
}

function normalizeGroupStatus(
  value: string,
): TelegramGroupStatus {
  return value === "active"
    ? "active"
    : "coming-soon";
}

function getDefaultDescription(
  bundesland: string,
  status: TelegramGroupStatus,
  locale: SupportedTelegramLocale,
): string {
  if (
    status === "active"
  ) {
    return locale === "uz"
      ? `${bundesland} hududidagi vatandoshlar uchun Telegram guruhi.`
      : `Telegram-Gruppe für die usbekische Community in ${bundesland}.`;
  }

  return locale === "uz"
    ? `${bundesland} uchun Telegram guruhi tez orada qo‘shiladi.`
    : `Eine Telegram-Gruppe für ${bundesland} wird demnächst ergänzt.`;
}

function toTelegramGroup(
  row: PublicTelegramGroupRow,
  locale: SupportedTelegramLocale,
): TelegramGroup {
  const status =
    normalizeGroupStatus(
      row.group_status,
    );

  const isActive =
    status === "active";

  const customName =
    locale === "uz"
      ? row.custom_name_uz
      : row.custom_name_de;

  const customDescription =
    locale === "uz"
      ? row.custom_description_uz
      : row.custom_description_de;

  const isBot =
    row.button_type === "bot";

  return {
    state:
      customName ??
      row.bundesland,

    shortName:
      row.short_name,

    description:
      customDescription ??
      getDefaultDescription(
        row.bundesland,
        status,
        locale,
      ),

    href:
      row.href,

    button:
      locale === "uz"
        ? isActive
          ? isBot
            ? "Bot orqali qo‘shilish"
            : "Telegramga qo‘shilish"
          : "Tez orada"
        : isActive
          ? isBot
            ? "Über den Bot beitreten"
            : "Telegram-Gruppe öffnen"
          : "Demnächst",

    status,

    statusLabel:
      locale === "uz"
        ? isActive
          ? "Faol"
          : "Tez orada"
        : isActive
          ? "Aktiv"
          : "Demnächst",
  };
}

export async function getPublicTelegramGroups(
  locale: SupportedTelegramLocale,
): Promise<TelegramGroup[]> {
  assertDatabaseAvailable();

  if (
    canSkipDatabaseDuringCi()
  ) {
    return [];
  }

  const result =
    await getDb().query<PublicTelegramGroupRow>(
      `
        SELECT
          bundesland,
          short_name,

          custom_name_uz,
          custom_name_de,

          custom_description_uz,
          custom_description_de,

          href,

          button_type,
          group_status

        FROM telegram_groups

        WHERE status = 'published'

        ORDER BY
          sort_order ASC,
          id ASC
      `,
    );

  return result.rows.map(
    (row) =>
      toTelegramGroup(
        row,
        locale,
      ),
  );
}
