import { Fragment } from "react";

import FounderSocials from "@/components/founder/FounderSocials";
import BrandName from "@/components/ui/BrandName";
import type {
  FounderProfile,
  FounderSocialPlatform,
} from "@/types/founder";

type FounderContentProps = Readonly<{
  founder: FounderProfile;
  labels: Readonly<{
    storyTitle: string;
    storyParagraphs: ReadonlyArray<string>;
    missionTitle: string;
    missionDescription: string;
    missionItems: ReadonlyArray<string>;
    workTitle: string;
    workDescription: string;
    workItems: ReadonlyArray<{
      title: string;
      description: string;
    }>;
    competenciesTitle: string;
    competenciesDescription: string;
    competencies: ReadonlyArray<{
      title: string;
      items: ReadonlyArray<string>;
      accent: "emerald" | "sky" | "violet" | "amber";
    }>;
    approachTitle: string;
    approachItems: ReadonlyArray<string>;
    technologiesTitle: string;
    contactTitle: string;
    contactDescription: string;
    socials: Readonly<
      Record<FounderSocialPlatform | "email", string>
    >;
  }>;
}>;

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

function getCompetencyStyles(
  accent: "emerald" | "sky" | "violet" | "amber",
) {
  if (accent === "sky") {
    return {
      border:
        "border-sky-200/80 dark:border-sky-400/15",
      eyebrow:
        "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
      dot:
        "bg-sky-500 dark:bg-sky-300",
    };
  }

  if (accent === "violet") {
    return {
      border:
        "border-violet-200/80 dark:border-violet-400/15",
      eyebrow:
        "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300",
      dot:
        "bg-violet-500 dark:bg-violet-300",
    };
  }

  if (accent === "amber") {
    return {
      border:
        "border-amber-200/80 dark:border-amber-400/15",
      eyebrow:
        "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
      dot:
        "bg-amber-500 dark:bg-amber-300",
    };
  }

  return {
    border:
      "border-emerald-200/80 dark:border-emerald-400/15",
    eyebrow:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    dot:
      "bg-emerald-500 dark:bg-emerald-300",
  };
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 12 4 4 8-8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FounderContent({
  founder,
  labels,
}: FounderContentProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.07),transparent_25%),radial-gradient(circle_at_88%_20%,rgba(59,130,246,0.07),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.05),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_88%_20%,rgba(59,130,246,0.07),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.05),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <article className="group relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/70 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-emerald-400/15 dark:from-emerald-500/[0.07] dark:via-slate-900 dark:to-cyan-500/[0.05] sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-emerald-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125"
            />

            <div className="relative">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                {labels.storyTitle}
              </h2>

              <div className="mt-6 space-y-5">
                {labels.storyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-slate-600 dark:text-slate-300"
                  >
                    <BrandedText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          </article>

          <aside className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div className="group relative overflow-hidden rounded-[2rem] border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10 dark:border-amber-400/15 dark:from-amber-500/[0.05] dark:via-slate-900 dark:to-emerald-500/[0.04]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full bg-amber-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125"
              />

              <div className="relative">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  {labels.technologiesTitle}
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {founder.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/80 bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-violet-200/70 bg-gradient-to-br from-violet-50/75 via-white to-emerald-50/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-violet-400/15 dark:from-violet-500/[0.06] dark:via-slate-900 dark:to-emerald-500/[0.04]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full bg-violet-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125"
              />

              <div className="relative">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  {labels.contactTitle}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  <BrandedText
                    text={labels.contactDescription}
                  />
                </p>

                <div className="mt-6">
                  <FounderSocials
                    email={founder.email}
                    socialLinks={founder.socialLinks}
                    labels={labels.socials}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 space-y-8">
          <article className="group relative overflow-hidden rounded-[2rem] border border-violet-200/70 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/70 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-violet-400/15 dark:from-violet-500/[0.06] dark:via-slate-900 dark:to-sky-500/[0.05] sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-20 size-48 rounded-full bg-violet-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125"
            />

            <div className="relative">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                <BrandedText text={labels.missionTitle} />
              </h2>

              <p className="mt-5 max-w-4xl leading-8 text-slate-600 dark:text-slate-300">
                {labels.missionDescription}
              </p>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {labels.missionItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/75 p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[2rem] border border-sky-200/70 bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/60 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-sky-400/15 dark:from-sky-500/[0.06] dark:via-slate-900 dark:to-emerald-500/[0.05] sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-20 size-48 rounded-full bg-sky-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125"
            />

            <div className="relative">
              <div className="max-w-4xl">
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                  {labels.workTitle}
                </h2>

                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                  {labels.workDescription}
                </p>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {labels.workItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur transition hover:border-sky-200 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-400/20 dark:hover:bg-white/[0.06]"
                  >
                    <h3 className="font-bold text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 p-7 shadow-sm backdrop-blur dark:border-white/[0.09] dark:bg-white/[0.035] sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-emerald-400/8 blur-3xl dark:bg-emerald-400/6"
            />

            <div className="relative">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                  Engineering
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                  {labels.competenciesTitle}
                </h2>

                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                  {labels.competenciesDescription}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {labels.competencies.map((competency) => {
                  const styles = getCompetencyStyles(
                    competency.accent,
                  );

                  return (
                    <section
                      key={competency.title}
                      className={`rounded-[1.5rem] border bg-slate-50/70 p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-white dark:bg-white/[0.025] dark:hover:bg-white/[0.045] ${styles.border}`}
                    >
                      <div
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${styles.eyebrow}`}
                      >
                        {competency.title}
                      </div>

                      <ul className="mt-4 space-y-3">
                        {competency.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-2 size-1.5 shrink-0 rounded-full ${styles.dot}`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>

              <div className="mt-7 border-t border-slate-200/80 pt-6 dark:border-white/[0.08]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {labels.approachTitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {labels.approachItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-400/15 dark:bg-emerald-400/[0.07] dark:text-emerald-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
