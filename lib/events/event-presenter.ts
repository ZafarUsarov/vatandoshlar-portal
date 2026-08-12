import type {
  PublicEventItem,
} from "@/lib/events/public-events-repository";
import type {
  EventItem,
  RegistrationStatusKey,
  SupportedEventLocale,
} from "@/types/event";

const categoryLabels: Record<
  SupportedEventLocale,
  Record<
    PublicEventItem["category"],
    string
  >
> = {
  uz: {
    culture: "Madaniyat",
    education: "Ta’lim",
    career: "Karyera",
    business: "Biznes",
    community: "Jamiyat",
    sport: "Sport",
    children: "Bolalar uchun",
    consular: "Konsullik",
  },

  de: {
    culture: "Kultur",
    education: "Bildung",
    career: "Karriere",
    business: "Wirtschaft",
    community: "Gemeinschaft",
    sport: "Sport",
    children: "Für Kinder",
    consular: "Konsularisches",
  },
};

const formatLabels: Record<
  SupportedEventLocale,
  Record<
    PublicEventItem["format"],
    string
  >
> = {
  uz: {
    offline: "Oflayn",
    online: "Onlayn",
    hybrid: "Gibrid",
  },

  de: {
    offline: "Vor Ort",
    online: "Online",
    hybrid: "Hybrid",
  },
};

const registrationStatusLabels: Record<
  SupportedEventLocale,
  Record<
    RegistrationStatusKey,
    string
  >
> = {
  uz: {
    open:
      "Ro‘yxatdan o‘tish ochiq",
    "not-required":
      "Ro‘yxatdan o‘tish shart emas",
    "sold-out":
      "Joylar tugagan",
    closed:
      "Ro‘yxatdan o‘tish yopilgan",
  },

  de: {
    open:
      "Anmeldung geöffnet",
    "not-required":
      "Keine Anmeldung erforderlich",
    "sold-out":
      "Ausgebucht",
    closed:
      "Anmeldung geschlossen",
  },
};

const languageLabels: Record<
  SupportedEventLocale,
  Record<string, string>
> = {
  uz: {
    uz: "O‘zbek tili",
    de: "Nemis tili",
    ru: "Rus tili",
    en: "Ingliz tili",
    tr: "Turk tili",
  },

  de: {
    uz: "Usbekisch",
    de: "Deutsch",
    ru: "Russisch",
    en: "Englisch",
    tr: "Türkisch",
  },
};

function toRegistrationStatusKey(
  value: PublicEventItem["registrationStatus"],
): RegistrationStatusKey {
  if (
    value === "not_required"
  ) {
    return "not-required";
  }

  if (
    value === "sold_out"
  ) {
    return "sold-out";
  }

  return value;
}

export function toEventItem(
  event: PublicEventItem,
  locale: SupportedEventLocale,
): EventItem {
  const numericId =
    Number(event.id);

  const registrationStatusKey =
    toRegistrationStatusKey(
      event.registrationStatus,
    );

  return {
    id:
      Number.isSafeInteger(
        numericId,
      )
        ? numericId
        : 0,

    slug:
      event.slug,

    title:
      event.title,

    excerpt:
      event.excerpt,

    description:
      event.description,

    category:
      categoryLabels[
        locale
      ][event.category],

    categoryKey:
      event.category,

    format:
      formatLabels[
        locale
      ][event.format],

    formatKey:
      event.format,

    startDate:
      event.startDate,

    ...(event.endDate
      ? {
          endDate:
            event.endDate,
        }
      : {}),

    ...(event.startTime
      ? {
          startTime:
            event.startTime,
        }
      : {}),

    ...(event.endTime
      ? {
          endTime:
            event.endTime,
        }
      : {}),

    timezone:
      event.timezone,

    ...(event.city
      ? {
          city:
            event.city,
        }
      : {}),

    ...(event.bundesland
      ? {
          bundesland:
            event.bundesland,
        }
      : {}),

    ...(event.venueName
      ? {
          venueName:
            event.venueName,
        }
      : {}),

    ...(event.address
      ? {
          address:
            event.address,
        }
      : {}),

    ...(event.onlineUrl
      ? {
          onlineUrl:
            event.onlineUrl,
        }
      : {}),

    organizerName:
      event.organizerName,

    ...(event.organizerUrl
      ? {
          organizerUrl:
            event.organizerUrl,
        }
      : {}),

    registrationStatus:
      registrationStatusLabels[
        locale
      ][registrationStatusKey],

    registrationStatusKey,

    ...(event.registrationUrl
      ? {
          registrationUrl:
            event.registrationUrl,
        }
      : {}),

    ...(event.registrationDeadline
      ? {
          registrationDeadline:
            event.registrationDeadline,
        }
      : {}),

    language:
      event.languages.map(
        (language) =>
          languageLabels[
            locale
          ][language] ??
          language,
      ),

    priceLabel:
      event.priceLabel,

    officialSourceName:
      event.officialSourceName,

    officialSourceUrl:
      event.officialSourceUrl,

    verifiedAt:
      event.verifiedAt,

    importantNotes:
      event.importantNotes,

    featured:
      event.featured,
  };
}

export function formatEventDate(
  date: string,
  locale: SupportedEventLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz"
      ? "uz-UZ"
      : "de-DE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(
    new Date(
      `${date}T12:00:00`,
    ),
  );
}

export function formatEventDateShort(
  date: string,
  locale: SupportedEventLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz"
      ? "uz-UZ"
      : "de-DE",
    {
      day: "2-digit",
      month: "short",
    },
  ).format(
    new Date(
      `${date}T12:00:00`,
    ),
  );
}

export function formatEventDateRange(
  startDate: string,
  locale: SupportedEventLocale,
  endDate?: string,
): string {
  if (
    !endDate ||
    startDate === endDate
  ) {
    return formatEventDate(
      startDate,
      locale,
    );
  }

  return `${formatEventDate(
    startDate,
    locale,
  )} — ${formatEventDate(
    endDate,
    locale,
  )}`;
}

export function formatEventTime(
  locale: SupportedEventLocale,
  startTime?: string,
  endTime?: string,
): string {
  if (!startTime) {
    return locale === "uz"
      ? "Vaqt tashkilotchi tomonidan ko‘rsatilmagan"
      : "Keine Uhrzeit angegeben";
  }

  if (!endTime) {
    return startTime;
  }

  return `${startTime} — ${endTime}`;
}

export function getEventLocation(
  event: EventItem,
  locale: SupportedEventLocale,
): string {
  if (
    event.formatKey ===
    "online"
  ) {
    return locale === "uz"
      ? "Onlayn tadbir"
      : "Online-Veranstaltung";
  }

  const locationParts = [
    event.venueName,
    event.city,
    event.bundesland,
  ].filter(Boolean);

  return locationParts.length > 0
    ? locationParts.join(", ")
    : locale === "uz"
      ? "Manzil ko‘rsatilmagan"
      : "Ort nicht angegeben";
}
