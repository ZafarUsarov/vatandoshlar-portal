import FounderSocials from "@/components/founder/FounderSocials";
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
    technologiesTitle: string;
    contactTitle: string;
    contactDescription: string;
    socials: Readonly<
      Record<FounderSocialPlatform | "email", string>
    >;
  }>;
}>;

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
    <section className="bg-white py-20 dark:bg-slate-950 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-8">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
              {labels.storyTitle}
            </h2>

            <div className="mt-6 space-y-5">
              {labels.storyParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-600 dark:text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900/70 sm:p-9">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
              {labels.missionTitle}
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {labels.missionDescription}
            </p>

            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {labels.missionItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
              {labels.workTitle}
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {labels.workDescription}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {labels.workItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950"
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
          </article>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              {labels.technologiesTitle}
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {founder.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              {labels.contactTitle}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {labels.contactDescription}
            </p>

            <div className="mt-6">
              <FounderSocials
                email={founder.email}
                socialLinks={founder.socialLinks}
                labels={labels.socials}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
