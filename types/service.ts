export type SupportedContentLocale = "uz" | "de";

export type LocalizedText = Readonly<
  Record<SupportedContentLocale, string>
>;

export type ServiceCategory =
  | "translation"
  | "legal"
  | "tax"
  | "medical"
  | "craft"
  | "consumer";

export type LocalizedServiceItem = Readonly<{
  id: number;
  slug: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  category: ServiceCategory;
  icon: string;
  services: ReadonlyArray<LocalizedText>;
  verificationSteps: ReadonlyArray<LocalizedText>;
  importantNotes: ReadonlyArray<LocalizedText>;
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: LocalizedText;
  location: LocalizedText;
  featured?: boolean;
}>;

export type ServiceItem = Readonly<{
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  icon: string;
  services: ReadonlyArray<string>;
  verificationSteps: ReadonlyArray<string>;
  importantNotes: ReadonlyArray<string>;
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: string;
  location: string;
  updatedAt?: string;
  featured?: boolean;
}>;
