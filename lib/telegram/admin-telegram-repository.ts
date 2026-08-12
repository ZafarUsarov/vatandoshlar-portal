import { getDb } from "@/lib/db";

export type AdminTelegramRecordStatus =
  | "draft"
  | "published"
  | "archived";

export type AdminTelegramGroupStatus =
  | "active"
  | "coming-soon";

export type AdminTelegramButtonType =
  | "bot"
  | "group";

export type AdminTelegramGroupSummary = Readonly<{
  id: string;

  bundesland: string;
  shortName: string;

  customNameUz:
    | string
    | null;

  customNameDe:
    | string
    | null;

  href:
    | string
    | null;

  buttonType:
    AdminTelegramButtonType;

  groupStatus:
    AdminTelegramGroupStatus;

  status:
    AdminTelegramRecordStatus;

  sortOrder: number;

  updatedAt: string;
}>;

type TelegramGroupRow = {
  id: string;

  bundesland: string;
  short_name: string;

  custom_name_uz:
    | string
    | null;

  custom_name_de:
    | string
    | null;

  href:
    | string
    | null;

  button_type: string;
  group_status: string;
  status: string;

  sort_order: number;

  updated_at:
    | string
    | Date;
};

function normalizeButtonType(
  value: string,
): AdminTelegramButtonType {
  return value === "bot"
    ? "bot"
    : "group";
}

function normalizeGroupStatus(
  value: string,
): AdminTelegramGroupStatus {
  return value === "active"
    ? "active"
    : "coming-soon";
}

function normalizeRecordStatus(
  value: string,
): AdminTelegramRecordStatus {
  if (
    value === "published" ||
    value === "archived"
  ) {
    return value;
  }

  return "draft";
}

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toSummary(
  row: TelegramGroupRow,
): AdminTelegramGroupSummary {
  return {
    id:
      row.id,

    bundesland:
      row.bundesland,

    shortName:
      row.short_name,

    customNameUz:
      row.custom_name_uz,

    customNameDe:
      row.custom_name_de,

    href:
      row.href,

    buttonType:
      normalizeButtonType(
        row.button_type,
      ),

    groupStatus:
      normalizeGroupStatus(
        row.group_status,
      ),

    status:
      normalizeRecordStatus(
        row.status,
      ),

    sortOrder:
      row.sort_order,

    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

export async function getAdminTelegramGroups(): Promise<
  ReadonlyArray<AdminTelegramGroupSummary>
> {
  const result =
    await getDb().query<TelegramGroupRow>(
      `
        SELECT
          id::text,

          bundesland,
          short_name,

          custom_name_uz,
          custom_name_de,

          href,

          button_type,
          group_status,
          status,

          sort_order,
          updated_at

        FROM telegram_groups

        ORDER BY
          sort_order ASC,
          id ASC
      `,
    );

  return result.rows.map(
    toSummary,
  );
}
