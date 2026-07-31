export type EventCategory =
  | "Madaniyat"
  | "Ta’lim"
  | "Karyera"
  | "Biznes"
  | "Jamiyat"
  | "Sport"
  | "Bolalar uchun"
  | "Konsullik";

export type EventFormat =
  | "Oflayn"
  | "Onlayn"
  | "Gibrid";

export type RegistrationStatus =
  | "Ro‘yxatdan o‘tish ochiq"
  | "Ro‘yxatdan o‘tish shart emas"
  | "Joylar tugagan"
  | "Ro‘yxatdan o‘tish yopilgan";

export type EventItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  description: string[];
  category: EventCategory;
  format: EventFormat;

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

  registrationStatus: RegistrationStatus;
  registrationUrl?: string;
  registrationDeadline?: string;

  language: string[];
  priceLabel: string;

  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;

  importantNotes: string[];
  featured?: boolean;
};

/**
 * Bu ro‘yxatga faqat rasmiy manbasi tekshirilgan tadbirlarni qo‘shing.
 *
 * Uydirma yoki tasdiqlanmagan tadbir qo‘shmang.
 *
 * Yangi tadbir qo‘shish namunasi:
 *
 * {
 *   id: 1,
 *   slug: "tadbir-nomi-berlin-2026",
 *   title: "Tadbir nomi",
 *   excerpt: "Tadbirning qisqa tavsifi.",
 *   description: [
 *     "Tadbir haqida birinchi paragraf.",
 *     "Tadbir haqida ikkinchi paragraf.",
 *   ],
 *   category: "Madaniyat",
 *   format: "Oflayn",
 *   startDate: "2026-09-20",
 *   startTime: "15:00",
 *   endTime: "19:00",
 *   timezone: "Europe/Berlin",
 *   city: "Berlin",
 *   bundesland: "Berlin",
 *   venueName: "Tadbir o‘tkaziladigan joy",
 *   address: "Ko‘cha 1, 10115 Berlin",
 *   organizerName: "Tashkilotchi nomi",
 *   organizerUrl: "https://example.org",
 *   registrationStatus: "Ro‘yxatdan o‘tish ochiq",
 *   registrationUrl: "https://example.org/register",
 *   registrationDeadline: "2026-09-18",
 *   language: ["O‘zbek tili", "Nemis tili"],
 *   priceLabel: "Bepul",
 *   officialSourceName: "Rasmiy tashkilotchi sahifasi",
 *   officialSourceUrl: "https://example.org/event",
 *   verifiedAt: "2026-07-30",
 *   importantNotes: [
 *     "Joylar soni cheklangan.",
 *     "Ro‘yxatdan o‘tish talab qilinadi.",
 *   ],
 *   featured: true,
 * }
 */

export const events: EventItem[] = [];

export function getEventBySlug(
  slug: string,
): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}

export function getFeaturedEvent(): EventItem | undefined {
  return events.find((event) => event.featured);
}

export function getUpcomingEvents(): EventItem[] {
  const now = new Date();

  return [...events]
    .filter((event) => {
      const eventEndDate = event.endDate ?? event.startDate;
      const endOfEvent = new Date(`${eventEndDate}T23:59:59`);

      return endOfEvent >= now;
    })
    .sort(
      (firstEvent, secondEvent) =>
        new Date(firstEvent.startDate).getTime() -
        new Date(secondEvent.startDate).getTime(),
    );
}

export function getPastEvents(): EventItem[] {
  const now = new Date();

  return [...events]
    .filter((event) => {
      const eventEndDate = event.endDate ?? event.startDate;
      const endOfEvent = new Date(`${eventEndDate}T23:59:59`);

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
  limit = 3,
): EventItem[] {
  return events
    .filter(
      (event) =>
        event.slug !== currentEvent.slug &&
        (event.category === currentEvent.category ||
          event.city === currentEvent.city),
    )
    .slice(0, limit);
}

export function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function formatEventDateShort(date: string): string {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

export function formatEventDateRange(
  startDate: string,
  endDate?: string,
): string {
  if (!endDate || startDate === endDate) {
    return formatEventDate(startDate);
  }

  return `${formatEventDate(startDate)} — ${formatEventDate(
    endDate,
  )}`;
}

export function formatEventTime(
  startTime?: string,
  endTime?: string,
): string {
  if (!startTime) {
    return "Vaqt tashkilotchi tomonidan ko‘rsatilmagan";
  }

  if (!endTime) {
    return startTime;
  }

  return `${startTime} — ${endTime}`;
}

export function getEventLocation(event: EventItem): string {
  if (event.format === "Onlayn") {
    return "Onlayn tadbir";
  }

  const locationParts = [
    event.venueName,
    event.city,
    event.bundesland,
  ].filter(Boolean);

  return locationParts.join(", ");
}