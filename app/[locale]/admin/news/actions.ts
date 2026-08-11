"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  setAdminNewsArticleFeatured,
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

function getAppLocale(
  locale: string,
): "uz" | "de" {
  return locale === "de"
    ? "de"
    : "uz";
}

function revalidateAdminNews(
  locale: "uz" | "de",
): void {
  revalidatePath(
    `/${locale}/admin/news`,
  );

  revalidatePath(
    `/${locale}/news`,
  );

  revalidatePath(
    `/${locale}`,
  );
}

export async function updateNewsStatusAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();
  const appLocale =
    getAppLocale(locale);

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

  revalidateAdminNews(appLocale);
}

export async function updateNewsFeaturedAction(
  formData: FormData,
): Promise<void> {
  const locale = await getLocale();
  const appLocale =
    getAppLocale(locale);

  await requireAdmin(appLocale);

  const articleId =
    getString(formData, "articleId");

  const featuredValue =
    getString(formData, "featured");

  if (!articleId) {
    return;
  }

  const featured =
    featuredValue === "true";

  await setAdminNewsArticleFeatured(
    articleId,
    featured,
  );

  revalidateAdminNews(appLocale);
}
