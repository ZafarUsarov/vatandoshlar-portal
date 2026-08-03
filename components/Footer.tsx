import { getTranslations } from "next-intl/server";

import { Link } from "../i18n/navigation";

type FooterLink = Readonly<{
  label: string;
  href: string;
  external?: boolean;
}>;

type FooterColumn = Readonly<{
  title: string;
  links: ReadonlyArray<FooterLink>;
}>;

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

function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.9 6c.2.6.1.8.8.8.5 0 .8-.2 1.1-.5l2.7-2.6 5.6 4.1c1 .6 1.8.3 2.1-.9L23 4.8c.4-1.7-.6-2.5-1.5-1.3Z" />
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
  const currentYear = new Date().getFullYear();

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
      ],
    },
    {
      title: t("columns.community.title"),
      links: [
        {
          label: t("columns.community.links.telegram"),
          href: "/telegram",
        },
        {
          label: t("columns.community.links.nrw"),
          href: "https://t.me/NRW_Vatandoshlar_bot",
          external: true,
        },
        {
          label: t("columns.community.links.badenWuerttemberg"),
          href: "https://t.me/baden_wurttemberg_vatandoshlar",
          external: true,
        },
        {
          label: t("columns.community.links.schleswigHolstein"),
          href: "https://t.me/SH_Vatandoshlar",
          external: true,
        },
      ],
    },
    {
      title: t("columns.resources.title"),
      links: [
        {
          label: t("columns.resources.links.officialInformation"),
          href: "/news",
        },
        {
          label: t("columns.resources.links.verifiedServices"),
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
    <footer
      className="relative isolate overflow-hidden border-t border-white/[0.08] bg-slate-950 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.10),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.08),transparent_32%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                <GlobeIcon className="size-4" />
                Vatandoshlar.de
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                {t("cta.title")}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                {t("cta.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t("cta.servicesButton")}

                <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="https://t.me/NRW_Vatandoshlar_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <TelegramIcon className="size-4 text-sky-300" />
                {t("cta.telegramButton")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label={t("accessibility.homeLink")}
              className="inline-flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
                V
              </span>

              <span>
                <span className="block text-lg font-semibold tracking-[-0.025em] text-white">
                  Vatandoshlar.de
                </span>

                <span className="block text-xs text-slate-400">
                  {t("brand.subtitle")}
                </span>
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              {t("brand.description")}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <ShieldCheckIcon className="size-4" />
                </span>

                <p className="text-sm leading-6 text-slate-400">
                  {t("brand.trust")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                  <MailIcon className="size-4" />
                </span>

                <a
                  href="mailto:info@vatandoshlar.de"
                  className="text-sm text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                >
                  info@vatandoshlar.de
                </a>
              </div>
            </div>
          </div>

          <nav
            aria-label={t("accessibility.navigation")}
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm leading-6 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                        >
                          {link.label}

                          <ArrowUpRightIcon className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm leading-6 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {t("bottom.copyright", {
              year: currentYear,
            })}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="text-xs leading-5 text-slate-500">
              {t("bottom.disclaimer")}
            </p>

            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
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
