"use server";

import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  createAdminSpecialist,
  type AdminSpecialistCategory,
  type AdminSpecialistLanguage,
} from "@/lib/specialists/admin-specialists-repository";

export type SpecialistCreateActionState = {
  error: string | null;
};

const categoryValues: AdminSpecialistCategory[] = [
  "medical",
  "legal",
  "technology",
  "automotive",
  "home",
  "education",
  "language-teaching",
  "academic-documents",
  "beauty",
  "finance",
  "creative",
];

const languageValues: AdminSpecialistLanguage[] = [
  "uz",
  "de",
  "ru",
  "en",
  "tr",
];

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function getNullableString(
  formData: FormData,
  key: string,
): string | null {
  const value = getString(formData, key);

  return value || null;
}

function getLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function getCategories(
  formData: FormData,
): AdminSpecialistCategory[] {
  return formData
    .getAll("categories")
    .filter((value): value is string => typeof value === "string")
    .filter((value): value is AdminSpecialistCategory =>
      categoryValues.includes(value as AdminSpecialistCategory),
    );
}

function getLanguages(
  formData: FormData,
): AdminSpecialistLanguage[] {
  return formData
    .getAll("languages")
    .filter((value): value is string => typeof value === "string")
    .filter((value): value is AdminSpecialistLanguage =>
      languageValues.includes(value as AdminSpecialistLanguage),
    );
}

function parseOptionalInteger(
  value: string,
): number | null | "invalid" {
  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return "invalid";
  }

  return parsed;
}

