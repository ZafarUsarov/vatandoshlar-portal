import type {
  SupportedTelegramLocale,
  TelegramGroup,
  TelegramGroupStatus,
} from "@/types/telegram";

type TelegramGroupSource = Readonly<{
  state: string;
  shortName: string;
  href: string | null;
  status: TelegramGroupStatus;
  customName?: Readonly<{
    uz: string;
    de: string;
  }>;
  customDescription?: Readonly<{
    uz: string;
    de: string;
  }>;
  buttonType?: "bot" | "group";
}>;

const telegramGroupSources: ReadonlyArray<TelegramGroupSource> = [
  {
    state: "Nordrhein-Westfalen",
    shortName: "NRW",
    href: "https://t.me/NRW_Vatandoshlar_bot",
    status: "active",
    buttonType: "bot",
    customDescription: {
      uz: "NRW vatandoshlari Telegram hamjamiyatiga qo‘shilish uchun rasmiy botdan foydalaning.",
      de: "Nutzen Sie den offiziellen Bot, um der usbekischen Telegram-Community in Nordrhein-Westfalen beizutreten.",
    },
  },
  {
    state: "Baden-Württemberg",
    shortName: "BW",
    href: "https://t.me/baden_wurttemberg_vatandoshlar",
    status: "active",
  },
  {
    state: "Schleswig-Holstein",
    shortName: "SH",
    href: "https://t.me/SH_Vatandoshlar",
    status: "active",
  },
  {
    state: "Berlin",
    shortName: "BE",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Bayern",
    shortName: "BY",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Brandenburg",
    shortName: "BB",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Bremen",
    shortName: "HB",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Hamburg",
    shortName: "HH",
    href: "https://t.me/+1qwEUmNLr-NiMTRi",
    status: "active",
    customName: {
      uz: "Hamburgdagi O‘zbeklar",
      de: "Usbeken in Hamburg",
    },
    customDescription: {
      uz: "Hamburg va atrofida yashayotgan o‘zbekistonliklar uchun Telegram hamjamiyati.",
      de: "Telegram-Community für Usbeken, die in Hamburg und Umgebung leben.",
    },
  },
  {
    state: "Hessen",
    shortName: "HE",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Mecklenburg-Vorpommern",
    shortName: "MV",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Niedersachsen",
    shortName: "NI",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Rheinland-Pfalz",
    shortName: "RP",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Saarland",
    shortName: "SL",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Sachsen",
    shortName: "SN",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Sachsen-Anhalt",
    shortName: "ST",
    href: null,
    status: "coming-soon",
  },
  {
    state: "Thüringen",
    shortName: "TH",
    href: null,
    status: "coming-soon",
  },
];

function getDefaultDescription(
  state: string,
  status: TelegramGroupStatus,
  locale: SupportedTelegramLocale,
) {
  if (status === "active") {
    return locale === "uz"
      ? `${state} hududidagi vatandoshlar uchun Telegram guruhi.`
      : `Telegram-Gruppe für die usbekische Community in ${state}.`;
  }

  return locale === "uz"
    ? `${state} uchun Telegram guruhi tez orada qo‘shiladi.`
    : `Eine Telegram-Gruppe für ${state} wird demnächst ergänzt.`;
}

export function getTelegramGroups(
  locale: SupportedTelegramLocale,
): TelegramGroup[] {
  return telegramGroupSources.map((group) => {
    const isActive = group.status === "active";

    return {
      state: group.customName?.[locale] ?? group.state,
      shortName: group.shortName,
      description:
        group.customDescription?.[locale] ??
        getDefaultDescription(group.state, group.status, locale),
      href: group.href,
      button:
        locale === "uz"
          ? isActive
            ? group.buttonType === "bot"
              ? "Bot orqali qo‘shilish"
              : "Telegramga qo‘shilish"
            : "Tez orada"
          : isActive
            ? group.buttonType === "bot"
              ? "Über den Bot beitreten"
              : "Telegram-Gruppe öffnen"
            : "Demnächst",
      status: group.status,
      statusLabel:
        locale === "uz"
          ? isActive
            ? "Faol"
            : "Tez orada"
          : isActive
            ? "Aktiv"
            : "Demnächst",
    };
  });
}
