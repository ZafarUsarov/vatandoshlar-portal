import type { SupportedTelegramLocale } from "@/types/telegram";
import { getPublicTelegramGroups } from "@/lib/telegram/public-telegram-repository";
import CinematicTelegramChat from "./CinematicTelegramChat";

function getPublicUsername(href: string | null): string | null {
  if (!href) return null;
  const match = /^https:\/\/t\.me\/([A-Za-z][A-Za-z0-9_]{4,31})\/?$/i.exec(href);
  if (!match || /^(joinchat|share|proxy|socks|login|iv|addstickers|addemoji|setlanguage|confirmphone|boost|contact|invoice|giftcode|addlist|resolve)$/i.test(match[1])) return null;
  return `@${match[1]}`;
}

export default async function TelegramArticleConversation({ locale }: { locale: SupportedTelegramLocale }) {
  const groups = (await getPublicTelegramGroups(locale)).filter(g => g.communityType === "regional" && g.status === "active" && !g.shortName.includes("-"));
  return <CinematicTelegramChat locale={locale} groups={groups.map(({ bundesland, state, shortName, href }) => ({ bundesland, state, shortName, username: getPublicUsername(href) }))} />;
}
