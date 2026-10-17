"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { requirePublicUser } from "@/lib/auth/user";
import { changeOwnTravelStatus, removeOwnTravelListing } from "@/lib/travel/travel-repository";

const validId = (v: FormDataEntryValue | null): v is string =>
  typeof v === "string" && /^[1-9]\d*$/.test(v);

export type TravelMutationState = Readonly<{ error: string | null; success: boolean }>;

export async function changeTravelStatusAction(_previous: TravelMutationState, data: FormData): Promise<TravelMutationState> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/travel/mine");
  const id = data.get("listingId");
  const operation = data.get("operation");
  const fail = (uz: string, de: string): TravelMutationState => ({ error: locale === "de" ? de : uz, success: false });
  if (!validId(id) || (operation !== "publish" && operation !== "close")) return fail("Noto‘g‘ri amal.", "Ungültige Aktion.");
  try {
    const ok = await changeOwnTravelStatus({ listingId: id, authorUserId: user.user.id,
      from: operation === "publish" ? "draft" : "published",
      to: operation === "publish" ? "published" : "closed" });
    if (!ok) return fail("E’lon topilmadi yoki holati o‘zgargan.", "Anzeige nicht gefunden oder Status geändert.");
  } catch (error) {
    console.error("Travel status update failed", error);
    return fail("Amal bajarilmadi. Qayta urinib ko‘ring.", "Aktion fehlgeschlagen. Bitte erneut versuchen.");
  }
  revalidatePath(`/${locale}/travel`);
  revalidatePath(`/${locale}/travel/mine`);
  return { error: null, success: true };
}

export async function removeTravelListingAction(_previous: TravelMutationState, data: FormData): Promise<TravelMutationState> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/travel/mine");
  const id = data.get("listingId");
  const fail = (uz: string, de: string): TravelMutationState => ({ error: locale === "de" ? de : uz, success: false });
  if (!validId(id)) return fail("E’lon identifikatori noto‘g‘ri.", "Ungültige Anzeigen-ID.");
  try {
    if (!await removeOwnTravelListing(id, user.user.id)) return fail("E’lon topilmadi.", "Anzeige nicht gefunden.");
  } catch (error) {
    console.error("Travel listing removal failed", error);
    return fail("E’lonni o‘chirib bo‘lmadi.", "Anzeige konnte nicht entfernt werden.");
  }
  revalidatePath(`/${locale}/travel`);
  revalidatePath(`/${locale}/travel/mine`);
  return { error: null, success: true };
}
