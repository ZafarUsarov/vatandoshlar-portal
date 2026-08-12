export type SupportedEventLocale =
  | "uz"
  | "de";

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
