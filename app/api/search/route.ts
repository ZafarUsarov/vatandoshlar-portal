import { NextResponse } from "next/server";

import type { SearchCategory, SearchLocale } from "@/data/searchIndex";
import { searchPublicContent } from "@/lib/search/search-engine";

export const dynamic = "force-dynamic";

const searchCategories: ReadonlySet<SearchCategory> = new Set([
  "Sahifa",
  "Yangilik",
  "Xizmat",
  "Mutaxassis",
  "Ish",
  "Ish platformasi",
  "Telegram",
  "Tadbir",
  "Qo‘llanma",
]);

function getLocale(value: string | null): SearchLocale {
  return value === "de" ? "de" : "uz";
}

function getCategory(value: string | null): SearchCategory | undefined {
  return value && searchCategories.has(value as SearchCategory)
    ? (value as SearchCategory)
    : undefined;
}

function getLimit(value: string | null): number {
  const parsed = Number.parseInt(value ?? "20", 10);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 50) : 20;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q")?.trim() ?? "").slice(0, 160);
  const locale = getLocale(url.searchParams.get("locale"));
  const category = getCategory(url.searchParams.get("category"));
  const limit = getLimit(url.searchParams.get("limit"));

  if (!query) {
    return NextResponse.json({
      query: "",
      locale,
      results: [],
      total: 0,
    });
  }

  try {
    const { results, total } = await searchPublicContent({
      query,
      locale,
      category,
      limit,
    });

    return NextResponse.json(
      {
        query,
        locale,
        results,
        total,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("Public search failed:", error);

    return NextResponse.json(
      {
        query,
        locale,
        results: [],
        total: 0,
        error: "SEARCH_UNAVAILABLE",
      },
      { status: 500 },
    );
  }
}
