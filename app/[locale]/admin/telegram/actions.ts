"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminTelegramGroupStatus,
  updateAdminTelegramRecordStatus,
  type AdminTelegramGroupStatus,
  type AdminTelegramRecordStatus,
} from "@/lib/telegram/admin-telegram-repository";

const recordStatuses: ReadonlyArray<AdminTelegramRecordStatus> = [
  "draft",
  "published",
  "archived",
];

const groupStatuses: ReadonlyArray<AdminTelegramGroupStatus> = [
  "active",
  "coming-soon",
];

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isRecordStatus(
  value: string,
): value is AdminTelegramRecordStatus {
  return recordStatuses.includes(
    value as AdminTelegramRecordStatus,
  );
}

function isGroupStatus(
  value: string,
): value is AdminTelegramGroupStatus {
  return groupStatuses.includes(
    value as AdminTelegramGroupStatus,
  );
}

function revalidateAdminTelegram(): void {
  revalidatePath(
    "/[locale]/admin/telegram",
    "page",
  );
}

export async function updateTelegramRecordStatusAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();

  const appLocale: "uz" | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const groupId = getString(
    formData,
    "groupId",
  );

  const targetStatus = getString(
    formData,
    "targetStatus",
  );

  if (
    !groupId ||
    !isRecordStatus(targetStatus)
  ) {
    return;
  }

  await updateAdminTelegramRecordStatus(
    groupId,
    targetStatus,
  );

  revalidateAdminTelegram();
}

export async function updateTelegramGroupStatusAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();

  const appLocale: "uz" | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const groupId = getString(
    formData,
    "groupId",
  );

  const targetGroupStatus = getString(
    formData,
    "targetGroupStatus",
  );

  if (
    !groupId ||
    !isGroupStatus(targetGroupStatus)
  ) {
    return;
  }

  await updateAdminTelegramGroupStatus(
    groupId,
    targetGroupStatus,
  );

  revalidateAdminTelegram();
}
