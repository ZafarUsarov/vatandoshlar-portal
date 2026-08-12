"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  setAdminSpecialistFlag,
  updateAdminSpecialistStatus,
  type AdminSpecialistFlag,
  type AdminSpecialistStatus,
} from "@/lib/specialists/admin-specialists-repository";

const statuses: AdminSpecialistStatus[] = [
  "draft",
  "published",
  "archived",
];

const flags: AdminSpecialistFlag[] = [
  "verified",
  "featured",
  "premium",
  "sponsored",
];

function getString(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isStatus(
  value: string,
): value is AdminSpecialistStatus {
  return statuses.includes(
    value as AdminSpecialistStatus,
  );
}

function isFlag(
  value: string,
): value is AdminSpecialistFlag {
  return flags.includes(
    value as AdminSpecialistFlag,
  );
}

function revalidateAdminSpecialists(): void {
  revalidatePath(
    "/[locale]/admin/specialists",
    "page",
  );
}

export async function updateSpecialistStatusAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();

  const appLocale: "uz" | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const specialistId =
    getString(
      formData,
      "specialistId",
    );

  const targetStatus =
    getString(
      formData,
      "targetStatus",
    );

  if (
    !specialistId ||
    !isStatus(targetStatus)
  ) {
    return;
  }

  await updateAdminSpecialistStatus(
    specialistId,
    targetStatus,
  );

  revalidateAdminSpecialists();
}

export async function updateSpecialistFlagAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();

  const appLocale: "uz" | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const specialistId =
    getString(
      formData,
      "specialistId",
    );

  const flag =
    getString(
      formData,
      "flag",
    );

  const enabled =
    getString(
      formData,
      "enabled",
    );

  if (
    !specialistId ||
    !isFlag(flag) ||
    (
      enabled !== "true" &&
      enabled !== "false"
    )
  ) {
    return;
  }

  await setAdminSpecialistFlag(
    specialistId,
    flag,
    enabled === "true",
  );

  revalidateAdminSpecialists();
}
