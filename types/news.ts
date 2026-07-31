export type ContentType =
  | "Rasmiy ma’lumot"
  | "Foydali qo‘llanma"
  | "Ta’lim"
  | "Ish va migratsiya"
  | "Konsullik";

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  contentType: ContentType;
  readingTime: string;
  verifiedAt: string;
  sourceName: string;
  sourceUrl: string;
  sourceLanguage: string;
  location?: string;
  featured?: boolean;
};