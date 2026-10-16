"use server";

import { getLocale } from "next-intl/server";
import { requirePublicUser } from "@/lib/auth/user";
import { createMarketReport, type MarketReportReason } from "@/lib/market/market-report-repository";

export type MarketReportState = { status: "idle" | "success" | "duplicate" | "error"; message: string | null };

export async function reportMarketListingAction(_previous: MarketReportState, formData: FormData): Promise<MarketReportState> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const slug = formData.get("slug");
  const listingId = formData.get("listingId");
  const reason = formData.get("reason");
  const rawDetails = formData.get("details");
  const details = typeof rawDetails === "string" ? rawDetails.trim() : "";
  const reasons = ["spam", "abuse", "misinformation", "other"];
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      typeof listingId !== "string" || !/^[1-9]\d*$/.test(listingId) ||
      typeof reason !== "string" || !reasons.includes(reason) ||
      typeof rawDetails !== "string" || details.length > 1000) {
    return { status: "error", message: locale === "de" ? "Ungültige Meldung." : "Shikoyat ma’lumotlari noto‘g‘ri." };
  }
  const context = await requirePublicUser(locale, `/market/${slug}`);
  const outcome = await createMarketReport({ reporterUserId: context.user.id, listingId, slug, reason: reason as MarketReportReason, details: details || null });
  const messages = locale === "de"
    ? { created: "Danke. Ihre Meldung wird geprüft.", duplicate: "Sie haben diese Anzeige bereits gemeldet.", unavailable: "Diese Anzeige ist nicht mehr verfügbar.", own: "Sie können Ihre eigene Anzeige nicht melden." }
    : { created: "Rahmat. Shikoyatingiz tekshiriladi.", duplicate: "Siz bu e’lon haqida avval shikoyat qilgansiz.", unavailable: "Bu e’lon endi mavjud emas.", own: "O‘z e’loningiz ustidan shikoyat qila olmaysiz." };
  return { status: outcome === "created" ? "success" : outcome === "duplicate" ? "duplicate" : "error", message: messages[outcome] };
}
