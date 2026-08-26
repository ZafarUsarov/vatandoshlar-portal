import type { SearchLocale } from "@/data/searchIndex";
import { normalizeSearchText } from "@/lib/search/search-normalization";
import type { SearchableDocument } from "@/lib/search/public-search-index";

type RankedDocument = Readonly<{
  item: SearchableDocument;
  score: number;
}>;

function fieldIncludes(
  values: ReadonlyArray<string>,
  normalizedQuery: string,
  locale: SearchLocale,
): boolean {
  return values.some((value) =>
    normalizeSearchText(value, locale).includes(normalizedQuery),
  );
}

export function scoreSearchDocument(
  item: SearchableDocument,
  query: string,
  locale: SearchLocale,
): number {
  const normalizedQuery = normalizeSearchText(query, locale);

  if (!normalizedQuery) {
    return 0;
  }

  const title = normalizeSearchText(item.title, locale);
  const description = normalizeSearchText(item.description, locale);

  if (title === normalizedQuery) return 1000;
  if (title.startsWith(normalizedQuery)) return 850;
  if (title.includes(normalizedQuery)) return 750;
  if (fieldIncludes(item.keywords, normalizedQuery, locale)) return 550;
  if (description.includes(normalizedQuery)) return 400;
  if (fieldIncludes(item.body, normalizedQuery, locale)) return 200;

  return 0;
}

export function rankSearchDocuments(
  items: ReadonlyArray<SearchableDocument>,
  query: string,
  locale: SearchLocale,
): ReadonlyArray<RankedDocument> {
  const ranked = items.flatMap((item) => {
    const score = scoreSearchDocument(item, query, locale);
    return score > 0 ? [{ item, score }] : [];
  });

  return ranked.sort((first, second) => {
    if (second.score !== first.score) {
      return second.score - first.score;
    }

    return first.item.title.localeCompare(
      second.item.title,
      locale === "de" ? "de-DE" : "uz-UZ",
    );
  });
}
