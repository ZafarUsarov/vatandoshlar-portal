import "server-only";

import type { SearchCategory, SearchLocale } from "@/data/searchIndex";
import { normalizeSearchText } from "@/lib/search/search-normalization";
import { rankSearchDocuments } from "@/lib/search/search-ranking";
import type { SearchResult } from "@/lib/search/search-types";
import { getPublicSearchIndex } from "@/lib/search/public-search-index";

export async function searchPublicContent(options: Readonly<{
  query: string;
  locale: SearchLocale;
  category?: SearchCategory;
  limit?: number;
}>): Promise<Readonly<{
  results: ReadonlyArray<SearchResult>;
  total: number;
}>> {
  const normalizedQuery = normalizeSearchText(options.query, options.locale);

  if (!normalizedQuery) {
    return { results: [], total: 0 };
  }

  const index = await getPublicSearchIndex(options.locale);
  const filteredIndex = options.category
    ? index.filter((item) => item.category === options.category)
    : index;
  const ranked = rankSearchDocuments(filteredIndex, normalizedQuery, options.locale);
  const total = ranked.length;
  const limit = Math.min(Math.max(options.limit ?? 20, 1), 50);

  return {
    total,
    results: ranked.slice(0, limit).map(({ item }) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      href: item.href,
      category: item.category,
      ...(item.badge ? { badge: item.badge } : {}),
    })),
  };
}