function parseOptionalRating(
  value: string,
): number | null | "invalid" {
  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 5) {
    return "invalid";
  }

  return parsed;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isValidAvatarUrl(value: string): boolean {
  return value.startsWith("/") || isValidHttpUrl(value);
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function createSpecialistAction(
  _previousState: SpecialistCreateActionState,
  formData: FormData,
): Promise<SpecialistCreateActionState> {
  const locale = await getLocale();
  const appLocale: "uz" | "de" = locale === "de" ? "de" : "uz";

  await requireAdmin(appLocale);

  const code = getString(formData, "code");
  const slug = normalizeSlug(getString(formData, "slug"));
  const name = getString(formData, "name");
  const professionUz = getString(formData, "professionUz");
  const professionDe = getString(formData, "professionDe");
  const shortDescriptionUz = getString(formData, "shortDescriptionUz");
  const shortDescriptionDe = getString(formData, "shortDescriptionDe");
  const categories = getCategories(formData);
  const languages = getLanguages(formData);
  const servicesUz = getLines(getString(formData, "servicesUz"));
  const servicesDe = getLines(getString(formData, "servicesDe"));

  const city = getNullableString(formData, "city");
  const bundesland = getNullableString(formData, "bundesland");
  const postalCode = getNullableString(formData, "postalCode");
  const serviceAreaUz = getNullableString(formData, "serviceAreaUz");
  const serviceAreaDe = getNullableString(formData, "serviceAreaDe");

  const email = getNullableString(formData, "email");
  const phone = getNullableString(formData, "phone");
  const website = getNullableString(formData, "website");
  const whatsapp = getNullableString(formData, "whatsapp");
  const telegram = getNullableString(formData, "telegram");
  const instagram = getNullableString(formData, "instagram");
  const youtube = getNullableString(formData, "youtube");
  const facebook = getNullableString(formData, "facebook");

  const pricingNoteUz = getNullableString(formData, "pricingNoteUz");
  const pricingNoteDe = getNullableString(formData, "pricingNoteDe");
  const avatarUrl = getNullableString(formData, "avatarUrl");

  const yearsOfExperience = parseOptionalInteger(
    getString(formData, "yearsOfExperience"),
  );
  const rating = parseOptionalRating(getString(formData, "rating"));
  const reviewCount = parseOptionalInteger(
    getString(formData, "reviewCount"),
  );

  if (
    !code ||
    !slug ||
    !name ||
    !professionUz ||
    !professionDe ||
    !shortDescriptionUz ||
    !shortDescriptionDe ||
    categories.length === 0 ||
    servicesUz.length === 0 ||
    servicesDe.length === 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte füllen Sie alle Pflichtfelder aus und wählen Sie mindestens eine Kategorie."
          : "Barcha majburiy maydonlarni to‘ldiring va kamida bitta kategoriya tanlang.",
    };
  }

  if (servicesUz.length !== servicesDe.length) {
    return {
      error:
        appLocale === "de"
          ? "Die usbekischen und deutschen Leistungslisten müssen gleich viele Einträge enthalten."
          : "O‘zbekcha va nemischa xizmatlar ro‘yxatida elementlar soni bir xil bo‘lishi kerak.",
    };
  }

  if (Boolean(serviceAreaUz) !== Boolean(serviceAreaDe)) {
    return {
      error:
        appLocale === "de"
          ? "Der Servicebereich muss entweder in beiden Sprachen oder gar nicht ausgefüllt werden."
          : "Xizmat hududi UZ va DE tillarida ikkalasi ham to‘ldirilishi yoki ikkalasi ham bo‘sh qolishi kerak.",
    };
  }

  if (Boolean(pricingNoteUz) !== Boolean(pricingNoteDe)) {
    return {
      error:
        appLocale === "de"
          ? "Der Preishinweis muss entweder in beiden Sprachen oder gar nicht ausgefüllt werden."
          : "Narx eslatmasi UZ va DE tillarida ikkalasi ham to‘ldirilishi yoki ikkalasi ham bo‘sh qolishi kerak.",
    };
  }

  if (email && !isValidEmail(email)) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie eine gültige E-Mail-Adresse ein."
          : "To‘g‘ri e-mail manzilini kiriting.",
    };
  }

  const urlFields = [website, whatsapp, telegram, instagram, youtube, facebook];

  if (
    urlFields.some(
      (value) => value !== null && !isValidHttpUrl(value),
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte verwenden Sie für Website und soziale Links vollständige http(s)-URLs."
          : "Website va ijtimoiy tarmoq havolalari uchun to‘liq http(s) URL kiriting.",
    };
  }

  if (avatarUrl && !isValidAvatarUrl(avatarUrl)) {
    return {
      error:
        appLocale === "de"
          ? "Das Profilbild muss ein lokaler Pfad wie /images/... oder eine vollständige http(s)-URL sein."
          : "Profil rasmi /images/... kabi lokal path yoki to‘liq http(s) URL bo‘lishi kerak.",
    };
  }

  if (yearsOfExperience === "invalid" || reviewCount === "invalid") {
    return {
      error:
        appLocale === "de"
          ? "Berufserfahrung und Bewertungsanzahl müssen nicht-negative ganze Zahlen sein."
          : "Tajriba yili va review soni manfiy bo‘lmagan butun son bo‘lishi kerak.",
    };
  }

  if (rating === "invalid") {
    return {
      error:
        appLocale === "de"
          ? "Die Bewertung muss zwischen 0 und 5 liegen."
          : "Rating 0 va 5 oralig‘ida bo‘lishi kerak.",
    };
  }

  try {
    await createAdminSpecialist({
      code,
      slug,
      name,
      professionUz,
      professionDe,
      shortDescriptionUz,
      shortDescriptionDe,
      categories,
      languages,
      servicesUz,
      servicesDe,
      city,
      bundesland,
      postalCode,
      serviceAreaUz,
      serviceAreaDe,
      email,
      phone,
      website,
      whatsapp,
      telegram,
      instagram,
      youtube,
      facebook,
      pricingNoteUz,
      pricingNoteDe,
      avatarUrl,
      yearsOfExperience,
      rating,
      reviewCount,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        error:
          appLocale === "de"
            ? "Dieser Code oder Slug wird bereits verwendet."
            : "Bu kod yoki slug allaqachon ishlatilgan.",
      };
    }

    console.error("Failed to create admin specialist:", error);

    return {
      error:
        appLocale === "de"
          ? "Die Fachkraft konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
          : "Mutaxassisni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    };
  }

  return redirect({
    href: "/admin/specialists",
    locale: appLocale,
  });
}
