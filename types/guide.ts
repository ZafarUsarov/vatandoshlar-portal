export type SupportedGuideLocale = "uz" | "de";

export type GuideCategoryIcon =
  | "arrival"
  | "visa"
  | "family"
  | "invitation"
  | "embassy"
  | "documents"
  | "language"
  | "education"
  | "career"
  | "after-arrival"
  | "recognition"
  | "integration";

export type GuideCategoryStatus =
  | "available"
  | "coming-soon";

export type GuideCategory = Readonly<{
  id: string;
  slug: string;
  icon: GuideCategoryIcon;
  title: string;
  description: string;
  articleCount: number;
  status: GuideCategoryStatus;
  featured?: boolean;
}>;

export type LocalizedGuideCategory = Readonly<{
  id: string;
  slug: string;
  icon: GuideCategoryIcon;
  title: Readonly<Record<SupportedGuideLocale, string>>;
  description: Readonly<Record<SupportedGuideLocale, string>>;
  articleCount: number;
  status: GuideCategoryStatus;
  featured?: boolean;
}>;
