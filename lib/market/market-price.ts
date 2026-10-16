export type MarketPriceType = "fixed" | "negotiable";

/** German EUR notation: comma decimals, optional dot thousands. */
export function parseMarketPrice(raw: string): string | null {
  const value = raw.trim();
  if (!/^(?:0|[1-9]\d*|[1-9]\d{0,2}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(value)) return null;
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const [whole] = normalized.split(".");
  return whole.length <= 10 ? normalized : null;
}
