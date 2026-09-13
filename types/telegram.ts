export type SupportedTelegramLocale = "uz" | "de";

export type TelegramGroupStatus =
  | "active"
  | "coming-soon";

export type TelegramCommunityType =
  | "regional"
  | "professional";

export type TelegramGroup = {
  state: string;
  shortName: string;
  description: string;
  href: string | null;
  button: string;
  status: TelegramGroupStatus;
  statusLabel: string;
  communityType: TelegramCommunityType;
};
