"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminNewsArticleStatus,
  type AdminNewsStatus,
} from "@/lib/news/admin-news-repository";

function getString(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isAdminNewsStatus(
  value: string,
): value is AdminNewsStatus {
  return (
    value === "draft" ||
    value === "published" ||
    value === "archived"
  );
}

export async function updateNewsStatusAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();

  const appLocale =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const articleId =
    getString(formData, "articleId");

  const targetStatus =
    getString(formData, "targetStatus");

  if (
    !articleId ||
    !isAdminNewsStatus(targetStatus)
  ) {
    return;
  }

  const updated =
    await updateAdminNewsArticleStatus(
      articleId,
      targetStatus,
    );

  if (!updated) {
    return;
  }

  revalidatePath(
    `/${appLocale}/admin/news`,
  );
}
