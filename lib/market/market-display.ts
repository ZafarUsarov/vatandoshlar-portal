import type { MarketListing } from "@/lib/market/market-repository";

type DisplayListing = Pick<MarketListing, "listingType" | "priceAmount" | "priceType">;
type Locale = "uz" | "de";

export function formatMarketLocation(city: string, state: string): string {
  const cleanCity = city.trim();
  const cleanState = state.trim();
  return !cleanState || cleanCity.toLocaleLowerCase("de-DE") === cleanState.toLocaleLowerCase("de-DE")
    ? cleanCity
    : `${cleanCity}, ${cleanState}`;
}

export function formatMarketPrice(item: DisplayListing, locale: Locale): string {
  if (item.listingType === "giveaway") return locale === "de" ? "Kostenlos" : "Bepul";
  if (item.priceAmount === null) return locale === "de" ? "Preis auf Anfrage" : "Narx kelishiladi";
  const amount = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(Number(item.priceAmount));
  return item.priceType === "negotiable" ? `${amount} · ${locale === "de" ? "VB" : "Kelishiladi"}` : amount;
}

export function marketPriceCaption(item: DisplayListing, locale: Locale): string {
  if (item.listingType === "giveaway") return "";
  if (item.listingType === "buy") return locale === "de" ? "Preisvorstellung" : "Taklif qilinayotgan narx";
  return locale === "de" ? "Preis" : "Narx";
}
