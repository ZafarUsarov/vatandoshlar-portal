"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  setAdminServiceFeatured,
  updateAdminServiceStatus,
  type AdminServiceStatus,
} from "@/lib/services/admin-services-repository";

const statuses: AdminServiceStatus[] = [
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
): value is AdminServiceStatus {
  return statuses.includes(
    value as AdminServiceStatus,
  );
}

function revalidateAdminServices(): void {
  revalidatePath(
    "/[locale]/admin/services",
    "page",
  );
}

export async function updateServiceStatusAction(
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

  const serviceId =
    getString(
      formData,
      "serviceId",
    );

  const targetStatus =
    getString(
      formData,
      "targetStatus",
    );

  if (
    !serviceId ||
    !isStatus(
      targetStatus,
    )
  ) {
    return;
  }

  await updateAdminServiceStatus(
    serviceId,
    targetStatus,
  );

  revalidateAdminServices();
}

export async function updateServiceFeaturedAction(
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

  const serviceId =
    getString(
      formData,
      "serviceId",
    );

  const featuredValue =
    getString(
      formData,
      "featured",
    );

  if (
    !serviceId ||
    (
      featuredValue !== "true" &&
      featuredValue !== "false"
    )
  ) {
    return;
  }

  await setAdminServiceFeatured(
    serviceId,
    featuredValue === "true",
  );

  revalidateAdminServices();
}
