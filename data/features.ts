export type FeatureIconName =
  | "telegram"
  | "briefcase"
  | "services"
  | "calendar";

export interface FeatureItem {
  id: string;
  icon: FeatureIconName;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  accentClass: string;
  iconClass: string;
}

export const features: FeatureItem[] = [
  {
    id: "telegram-groups",
    icon: "telegram",
    title: "Telegram guruhlari",
    description:
      "Germaniyaning turli shahar va hududlaridagi o'zbeklar Telegram guruhlarini toping.",
    href: "/telegram",
    linkLabel: "Guruhlarni ko'rish",
    accentClass:
      "from-sky-500/20 via-cyan-500/10 to-transparent dark:from-sky-400/20",
    iconClass:
      "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300",
  },
  {
    id: "jobs",
    icon: "briefcase",
    title: "Ish va karyera",
    description:
      "Vakansiyalar, Minijob, Ausbildung va Germaniyada ishlash bo'yicha foydali qo'llanmalar.",
    href: "/jobs",
    linkLabel: "Ish bo'limiga o'tish",
    accentClass:
      "from-violet-500/20 via-fuchsia-500/10 to-transparent dark:from-violet-400/20",
    iconClass:
      "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:bg-violet-400/10 dark:text-violet-300",
  },
  {
    id: "services",
    icon: "services",
    title: "Ishonchli xizmatlar",
    description:
      "Tarjimonlar, yuristlar, ustalar va boshqa mutaxassislarni bir joydan toping.",
    href: "/services",
    linkLabel: "Xizmatlarni ko'rish",
    accentClass:
      "from-emerald-500/20 via-teal-500/10 to-transparent dark:from-emerald-400/20",
    iconClass:
      "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    id: "events",
    icon: "calendar",
    title: "Tadbir va uchrashuvlar",
    description:
      "Konsertlar, seminarlar, uchrashuvlar va hamjamiyat tadbirlaridan xabardor bo'ling.",
    href: "/events",
    linkLabel: "Tadbirlarni ko'rish",
    accentClass:
      "from-amber-500/20 via-orange-500/10 to-transparent dark:from-amber-400/20",
    iconClass:
      "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300",
  },
];