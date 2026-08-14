export type SupportedJobLocale =
  | "uz"
  | "de";

export type JobCategory =
  | "students"
  | "english"
  | "minijob"
  | "internship"
  | "professionals"
  | "safety";

export type JobGuide = Readonly<{
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  icon: string;
  audience: string;
  highlights: ReadonlyArray<string>;
  searchKeywords: ReadonlyArray<string>;
  steps: ReadonlyArray<string>;
  importantNotes: ReadonlyArray<string>;
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: string;
  verifiedAt: string;
  updatedAt?: string;
  featured?: boolean;
}>;
