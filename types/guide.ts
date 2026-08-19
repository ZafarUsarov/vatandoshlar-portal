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

export type GuideArticleStatus =
  | "published"
  | "draft";

export type GuideArticleSectionKey =
  | "overview"
  | "eligibility"
  | "requirements"
  | "documents"
  | "conditions"
  | "warnings";

export type LocalizedText = Readonly<
  Record<SupportedGuideLocale, string>
>;

export type LocalizedGuideStep = Readonly<{
  title: LocalizedText;
  description: LocalizedText;
}>;

export type GuideStep = Readonly<{
  title: string;
  description: string;
}>;

export type LocalizedGuideFAQ = Readonly<{
  question: LocalizedText;
  answer: LocalizedText;
}>;

export type GuideFAQ = Readonly<{
  question: string;
  answer: string;
}>;

export type GuideSource = Readonly<{
  title: string;
  organization: string;
  url: string;
  language: "de" | "en";
}>;

export type LocalizedGuideArticle = Readonly<{
  id: string;
  slug: string;
  categorySlug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  intro: LocalizedText;
  status: GuideArticleStatus;
  featured?: boolean;
  lastReviewedAt: string;
  readingTime: LocalizedText;
  facts: ReadonlyArray<Readonly<{
    label: LocalizedText;
    value: LocalizedText;
  }>>;
  sections: Readonly<
    Partial<
      Record<
        GuideArticleSectionKey,
        Readonly<{
          title: LocalizedText;
          paragraphs?: ReadonlyArray<LocalizedText>;
          items?: ReadonlyArray<LocalizedText>;
        }>
      >
    >
  >;
  steps: ReadonlyArray<LocalizedGuideStep>;
  faq: ReadonlyArray<LocalizedGuideFAQ>;
  sources: ReadonlyArray<GuideSource>;
  relatedArticleSlugs: ReadonlyArray<string>;
}>;

export type GuideArticle = Readonly<{
  id: string;
  databaseId?: string;
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  intro: string;
  status: GuideArticleStatus;
  featured?: boolean;
  lastReviewedAt: string;
  updatedAt?: string;
  viewCount?: number;
  readingTime: string;
  facts: ReadonlyArray<Readonly<{
    label: string;
    value: string;
  }>>;
  sections: Readonly<
    Partial<
      Record<
        GuideArticleSectionKey,
        Readonly<{
          title: string;
          paragraphs: ReadonlyArray<string>;
          items: ReadonlyArray<string>;
        }>
      >
    >
  >;
  steps: ReadonlyArray<GuideStep>;
  faq: ReadonlyArray<GuideFAQ>;
  sources: ReadonlyArray<GuideSource>;
  relatedArticleSlugs: ReadonlyArray<string>;
}>;
