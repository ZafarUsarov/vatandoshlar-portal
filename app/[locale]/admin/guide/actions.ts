"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  setAdminGuideArticleFeatured,
  updateAdminGuideArticleStatus,
  type AdminGuideArticleStatus,
} from "@/lib/guide/admin-guide-repository";

const statuses:
  ReadonlyArray<AdminGuideArticleStatus> = [
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
): value is AdminGuideArticleStatus {
  return statuses.includes(
    value as AdminGuideArticleStatus,
  );
}

function revalidateGuideAdmin(): void {
  revalidatePath(
    "/[locale]/admin/guide",
    "page",
  );
}

export async function updateGuideStatusAction(
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

  const articleId =
    getString(
      formData,
      "articleId",
    );

  const targetStatus =
    getString(
      formData,
      "targetStatus",
    );

  if (
    !articleId ||
    !isStatus(
      targetStatus,
    )
  ) {
    return;
  }

  await updateAdminGuideArticleStatus(
    articleId,
    targetStatus,
  );

  revalidateGuideAdmin();
}

export async function updateGuideFeaturedAction(
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

  const articleId =
    getString(
      formData,
      "articleId",
    );

  const enabled =
    getString(
      formData,
      "enabled",
    );

  if (
    !articleId ||
    (
      enabled !== "true" &&
      enabled !== "false"
    )
  ) {
    return;
  }

  await setAdminGuideArticleFeatured(
    articleId,
    enabled === "true",
  );

  revalidateGuideAdmin();
}
