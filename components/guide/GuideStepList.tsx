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
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>

      <ol className="mt-4 max-w-3xl">
        {steps.map((step, index) => (
          <li
            key={`${step.title}-${index}`}
            className="group relative grid grid-cols-[32px_1fr] gap-3 pb-5 last:pb-0"
          >
            <div className="relative flex justify-center">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-7 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-emerald-200 dark:bg-emerald-900"
                />
              )}
              <span className="relative z-10 flex size-7 items-center justify-center bg-[#F7FAFB] text-xs font-semibold text-emerald-700 dark:bg-[#111419] dark:text-emerald-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 pt-0.5">
              <h3 className="font-semibold leading-6 text-slate-950 dark:text-white">
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
