"use server";

import {
  revalidatePath,
} from "next/cache";
import {
  getLocale,
} from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminSupportContributionStatus,
  type SupportContributionStatus,
} from "@/lib/support/admin-support-repository";

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
): value is SupportContributionStatus {
  return (
    value === "confirmed" ||
    value === "cancelled"
  );
}

export async function updateSupportStatusAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();

  const appLocale =
    locale === "de" ? "de" : "uz";

  await requireAdmin(appLocale);

  const contributionId = getString(
    formData,
    "contributionId",
  );

  const targetStatus = getString(
    formData,
    "targetStatus",
  );

  if (
    !/^\d+$/.test(contributionId) ||
    !isStatus(targetStatus)
  ) {
    return;
  }

  await updateAdminSupportContributionStatus(
    contributionId,
    targetStatus,
  );

  revalidatePath(
    `/${appLocale}/admin/support`,
  );
  revalidatePath(
    `/${appLocale}/support`,
  );
}
