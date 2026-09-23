export type SupportedLocale = "uz" | "de";

export type LocalizedText = Readonly<

  Record<SupportedLocale, string>

>;

export type SpecialistCategory =

  | "medical"

  | "legal"

  | "technology"

  | "entrepreneur"

  | "automotive"

  | "home"

  | "education"

  | "language-teaching"

  | "academic-documents"

  | "beauty"

  | "finance"

  | "creative"

  | "science";

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

  mobile?: string;

  website?: string;

  whatsapp?: string;

  telegram?: string;

  instagram?: string;

  youtube?: string;

  facebook?: string;

  googleScholar?: string;

  researchGate?: string;

  github?: string;

  linkedin?: string;

}>;


export type SpecialistAchievement = Readonly<{

  year: string;

  title: LocalizedText;

  award?: LocalizedText;

  sourceUrl?: string;

}>;

export type LocalizedSpecialistAchievement = Readonly<{

  year: string;

  title: string;

  award?: string;

  sourceUrl?: string;

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

  profile?: ReadonlyArray<LocalizedText>;

  education?: ReadonlyArray<LocalizedText>;

  memberships?: ReadonlyArray<LocalizedText>;

  achievements?: ReadonlyArray<SpecialistAchievement>;

  categories: ReadonlyArray<SpecialistCategory>;

  languages: ReadonlyArray<SpecialistLanguage>;

  services: ReadonlyArray<LocalizedText>;

  location?: SpecialistLocation;

  serviceArea?: LocalizedText;

  contact: SpecialistContact;

  status: SpecialistStatus;

  pricingNote?: LocalizedText;

  profilePublished: boolean;

  avatarUrl?: string;

  imageFit?: "cover" | "contain";

  imagePosition?: string;

  imageScale?: number;

  avatarCredit?: string;

  avatarSourceUrl?: string;

  yearsOfExperience?: number;

  rating?: number;

  reviewCount?: number;

  updatedAt?: string;

}>;

export type LocalizedSpecialist = Omit<

  Specialist,

  | "profession"

  | "shortDescription"

  | "services"

  | "profile"

  | "education"

  | "memberships"

  | "achievements"

  | "pricingNote"

  | "serviceArea"

> & {

  profession: string;

  shortDescription: string;

  services: ReadonlyArray<string>;

  profile?: ReadonlyArray<string>;

  education?: ReadonlyArray<string>;

  memberships?: ReadonlyArray<string>;

  achievements?: ReadonlyArray<LocalizedSpecialistAchievement>;

  pricingNote?: string;

  serviceArea?: string;

};
