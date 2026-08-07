import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import { Link } from "../i18n/navigation";

type FooterLink = Readonly<{
  label: string;
  href: string;
}>;

type FooterColumn = Readonly<{
  title: string;
  links: ReadonlyArray<FooterLink>;
}>;

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

function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.8 12h16.4M12 3.5c2.2 2.3 3.4 5.2 3.4 8.5S14.2 18.2 12 20.5C9.8 18.2 8.6 15.3 8.6 12S9.8 5.8 12 3.5Z"
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

export default async function Footer() {
  const t = await getTranslations("Footer");
  const locale = (await getLocale()) as SupportedFooterLocale;
  const currentYear = new Date().getFullYear();

  const localCopy =
    locale === "uz"
      ? {
          guide: "Qo‘llanma",
          guideResource: "Germaniya qo‘llanmasi",
          founder: "Loyiha asoschisi",
          guideCta: "Qo‘llanmani ochish",
          guideEyebrow: "Tekshirilgan ma’lumotlar",
          guideDescription:
            "Viza, hujjatlar, til, ta’lim, ish va integratsiya bo‘yicha tekshirilgan qo‘llanmalar.",
        }
      : {
          guide: "Ratgeber",
          guideResource: "Deutschland-Ratgeber",
          founder: "Projektgründer",
          guideCta: "Ratgeber öffnen",
          guideEyebrow: "Geprüfte Informationen",
          guideDescription:
            "Geprüfte Leitfäden zu Visa, Dokumenten, Sprache, Bildung, Arbeit und Integration.",
        };

  const footerColumns: ReadonlyArray<FooterColumn> = [
    {
      title: t("columns.portal.title"),
      links: [
        {
          label: t("columns.portal.links.home"),
          href: "/",
        },
        {
          label: t("columns.portal.links.news"),
          href: "/news",
        },
        {
          label: t("columns.portal.links.services"),
          href: "/services",
        },
        {
          label: t("columns.portal.links.jobs"),
          href: "/jobs",
        },
        {
          label: t("columns.portal.links.events"),
          href: "/events",
        },
        {
          label: localCopy.guide,
          href: "/guide",
        },
        {
          label: t("columns.portal.links.specialists"),
          href: "/specialists",
        },
        {
          label: localCopy.founder,
          href: "/about/founder",
        },
      ],
    },
    {
      title: t("columns.resources.title"),
      links: [
        {
          label: localCopy.guideResource,
          href: "/guide",
        },
        {
          label: t(
            "columns.resources.links.officialInformation",
          ),
          href: "/news",
        },
        {
          label: t(
            "columns.resources.links.verifiedServices",
          ),
          href: "/services",
        },
        {
          label: t("columns.resources.links.career"),
          href: "/jobs",
        },
        {
          label: t("columns.resources.links.events"),
          href: "/events",
        },
      ],
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-200 bg-white text-slate-950 transition-colors dark:border-white/[0.08] dark:bg-slate-950 dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.06),transparent_32%)] dark:bg-[radial-gradient(circle_at_15%_0%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.10),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.08),transparent_32%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-18 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/90 p-6 shadow-sm backdrop-blur-xl transition-colors dark:border-white/[0.1] dark:bg-white/[0.045] dark:shadow-none sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                <GlobeIcon className="size-4" />
                Vatandoshlar.de
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">
                {t("cta.title")}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                {t("cta.description")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:justify-items-end">
              <Link
                href="/services"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto lg:min-w-56 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-slate-950"
              >
                {t("cta.servicesButton")}

                <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/guide"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto lg:min-w-56 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:border-emerald-400/30 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
              >
                <BookOpenIcon className="size-4" />
                {localCopy.guideCta}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[1.05fr_1.35fr] lg:gap-16">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label={t("accessibility.homeLink")}
              className="inline-flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
                V
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

            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {t("brand.description")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <ShieldCheckIcon className="size-4" />
                </span>

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {t("brand.trust")}
                </p>
              </div>

              <div className="-mx-2 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-2 py-3 dark:border-white/[0.08] dark:bg-white/[0.035]">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <BookOpenIcon className="size-4" />
                </span>

                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                    {localCopy.guideEyebrow}
                  </p>

                  <p className="mt-1 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {localCopy.guideDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                  <MailIcon className="size-4" />
                </span>

                <a
                  href="mailto:info.vatandoshlar@gmx.de"
                  className="break-all text-sm text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:text-slate-950 dark:text-slate-400 dark:hover:text-white dark:focus-visible:text-white"
                >
                  info.vatandoshlar@gmx.de
                </a>
              </div>
            </div>
          </div>

          <nav
            aria-label={t("accessibility.navigation")}
            className="grid grid-cols-1 gap-10 min-[390px]:grid-cols-2 sm:gap-x-10"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                  {column.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-8 items-center text-sm leading-6 text-slate-600 transition hover:text-emerald-700 focus-visible:outline-none focus-visible:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300 dark:focus-visible:text-emerald-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 dark:border-white/[0.08] sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {t("bottom.copyright", {
              year: currentYear,
            })}
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-5">
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
