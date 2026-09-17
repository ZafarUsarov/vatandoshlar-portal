import { Fragment } from "react";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import { Link } from "../i18n/navigation";
import BrandName from "./ui/BrandName";

type SupportedFooterLocale = "uz" | "de";

function BrandedText({
  text,
}: Readonly<{
  text: string;
}>) {
  const parts = text.split("Vatandoshlar.de");

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 && <BrandName />}
          {part}
        </Fragment>
      ))}
    </>
  );
}

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
          supportEyebrow: "Yaxshilik bilan qo‘llab-quvvatlang",
          supportTitle: "Vatandoshlar.de siz uchun foydalimi?",
          supportDescription:
            "Agar platformani foydali deb bilsangiz, uni yaxshilik bilan qo‘llab-quvvatlashingiz mumkin. Ushbu sahifa orqali kelib tushgan mablag‘lar G‘azodagi bolalarga gumanitar yordam ko‘rsatish uchun xayriyaga yo‘naltiriladi.",
          supportAction: "Yaxshilik bilan qo‘llab-quvvatlash",
          compactSupportLink: "Yaxshilik bilan qo‘llab-quvvatlash",
          privacyLink: "Maxfiylik",
          emailLabel: "Vatandoshlar.de elektron pochtasi",
          backToTop: "Yuqoriga",
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
          supportEyebrow: "Mit einer guten Tat unterstützen",
          supportTitle: "Ist Vatandoshlar.de für Sie hilfreich?",
          supportDescription:
            "Wenn Sie die Plattform hilfreich finden, können Sie sie mit einer guten Tat unterstützen. Beiträge, die über diese Seite eingehen, werden für humanitäre Hilfe zugunsten von Kindern in Gaza gespendet.",
          supportAction: "Mit einer guten Tat unterstützen",
          compactSupportLink: "Mit einer guten Tat unterstützen",
          privacyLink: "Datenschutz",
          emailLabel: "E-Mail an Vatandoshlar.de",
          backToTop: "Nach oben",
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

      <div className="relative mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:px-8 lg:py-14">
        {showHomeDetails && (
          <div className="mt-8 border-t border-slate-200/80 pt-6 dark:border-white/[0.08] sm:mt-10 sm:pt-7">
            <div className="flex max-w-2xl items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                <ShieldCheckIcon className="size-4" />
              </span>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                {t("brand.trust")}
              </p>
            </div>
          </div>
        )}

        {showProjectCtas && (
          <div
            className={`mt-8 grid gap-5 sm:mt-10 ${
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
                    <BrandedText
                      text={localCopy.supportTitle}
                    />
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
                    <BrandedText
                      text={localCopy.founderDescription}
                    />
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

        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-white/[0.08] sm:mt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm text-slate-500">
                <BrandedText
                  text={t("bottom.copyright", {
                    year: currentYear,
                  })}
                />
              </p>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400 dark:text-slate-500">
                {t("bottom.disclaimer")}
              </p>
            </div>

            <nav
              aria-label={
                locale === "uz"
                  ? "Footer havolalari"
                  : "Footer-Navigation"
              }
              className="flex w-full flex-col items-start gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-4"
            >
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

              {showHomeDetails && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="group/email relative">
                    <a
                      href="mailto:info.vatandoshlar@gmx.de"
                      aria-label={localCopy.emailLabel}
                      aria-describedby="footer-email-tooltip"
                      className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:border-emerald-300 focus-visible:bg-emerald-50 focus-visible:text-emerald-700 focus-visible:shadow-lg focus-visible:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:border-emerald-400/30 dark:focus-visible:bg-emerald-400/10 dark:focus-visible:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
                    >
                      <MailIcon className="size-5" />
                    </a>
                    <span id="footer-email-tooltip" role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 motion-reduce:transition-none group-hover/email:opacity-100 group-focus-within/email:opacity-100 dark:bg-white dark:text-slate-950">
                      info.vatandoshlar@gmx.de
                    </span>
                  </div>

                  <div className="group/telegram relative">
                    <a href="https://t.me/Vatandoshlar_de" target="_blank" rel="noopener noreferrer" aria-label={localCopy.telegramLabel} aria-describedby="footer-telegram-tooltip" className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 hover:shadow-lg hover:shadow-sky-500/10 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:border-sky-300 focus-visible:bg-sky-50 focus-visible:text-sky-600 focus-visible:shadow-lg focus-visible:shadow-sky-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-sky-400/30 dark:hover:bg-sky-400/10 dark:hover:text-sky-300 dark:focus-visible:border-sky-400/30 dark:focus-visible:bg-sky-400/10 dark:focus-visible:text-sky-300 dark:focus-visible:ring-offset-slate-950">
                      <TelegramIcon className="size-5" />
                    </a>
                    <span id="footer-telegram-tooltip" role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 motion-reduce:transition-none group-hover/telegram:opacity-100 group-focus-within/telegram:opacity-100 dark:bg-white dark:text-slate-950">Telegram</span>
                  </div>

                  <div className="group/instagram relative">
                    <a href="https://www.instagram.com/vatandoshlar.de" target="_blank" rel="noopener noreferrer" aria-label={localCopy.instagramLabel} aria-describedby="footer-instagram-tooltip" className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-fuchsia-300 hover:bg-fuchsia-50 hover:text-fuchsia-600 hover:shadow-lg hover:shadow-fuchsia-500/10 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:border-fuchsia-300 focus-visible:bg-fuchsia-50 focus-visible:text-fuchsia-600 focus-visible:shadow-lg focus-visible:shadow-fuchsia-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-fuchsia-400/30 dark:hover:bg-fuchsia-400/10 dark:hover:text-fuchsia-300 dark:focus-visible:border-fuchsia-400/30 dark:focus-visible:bg-fuchsia-400/10 dark:focus-visible:text-fuchsia-300 dark:focus-visible:ring-offset-slate-950">
                      <InstagramIcon className="size-5" />
                    </a>
                    <span id="footer-instagram-tooltip" role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 motion-reduce:transition-none group-hover/instagram:opacity-100 group-focus-within/instagram:opacity-100 dark:bg-white dark:text-slate-950">Instagram</span>
                  </div>

                  <div className="group/facebook relative">
                    <a href="https://facebook.com/Vatandoshlar.de" target="_blank" rel="noopener noreferrer" aria-label={localCopy.facebookLabel} aria-describedby="footer-facebook-tooltip" className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:border-blue-300 focus-visible:bg-blue-50 focus-visible:text-blue-600 focus-visible:shadow-lg focus-visible:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:bg-blue-400/10 dark:hover:text-blue-300 dark:focus-visible:border-blue-400/30 dark:focus-visible:bg-blue-400/10 dark:focus-visible:text-blue-300 dark:focus-visible:ring-offset-slate-950">
                      <FacebookIcon className="size-5" />
                    </a>
                    <span id="footer-facebook-tooltip" role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 motion-reduce:transition-none group-hover/facebook:opacity-100 group-focus-within/facebook:opacity-100 dark:bg-white dark:text-slate-950">Facebook</span>
                  </div>
                </div>
              )}

              {showHomeDetails && (
                <span aria-hidden="true" className="hidden h-5 w-px bg-slate-200 dark:bg-white/10 lg:block" />
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link href="/privacy" className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-semibold text-slate-600 transition hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-300 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950">
                  {localCopy.privacyLink}
                </Link>
                <span aria-hidden="true" className="h-4 w-px bg-slate-200 dark:bg-white/10" />
                <a href="#top" className="group inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-slate-700 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-300 dark:hover:text-white dark:focus-visible:ring-offset-slate-950">
                  {t("bottom.backToTop")}
                  <ArrowUpIcon className="size-4 transition-transform duration-200 motion-reduce:transform-none group-hover:-translate-y-0.5 group-focus-within:-translate-y-0.5" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
