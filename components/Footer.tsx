import Image from "next/image";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import { Link } from "../i18n/navigation";

type SupportedFooterLocale = "uz" | "de";

type IconProps = Readonly<{
  className?: string;
}>;

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.5 19 6v5.3c0 4.5-2.7 7.8-7 9.2-4.3-1.4-7-4.7-7-9.2V6l7-2.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />

      <path
        d="m8.8 12 2.1 2.1 4.4-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function BookOpenIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M4.5 4.75h5A3.5 3.5 0 0 1 13 8.25v11h-5A3.5 3.5 0 0 1 4.5 15.75v-11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M19.5 4.75h-3A3.5 3.5 0 0 0 13 8.25v11h3A3.5 3.5 0 0 0 19.5 15.75v-11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m7 13 5-5 5 5M12 8v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.7 3.3a1.5 1.5 0 0 0-1.55-.23L3.2 9.6a1.55 1.55 0 0 0 .06 2.91l4.09 1.34 1.58 4.87a1.55 1.55 0 0 0 2.65.55l2.3-2.54 4.25 3.12a1.55 1.55 0 0 0 2.43-.95l2.03-14.12a1.5 1.5 0 0 0-.89-1.48ZM9.67 13.1l7.86-5.34-6.55 6.37-.73 2.78-.58-3.81Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3Z" />
    </svg>
  );
}


function HeartIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function UserIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="8"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.5 19.5v-1.25A5.75 5.75 0 0 1 11.25 12.5h1.5a5.75 5.75 0 0 1 5.75 5.75v1.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

type FooterProps = Readonly<{
  showSupportCta?: boolean;
  showFounderCta?: boolean;
  showHomeDetails?: boolean;
}>;

