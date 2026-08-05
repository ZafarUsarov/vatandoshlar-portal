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
    <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h2>

      <ol className="mt-7 space-y-5">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-[48px_1fr] dark:bg-slate-950"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 font-bold text-white">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-lg font-bold">
                {step.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
