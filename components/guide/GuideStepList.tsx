import type { GuideStep } from "../../types/guide";

type GuideStepListProps = Readonly<{
  title: string;
  steps: ReadonlyArray<GuideStep>;
}>;

export default function GuideStepList({
  title,
  steps,
}: GuideStepListProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h2>

      <ol className="mt-5 grid gap-x-8 lg:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={`${step.title}-${index}`}
            className="group relative grid grid-cols-[36px_1fr] gap-3 pb-5 last:pb-0 lg:min-h-24"
          >
            <div className="relative flex justify-center">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-8 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-emerald-200 transition-colors group-hover:bg-emerald-400 motion-reduce:transition-none dark:bg-emerald-900 dark:group-hover:bg-emerald-700 lg:hidden"
                />
              )}
              <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white ring-4 ring-white transition-colors group-hover:bg-emerald-700 motion-reduce:transition-none dark:ring-slate-950 dark:group-hover:bg-emerald-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 pt-0.5">
              <h3 className="font-bold leading-6 text-slate-950 transition-colors group-hover:text-emerald-700 motion-reduce:transition-none dark:text-white dark:group-hover:text-emerald-300">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
