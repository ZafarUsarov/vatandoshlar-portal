"use client";

import { useEffect, useState } from "react";

import type {
  GlobalSearchItem,
  SearchLocale,
} from "../data/searchIndex";

type GuideSearchApiResponse = Readonly<{
  items?: ReadonlyArray<GlobalSearchItem>;
}>;

type GuideSearchState = Readonly<{
  locale: SearchLocale | null;
  items: ReadonlyArray<GlobalSearchItem>;
}>;

export function useGuideSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  const [state, setState] = useState<GuideSearchState>({
    locale: null,
    items: [],
  });

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
          setState({
            locale,
            items: Array.isArray(payload.items)
              ? payload.items
              : [],
          });
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        if (!controller.signal.aborted) {
          setState({
            locale,
            items: [],
          });
        }
      }
    }

    void loadGuideSearchItems();

    return () => {
      controller.abort();
    };
  }, [locale]);

  return state.locale === locale
    ? state.items
    : [];
}
