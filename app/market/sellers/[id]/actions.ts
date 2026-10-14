"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { requirePublicUser } from "@/lib/auth/user";
import { saveMarketSellerRating } from "@/lib/market/market-seller-ratings";

export type SellerRatingState = { message: string; ok: boolean };
export async function rateMarketSellerAction(
  _previous: SellerRatingState,
  formData: FormData,
): Promise<SellerRatingState> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/market");
  const sellerId = formData.get("sellerId");
  const ratingValue = formData.get("rating");
  if (typeof sellerId !== "string" || typeof ratingValue !== "string" ||
      !/^[1-5]$/.test(ratingValue)) {
    return { ok: false, message: locale === "de" ? "Ungültige Bewertung." : "Baho noto‘g‘ri." };
  }
  if (sellerId === context.user.id) {
    return { ok: false, message: locale === "de" ? "Sie können sich nicht selbst bewerten." : "O‘zingizga baho bera olmaysiz." };
  }
  const saved = await saveMarketSellerRating(sellerId, context.user.id, Number(ratingValue));
  if (!saved) return { ok: false, message: locale === "de" ? "Bewertung konnte nicht gespeichert werden." : "Bahoni saqlab bo‘lmadi." };
  revalidatePath(`/${locale}/market/sellers/${sellerId}`);
  return { ok: true, message: locale === "de" ? "Bewertung gespeichert." : "Baho saqlandi." };
}
