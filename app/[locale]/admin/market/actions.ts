"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { requireAdmin } from "@/lib/auth/admin";
import { moderateMarketReport } from "@/lib/market/market-moderation-repository";

export async function moderateMarketAction(formData: FormData): Promise<void> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  const reportId = formData.get("reportId");
  const listingId = formData.get("listingId");
  const operation = formData.get("operation");
  if (typeof reportId !== "string" || typeof listingId !== "string" ||
      !["hide", "restore", "remove", "dismiss"].includes(String(operation))) return;
  const changed = await moderateMarketReport({
    reportId, listingId, operation: operation as "hide" | "restore" | "remove" | "dismiss",
  });
  if (changed) {
    revalidatePath(`/${locale}/admin/market`);
    revalidatePath(`/${locale}/market`);
    revalidatePath(`/${locale}/market/[slug]`, "page");
    revalidatePath(`/${locale}/market/sellers/[id]`, "page");
  }
}
