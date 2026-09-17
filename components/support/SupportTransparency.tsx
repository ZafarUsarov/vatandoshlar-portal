import BrandedText from "@/components/ui/BrandedText";

type SupportTransparencyProps = Readonly<{
  title: string;
  description: string;
  futureLabel: string;
  fields: ReadonlyArray<string>;
  disclaimer: string;
}>;

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 3.5h7l3 3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5V7h3M9 11h6M9 15h6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="m5 12.5 4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SupportTransparency({
  title,
  description,
  futureLabel,
  fields,
  disclaimer,
}: SupportTransparencyProps) {
  return (
    <section className="relative isolate overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white py-16 text-slate-950 dark:border-white/[0.08] dark:from-slate-950 dark:via-emerald-950/[0.12] dark:to-slate-950 dark:text-white sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[54rem] -translate-x-1/2 rounded-full bg-emerald-300/[0.10] blur-3xl dark:bg-emerald-400/[0.045]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 rounded-[2rem] border border-slate-200/90 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-10 dark:border-white/[0.08] dark:bg-slate-900/70">
            <div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <DocumentIcon />
              </span>

              <h2 className="mt-6 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                <BrandedText text={title} />
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                <BrandedText text={description} />
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/55 p-5 sm:p-6 dark:border-emerald-400/15 dark:bg-emerald-400/[0.045]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                {futureLabel}
              </p>

              <ul className="mt-5 space-y-3">
                {fields.map((field) => (
                  <li
                    key={field}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-300">
                      <CheckIcon />
                    </span>
                    <BrandedText text={field} />
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-emerald-200/80 pt-5 text-xs leading-6 text-slate-500 dark:border-emerald-400/15 dark:text-slate-400">
                <BrandedText text={disclaimer} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
