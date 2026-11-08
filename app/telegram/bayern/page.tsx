import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import TelegramRegionPage from "@/components/telegram/TelegramRegionPage";
import type { SupportedTelegramLocale } from "@/types/telegram";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  return {
    title: { absolute: locale === "de" ? "Bayern Telegram-Communitys | UzDe" : "Bayern Telegram guruhlari | UzDe" },
    description: locale === "de"
      ? "Usbekische Telegram-Communitys in Bayern."
      : "Bayerndagi o‘zbek Telegram hamjamiyatlari.",
    alternates: {
      canonical: `/${locale}/telegram/bayern`,
      languages: { uz: "/uz/telegram/bayern", de: "/de/telegram/bayern" },
    },
  };
}

export default function Page() {
  return <TelegramRegionPage bundesland="Bayern" generalShortName="BY" />;
}
