import type { SearchCategory, SearchLocale } from "@/data/searchIndex";

export type SearchResult = Readonly<{
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  badge?: string;
}>;

export type SearchApiResponse = Readonly<{
  query: string;
  locale: SearchLocale;
  results: ReadonlyArray<SearchResult>;
  total: number;
}>;
