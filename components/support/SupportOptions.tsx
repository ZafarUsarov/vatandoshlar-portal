import BrandedText from "@/components/ui/BrandedText";

type SupportOption = Readonly<{
  name: string;
  description: string;
  action: string;
  href: string;
  variant: "paypal" | "taps";
}>;

type SupportOptionsProps = Readonly<{
  title: string;
  description: string;
  secondaryText: string;
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
  },
  taps: {
    article:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-slate-900 dark:to-teal-500/5",
    label:
      "text-emerald-700 dark:text-emerald-300",
    logo:
      "bg-emerald-600 shadow-emerald-600/20",
    button:
      "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-500 focus-visible:ring-emerald-500",
  },
} as const;

export default function SupportOptions({
  title,
  description,
  secondaryText,
  options,
  privacy,
}: SupportOptionsProps) {
  return (
    <section
      id="support-options"
      className="scroll-mt-24 bg-white py-9 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-11 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
              <BrandedText text={title} />
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
              <BrandedText text={description} />
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              <BrandedText text={secondaryText} />
            </p>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {options.map((option) => {
              const styles =
                optionStyles[option.variant];

              return (
                <article
                  key={option.name}
                  className={`flex flex-col rounded-[2rem] border p-6 shadow-sm sm:p-8 lg:h-full ${styles.article}`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-bold uppercase tracking-[0.16em] ${styles.label}`}
                      >
                        <BrandedText
                          text={option.name}
                        />
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        <BrandedText
                          text={option.description}
                        />
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-lg ${styles.logo}`}
                    >
                      {option.variant === "paypal"
                        ? "P"
                        : "T"}
                    </span>
                  </div>

                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group mt-7 inline-flex min-h-12 w-full lg:mt-auto items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:focus-visible:ring-offset-slate-900 ${styles.button}`}
                  >
                    <BrandedText
                      text={option.action}
                    />
                    <ExternalLinkIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            <svg
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m9 12 2 2 4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p><BrandedText text={privacy} /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
