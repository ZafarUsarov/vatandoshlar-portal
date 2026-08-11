"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminService,
  type AdminServiceCategory,
} from "@/lib/services/admin-services-repository";

export type ServiceEditActionState = {
  error: string | null;
};

const categories: AdminServiceCategory[] = [
  "translation",
  "legal",
  "tax",
  "medical",
  "craft",
  "consumer",
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

function getLines(
  value: string,
): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
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

function isCategory(
  value: string,
): value is AdminServiceCategory {
  return categories.includes(
    value as AdminServiceCategory,
  );
}

function isValidUrl(
  value: string,
): boolean {
  try {
    const url =
      new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
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

export async function updateServiceAction(
  _previousState: ServiceEditActionState,
  formData: FormData,
): Promise<ServiceEditActionState> {
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

  const slug =
    normalizeSlug(
      getString(
        formData,
        "slug",
      ),
    );

  const titleUz =
    getString(
      formData,
      "titleUz",
    );

  const titleDe =
    getString(
      formData,
      "titleDe",
    );

  const shortTitleUz =
    getString(
      formData,
      "shortTitleUz",
    );

  const shortTitleDe =
    getString(
      formData,
      "shortTitleDe",
    );

  const descriptionUz =
    getString(
      formData,
      "descriptionUz",
    );

  const descriptionDe =
    getString(
      formData,
      "descriptionDe",
    );

  const categoryValue =
    getString(
      formData,
      "category",
    );

  const icon =
    getString(
      formData,
      "icon",
    );

  const servicesUz =
    getLines(
      getString(
        formData,
        "servicesUz",
      ),
    );

  const servicesDe =
    getLines(
      getString(
        formData,
        "servicesDe",
      ),
    );

  const verificationStepsUz =
    getLines(
      getString(
        formData,
        "verificationStepsUz",
      ),
    );

  const verificationStepsDe =
    getLines(
      getString(
        formData,
        "verificationStepsDe",
      ),
    );

  const importantNotesUz =
    getLines(
      getString(
        formData,
        "importantNotesUz",
      ),
    );

  const importantNotesDe =
    getLines(
      getString(
        formData,
        "importantNotesDe",
      ),
    );

  const officialSourceName =
    getString(
      formData,
      "officialSourceName",
    );

  const officialSourceUrl =
    getString(
      formData,
      "officialSourceUrl",
    );

  const sourceDescriptionUz =
    getString(
      formData,
      "sourceDescriptionUz",
    );

  const sourceDescriptionDe =
    getString(
      formData,
      "sourceDescriptionDe",
    );

  const locationUz =
    getString(
      formData,
      "locationUz",
    );

  const locationDe =
    getString(
      formData,
      "locationDe",
    );

  const requiredValues = [
    serviceId,
    slug,
    titleUz,
    titleDe,
    shortTitleUz,
    shortTitleDe,
    descriptionUz,
    descriptionDe,
    icon,
    officialSourceName,
    officialSourceUrl,
    sourceDescriptionUz,
    sourceDescriptionDe,
    locationUz,
    locationDe,
  ];

  if (
    requiredValues.some(
      (value) => !value,
    ) ||
    servicesUz.length === 0 ||
    servicesDe.length === 0 ||
    verificationStepsUz.length === 0 ||
    verificationStepsDe.length === 0 ||
    importantNotesUz.length === 0 ||
    importantNotesDe.length === 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte füllen Sie alle Pflichtfelder und Listen vollständig aus."
          : "Barcha majburiy maydon va ro‘yxatlarni to‘liq to‘ldiring.",
    };
  }

  if (
    !isCategory(
      categoryValue,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die ausgewählte Kategorie ist ungültig."
          : "Tanlangan kategoriya noto‘g‘ri.",
    };
  }

  if (
    servicesUz.length !==
      servicesDe.length ||
    verificationStepsUz.length !==
      verificationStepsDe.length ||
    importantNotesUz.length !==
      importantNotesDe.length
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die usbekischen und deutschen Listen müssen jeweils gleich viele Einträge enthalten."
          : "O‘zbekcha va nemischa mos ro‘yxatlarda elementlar soni bir xil bo‘lishi kerak.",
    };
  }

  if (
    !isValidUrl(
      officialSourceUrl,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie eine gültige URL der offiziellen Quelle ein."
          : "To‘g‘ri rasmiy manba URL manzilini kiriting.",
    };
  }

  try {
    const updated =
      await updateAdminService(
        serviceId,
        {
          slug,
          titleUz,
          titleDe,
          shortTitleUz,
          shortTitleDe,
          descriptionUz,
          descriptionDe,
          category:
            categoryValue,
          icon,
          servicesUz,
          servicesDe,
          verificationStepsUz,
          verificationStepsDe,
          importantNotesUz,
          importantNotesDe,
          officialSourceName,
          officialSourceUrl,
          sourceDescriptionUz,
          sourceDescriptionDe,
          locationUz,
          locationDe,
        },
      );

    if (!updated) {
      return {
        error:
          appLocale === "de"
            ? "Die Dienstleistung wurde nicht gefunden."
            : "Xizmat topilmadi.",
      };
    }
  } catch (error) {
    if (
      isUniqueViolation(
        error,
      )
    ) {
      return {
        error:
          appLocale === "de"
            ? "Dieser Slug wird bereits verwendet. Bitte wählen Sie einen anderen."
            : "Bu slug allaqachon ishlatilgan. Boshqa slug tanlang.",
      };
    }

    console.error(
      "Failed to update admin service:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Die Dienstleistung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
          : "Xizmatni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    };
  }

  revalidatePath(
    "/[locale]/admin/services",
    "page",
  );

  return redirect({
    href: "/admin/services",
    locale:
      appLocale,
  });
}
