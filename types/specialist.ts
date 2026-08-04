export type SupportedLocale = "uz" | "de";

export type LocalizedText = Readonly<
  Record<SupportedLocale, string>
>;

export type SpecialistCategory =
  | "medical"
  | "legal"
  | "technology"
  | "automotive"
  | "home"
  | "education"
  | "language-teaching"
  | "academic-documents"
  | "beauty"
  | "finance"
  | "creative";

export type SpecialistLanguage =
  | "uz"
  | "de"
  | "ru"
  | "en"
  | "tr";

export type SpecialistStatus = Readonly<{
  verified: boolean;
  featured: boolean;
  premium: boolean;
  sponsored: boolean;
}>;

export type SpecialistContact = Readonly<{
  email?: string;
  phone?: string;
  website?: string;
  whatsapp?: string;
  telegram?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
}>;

export type SpecialistLocation = Readonly<{
  city?: string;
  bundesland?: string;
  postalCode?: string;
}>;

export type Specialist = Readonly<{
  id: string;
  code: string;
  slug: string;
  name: string;
  profession: LocalizedText;
  shortDescription: LocalizedText;
  categories: ReadonlyArray<SpecialistCategory>;
  languages: ReadonlyArray<SpecialistLanguage>;
  services: ReadonlyArray<LocalizedText>;
  location?: SpecialistLocation;
  contact: SpecialistContact;
  status: SpecialistStatus;
  pricingNote?: LocalizedText;
  profilePublished: boolean;
  avatarUrl?: string;
  yearsOfExperience?: number;
  rating?: number;
  reviewCount?: number;
}>;

export type LocalizedSpecialist = Omit<
  Specialist,
  | "profession"
  | "shortDescription"
  | "services"
  | "pricingNote"
> & {
  profession: string;
  shortDescription: string;
  services: ReadonlyArray<string>;
  pricingNote?: string;
};
