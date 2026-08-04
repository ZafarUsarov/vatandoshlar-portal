import type {
  SupportedTelegramLocale,
  TelegramGroup,
} from "@/types/telegram";

type TelegramGroupSource = Readonly<{
  state: string;
  shortName: string;
  href: string | null;
  status: "active" | "coming-soon";
  description: Readonly<
    Record<SupportedTelegramLocale, string>
  >;
}>;

const sources: ReadonlyArray<TelegramGroupSource> = [
  {
    state: "Nordrhein-Westfalen",
    shortName: "NRW",
    href: "https://t.me/NRW_Vatandoshlar_bot",
    status: "active",
    description: {
      uz: "NRW vatandoshlari Telegram hamjamiyatiga qo‘shilish uchun rasmiy botdan foydalaning.",
      de: "Nutzen Sie den offiziellen Bot, um der Telegram-Community für Landsleute in Nordrhein-Westfalen beizutreten.",
    },
  },
  {
    state: "Baden-Württemberg",
    shortName: "BW",
    href: "https://t.me/baden_wurttemberg_vatandoshlar",
    status: "active",
    description: {
      uz: "Baden-Württemberg hududidagi vatandoshlar uchun Telegram guruhi.",
      de: "Telegram-Gruppe für usbekische Landsleute in Baden-Württemberg.",
    },
  },
  {
    state: "Schleswig-Holstein",
    shortName: "SH",
    href: "https://t.me/SH_Vatandoshlar",
    status: "active",
    description: {
      uz: "Schleswig-Holstein hududidagi vatandoshlar uchun Telegram guruhi.",
      de: "Telegram-Gruppe für usbekische Landsleute in Schleswig-Holstein.",
    },
  },
  ...[
    ["Berlin", "BE"],
    ["Bayern", "BY"],
    ["Brandenburg", "BB"],
    ["Bremen", "HB"],
    ["Hamburg", "HH"],
    ["Hessen", "HE"],
    ["Mecklenburg-Vorpommern", "MV"],
    ["Niedersachsen", "NI"],
    ["Rheinland-Pfalz", "RP"],
    ["Saarland", "SL"],
    ["Sachsen", "SN"],
    ["Sachsen-Anhalt", "ST"],
    ["Thüringen", "TH"],
  ].map(([state, shortName]) => ({
    state,
    shortName,
    href: null,
    status: "coming-soon" as const,
    description: {
      uz: `${state} uchun Telegram guruhi tez orada qo‘shiladi.`,
      de: `Die Telegram-Gruppe für ${state} wird in Kürze ergänzt.`,
    },
  })),
];

export function getTelegramGroups(
  locale: SupportedTelegramLocale,
): ReadonlyArray<TelegramGroup> {
  return sources.map((group) => ({
    state: group.state,
    shortName: group.shortName,
    href: group.href,
    status: group.status,
    description: group.description[locale],
    button:
      group.status === "active"
        ? locale === "uz"
          ? group.shortName === "NRW"
            ? "Bot orqali qo‘shilish"
            : "Telegramga qo‘shilish"
          : group.shortName === "NRW"
            ? "Über den Bot beitreten"
            : "Telegram beitreten"
        : locale === "uz"
          ? "Tez orada"
          : "Demnächst",
    statusLabel:
      group.status === "active"
        ? locale === "uz"
          ? "Faol"
          : "Aktiv"
        : locale === "uz"
          ? "Tez orada"
          : "Demnächst",
  }));
}
