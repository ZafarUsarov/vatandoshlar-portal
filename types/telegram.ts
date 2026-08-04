export type SupportedTelegramLocale = "uz" | "de";

export type TelegramGroupStatus =
  | "active"
  | "coming-soon";

export type TelegramGroup = Readonly<{
  state: string;
  shortName: string;
  description: string;
  href: string | null;
  button: string;
  status: TelegramGroupStatus;
  statusLabel: string;
}>;
