"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminEvent,
  type AdminEventCategory,
  type AdminEventFormat,
  type AdminEventRegistrationStatus,
} from "@/lib/events/admin-events-repository";

export type EventEditActionState = {
  error: string | null;
};

const categories:
  AdminEventCategory[] = [
    "culture",
    "education",
    "career",
    "business",
    "community",
    "sport",
    "children",
    "consular",
  ];

const formats:
  AdminEventFormat[] = [
    "offline",
    "online",
    "hybrid",
  ];

const registrationStatuses:
  AdminEventRegistrationStatus[] = [
    "open",
    "not_required",
    "sold_out",
    "closed",
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

function getNullableString(
  formData: FormData,
  key: string,
): string | null {
  const value =
    getString(
      formData,
      key,
    );

  return value || null;
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

function isCategory(
  value: string,
): value is AdminEventCategory {
  return categories.includes(
    value as AdminEventCategory,
  );
}

function isFormat(
  value: string,
): value is AdminEventFormat {
  return formats.includes(
    value as AdminEventFormat,
  );
}

function isRegistrationStatus(
  value: string,
): value is AdminEventRegistrationStatus {
  return registrationStatuses.includes(
    value as AdminEventRegistrationStatus,
  );
}

function isIsoDate(
  value: string,
): boolean {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value,
    )
  ) {
    return false;
  }

  const date =
    new Date(
      `${value}T12:00:00Z`,
    );

  return !Number.isNaN(
    date.getTime(),
  );
}

function isTime(
  value: string,
): boolean {
  return /^\d{2}:\d{2}$/.test(
    value,
  );
}

