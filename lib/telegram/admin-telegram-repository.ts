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

export type AdminTelegramGroup = Readonly<{
  id: string;

  bundesland: string;
  shortName: string;

  customNameUz:
    | string
    | null;

  customNameDe:
    | string
    | null;

  customDescriptionUz:
    | string
    | null;

  customDescriptionDe:
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

  createdAt: string;
  updatedAt: string;
}>;

export type AdminTelegramGroupInput = Readonly<{
  bundesland: string;
  shortName: string;

  customNameUz:
    | string
    | null;

  customNameDe:
    | string
    | null;

  customDescriptionUz:
    | string
    | null;

  customDescriptionDe:
    | string
    | null;

  href:
    | string
    | null;

  buttonType:
    AdminTelegramButtonType;

  groupStatus:
    AdminTelegramGroupStatus;

  sortOrder: number;
}>;

type TelegramGroupSummaryRow = {
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

type TelegramGroupRow =
  TelegramGroupSummaryRow & {
    custom_description_uz:
      | string
      | null;

    custom_description_de:
      | string
      | null;

    created_at:
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
  row: TelegramGroupSummaryRow,
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

function toDetail(
  row: TelegramGroupRow,
): AdminTelegramGroup {
  return {
    ...toSummary(row),

    customDescriptionUz:
      row.custom_description_uz,

    customDescriptionDe:
      row.custom_description_de,

    createdAt:
      toDateTimeString(
        row.created_at,
      ),
  };
}

export async function getAdminTelegramGroups(): Promise<
  ReadonlyArray<AdminTelegramGroupSummary>
> {
  const result =
    await getDb().query<TelegramGroupSummaryRow>(
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

export async function getAdminTelegramGroupById(
  id: string,
): Promise<AdminTelegramGroup | null> {
  const result =
    await getDb().query<TelegramGroupRow>(
      `
        SELECT
          id::text,

          bundesland,
          short_name,

          custom_name_uz,
          custom_name_de,

          custom_description_uz,
          custom_description_de,

          href,

          button_type,
          group_status,
          status,

          sort_order,

          created_at,
          updated_at

        FROM telegram_groups

        WHERE id = $1

        LIMIT 1
      `,
      [id],
    );

  const row =
    result.rows[0];

  return row
    ? toDetail(row)
    : null;
}

export async function updateAdminTelegramGroup(
  id: string,
  input: AdminTelegramGroupInput,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE telegram_groups
        SET
          bundesland = $1,
          short_name = $2,

          custom_name_uz = $3,
          custom_name_de = $4,

          custom_description_uz = $5,
          custom_description_de = $6,

          href = $7,
          button_type = $8,
          group_status = $9,

          sort_order = $10,

          updated_at = NOW()

        WHERE id = $11
      `,
      [
        input.bundesland,
        input.shortName,

        input.customNameUz,
        input.customNameDe,

        input.customDescriptionUz,
        input.customDescriptionDe,

        input.href,
        input.buttonType,
        input.groupStatus,

        input.sortOrder,

        id,
      ],
    );

  return (
    result.rowCount ??
    0
  ) > 0;
}

export async function updateAdminTelegramRecordStatus(
  id: string,
  status: AdminTelegramRecordStatus,
): Promise<boolean> {
  const result =
    await getDb().query(
      `
        UPDATE telegram_groups
        SET
          status = $1,
          updated_at = NOW()

        WHERE id = $2
      `,
      [
        status,
        id,
      ],
    );

  return (
    result.rowCount ??
    0
  ) > 0;
}

export async function updateAdminTelegramGroupStatus(
  id: string,
  groupStatus: AdminTelegramGroupStatus,
): Promise<
  "updated"
  | "not_found"
  | "missing_href"
> {
  const existing =
    await getDb().query<{
      href:
        | string
        | null;
    }>(
      `
        SELECT href

        FROM telegram_groups

        WHERE id = $1

        LIMIT 1
      `,
      [id],
    );

  const group =
    existing.rows[0];

  if (!group) {
    return "not_found";
  }

  if (
    groupStatus === "active" &&
    (
      !group.href ||
      !group.href.trim()
    )
  ) {
    return "missing_href";
  }

  await getDb().query(
    `
      UPDATE telegram_groups
      SET
        group_status = $1,
        updated_at = NOW()

      WHERE id = $2
    `,
    [
      groupStatus,
      id,
    ],
  );

  return "updated";
}
