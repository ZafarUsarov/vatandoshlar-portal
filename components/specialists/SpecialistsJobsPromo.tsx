import { Link } from "@/i18n/navigation";

type Props = Readonly<{ locale: string }>;

export default function SpecialistsJobsPromo({ locale }: Props) {
  const de = locale === "de";
  return (
    <section className="border-t border-zinc-200 bg-white px-5 py-8 text-zinc-950 dark:border-zinc-700 dark:bg-[#111419] dark:text-zinc-100 sm:px-8 sm:py-10 lg:px-14 lg:py-12">
      <div className="mx-auto max-w-[1600px] rounded-2xl border border-zinc-200 bg-[#f8f8f8] px-4 py-6 dark:border-zinc-700 dark:bg-zinc-900/40 sm:px-7 sm:py-7 lg:px-9">
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {de ? "Nächster Bereich · Arbeit und Karriere" : "KEYINGI BÖLIM · IŞ VA KARYERA"}
            </p>
            <h2 className="mt-3 text-[clamp(24px,2.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.035em]">
              {de ? "Finden Sie leichter Arbeit in Deutschland." : "Germaniyada iş topışni osonlaştiring."}
            </h2>
          </div>
          <div className="min-w-0 lg:justify-self-end">
            <p className="max-w-lg text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {de ? "Hilfreiche Leitfäden zu Minijob, Ausbildung, Praktikum und Jobsuche." : "Minijob, Ausbildung, Praktikum va iş qidirış böyiça foydali qöllanmalar."}
            </p>
            <Link href="/jobs" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg sm:w-auto bg-teal-300 px-5 text-sm font-semibold text-[#0B1220]! transition-colors duration-200 hover:bg-teal-200 dark:border dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100! dark:hover:border-teal-400/60 dark:hover:bg-zinc-800/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 motion-reduce:transition-none">
              {de ? "Arbeit und Karriere ansehen" : "Iş bölimini körış"}
              <span aria-hidden="true" className="dark:text-teal-300">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