function isHttpUrl(
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

function compareDates(
  left: string,
  right: string,
): number {
  return left.localeCompare(
    right,
  );
}

function compareTimes(
  left: string,
  right: string,
): number {
  return left.localeCompare(
    right,
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

export async function updateEventAction(
  _previousState: EventEditActionState,
  formData: FormData,
): Promise<EventEditActionState> {
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

  const excerptUz =
    getString(
      formData,
      "excerptUz",
    );

  const excerptDe =
    getString(
      formData,
      "excerptDe",
    );

  const descriptionUz =
    getLines(
      getString(
        formData,
        "descriptionUz",
      ),
    );

  const descriptionDe =
    getLines(
      getString(
        formData,
        "descriptionDe",
      ),
    );

  const categoryValue =
    getString(
      formData,
      "category",
    );

  const formatValue =
    getString(
      formData,
      "format",
    );

  const startDate =
    getString(
      formData,
      "startDate",
    );

  const endDate =
    getNullableString(
      formData,
      "endDate",
    );

  const startTime =
    getNullableString(
      formData,
      "startTime",
    );

  const endTime =
    getNullableString(
      formData,
      "endTime",
    );

  const timezone =
    getString(
      formData,
      "timezone",
    ) ||
    "Europe/Berlin";

  const city =
    getNullableString(
      formData,
      "city",
    );

  const bundesland =
    getNullableString(
      formData,
      "bundesland",
    );

  const venueName =
    getNullableString(
      formData,
      "venueName",
    );

  const address =
    getNullableString(
      formData,
      "address",
    );

  const onlineUrl =
    getNullableString(
      formData,
      "onlineUrl",
    );

  const organizerName =
    getString(
      formData,
      "organizerName",
    );

  const organizerUrl =
    getNullableString(
      formData,
      "organizerUrl",
    );

  const registrationStatusValue =
    getString(
      formData,
      "registrationStatus",
    );

  const registrationUrl =
    getNullableString(
      formData,
      "registrationUrl",
    );

  const registrationDeadline =
    getNullableString(
      formData,
      "registrationDeadline",
    );

  const languages =
    formData
      .getAll("languages")
      .filter(
        (
          value,
        ): value is string =>
          typeof value === "string",
      )
      .map(
        (value) =>
          value.trim(),
      )
      .filter(Boolean);

  const priceLabelUz =
    getString(
      formData,
      "priceLabelUz",
    );

  const priceLabelDe =
    getString(
      formData,
      "priceLabelDe",
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

  const verifiedAt =
    getString(
      formData,
      "verifiedAt",
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

  if (
    !eventId ||
    !slug ||
    !titleUz ||
    !titleDe ||
    !excerptUz ||
    !excerptDe ||
    descriptionUz.length === 0 ||
    descriptionDe.length === 0 ||
    !organizerName ||
    !priceLabelUz ||
    !priceLabelDe ||
    !officialSourceName ||
    !officialSourceUrl ||
    !verifiedAt
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte füllen Sie alle Pflichtfelder vollständig aus."
          : "Barcha majburiy maydonlarni to‘liq to‘ldiring.",
    };
  }

  if (
    !isCategory(
      categoryValue,
    ) ||
    !isFormat(
      formatValue,
    ) ||
    !isRegistrationStatus(
      registrationStatusValue,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Kategorie, Format oder Anmeldestatus ist ungültig."
          : "Kategoriya, format yoki ro‘yxatdan o‘tish holati noto‘g‘ri.",
    };
  }

  if (
    !isIsoDate(
      startDate,
    ) ||
    !isIsoDate(
      verifiedAt,
    ) ||
    (
      endDate !== null &&
      !isIsoDate(
        endDate,
      )
    ) ||
    (
      registrationDeadline !== null &&
      !isIsoDate(
        registrationDeadline,
      )
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie gültige Datumswerte ein."
          : "Sana maydonlarini to‘g‘ri kiriting.",
    };
  }

  if (
    endDate !== null &&
    compareDates(
      endDate,
      startDate,
    ) < 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Das Enddatum darf nicht vor dem Startdatum liegen."
          : "Tugash sanasi boshlanish sanasidan oldin bo‘lishi mumkin emas.",
    };
  }

  if (
    startTime !== null &&
    !isTime(
      startTime,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die Startzeit ist ungültig."
          : "Boshlanish vaqti noto‘g‘ri.",
    };
  }

  if (
    endTime !== null &&
    !isTime(
      endTime,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die Endzeit ist ungültig."
          : "Tugash vaqti noto‘g‘ri.",
    };
  }

  if (
    startTime !== null &&
    endTime !== null &&
    endDate === null &&
    compareTimes(
      endTime,
      startTime,
    ) < 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bei einer eintägigen Veranstaltung darf die Endzeit nicht vor der Startzeit liegen."
          : "Bir kunlik tadbirda tugash vaqti boshlanish vaqtidan oldin bo‘lishi mumkin emas.",
    };
  }

  if (
    registrationDeadline !== null &&
    compareDates(
      registrationDeadline,
      endDate ??
        startDate,
    ) > 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die Anmeldefrist darf nicht nach dem Veranstaltungsende liegen."
          : "Ro‘yxatdan o‘tish muddati tadbir tugaganidan keyin bo‘lishi mumkin emas.",
    };
  }

  if (
    descriptionUz.length !==
    descriptionDe.length
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die usbekischen und deutschen Beschreibungsabschnitte müssen gleich viele Einträge enthalten."
          : "O‘zbekcha va nemischa tavsif bo‘limlari soni bir xil bo‘lishi kerak.",
    };
  }

  if (
    importantNotesUz.length !==
    importantNotesDe.length
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die usbekischen und deutschen Hinweislisten müssen gleich viele Einträge enthalten."
          : "O‘zbekcha va nemischa muhim eslatmalar soni bir xil bo‘lishi kerak.",
    };
  }

  const hasPhysicalLocation =
    Boolean(
      city ||
      bundesland ||
      venueName ||
      address,
    );

  if (
    formatValue === "online" &&
    !onlineUrl
  ) {
    return {
      error:
        appLocale === "de"
          ? "Für Online-Veranstaltungen ist eine Online-URL erforderlich."
          : "Onlayn tadbir uchun online URL majburiy.",
    };
  }

  if (
    formatValue === "offline" &&
    !hasPhysicalLocation
  ) {
    return {
      error:
        appLocale === "de"
          ? "Für Offline-Veranstaltungen ist ein physischer Veranstaltungsort erforderlich."
          : "Oflayn tadbir uchun jismoniy joylashuv ma’lumoti kerak.",
    };
  }

  if (
    formatValue === "hybrid" &&
    (
      !onlineUrl ||
      !hasPhysicalLocation
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Hybrid-Veranstaltungen benötigen sowohl einen physischen Ort als auch eine Online-URL."
          : "Gibrid tadbir uchun ham jismoniy joylashuv, ham online URL kerak.",
    };
  }

  const urlValues = [
    onlineUrl,
    organizerUrl,
    registrationUrl,
    officialSourceUrl,
  ];

  if (
    urlValues.some(
      (value) =>
        value !== null &&
        !isHttpUrl(
          value,
        ),
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte verwenden Sie vollständige http(s)-URLs."
          : "URL maydonlarida to‘liq http(s) manzillarini kiriting.",
    };
  }

  try {
    const updated =
      await updateAdminEvent(
        eventId,
        {
          slug,
          titleUz,
          titleDe,
          excerptUz,
          excerptDe,
          descriptionUz,
          descriptionDe,
          category:
            categoryValue,
          format:
            formatValue,
          startDate,
          endDate,
          startTime,
          endTime,
          timezone,
          city,
          bundesland,
          venueName,
          address,
          onlineUrl,
          organizerName,
          organizerUrl,
          registrationStatus:
            registrationStatusValue,
          registrationUrl,
          registrationDeadline,
          languages,
          priceLabelUz,
          priceLabelDe,
          officialSourceName,
          officialSourceUrl,
          verifiedAt,
          importantNotesUz,
          importantNotesDe,
        },
      );

    if (!updated) {
      return {
        error:
          appLocale === "de"
            ? "Die Veranstaltung wurde nicht gefunden."
            : "Tadbir topilmadi.",
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
            ? "Dieser Slug wird bereits verwendet."
            : "Bu slug allaqachon ishlatilgan.",
      };
    }

    console.error(
      "Failed to update admin event:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Die Veranstaltung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
          : "Tadbirni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    };
  }

  revalidatePath(
    "/[locale]/admin/events",
    "page",
  );

  return redirect({
    href: "/admin/events",
    locale:
      appLocale,
  });
}
