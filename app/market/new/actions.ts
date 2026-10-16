"use server";
import { parseMarketPrice, type MarketPriceType } from "@/lib/market/market-price";
import { isMarketCategory, type MarketCategory } from "@/lib/market/market-category";


import { translateMarketListing } from "@/lib/market/market-translation";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveCities } from "@/lib/locations/location-repository";
import { createMarketDraft, changeOwnMarketListingStatus } from "@/lib/market/market-contribution-repository";
import { contactError, validateMarketContact, type MarketContact } from "@/lib/market/market-contact";
import type { MarketListingType } from "@/lib/market/market-repository";

export type MarketFormValues = Readonly<{
  listingType: string;
  category: string;
  locationId: string;
  title: string;
  description: string;
  priceAmount: string;
  priceType: string;
  contentLanguage: string;
}> & MarketContact;
export type CreateMarketState = Readonly<{
  error: string | null;
  values: MarketFormValues;
  revision: number;
  createdId?: string;
  errorField?: string;
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
    category: text(formData, "category"),
    locationId,
    title,
    description,
    priceAmount: priceRaw,
    priceType: text(formData, "priceType") || "fixed",
    contentLanguage: text(formData, "contentLanguage"),
    telegram: text(formData, "telegram"), whatsapp: text(formData, "whatsapp"),
    phone: text(formData, "phone"), email: text(formData, "email"),
  };
  const error = (uz: string, de: string, errorField?: string): CreateMarketState => ({
    errorField,
    error: locale === "de" ? de : uz,
    values,
    revision: _previousState.revision + 1,
  });

  if (!validTypes.includes(listingType)) return error("E’lon turini tanlang.", "Bitte wählen Sie eine Anzeigenart.", "market-type");
  if (!isMarketCategory(values.category)) return error("Kategoriyani tanlang.", "Bitte Kategorie auswählen.", "market-category");
  const cities = (await getActiveCities()).filter((city) => city.countryCode === "DE");
  if (!cities.some((city) => city.id === locationId)) return error("Faol shaharni tanlang.", "Bitte wählen Sie eine verfügbare Stadt.", "market-city");
  if (!["uz", "de"].includes(values.contentLanguage)) return error("E’lon tilini tanlang.", "Bitte Anzeigensprache wählen.", "market-language");
  if (!title) return error("Sarlavha kiritilishi shart.", "Der Titel darf nicht leer sein.", "market-title");
  if (description.length < 20 || description.length > 10000) return error("Tavsif 20–10000 belgidan iborat bo‘lsin.", "Die Beschreibung muss 20–10000 Zeichen lang sein.", "market-description");

  let priceAmount: string | null = null;
  if (listingType === "giveaway") {
    priceAmount = "0.00";
  } else if (priceRaw) {
    const normalized = parseMarketPrice(priceRaw);
    if (normalized === null) return error("Narxni 9,99 yoki 999 shaklida kiriting. Kasr uchun vergul ishlating.", "Preis z. B. 9,99 oder 999 eingeben. Dezimalstellen mit Komma.", "market-price");
    priceAmount = normalized;
  }
  if (listingType === "sell" && priceAmount === null) {
    return error("Sotish narxini kiriting.", "Bitte geben Sie einen Verkaufspreis ein.", "market-price");
  }

  if (!["fixed", "negotiable"].includes(values.priceType)) return error("Narx turini tanlang.", "Bitte Preisart wählen.", "market-price-type");
  const contactIssue = validateMarketContact(values);
  if (contactIssue) return error(contactError(contactIssue, "uz"), contactError(contactIssue, "de"));

  const base = title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 72).replace(/-+$/g, "");
  const createdId = await createMarketDraft({
    authorUserId: context.user.id,
    locationId,
    slug: `${base || "market"}-${randomUUID()}`,
    listingType,
    category: values.category as MarketCategory,
    title,
    description,
    contentLanguage: values.contentLanguage as "uz" | "de",
    priceAmount,
    priceType: (listingType === "giveaway" ? "fixed" : values.priceType) as MarketPriceType,
    contact: values,
  });
  await translateMarketListing(createdId);
  revalidatePath(`/${locale}/market/mine`);
  if (text(formData, "flow") === "inline") return { error: null, values, revision: _previousState.revision + 1, createdId };
  return redirect({ href: `/market/${createdId}/edit`, locale });
}

// Used after client-side image uploads; authorization and status transition remain server-side.
export async function publishCreatedMarketListing(listingId: string, locale: "uz" | "de"): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(listingId)) return false;
  const context = await requirePublicUser(locale);
  const published = await changeOwnMarketListingStatus({
    listingId, authorUserId: context.user.id, from: "draft", to: "published",
  });
  if (published) {
    revalidatePath(`/${locale}/market`);
    revalidatePath(`/${locale}/market/mine`);
  }
  return published;
}
