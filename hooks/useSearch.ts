"use client";

import { useEffect, useMemo, useState } from "react";

import type { SearchCategory, SearchLocale } from "@/data/searchIndex";
import type { SearchApiResponse, SearchResult } from "@/lib/search/search-types";

type SearchStatus = "idle" | "loading" | "success" | "error";

type UseSearchOptions = Readonly<{
  query: string;
  locale: SearchLocale;
  category?: SearchCategory;
  limit?: number;
  debounceMs?: number;
}>;

type SearchState = Readonly<{
  requestUrl: string | null;
  results: ReadonlyArray<SearchResult>;
  total: number;
  status: SearchStatus;
}>;

type UseSearchResult = Readonly<{
  results: ReadonlyArray<SearchResult>;
  total: number;
  status: SearchStatus;
  isLoading: boolean;
  isError: boolean;
}>;

const initialState: SearchState = {
  requestUrl: null,
  results: [],
  total: 0,
  status: "idle",
};

export function useSearch({
  query,
  locale,
  category,
  limit = 20,
  debounceMs = 220,
}: UseSearchOptions): UseSearchResult {
  const normalizedQuery = query.trim();
  const [state, setState] = useState<SearchState>(initialState);

  const requestUrl = useMemo(() => {
    if (!normalizedQuery) {
      return null;
    }

    const params = new URLSearchParams({
      q: normalizedQuery,
      locale,
      limit: String(limit),
    });

    if (category) {
      params.set("category", category);
    }

    return `/api/search?${params.toString()}`;
  }, [category, limit, locale, normalizedQuery]);

  useEffect(() => {
    if (!requestUrl) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void fetch(requestUrl, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Search request failed with ${response.status}.`);
          }

          return (await response.json()) as SearchApiResponse;
        })
        .then((payload) => {
          if (controller.signal.aborted) {
            return;
          }

          setState({
            requestUrl,
            results: Array.isArray(payload.results) ? payload.results : [],
            total: typeof payload.total === "number" ? payload.total : 0,
            status: "success",
          });
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) {
            return;
          }

          console.error("Search request failed:", error);
          setState({
            requestUrl,
            results: [],
            total: 0,
            status: "error",
          });
        });
    }, debounceMs);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [debounceMs, requestUrl]);

  if (!requestUrl) {
    return {
      results: [],
      total: 0,
      status: "idle",
      isLoading: false,
      isError: false,
    };
  }

  if (state.requestUrl !== requestUrl) {
    return {
      results: [],
      total: 0,
      status: "loading",
      isLoading: true,
      isError: false,
    };
  }

  return {
    results: state.results,
    total: state.total,
    status: state.status,
    isLoading: state.status === "loading",
    isError: state.status === "error",
  };
}
