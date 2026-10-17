"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { requirePublicUser } from "@/lib/auth/user";
import { changeOwnTravelStatus, removeOwnTravelListing } from "@/lib/travel/travel-repository";

const validId = (v: FormDataEntryValue | null): v is string =>
  typeof v === "string" && /^[1-9]\d*$/.test(v);

export async function changeTravelStatusAction(data: FormData): Promise<void> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/travel/mine");
  const id = data.get("listingId");
  const operation = data.get("operation");
  if (!validId(id) || (operation !== "publish" && operation !== "close")) throw new Error("Invalid travel action.");
  const ok = await changeOwnTravelStatus({ listingId: id, authorUserId: user.user.id,
    from: operation === "publish" ? "draft" : "published",
    to: operation === "publish" ? "published" : "closed" });
  if (!ok) throw new Error("Travel listing unavailable or status changed.");
  revalidatePath(`/${locale}/travel`);
  revalidatePath(`/${locale}/travel/mine`);
}

export async function removeTravelListingAction(data: FormData): Promise<void> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/travel/mine");
  const id = data.get("listingId");
  if (!validId(id)) throw new Error("Invalid travel listing ID.");
  if (!await removeOwnTravelListing(id, user.user.id)) throw new Error("Travel listing unavailable.");
  revalidatePath(`/${locale}/travel`);
  revalidatePath(`/${locale}/travel/mine`);
}
