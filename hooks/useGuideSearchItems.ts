"use client";

import { useEffect, useState } from "react";

import type {
  GlobalSearchItem,
  SearchLocale,
} from "../data/searchIndex";

type GuideSearchApiResponse = Readonly<{
  items?: ReadonlyArray<GlobalSearchItem>;
}>;

export function useGuideSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  const [items, setItems] = useState<
    ReadonlyArray<GlobalSearchItem>
  >([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGuideSearchItems(): Promise<void> {
      try {
        const response = await fetch(
          `/api/guide-search?locale=${locale}`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          return;
        }

        const payload =
          (await response.json()) as GuideSearchApiResponse;

        if (!controller.signal.aborted) {
          setItems(
            Array.isArray(payload.items)
              ? payload.items
              : [],
          );
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        if (!controller.signal.aborted) {
          setItems([]);
        }
      }
    }

    setItems([]);
    void loadGuideSearchItems();

    return () => {
      controller.abort();
    };
  }, [locale]);

  return items;
}
