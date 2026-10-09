"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { updateOwnMarketListing } from "@/lib/market/market-contribution-repository";
import type { MarketListingType } from "@/lib/market/market-repository";
import type { MarketFormValues } from "@/app/market/new/actions";

export type EditMarketState = { error: string | null; values: MarketFormValues; revision: number };
const get = (data: FormData, key: string) => { const value = data.get(key); return typeof value === "string" ? value.trim() : ""; };
export async function editMarketAction(previous: EditMarketState, data: FormData): Promise<EditMarketState> {
  const locale = get(data, "locale") === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/market/mine");
  const id = get(data, "listingId");
  const values: MarketFormValues = {
    listingType: get(data, "listingType"), locationId: get(data, "locationId"),
    title: get(data, "title"), description: get(data, "description"), priceAmount: get(data, "priceAmount"),
  };
  const fail = (uz: string, de: string): EditMarketState => ({
    error: locale === "de" ? de : uz, values, revision: previous.revision + 1,
  });
  if (!/^[1-9]\d*$/.test(id)) return fail("E’lon topilmadi.", "Anzeige nicht gefunden.");
  if (!["sell", "buy", "giveaway"].includes(values.listingType)) return fail("E’lon turini tanlang.", "Bitte Anzeigenart wählen.");
  if (!/^[1-9]\d*$/.test(values.locationId)) return fail("Shaharni tanlang.", "Bitte Stadt wählen.");
  if (!values.title) return fail("Sarlavha kiritilishi shart.", "Titel darf nicht leer sein.");
  if (values.description.length < 20 || values.description.length > 10000) return fail("Tavsif 20–10000 belgidan iborat bo‘lsin.", "Beschreibung muss 20–10000 Zeichen lang sein.");
  let priceAmount: string | null = null;
  if (values.listingType === "giveaway") priceAmount = "0.00";
  else if (values.priceAmount) {
    const normalized = values.priceAmount.replace(",", ".");
    if (!/^(?:0|[1-9]\d{0,9})(?:\.\d{1,2})?$/.test(normalized)) return fail("Narx noto‘g‘ri.", "Ungültiger Preis.");
    priceAmount = normalized;
  }
  if (values.listingType === "sell" && priceAmount === null) return fail("Sotish narxini kiriting.", "Bitte Verkaufspreis eingeben.");
  const saved = await updateOwnMarketListing({
    id, authorUserId: context.user.id, listingType: values.listingType as MarketListingType,
    locationId: values.locationId, title: values.title, description: values.description, priceAmount,
  });
  if (!saved) return fail("E’lonni tahrirlab bo‘lmadi.", "Anzeige konnte nicht bearbeitet werden.");
  revalidatePath(`/${locale}/market`);
  revalidatePath(`/${locale}/market/mine`);
  revalidatePath(`/${locale}/market/[slug]`, "page");
  return redirect({ href: "/market/mine", locale });
}
