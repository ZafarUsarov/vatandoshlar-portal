"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminJobGuide,
  type AdminJobCategory,
} from "@/lib/jobs/admin-jobs-repository";

export type JobEditActionState = {
  error: string | null;
};

const categories: AdminJobCategory[] = [
  "students",
  "english",
  "minijob",
  "internship",
  "professionals",
  "safety",
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

function getLines(
  value: string,
): string[] {
  return value
    .split(/\r?\n/)
    .map(
      (line) =>
        line.trim(),
    )
    .filter(Boolean);
}

function normalizeSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(
      /[^a-z0-9-]+/g,
      "-",
    )
    .replace(
      /-{2,}/g,
      "-",
    )
    .replace(
      /^-|-$/g,
      "",
    );
}

function isValidDate(
  value: string,
): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(
    value,
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

function isCategory(
  value: string,
): value is AdminJobCategory {
  return categories.includes(
    value as AdminJobCategory,
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

export async function updateJobAction(
  _previousState: JobEditActionState,
  formData: FormData,
): Promise<JobEditActionState> {
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

  const audienceUz =
    getString(
      formData,
      "audienceUz",
    );

  const audienceDe =
    getString(
      formData,
      "audienceDe",
    );

  const highlightsUz =
    getLines(
      getString(
        formData,
        "highlightsUz",
      ),
    );

  const highlightsDe =
    getLines(
      getString(
        formData,
        "highlightsDe",
      ),
    );

  const searchKeywords =
    getLines(
      getString(
        formData,
        "searchKeywords",
      ),
    );

  const stepsUz =
    getLines(
      getString(
        formData,
        "stepsUz",
      ),
    );

  const stepsDe =
    getLines(
      getString(
        formData,
        "stepsDe",
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

  const verifiedAt =
    getString(
      formData,
      "verifiedAt",
    );

  const requiredValues = [
    guideId,
    slug,
    titleUz,
    titleDe,
    shortTitleUz,
    shortTitleDe,
    descriptionUz,
    descriptionDe,
    icon,
    audienceUz,
    audienceDe,
    officialSourceName,
    officialSourceUrl,
    sourceDescriptionUz,
    sourceDescriptionDe,
    verifiedAt,
  ];

  if (
    requiredValues.some(
      (value) =>
        !value,
    ) ||
    highlightsUz.length === 0 ||
    highlightsDe.length === 0 ||
    searchKeywords.length === 0 ||
    stepsUz.length === 0 ||
    stepsDe.length === 0 ||
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
    highlightsUz.length !==
      highlightsDe.length ||
    stepsUz.length !==
      stepsDe.length ||
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

  if (
    !isValidDate(
      verifiedAt,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie ein gültiges Prüfdatum ein."
          : "To‘g‘ri tekshiruv sanasini kiriting.",
    };
  }

  try {
    const updated =
      await updateAdminJobGuide(
        guideId,
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
          audienceUz,
          audienceDe,
          highlightsUz,
          highlightsDe,
          searchKeywords,
          stepsUz,
          stepsDe,
          importantNotesUz,
          importantNotesDe,
          officialSourceName,
          officialSourceUrl,
          sourceDescriptionUz,
          sourceDescriptionDe,
          verifiedAt,
        },
      );

    if (!updated) {
      return {
        error:
          appLocale === "de"
            ? "Der Jobleitfaden wurde nicht gefunden."
            : "Ish qo‘llanmasi topilmadi.",
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
      "Failed to update admin job guide:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Der Jobleitfaden konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
          : "Ish qo‘llanmasini saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    };
  }

  revalidatePath(
    "/[locale]/admin/jobs",
    "page",
  );

  return redirect({
    href: "/admin/jobs",
    locale:
      appLocale,
  });
}
