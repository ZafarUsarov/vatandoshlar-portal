import type { SearchLocale } from "@/data/searchIndex";

export function normalizeSearchText(
  value: string,
  locale: SearchLocale,
): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase(locale === "de" ? "de-DE" : "uz-UZ")
    .replace(/[ʻʼ’‘`´]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
