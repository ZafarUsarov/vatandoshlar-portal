export type FeatureIconName =
  | "telegram"
  | "briefcase"
  | "services"
  | "calendar";

export type FeatureMessageKey =
  | "telegramGroups"
  | "jobs"
  | "services"
  | "events";

export interface FeatureItem {
  id: string;
  messageKey: FeatureMessageKey;
  icon: FeatureIconName;
  href: string;
  accentClass: string;
  iconClass: string;
}

export const features: FeatureItem[] = [
  {
    id: "telegram-groups",
    messageKey: "telegramGroups",
    icon: "telegram",
    href: "/telegram",
    accentClass:
      "from-sky-500/20 via-cyan-500/10 to-transparent dark:from-sky-400/20",
    iconClass:
      "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300",
  },
  {
    id: "jobs",
    messageKey: "jobs",
    icon: "briefcase",
    href: "/jobs",
    accentClass:
      "from-violet-500/20 via-fuchsia-500/10 to-transparent dark:from-violet-400/20",
    iconClass:
      "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:bg-violet-400/10 dark:text-violet-300",
  },
  {
    id: "services",
    messageKey: "services",
    icon: "services",
    href: "/services",
    accentClass:
      "from-emerald-500/20 via-teal-500/10 to-transparent dark:from-emerald-400/20",
    iconClass:
      "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    id: "events",
    messageKey: "events",
    icon: "calendar",
    href: "/events",
    accentClass:
      "from-amber-500/20 via-orange-500/10 to-transparent dark:from-amber-400/20",
    iconClass:
      "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300",
  },
];
