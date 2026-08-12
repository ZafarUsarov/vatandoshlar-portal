"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  setAdminEventFeatured,
  updateAdminEventStatus,
  type AdminEventStatus,
} from "@/lib/events/admin-events-repository";

const statuses: AdminEventStatus[] = [
  "draft",
  "published",
  "archived",
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
): value is AdminEventStatus {
  return statuses.includes(
    value as AdminEventStatus,
  );
}

function revalidateAdminEvents(): void {
  revalidatePath(
    "/[locale]/admin/events",
    "page",
  );
}

export async function updateEventStatusAction(
  formData: FormData,
): Promise<void> {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(
    appLocale,
  );

  const eventId =
    getString(
      formData,
      "eventId",
    );

  const targetStatus =
    getString(
      formData,
      "targetStatus",
    );

  if (
    !eventId ||
    !isStatus(
      targetStatus,
    )
  ) {
    return;
  }

  await updateAdminEventStatus(
    eventId,
    targetStatus,
  );

  revalidateAdminEvents();
}

export async function updateEventFeaturedAction(
  formData: FormData,
): Promise<void> {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(
    appLocale,
  );

  const eventId =
    getString(
      formData,
      "eventId",
    );

  const enabled =
    getString(
      formData,
      "enabled",
    );

  if (
    !eventId ||
    (
      enabled !== "true" &&
      enabled !== "false"
    )
  ) {
    return;
  }

  await setAdminEventFeatured(
    eventId,
    enabled === "true",
  );

  revalidateAdminEvents();
}