export default async function Footer({
  showSupportCta = false,
  showFounderCta = false,
  showHomeDetails = false,
}: FooterProps = {}) {
  const t = await getTranslations("Footer");
  const locale = (await getLocale()) as SupportedFooterLocale;
  const currentYear = new Date().getFullYear();

  const showProjectCtas = showSupportCta || showFounderCta;
  const showCompactSupportLink = !showSupportCta;

  const localCopy =
    locale === "uz"
      ? {
          founder: "Loyiha asoschisi",
          guideCta: "Qo‘llanmani ochish",
          guideEyebrow: "Tekshirilgan ma’lumotlar",
          guideDescription:
            "Viza, hujjatlar, til, ta’lim, ish va integratsiya bo‘yicha tekshirilgan qo‘llanmalar.",
          contactTitle: "Biz bilan bog‘lanish",
          contactDescription:
            "Savollaringiz, takliflaringiz yoki hamkorlik bo‘yicha biz bilan elektron pochta orqali bog‘lanishingiz mumkin.",
          followUs: "Bizni kuzating",
          followDescription:
            "Vatandoshlar.de yangiliklari va foydali e’lonlarini rasmiy sahifalarimiz orqali kuzating.",
          telegramLabel: "Vatandoshlar.de Telegram sahifasi",
          instagramLabel: "Vatandoshlar.de Instagram sahifasi",
          facebookLabel: "Vatandoshlar.de Facebook sahifasi",
          supportEyebrow: "Loyihaga hissa qo‘shish",
          supportTitle: "Vatandoshlar.de siz uchun foydalimi?",
          supportDescription:
            "Agar loyihani foydali deb bilsangiz, hosting, domen va platformani rivojlantirish xarajatlariga ixtiyoriy hissa qo‘shishingiz mumkin.",
          supportAction: "Hissa qo‘shish",
          compactSupportLink: "Loyihaga hissa qo‘shish",
          founderEyebrow: "Loyiha ortidagi inson",
          founderTitle: "Loyiha asoschisi",
          founderDescription:
            "Vatandoshlar.de asoschisi va dasturchisi Zafar Usarov haqida batafsil ma’lumot oling.",
          founderAction: "Zafar Usarov haqida",
        }
      : {
          founder: "Projektgründer",
          guideCta: "Ratgeber öffnen",
          guideEyebrow: "Geprüfte Informationen",
          guideDescription:
            "Geprüfte Leitfäden zu Visa, Dokumenten, Sprache, Bildung, Arbeit und Integration.",
          contactTitle: "Kontakt",
          contactDescription:
            "Bei Fragen, Vorschlägen oder Kooperationsanfragen können Sie uns gerne per E-Mail kontaktieren.",
          followUs: "Folgen Sie uns",
          followDescription:
            "Folgen Sie den offiziellen Vatandoshlar.de-Seiten für Neuigkeiten und wichtige Hinweise.",
          telegramLabel: "Vatandoshlar.de auf Telegram",
          instagramLabel: "Vatandoshlar.de auf Instagram",
          facebookLabel: "Vatandoshlar.de auf Facebook",
          supportEyebrow: "Zum Projekt beitragen",
          supportTitle: "Ist Vatandoshlar.de für Sie hilfreich?",
          supportDescription:
            "Wenn Sie das Projekt hilfreich finden, können Sie freiwillig zu den Kosten für Hosting, Domain und die Weiterentwicklung der Plattform beitragen.",
          supportAction: "Beitrag leisten",
          compactSupportLink: "Projekt unterstützen",
          founderEyebrow: "Die Person hinter dem Projekt",
          founderTitle: "Projektgründer",
          founderDescription:
            "Erfahren Sie mehr über Zafar Usarov, Gründer und Entwickler von Vatandoshlar.de.",
          founderAction: "Über Zafar Usarov",
        };

  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50/45 to-white text-slate-950 shadow-[0_-1px_0_rgba(15,23,42,0.02)] transition-colors dark:border-white/[0.08] dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-white dark:shadow-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(14,165,233,0.09),transparent_26%),linear-gradient(135deg,rgba(16,185,129,0.025),transparent_35%,rgba(14,165,233,0.025))] dark:bg-[radial-gradient(circle_at_12%_0%,rgba(16,185,129,0.15),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(14,165,233,0.10),transparent_28%),linear-gradient(135deg,rgba(16,185,129,0.035),transparent_38%,rgba(14,165,233,0.03))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.7),rgba(34,211,238,0.5),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-18 lg:px-8 lg:py-20">
        {showHomeDetails && (
          <div className="mt-12 sm:mt-14">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr_0.9fr]">
              <div className="group relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-emerald-400/15 dark:from-emerald-500/[0.08] dark:via-slate-900 dark:to-cyan-500/[0.06] sm:p-7 lg:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-emerald-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125 dark:bg-emerald-400/10"
                />

                <div className="relative">
                  <Link
                    href="/"
                    aria-label={t("accessibility.homeLink")}
                    className="inline-flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-slate-950"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src="/images/brand/vatandoshlar-icon.png"
                        alt=""
                        aria-hidden="true"
                        width={44}
                        height={44}
                        className="h-10 w-10 object-contain"
                      />
                    </span>

                    <span>
                      <span className="block text-lg font-semibold tracking-[-0.025em] text-slate-950 dark:text-white">
                        Vatandoshlar.de
                      </span>

                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {t("brand.subtitle")}
                      </span>
                    </span>
                  </Link>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {t("brand.description")}
                  </p>

                  <div className="mt-5 flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <ShieldCheckIcon className="size-4" />
                    </span>

                    <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {t("brand.trust")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[2rem] border border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-sky-400/15 dark:from-sky-500/[0.07] dark:via-slate-900 dark:to-cyan-500/[0.05] sm:p-7 lg:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-sky-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125 dark:bg-sky-400/10"
                />

                <div className="relative">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <BookOpenIcon className="size-4" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                        {localCopy.guideEyebrow}
                      </p>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {localCopy.guideDescription}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-sky-200/70 pt-6 dark:border-sky-400/10">
                    <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                      {localCopy.contactTitle}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {localCopy.contactDescription}
                    </p>

                    <a
                      href="mailto:info.vatandoshlar@gmx.de"
                      className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-sky-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white hover:text-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-3 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:border-sky-400/25 dark:hover:bg-white/[0.08] dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                        <MailIcon className="size-4" />
                      </span>

                      <span className="break-all">
                        info.vatandoshlar@gmx.de
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[2rem] border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-violet-400/15 dark:from-violet-500/[0.07] dark:via-slate-900 dark:to-emerald-500/[0.05] sm:p-7 lg:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-violet-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125 dark:bg-violet-400/10"
                />

                <div className="relative">
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                    {localCopy.followUs}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {localCopy.followDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="https://t.me/Vatandoshlar_de"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={localCopy.telegramLabel}
                      title="Telegram"
                      className="group/social flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-3 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
                    >
                      <TelegramIcon className="size-5 transition-transform duration-300 group-hover/social:scale-110" />
                      <span className="sr-only">Telegram</span>
                    </a>

                    <a
                      href="https://www.instagram.com/vatandoshlar.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={localCopy.instagramLabel}
                      title="Instagram"
                      className="group/social flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-3 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
                    >
                      <InstagramIcon className="size-5 transition-transform duration-300 group-hover/social:scale-110" />
                      <span className="sr-only">Instagram</span>
                    </a>

                    <a
                      href="https://facebook.com/Vatandoshlar.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={localCopy.facebookLabel}
                      title="Facebook"
                      className="group/social flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-3 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
                    >
                      <FacebookIcon className="size-5 transition-transform duration-300 group-hover/social:scale-110" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showProjectCtas && (
          <div
            className={`mt-12 grid gap-5 sm:mt-16 ${
              showSupportCta && showFounderCta
                ? "lg:grid-cols-2"
                : "max-w-3xl"
            }`}
          >
            {showSupportCta && (
              <div className="group relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-emerald-400/15 dark:from-emerald-500/[0.09] dark:via-slate-900 dark:to-cyan-500/[0.06] sm:p-7 lg:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-emerald-400/15 blur-3xl transition-transform duration-500 group-hover:scale-125"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 left-1/3 size-40 rounded-full bg-cyan-400/10 blur-3xl"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                      <HeartIcon className="size-5" />
                    </span>

                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                      {localCopy.supportEyebrow}
                    </p>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                    {localCopy.supportTitle}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {localCopy.supportDescription}
                  </p>

                  <Link
                    href="/support"
                    className="group/link mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                  >
                    {localCopy.supportAction}
                    <ArrowUpRightIcon className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            )}

            {showFounderCta && (
              <div className="group relative overflow-hidden rounded-[2rem] border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-violet-400/15 dark:from-violet-500/[0.08] dark:via-slate-900 dark:to-sky-500/[0.05] sm:p-7 lg:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-violet-400/15 blur-3xl transition-transform duration-500 group-hover:scale-125"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 left-1/3 size-40 rounded-full bg-sky-400/10 blur-3xl"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                      <UserIcon className="size-5" />
                    </span>

                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                      {localCopy.founderEyebrow}
                    </p>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                    {localCopy.founderTitle}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {localCopy.founderDescription}
                  </p>

                  <Link
                    href="/about/founder"
                    className="group/link mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-violet-400/20 dark:bg-white/[0.06] dark:text-white dark:hover:border-violet-400/30 dark:hover:text-violet-300 dark:focus-visible:ring-offset-slate-950"
                  >
                    {localCopy.founderAction}
                    <ArrowUpRightIcon className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 dark:border-white/[0.08] sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {t("bottom.copyright", {
              year: currentYear,
            })}
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-5">
            {showCompactSupportLink && (
              <Link
                href="/support"
                className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-emerald-400/20 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors duration-200 group-hover:bg-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:group-hover:bg-emerald-400/15">
                  <HeartIcon className="size-3.5" />
                </span>

                <span>{localCopy.compactSupportLink}</span>

                <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}

            <p className="max-w-xl text-xs leading-5 text-slate-500">
              {t("bottom.disclaimer")}
            </p>

            <a
              href="#top"
              className="group inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950 focus-visible:outline-none focus-visible:text-slate-950 dark:text-slate-300 dark:hover:text-white dark:focus-visible:text-white"
            >
              {t("bottom.backToTop")}

              <ArrowUpIcon className="size-4 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
