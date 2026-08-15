"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminEvent,
  type AdminEventCategory,
  type AdminEventFormat,
  type AdminEventOperationalStatus,
  type AdminEventOrganizerType,
  type AdminEventRegistrationMethod,
  type AdminEventRegistrationStatus,
  type AdminEventInput,
} from "@/lib/events/admin-events-repository";

export type EventEditActionState = {
  error: string | null;
};

const categories: AdminEventCategory[] = [
  "culture",
  "education",
  "career",
  "business",
  "community",
  "sport",
  "children",
  "consular",
];

const formats: AdminEventFormat[] = [
  "offline",
  "online",
  "hybrid",
];

const eventStatuses: AdminEventOperationalStatus[] = [
  "planning",
  "scheduled",
  "cancelled",
];

const organizerTypes: AdminEventOrganizerType[] = [
  "vatandoshlar",
  "external",
];

const registrationStatuses: AdminEventRegistrationStatus[] = [
  "open",
  "not_required",
  "sold_out",
  "closed",
];

const registrationMethods: AdminEventRegistrationMethod[] = [
  "google_form",
  "telegram",
  "email",
  "phone",
  "external_url",
  "none",
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

function isEventStatus(
  value: string,
): value is AdminEventOperationalStatus {
  return eventStatuses.includes(
    value as AdminEventOperationalStatus,
  );
}

function isOrganizerType(
  value: string,
): value is AdminEventOrganizerType {
  return organizerTypes.includes(
    value as AdminEventOrganizerType,
  );
}

function isRegistrationStatus(
  value: string,
): value is AdminEventRegistrationStatus {
  return registrationStatuses.includes(
    value as AdminEventRegistrationStatus,
  );
}

function isRegistrationMethod(
  value: string,
): value is AdminEventRegistrationMethod {
  return registrationMethods.includes(
    value as AdminEventRegistrationMethod,
  );
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T12:00:00Z`);

  return !Number.isNaN(date.getTime());
}

function isTime(value: string): boolean {
  return /^\d{2}:\d{2}$/.test(value);
}

function isHttpUrl(value: string): boolean {
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

function isGoogleFormViewUrl(
  value: string,
): boolean {
  if (!isHttpUrl(value)) {
    return false;
  }

  const url = new URL(value);

  return (
    url.protocol === "https:" &&
    url.hostname === "docs.google.com" &&
    url.pathname.includes("/forms/") &&
    url.pathname.endsWith("/viewform")
  );
}

function compareDates(
  left: string,
  right: string,
): number {
  return left.localeCompare(right);
}

function compareTimes(
  left: string,
  right: string,
): number {
  return left.localeCompare(right);
}

function isPositiveInteger(
  value: string,
): boolean {
  return /^\d+$/.test(value) && Number(value) > 0;
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
  const locale = await getLocale();
  const appLocale: "uz" | "de" =
    locale === "de" ? "de" : "uz";

  await requireAdmin(appLocale);

  const eventId =
    getString(
      formData,
      "eventId",
    );

  const slug =
    normalizeSlug(
      getString(formData, "slug"),
    );
  const titleUz = getString(formData, "titleUz");
  const titleDe = getString(formData, "titleDe");
  const excerptUz = getString(formData, "excerptUz");
  const excerptDe = getString(formData, "excerptDe");
  const descriptionUz =
    getLines(getString(formData, "descriptionUz"));
  const descriptionDe =
    getLines(getString(formData, "descriptionDe"));

  const categoryValue = getString(formData, "category");
  const formatValue = getString(formData, "format");
  const eventStatusValue = getString(formData, "eventStatus");

  const startDate =
    getNullableString(formData, "startDate");
  const endDate =
    getNullableString(formData, "endDate");
  const startTime =
    getNullableString(formData, "startTime");
  const endTime =
    getNullableString(formData, "endTime");
  const timezone =
    getString(formData, "timezone") ||
    "Europe/Berlin";

  const city =
    getNullableString(formData, "city");
  const bundesland =
    getNullableString(formData, "bundesland");
  const venueName =
    getNullableString(formData, "venueName");
  const address =
    getNullableString(formData, "address");
  const onlineUrl =
    getNullableString(formData, "onlineUrl");

  const organizerTypeValue =
    getString(formData, "organizerType");
  const organizerName =
    getString(formData, "organizerName");
  const organizerUrl =
    getNullableString(formData, "organizerUrl");

  const registrationStatusValue =
    getString(formData, "registrationStatus");
  const registrationMethodValue =
    getString(formData, "registrationMethod");
  const registrationUrl =
    getNullableString(formData, "registrationUrl");
  const registrationValue =
    getNullableString(formData, "registrationValue");
  const registrationRequired =
    formData.get("registrationRequired") === "on";
  const registrationDeadline =
    getNullableString(formData, "registrationDeadline");
  const capacityValue =
    getNullableString(formData, "capacity");

  const languages =
    formData
      .getAll("languages")
      .filter(
        (value): value is string =>
          typeof value === "string",
      )
      .map((value) => value.trim())
      .filter(Boolean);

  const priceLabelUz =
    getString(formData, "priceLabelUz");
  const priceLabelDe =
    getString(formData, "priceLabelDe");

  const officialSourceName =
    getNullableString(
      formData,
      "officialSourceName",
    );
  const officialSourceUrl =
    getNullableString(
      formData,
      "officialSourceUrl",
    );
  const verifiedAt =
    getNullableString(formData, "verifiedAt");

  const importantNotesUz =
    getLines(
      getString(formData, "importantNotesUz"),
    );
  const importantNotesDe =
    getLines(
      getString(formData, "importantNotesDe"),
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
    !priceLabelDe
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte füllen Sie alle Pflichtfelder vollständig aus."
          : "Barcha majburiy maydonlarni to‘liq to‘ldiring.",
    };
  }

  if (
    !isCategory(categoryValue) ||
    !isFormat(formatValue) ||
    !isEventStatus(eventStatusValue) ||
    !isOrganizerType(organizerTypeValue) ||
    !isRegistrationStatus(registrationStatusValue) ||
    !isRegistrationMethod(registrationMethodValue)
  ) {
    return {
      error:
        appLocale === "de"
          ? "Kategorie, Format, Veranstaltungsstatus, Veranstaltertyp oder Anmeldung ist ungültig."
          : "Kategoriya, format, tadbir holati, tashkilotchi turi yoki ro‘yxatdan o‘tish qiymati noto‘g‘ri.",
    };
  }

  const isScheduled =
    eventStatusValue === "scheduled";

  if (
    isScheduled &&
    (
      !startDate ||
      !officialSourceName ||
      !officialSourceUrl ||
      !verifiedAt
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Geplante reale Veranstaltungen benötigen Startdatum, offizielle Quelle und Prüfdatum."
          : "Tasdiqlangan real tadbir uchun boshlanish sanasi, rasmiy manba va tekshirilgan sana majburiy.",
    };
  }

  const dateValues = [
    startDate,
    endDate,
    registrationDeadline,
    verifiedAt,
  ];

  if (
    dateValues.some(
      (value) =>
        value !== null &&
        !isIsoDate(value),
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
    (
      startDate === null ||
      compareDates(endDate, startDate) < 0
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Ein Enddatum ist nur mit gültigem Startdatum möglich und darf nicht davor liegen."
          : "Tugash sanasi faqat boshlanish sanasi bilan kiritiladi va undan oldin bo‘lishi mumkin emas.",
    };
  }

  if (
    startTime !== null &&
    !isTime(startTime)
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
    !isTime(endTime)
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
    compareTimes(endTime, startTime) < 0
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
    (
      startDate === null ||
      compareDates(
        registrationDeadline,
        endDate ?? startDate,
      ) > 0
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Eine Anmeldefrist benötigt ein Veranstaltungsdatum und darf nicht nach dem Veranstaltungsende liegen."
          : "Ro‘yxatdan o‘tish muddati uchun tadbir sanasi kerak va muddat tadbir tugaganidan keyin bo‘lishi mumkin emas.",
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
    isScheduled &&
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
    isScheduled &&
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
    isScheduled &&
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
        !isHttpUrl(value),
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte verwenden Sie vollständige http(s)-URLs."
          : "URL maydonlarida to‘liq http(s) manzillarini kiriting.",
    };
  }

  if (
    registrationMethodValue === "none" &&
    (
      registrationRequired ||
      registrationUrl !== null ||
      registrationValue !== null
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bei 'keine Anmeldung' dürfen kein Anmeldeziel und keine Pflichtanmeldung gesetzt sein."
          : "'Ro‘yxatdan o‘tish kerak emas' usulida registration manzili bo‘sh va majburiy ro‘yxatdan o‘tish o‘chiq bo‘lishi kerak.",
    };
  }

  if (
    registrationMethodValue === "google_form" &&
    (
      registrationUrl === null ||
      !isGoogleFormViewUrl(registrationUrl) ||
      registrationValue !== null
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Für Google Forms ist ausschließlich die öffentliche viewform-URL zulässig."
          : "Google Form uchun faqat respondentlarga mo‘ljallangan public viewform URL ishlatilishi mumkin.",
    };
  }

  if (
    registrationMethodValue === "external_url" &&
    (
      registrationUrl === null ||
      registrationValue !== null
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Für externe Anmeldung ist eine vollständige URL erforderlich."
          : "Tashqi ro‘yxatdan o‘tish uchun to‘liq URL kerak.",
    };
  }

  if (
    (
      registrationMethodValue === "telegram" ||
      registrationMethodValue === "email" ||
      registrationMethodValue === "phone"
    ) &&
    (
      registrationValue === null ||
      registrationUrl !== null
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Für Telegram, E-Mail oder Telefon ist der öffentliche Kontaktwert erforderlich."
          : "Telegram, email yoki telefon usuli uchun tashkilotchi ommaga bergan kontakt qiymati kerak.",
    };
  }

  if (
    capacityValue !== null &&
    !isPositiveInteger(capacityValue)
  ) {
    return {
      error:
        appLocale === "de"
          ? "Die Kapazität muss eine positive ganze Zahl sein."
          : "Sig‘im musbat butun son bo‘lishi kerak.",
    };
  }

  const input: AdminEventInput = {
    slug,
    titleUz,
    titleDe,
    excerptUz,
    excerptDe,
    descriptionUz,
    descriptionDe,
    category: categoryValue,
    format: formatValue,
    eventStatus: eventStatusValue,
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
    organizerType: organizerTypeValue,
    organizerName,
    organizerUrl,
    registrationStatus: registrationStatusValue,
    registrationMethod: registrationMethodValue,
    registrationUrl,
    registrationValue,
    registrationRequired,
    registrationDeadline,
    capacity:
      capacityValue === null
        ? null
        : Number(capacityValue),
    languages,
    priceLabelUz,
    priceLabelDe,
    officialSourceName,
    officialSourceUrl,
    verifiedAt,
    importantNotesUz,
    importantNotesDe,
  };

  try {
    const updated =
      await updateAdminEvent(
        eventId,
        input,
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
    if (isUniqueViolation(error)) {
      return {
        error:
          appLocale === "de"
            ? "Dieser Slug wird bereits verwendet."
            : "Bu slug allaqachon ishlatilgan.",
      };
    }

    console.error(
      "Failed to edit admin event:",
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
    locale: appLocale,
  });
}
