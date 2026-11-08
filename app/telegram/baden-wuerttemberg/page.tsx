import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import type { SupportedTelegramLocale } from "../../../types/telegram";
import TelegramRegionPage from "@/components/telegram/TelegramRegionPage";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  const isGerman = locale === "de";

  return {
    title: {
      absolute: isGerman
        ? "Baden-Württemberg Telegram-Communitys | UzDe"
        : "Baden-Württemberg Telegram guruhlari | UzDe",
    },
    description: isGerman
      ? "Usbekische Telegram-Communitys in Baden-Württemberg."
      : "Baden-Württembergdagi o‘zbek Telegram hamjamiyatlari.",
  };
}

export default function BadenWuerttembergTelegramPage() {
  return <TelegramRegionPage bundesland="Baden-Württemberg" generalShortName="BW" />;
}
