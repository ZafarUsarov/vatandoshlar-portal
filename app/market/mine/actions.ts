"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { requirePublicUser } from "@/lib/auth/user";
import { changeOwnMarketListingStatus } from "@/lib/market/market-contribution-repository";

export async function changeMarketStatusAction(formData: FormData): Promise<void> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/market/mine");
  const listingId = formData.get("listingId");
  const operation = formData.get("operation");
  if (typeof listingId !== "string" ||
      (operation !== "publish" && operation !== "close")) {
    throw new Error("Invalid market action.");
  }
  const changed = await changeOwnMarketListingStatus({
    listingId,
    authorUserId: context.user.id,
    from: operation === "publish" ? "draft" : "published",
    to: operation === "publish" ? "published" : "closed",
  });
  if (!changed) throw new Error("Listing unavailable or its status has changed.");
  revalidatePath(`/${locale}/market`);
  revalidatePath(`/${locale}/market/mine`);
  revalidatePath(`/${locale}/market/[slug]`, "page");
}
