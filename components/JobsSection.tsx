import { getLocale } from "next-intl/server";

import JobGuideCard from "@/components/cards/JobGuideCard";
import {
  getJobGuides,
  type SupportedJobLocale,
} from "@/data/jobs";
import { Link } from "@/i18n/navigation";

type IconProps = Readonly<{
  className?: string;
}>;

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="7"
        width="16"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

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
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function JobsSection() {
  const locale = (await getLocale()) as SupportedJobLocale;
  const homepageGuides = getJobGuides(locale).slice(0, 3);

  const copy =
    locale === "uz"
      ? {
          badge: "Ish va karyera",
          title:
            "Germaniyada ish topish bo‘yicha bosqichma-bosqich qo‘llanmalar",
          description:
            "Ausbildung, Minijob, Werkstudent, Praktikum va malakali ish o‘rinlari bo‘yicha eng muhim yo‘riqnomalarni bir joyda jamladik.",
          allGuides: "Barcha qo‘llanmalar",
          stats: [
            {
              value: `${homepageGuides.length}+`,
              label: "qo‘llanma",
            },
            {
              value: "100%",
              label: "tekshirilgan",
            },
            {
              value: "DE",
              label: "mehnat bozori",
            },
          ],
          card: {
            highlightsAria:
              "Qo‘llanmaning asosiy mavzulari",
            guide: "Qo‘llanma",
            explained:
              "Bosqichma-bosqich tushuntirilgan",
            open: "Qo‘llanmani ochish",
            openShort: "Ochish",
          },
        }
      : {
          badge: "Arbeit und Karriere",
          title:
            "Schritt-für-Schritt-Leitfäden für die Jobsuche in Deutschland",
          description:
            "Die wichtigsten Hinweise zu Ausbildung, Minijob, Werkstudent, Praktikum und qualifizierten Stellen an einem Ort.",
          allGuides: "Alle Leitfäden",
          stats: [
            {
              value: `${homepageGuides.length}+`,
              label: "Leitfäden",
            },
            {
              value: "100%",
              label: "geprüft",
            },
            {
              value: "DE",
              label: "Arbeitsmarkt",
            },
          ],
          card: {
            highlightsAria:
              "Wichtige Themen des Leitfadens",
            guide: "Leitfaden",
            explained: "Schritt für Schritt erklärt",
            open: "Leitfaden öffnen",
            openShort: "Öffnen",
          },
        };

  return (
    <section
      id="jobs"
      aria-labelledby="jobs-heading"
      className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              <BriefcaseIcon className="size-4" />
              {copy.badge}
            </div>

            <h2
              id="jobs-heading"
              className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl"
            >
              {copy.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {copy.description}
            </p>
          </div>

          <Link
            href="/jobs"
            className="group hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 lg:inline-flex"
          >
            {copy.allGuides}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {homepageGuides.map((guide, index) => (
            <JobGuideCard
              key={guide.id}
              guide={guide}
              index={index}
              labels={copy.card}
            />
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {copy.stats.map((stat) => (
              <div
                key={stat.label}
                className="px-8 py-7"
              >
                <div className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            {copy.allGuides}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
