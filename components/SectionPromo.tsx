import { getLocale } from "next-intl/server";

import { Link } from "../i18n/navigation";

type SectionPromoTarget =
  | "news"
  | "services"
  | "specialists"
  | "jobs"
  | "telegram"
  | "events"
  | "guide";

type SectionPromoProps = Readonly<{
  target: SectionPromoTarget;
}>;

type PromoCopy = Readonly<{
  label: string;
  title: string;
  description: string;
  action: string;
}>;

type PromoConfig = Readonly<{
  href: string;
  icon: string;
  accent: string;
  glow: string;
  uz: PromoCopy;
  de: PromoCopy;
}>;

const promoConfig: Record<SectionPromoTarget, PromoConfig> = {
  news: {
    href: "/news",
    icon: "N",
    accent:
      "border-blue-200/80 bg-blue-50 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300",
    glow: "bg-blue-400/15 dark:bg-blue-400/10",
    uz: {
      label: "Keyingi bo‘lim · Yangiliklar",
      title: "Germaniyadagi muhim yangiliklardan xabardor bo‘ling",
      description:
        "Rasmiy manbalarga tayangan yangiliklar, foydali e’lonlar va Germaniyadagi o‘zbekistonliklar uchun muhim o‘zgarishlarni kuzating.",
      action: "Yangiliklarni ko‘rish",
    },
    de: {
      label: "Nächster Bereich · Nachrichten",
      title: "Bleiben Sie über wichtige Entwicklungen in Deutschland informiert",
      description:
        "Verfolgen Sie geprüfte Nachrichten, hilfreiche Hinweise und relevante Änderungen für Usbeken in Deutschland.",
      action: "Nachrichten ansehen",
    },
  },
  services: {
    href: "/services",
    icon: "X",
    accent:
      "border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
    glow: "bg-emerald-400/15 dark:bg-emerald-400/10",
    uz: {
      label: "Keyingi bo‘lim · Xizmatlar",
      title: "Kerakli xizmatni topishdan oldin nimani tekshirish kerakligini biling",
      description:
        "Tarjima, huquq, soliq, tibbiyot va boshqa xizmat yo‘nalishlari bo‘yicha ishonchli manbalar va tekshirish usullarini ko‘ring.",
      action: "Xizmatlarni ko‘rish",
    },
    de: {
      label: "Nächster Bereich · Dienstleistungen",
      title: "Finden Sie passende Dienstleistungen und prüfen Sie Anbieter sicher",
      description:
        "Erhalten Sie Orientierung zu Übersetzung, Recht, Steuern, Medizin und weiteren Bereichen mit offiziellen Prüfmöglichkeiten.",
      action: "Dienstleistungen ansehen",
    },
  },
  specialists: {
    href: "/specialists",
    icon: "M",
    accent:
      "border-violet-200/80 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300",
    glow: "bg-violet-400/15 dark:bg-violet-400/10",
    uz: {
      label: "Keyingi bo‘lim · Mutaxassislar",
      title: "Sizga mos mutaxassisni alohida katalogdan toping",
      description:
        "Yo‘nalish, Bundesland va tekshirilgan profil holati bo‘yicha mutaxassislarni ko‘rib chiqing va kerakli kontaktga o‘ting.",
      action: "Mutaxassislarni ko‘rish",
    },
    de: {
      label: "Nächster Bereich · Fachkräfte",
      title: "Finden Sie passende Fachkräfte im separaten Verzeichnis",
      description:
        "Durchsuchen Sie Profile nach Fachgebiet, Bundesland und Verifizierungsstatus und gelangen Sie zum passenden Kontakt.",
      action: "Fachkräfte ansehen",
    },
  },
  jobs: {
    href: "/jobs",
    icon: "I",
    accent:
      "border-amber-200/80 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300",
    glow: "bg-amber-400/15 dark:bg-amber-400/10",
    uz: {
      label: "Keyingi bo‘lim · Ish va karyera",
      title: "Germaniyada ish qidirishni aniq va xavfsiz yo‘l bilan davom ettiring",
      description:
        "Minijob, Werkstudent, Ausbildung, Praktikum va professional ish qidirish bo‘yicha amaliy qo‘llanmalar hamda rasmiy platformalarni ko‘ring.",
      action: "Ish bo‘limini ko‘rish",
    },
    de: {
      label: "Nächster Bereich · Arbeit und Karriere",
      title: "Setzen Sie Ihre Jobsuche in Deutschland klar und sicher fort",
      description:
        "Entdecken Sie Leitfäden und offizielle Plattformen zu Minijob, Werkstudent, Ausbildung, Praktikum und qualifizierter Beschäftigung.",
      action: "Arbeit und Karriere ansehen",
    },
  },
  telegram: {
    href: "/telegram",
    icon: "T",
    accent:
      "border-cyan-200/80 bg-cyan-50 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300",
    glow: "bg-cyan-400/15 dark:bg-cyan-400/10",
    uz: {
      label: "Keyingi bo‘lim · Telegram",
      title: "Hududingizdagi vatandoshlar hamjamiyatiga ulanib boring",
      description:
        "Bundesland bo‘yicha Telegram guruhlarini toping, mahalliy hamjamiyat bilan bog‘laning va foydali ma’lumotlardan xabardor bo‘ling.",
      action: "Telegram guruhlarini ko‘rish",
    },
    de: {
      label: "Nächster Bereich · Telegram",
      title: "Vernetzen Sie sich mit der Community in Ihrem Bundesland",
      description:
        "Finden Sie regionale Telegram-Gruppen, tauschen Sie sich mit Landsleuten aus und erhalten Sie hilfreiche lokale Informationen.",
      action: "Telegram-Gruppen ansehen",
    },
  },
  events: {
    href: "/events",
    icon: "T",
    accent:
      "border-sky-200/80 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300",
    glow: "bg-sky-400/15 dark:bg-sky-400/10",
    uz: {
      label: "Keyingi bo‘lim · Tadbirlar",
      title: "Hamjamiyat bilan uchrashing va foydali tadbirlarni kuzating",
      description:
        "Madaniy, ta’limiy, professional va jamoat tadbirlarini ko‘ring. E’lonlar imkon qadar rasmiy manbalar orqali tekshiriladi.",
      action: "Tadbirlarni ko‘rish",
    },
    de: {
      label: "Nächster Bereich · Veranstaltungen",
      title: "Treffen Sie die Community und entdecken Sie relevante Veranstaltungen",
      description:
        "Finden Sie kulturelle, bildungsbezogene, berufliche und gemeinschaftliche Veranstaltungen mit geprüften Basisangaben.",
      action: "Veranstaltungen ansehen",
    },
  },
  guide: {
    href: "/guide",
    icon: "Q",
    accent:
      "border-teal-200/80 bg-teal-50 text-teal-700 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300",
    glow: "bg-teal-400/15 dark:bg-teal-400/10",
    uz: {
      label: "Keyingi bo‘lim · Qo‘llanma",
      title: "Germaniyadagi hayot uchun kerakli mavzularni bosqichma-bosqich o‘rganing",
      description:
        "Kelish, vizalar, hujjatlar, ta’lim, ish, oila va integratsiya bo‘yicha tartibli va tekshiriladigan qo‘llanmalarga o‘ting.",
      action: "Qo‘llanmani ochish",
    },
    de: {
      label: "Nächster Bereich · Ratgeber",
      title: "Orientieren Sie sich Schritt für Schritt im Alltag in Deutschland",
      description:
        "Entdecken Sie strukturierte Leitfäden zu Einreise, Visa, Dokumenten, Bildung, Arbeit, Familie und Integration.",
      action: "Ratgeber öffnen",
    },
  },
};

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default async function SectionPromo({
  target,
}: SectionPromoProps) {
  const locale = await getLocale();
  const config = promoConfig[target];
  const copy = locale === "de" ? config.de : config.uz;

  return (
    <section
      aria-labelledby={`section-promo-${target}`}
      className="relative isolate overflow-hidden border-t border-slate-200/80 bg-slate-50/70 py-12 transition-colors dark:border-white/[0.08] dark:bg-slate-950 sm:py-14"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 top-1/2 size-64 -translate-y-1/2 rounded-full blur-3xl ${config.glow}`}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.45),rgba(56,189,248,0.35),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur transition duration-300 hover:border-slate-300 hover:shadow-lg dark:border-white/[0.09] dark:bg-white/[0.045] dark:hover:border-white/[0.16] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${config.accent}`}
              >
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center rounded-full border border-current/20 text-[10px] font-black"
                >
                  {config.icon}
                </span>
                {copy.label}
              </div>

              <h2
                id={`section-promo-${target}`}
                className="mt-5 text-2xl font-bold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl lg:text-4xl"
              >
                {copy.title}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
                {copy.description}
              </p>
            </div>

            <Link
              href={config.href}
              className="group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto lg:min-w-56 dark:focus-visible:ring-offset-slate-950"
            >
              {copy.action}
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
