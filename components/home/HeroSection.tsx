import Image from "next/image";
import type { ReactNode } from "react";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import { Link } from "../../i18n/navigation";
import QuickDirectionsPanel, {
  type QuickDirectionItem,
} from "./QuickDirectionsPanel";

type SupportedHomeLocale = "uz" | "de";

type IconProps = Readonly<{
  className?: string;
}>;

function BaseIcon({
  children,
  className = "h-5 w-5",
}: IconProps & Readonly<{ children: ReactNode }>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function GuideIcon() {
  return (
    <BaseIcon>
      <path
        d="M4.5 4.75h5A3.5 3.5 0 0 1 13 8.25v11h-5A3.5 3.5 0 0 1 4.5 15.75v-11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 4.75h-3A3.5 3.5 0 0 0 13 8.25v11h3A3.5 3.5 0 0 0 19.5 15.75v-11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

function ServicesIcon() {
  return (
    <BaseIcon>
      <path
        d="M14.25 6.25a4.5 4.5 0 0 0-5.9 5.9L3.5 17a2.12 2.12 0 0 0 3 3l4.85-4.85a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

function SpecialistsIcon() {
  return (
    <BaseIcon>
      <circle cx="8.25" cy="8" r="3.25" />
      <path
        d="M2.75 19.25v-1.5A4.75 4.75 0 0 1 7.5 13h1.5a4.75 4.75 0 0 1 4.75 4.75v1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 7a2.75 2.75 0 1 1 0 5.5M16 14h.5a4.75 4.75 0 0 1 4.75 4.75v.5"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

function JobsIcon() {
  return (
    <BaseIcon>
      <path
        d="M4 7.75h16A2.25 2.25 0 0 1 22.25 10v8A2.25 2.25 0 0 1 20 20.25H4A2.25 2.25 0 0 1 1.75 18v-8A2.25 2.25 0 0 1 4 7.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 7.75V6A2.25 2.25 0 0 1 10.5 3.75h3A2.25 2.25 0 0 1 15.75 6v1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function HeroSection() {
  const t = await getTranslations("Home");
  const locale = (await getLocale()) as SupportedHomeLocale;

  const quickCopy =
    locale === "uz"
      ? {
          guide: {
            title: "Germaniya qo‘llanmasi",
            description: "Viza, hujjatlar va Germaniyadagi hayot bo‘yicha yo‘riqnomalar.",
          },
          services: {
            title: "Xizmatlar",
            description: "Tarjima, huquq, soliq va boshqa xizmat turlarini toping.",
          },
          specialists: {
            title: "Mutaxassislar",
            description: "Shifokor, advokat, IT va boshqa o‘zbek mutaxassislarini toping.",
          },
          jobs: {
            title: "Ish va karyera",
            description: "Ish platformalari, Minijob, Ausbildung va karyera yo‘nalishlari.",
          },
          open: "Bo‘limni ochish",
        }
      : {
          guide: {
            title: "Deutschland-Ratgeber",
            description: "Leitfäden zu Visa, Dokumenten und dem Leben in Deutschland.",
          },
          services: {
            title: "Dienstleistungen",
            description: "Übersetzung, Recht, Steuern und weitere Dienstleistungen finden.",
          },
          specialists: {
            title: "Fachkräfte",
            description: "Usbekische Ärzte, Anwälte, IT-Fachkräfte und weitere Experten finden.",
          },
          jobs: {
            title: "Arbeit & Karriere",
            description: "Jobportale, Minijob, Ausbildung und Karrierewege entdecken.",
          },
          open: "Bereich öffnen",
        };

  const quickLinks: ReadonlyArray<QuickDirectionItem> = [
    {
      title: quickCopy.guide.title,
      description: quickCopy.guide.description,
      href: "/guide",
      label: `${quickCopy.open}: ${quickCopy.guide.title}`,
      icon: <GuideIcon />,
      featured: true,
    },
    {
      title: quickCopy.services.title,
      description: quickCopy.services.description,
      href: "/services",
      label: `${quickCopy.open}: ${quickCopy.services.title}`,
      icon: <ServicesIcon />,
    },
    {
      title: quickCopy.specialists.title,
      description: quickCopy.specialists.description,
      href: "/specialists",
      label: `${quickCopy.open}: ${quickCopy.specialists.title}`,
      icon: <SpecialistsIcon />,
      featured: true,
    },
    {
      title: quickCopy.jobs.title,
      description: quickCopy.jobs.description,
      href: "/jobs",
      label: `${quickCopy.open}: ${quickCopy.jobs.title}`,
      icon: <JobsIcon />,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src="/images/home/homepage-master-visual.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-[78%_center] opacity-45 sm:object-[74%_center] sm:opacity-55 lg:object-[70%_center] lg:opacity-65 xl:object-center xl:opacity-75"
        />

        <div className="absolute inset-0 bg-slate-950/28" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.99)_0%,rgba(2,6,23,0.96)_28%,rgba(2,6,23,0.82)_48%,rgba(2,6,23,0.48)_70%,rgba(2,6,23,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.08),rgba(2,6,23,0.28))]" />

        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald-500/16 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[32rem] w-[32rem] rounded-full bg-teal-500/12 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:py-18 lg:px-8 lg:py-22 xl:grid-cols-[1.02fr_0.98fr] xl:items-center xl:gap-14 xl:py-28 2xl:gap-16">
        <div className="max-w-3xl xl:max-w-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300 backdrop-blur sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {t("hero.badge")}
          </div>

          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold tracking-tight leading-[1.03] sm:text-5xl md:text-6xl xl:text-[3.7rem] 2xl:text-7xl">
            {t("hero.title")}
            <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {t("hero.highlight")}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 xl:text-xl">
            {t("hero.description")}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-9">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 font-bold sm:px-7 sm:py-4 text-white shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t("hero.servicesCta")}
              <ArrowIcon />
            </Link>

            <Link
              href="/specialists"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur sm:px-7 sm:py-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {quickCopy.specialists.title}
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300 sm:gap-x-7 xl:mt-9 xl:pt-7">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                ✓
              </span>
              {t("hero.trust.officialSources")}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                ✓
              </span>
              {t("hero.trust.verifiedListings")}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                ✓
              </span>
              {t("hero.trust.mobileFriendly")}
            </span>
          </div>
        </div>

        <QuickDirectionsPanel
          title={t("quickLinks.title")}
          items={quickLinks}
          policyTitle={t("quickLinks.policy.title")}
          policyDescription={t("quickLinks.policy.description")}
        />
      </div>
    </section>
  );
}
