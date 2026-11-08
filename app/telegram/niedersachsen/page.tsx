import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import TelegramRegionPage from "@/components/telegram/TelegramRegionPage";
import type { SupportedTelegramLocale } from "@/types/telegram";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  return {
    title: { absolute: locale === "de" ? "Niedersachsen Telegram-Communitys | UzDe" : "Niedersachsen Telegram guruhlari | UzDe" },
    description: locale === "de"
      ? "Usbekische Telegram-Communitys in Niedersachsen."
      : "Niedersachsendagi o‘zbek Telegram hamjamiyatlari.",
    alternates: {
      canonical: `/${locale}/telegram/niedersachsen`,
      languages: { uz: "/uz/telegram/niedersachsen", de: "/de/telegram/niedersachsen" },
    },
  };
}

export default function Page() {
  return <TelegramRegionPage bundesland="Niedersachsen" generalShortName="NI" />;
}
