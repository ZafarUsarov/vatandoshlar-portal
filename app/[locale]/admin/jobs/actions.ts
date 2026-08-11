"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  setAdminJobGuideFeatured,
  updateAdminJobGuideStatus,
  type AdminJobStatus,
} from "@/lib/jobs/admin-jobs-repository";

const statuses: AdminJobStatus[] = [
  "draft",
  "published",
  "archived",
];

function getString(
  formData: FormData,
  key: string,
): string {
  const value =
    formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isStatus(
  value: string,
): value is AdminJobStatus {
  return statuses.includes(
    value as AdminJobStatus,
  );
}

function revalidateAdminJobs(): void {
  revalidatePath(
    "/[locale]/admin/jobs",
    "page",
  );
}

export async function updateJobStatusAction(
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

  const guideId =
    getString(
      formData,
      "guideId",
    );

  const targetStatus =
    getString(
      formData,
      "targetStatus",
    );

  if (
    !guideId ||
    !isStatus(
      targetStatus,
    )
  ) {
    return;
  }

  await updateAdminJobGuideStatus(
    guideId,
    targetStatus,
  );

  revalidateAdminJobs();
}

export async function updateJobFeaturedAction(
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

  const guideId =
    getString(
      formData,
      "guideId",
    );

  const featuredValue =
    getString(
      formData,
      "featured",
    );

  if (
    !guideId ||
    (
      featuredValue !==
        "true" &&
      featuredValue !==
        "false"
    )
  ) {
    return;
  }

  await setAdminJobGuideFeatured(
    guideId,
    featuredValue === "true",
  );

  revalidateAdminJobs();
}
