export type TelegramGroupStatus = "Faol" | "Tez orada";

export type TelegramGroup = {
  state: string;
  shortName: string;
  description: string;
  href: string | null;
  button: string;
  status: TelegramGroupStatus;
};