"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveCities } from "@/lib/locations/location-repository";
import { createMarketDraft } from "@/lib/market/market-contribution-repository";
import type { MarketListingType } from "@/lib/market/market-repository";

export type MarketFormValues = Readonly<{
  listingType: string;
  locationId: string;
  title: string;
  description: string;
  priceAmount: string;
}>;
export type CreateMarketState = Readonly<{
  error: string | null;
  values: MarketFormValues;
  revision: number;
}>;
const validTypes: MarketListingType[] = ["sell", "buy", "giveaway"];
function text(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function createMarketDraftAction(
  _previousState: CreateMarketState,
  formData: FormData,
): Promise<CreateMarketState> {
  const locale = text(formData, "locale") === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const listingType = text(formData, "listingType") as MarketListingType;
  const locationId = text(formData, "locationId");
  const title = text(formData, "title");
  const description = text(formData, "description");
  const priceRaw = text(formData, "priceAmount");
  const values: MarketFormValues = {
    listingType,
    locationId,
    title,
    description,
    priceAmount: priceRaw,
  };
  const error = (uz: string, de: string): CreateMarketState => ({
    error: locale === "de" ? de : uz,
    values,
    revision: _previousState.revision + 1,
  });

  if (!validTypes.includes(listingType)) return error("E’lon turini tanlang.", "Bitte wählen Sie eine Anzeigenart.");
  const cities = (await getActiveCities()).filter((city) => city.countryCode === "DE");
  if (!cities.some((city) => city.id === locationId)) return error("Faol shaharni tanlang.", "Bitte wählen Sie eine verfügbare Stadt.");
  if (!title) return error("Sarlavha kiritilishi shart.", "Der Titel darf nicht leer sein.");
  if (description.length < 20 || description.length > 10000) return error("Tavsif 20–10000 belgidan iborat bo‘lsin.", "Die Beschreibung muss 20–10000 Zeichen lang sein.");

  let priceAmount: string | null = null;
  if (listingType === "giveaway") {
    priceAmount = "0.00";
  } else if (priceRaw) {
    const normalized = priceRaw.replace(",", ".");
    if (!/^(?:0|[1-9]\d{0,9})(?:\.\d{1,2})?$/.test(normalized)) {
      return error("Narxni to‘g‘ri kiriting (EUR).", "Bitte geben Sie einen gültigen Preis in EUR ein.");
    }
    priceAmount = normalized;
  }
  if (listingType === "sell" && priceAmount === null) {
    return error("Sotish narxini kiriting.", "Bitte geben Sie einen Verkaufspreis ein.");
  }

  const base = title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 72).replace(/-+$/g, "");
  await createMarketDraft({
    authorUserId: context.user.id,
    locationId,
    slug: `${base || "market"}-${randomUUID()}`,
    listingType,
    title,
    description,
    contentLanguage: locale,
    priceAmount,
  });
  revalidatePath(`/${locale}/market/mine`);
  return redirect({ href: "/market/mine", locale });
}
