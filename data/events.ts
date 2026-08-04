export type SupportedEventLocale = "uz" | "de";

export type LocalizedText = Readonly<
  Record<SupportedEventLocale, string>
>;

export type EventCategoryKey =
  | "culture"
  | "education"
  | "career"
  | "business"
  | "community"
  | "sport"
  | "children"
  | "consular";

export type EventFormatKey =
  | "offline"
  | "online"
  | "hybrid";

export type RegistrationStatusKey =
  | "open"
  | "not-required"
  | "sold-out"
  | "closed";

export type LocalizedEventItem = Readonly<{
  id: number;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  description: ReadonlyArray<LocalizedText>;
  category: EventCategoryKey;
  format: EventFormatKey;

  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone: string;

  city?: string;
  bundesland?: string;
  venueName?: LocalizedText;
  address?: string;
  onlineUrl?: string;

  organizerName: string;
  organizerUrl?: string;

  registrationStatus: RegistrationStatusKey;
  registrationUrl?: string;
  registrationDeadline?: string;

  language: ReadonlyArray<LocalizedText>;
  priceLabel: LocalizedText;

  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;

  importantNotes: ReadonlyArray<LocalizedText>;
  featured?: boolean;
}>;

export type EventItem = Readonly<{
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  description: ReadonlyArray<string>;
  category: string;
  categoryKey: EventCategoryKey;
  format: string;
  formatKey: EventFormatKey;

  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone: string;

  city?: string;
  bundesland?: string;
  venueName?: string;
  address?: string;
  onlineUrl?: string;

  organizerName: string;
  organizerUrl?: string;

  registrationStatus: string;
  registrationStatusKey: RegistrationStatusKey;
  registrationUrl?: string;
  registrationDeadline?: string;

  language: ReadonlyArray<string>;
  priceLabel: string;

  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;

  importantNotes: ReadonlyArray<string>;
  featured?: boolean;
}>;

const categoryLabels: Readonly<
  Record<
    SupportedEventLocale,
    Record<EventCategoryKey, string>
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

const formatLabels: Readonly<
  Record<
    SupportedEventLocale,
    Record<EventFormatKey, string>
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

const registrationStatusLabels: Readonly<
  Record<
    SupportedEventLocale,
    Record<RegistrationStatusKey, string>
  >
> = {
  uz: {
    open: "Ro‘yxatdan o‘tish ochiq",
    "not-required": "Ro‘yxatdan o‘tish shart emas",
    "sold-out": "Joylar tugagan",
    closed: "Ro‘yxatdan o‘tish yopilgan",
  },
  de: {
    open: "Anmeldung geöffnet",
    "not-required": "Keine Anmeldung erforderlich",
    "sold-out": "Ausgebucht",
    closed: "Anmeldung geschlossen",
  },
};

/**
 * Bu ro‘yxatga faqat rasmiy manbasi tekshirilgan tadbirlarni qo‘shing.
 * Fügen Sie hier nur Veranstaltungen mit geprüfter offizieller Quelle ein.
 *
 * Hozircha tasdiqlangan tadbir mavjud emas.
 */
export const localizedEvents: ReadonlyArray<LocalizedEventItem> = [];

export function localizeEvent(
  event: LocalizedEventItem,
  locale: SupportedEventLocale,
): EventItem {
  return {
    ...event,
    title: event.title[locale],
    excerpt: event.excerpt[locale],
    description: event.description.map(
      (paragraph) => paragraph[locale],
    ),
    category: categoryLabels[locale][event.category],
    categoryKey: event.category,
    format: formatLabels[locale][event.format],
    formatKey: event.format,
    venueName: event.venueName?.[locale],
    registrationStatus:
      registrationStatusLabels[locale][
        event.registrationStatus
      ],
    registrationStatusKey: event.registrationStatus,
    language: event.language.map(
      (language) => language[locale],
    ),
    priceLabel: event.priceLabel[locale],
    importantNotes: event.importantNotes.map(
      (note) => note[locale],
    ),
  };
}

export function getEvents(
  locale: SupportedEventLocale,
): ReadonlyArray<EventItem> {
  return localizedEvents.map((event) =>
    localizeEvent(event, locale),
  );
}

export function getEventBySlug(
  slug: string,
  locale: SupportedEventLocale,
): EventItem | undefined {
  const event = localizedEvents.find(
    (item) => item.slug === slug,
  );

  return event ? localizeEvent(event, locale) : undefined;
}

export function getFeaturedEvent(
  locale: SupportedEventLocale,
): EventItem | undefined {
  const event = localizedEvents.find(
    (item) => item.featured,
  );

  return event ? localizeEvent(event, locale) : undefined;
}

export function getUpcomingEvents(
  locale: SupportedEventLocale,
): ReadonlyArray<EventItem> {
  const now = new Date();

  return getEvents(locale)
    .filter((event) => {
      const eventEndDate =
        event.endDate ?? event.startDate;
      const endOfEvent = new Date(
        `${eventEndDate}T23:59:59`,
      );

      return endOfEvent >= now;
    })
    .sort(
      (firstEvent, secondEvent) =>
        new Date(firstEvent.startDate).getTime() -
        new Date(secondEvent.startDate).getTime(),
    );
}

export function getPastEvents(
  locale: SupportedEventLocale,
): ReadonlyArray<EventItem> {
  const now = new Date();

  return getEvents(locale)
    .filter((event) => {
      const eventEndDate =
        event.endDate ?? event.startDate;
      const endOfEvent = new Date(
        `${eventEndDate}T23:59:59`,
      );

      return endOfEvent < now;
    })
    .sort(
      (firstEvent, secondEvent) =>
        new Date(secondEvent.startDate).getTime() -
        new Date(firstEvent.startDate).getTime(),
    );
}

export function getRelatedEvents(
  currentEvent: EventItem,
  locale: SupportedEventLocale,
  limit = 3,
): ReadonlyArray<EventItem> {
  return getEvents(locale)
    .filter(
      (event) =>
        event.slug !== currentEvent.slug &&
        (event.categoryKey ===
          currentEvent.categoryKey ||
          event.city === currentEvent.city),
    )
    .slice(0, limit);
}

export function formatEventDate(
  date: string,
  locale: SupportedEventLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz" ? "uz-UZ" : "de-DE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(`${date}T12:00:00`));
}

export function formatEventDateShort(
  date: string,
  locale: SupportedEventLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz" ? "uz-UZ" : "de-DE",
    {
      day: "2-digit",
      month: "short",
    },
  ).format(new Date(`${date}T12:00:00`));
}

export function formatEventDateRange(
  startDate: string,
  locale: SupportedEventLocale,
  endDate?: string,
): string {
  if (!endDate || startDate === endDate) {
    return formatEventDate(startDate, locale);
  }

  return `${formatEventDate(
    startDate,
    locale,
  )} — ${formatEventDate(endDate, locale)}`;
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
  if (event.formatKey === "online") {
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
