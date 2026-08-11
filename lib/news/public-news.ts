import type { NewsItem } from "@/types/news";

import {
  getPublishedNewsFromDatabase,
  type PublicNewsLocale,
} from "./public-news-repository";

export async function getPublicNewsCollection(
  locale: PublicNewsLocale,
  localizedStaticNews: NewsItem[],
): Promise<NewsItem[]> {
  const databaseNews =
    await getPublishedNewsFromDatabase(
      locale,
    );

  const databaseSlugs =
    new Set(
      databaseNews.map(
        (item) => item.slug,
      ),
    );

  const staticFallback =
    localizedStaticNews.filter(
      (item) =>
        !databaseSlugs.has(
          item.slug,
        ),
    );

  return [
    ...databaseNews,
    ...staticFallback,
  ].sort(
    (a, b) =>
      new Date(
        b.verifiedAt,
      ).getTime() -
      new Date(
        a.verifiedAt,
      ).getTime(),
  );
}

export function limitPublicNews(
  items: NewsItem[],
  limit?: number,
): NewsItem[] {
  if (
    typeof limit !== "number"
  ) {
    return items;
  }

  return items.slice(0, limit);
}
