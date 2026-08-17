"use server";

import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  createAdminNewsArticle,
  type AdminNewsContentType,
} from "@/lib/news/admin-news-repository";

export type NewsCreateActionState = {
  error: string | null;
};

const contentTypes: AdminNewsContentType[] = [
  "official_info",
  "guide",
  "education",
  "work_migration",
  "consular",
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

function getParagraphs(
  value: string,
): string[] {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function isValidDate(
  value: string,
): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidUrl(
  value: string,
): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function isContentType(
  value: string,
): value is AdminNewsContentType {
  return contentTypes.includes(
    value as AdminNewsContentType,
  );
}

function isUniqueViolation(
  error: unknown,
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function createNewsAction(
  _previousState: NewsCreateActionState,
  formData: FormData,
): Promise<NewsCreateActionState> {
  const locale = await getLocale();

  const appLocale =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const slug = normalizeSlug(
    getString(formData, "slug"),
  );

  const titleUz =
    getString(formData, "titleUz");

  const titleDe =
    getString(formData, "titleDe");

  const excerptUz =
    getString(formData, "excerptUz");

  const excerptDe =
    getString(formData, "excerptDe");

  const contentUz =
    getParagraphs(
      getString(formData, "contentUz"),
    );

  const contentDe =
    getParagraphs(
      getString(formData, "contentDe"),
    );

  const categoryUz =
    getString(formData, "categoryUz");

  const categoryDe =
    getString(formData, "categoryDe");

  const contentTypeValue =
    getString(formData, "contentType");

  const readingTimeUz =
    getString(formData, "readingTimeUz");

  const readingTimeDe =
    getString(formData, "readingTimeDe");

  const sourceNameUz =
    getString(formData, "sourceNameUz");

  const sourceNameDe =
    getString(formData, "sourceNameDe");

  const sourceUrl =
    getString(formData, "sourceUrl");

  const sourceLanguageUz =
    getString(
      formData,
      "sourceLanguageUz",
    );

  const sourceLanguageDe =
    getString(
      formData,
      "sourceLanguageDe",
    );

  const locationUz =
    getString(formData, "locationUz");

  const locationDe =
    getString(formData, "locationDe");

  const verifiedAt =
    getString(formData, "verifiedAt");

  const requiredValues = [
    slug,
    titleUz,
    titleDe,
    excerptUz,
    excerptDe,
    categoryUz,
    categoryDe,
    readingTimeUz,
    readingTimeDe,
    sourceNameUz,
    sourceNameDe,
    sourceUrl,
    sourceLanguageUz,
    sourceLanguageDe,
    verifiedAt,
  ];

  if (
    requiredValues.some(
      (value) => !value,
    ) ||
    contentUz.length === 0 ||
    contentDe.length === 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte füllen Sie alle Pflichtfelder in beiden Sprachen aus."
          : "Ikkala tildagi barcha majburiy maydonlarni to‘ldiring.",
    };
  }

  if (!isContentType(contentTypeValue)) {
    return {
      error:
        appLocale === "de"
          ? "Der ausgewählte Inhaltstyp ist ungültig."
          : "Tanlangan kontent turi noto‘g‘ri.",
    };
  }

  if (!isValidUrl(sourceUrl)) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie eine gültige Quellen-URL ein."
          : "To‘g‘ri manba URL manzilini kiriting.",
    };
  }

  if (!isValidDate(verifiedAt)) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie ein gültiges Prüfdatum ein."
          : "To‘g‘ri tekshiruv sanasini kiriting.",
    };
  }

  try {
    await createAdminNewsArticle({
      slug,
      titleUz,
      titleDe,
      excerptUz,
      excerptDe,
      contentUz,
      contentDe,
      categoryUz,
      categoryDe,
      contentType: contentTypeValue,
      readingTimeUz,
      readingTimeDe,
      sourceNameUz,
      sourceNameDe,
      sourceUrl,
      sourceLanguageUz,
      sourceLanguageDe,
      locationUz:
        locationUz || undefined,
      locationDe:
        locationDe || undefined,
      verifiedAt,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        error:
          appLocale === "de"
            ? "Dieser Slug wird bereits verwendet. Bitte wählen Sie einen anderen."
            : "Bu slug allaqachon ishlatilgan. Boshqa slug tanlang.",
      };
    }

    console.error(
      "Failed to create admin news article:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Der Beitrag konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
          : "Maqolani saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    };
  }

  return redirect({
    href: "/admin/news",
    locale: appLocale,
  });
}
