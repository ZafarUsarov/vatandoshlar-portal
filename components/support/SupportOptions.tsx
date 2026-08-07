type SupportOption = Readonly<{
  name: string;
  description: string;
  action: string;
  href: string;
  variant: "paypal" | "taps";
  noteTitle?: string;
  note?: string;
}>;

type SupportOptionsProps = Readonly<{
  title: string;
  description: string;
  options: ReadonlyArray<SupportOption>;
  privacy: string;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function ExternalLinkIcon({
  className = "size-4",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M13 5h6v6M11 13 19 5M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const optionStyles = {
  paypal: {
    article:
      "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:border-blue-500/20 dark:from-blue-500/10 dark:via-slate-900 dark:to-sky-500/5",
    label: "text-blue-700 dark:text-blue-300",
    logo: "bg-blue-600 shadow-blue-600/20",
    button:
      "bg-blue-600 shadow-blue-600/20 hover:bg-blue-500 focus-visible:ring-blue-500",
    note:
      "border-blue-200/80 bg-white/80 dark:border-blue-500/20 dark:bg-white/[0.04]",
  },
  taps: {
    article:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-slate-900 dark:to-teal-500/5",
    label: "text-emerald-700 dark:text-emerald-300",
    logo: "bg-emerald-600 shadow-emerald-600/20",
    button:
      "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-500 focus-visible:ring-emerald-500",
    note:
      "border-emerald-200/80 bg-white/80 dark:border-emerald-500/20 dark:bg-white/[0.04]",
  },
} as const;

export default function SupportOptions({
  title,
  description,
  options,
  privacy,
}: SupportOptionsProps) {
  return (
    <section className="bg-white py-16 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
              {title}
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {options.map((option) => {
              const styles = optionStyles[option.variant];

              return (
                <article
                  key={option.name}
                  className={`rounded-[2rem] border p-6 shadow-sm sm:p-8 ${styles.article}`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-bold uppercase tracking-[0.16em] ${styles.label}`}
                      >
                        {option.name}
                      </p>

                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {option.description}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-lg ${styles.logo}`}
                    >
                      {option.variant === "paypal" ? "P" : "T"}
                    </span>
                  </div>

                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${styles.button}`}
                  >
                    {option.action}
                    <ExternalLinkIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {option.noteTitle && option.note && (
                    <div
                      className={`mt-5 rounded-2xl border p-4 ${styles.note}`}
                    >
                      <p
                        className={`text-xs font-bold uppercase tracking-[0.14em] ${styles.label}`}
                      >
                        {option.noteTitle}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {option.note}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            {privacy}
          </div>
        </div>
      </div>
    </section>
  );
}
